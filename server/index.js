import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as mock from './mock.js';
import db from './db.js';
import { startPoller } from './poller.js';
import { fetchDepartures, parseDepartures } from './trafiklab.js';

const app = express();
const PORT = process.env.PORT || 3001;
const IS_DEV = process.env.NODE_ENV === 'development';
const corsOrigin = IS_DEV ? 'http://localhost:5173' : process.env.CLIENT_ORIGIN;

app.use(cors({ origin: corsOrigin }));

const cache = new Map();

// returns cached value if it exists and hasn't expired, otherwise null
function getCached(key, ttlMs) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < ttlMs) return entry.value;
  return null;
}

function setCached(key, value) {
  cache.set(key, { value, ts: Date.now() });
}

function ninetyDaysAgo() {
  return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
}

async function computeReliability(line) {
  const cutoff = ninetyDaysAgo();
  const { data, error } = await db
    .from('departures')
    .select('delay_seconds')
    .eq('line', line)
    .eq('canceled', false)
    .gte('scheduled', cutoff);
  if (error) throw error;
  if (!data.length) return null;
  const onTime = data.filter(departure => departure.delay_seconds < 120);
  return {
    score:   Math.round((onTime.length / data.length) * 100),
    total:   data.length,
    on_time: onTime.length,
  };
}

async function buildHeatmap(line) {
  const cutoff = ninetyDaysAgo();
  const { data, error } = await db
    .from('departures')
    .select('scheduled, delay_seconds')
    .eq('line', line)
    .eq('canceled', false)
    .gte('scheduled', cutoff);
  if (error) throw error;
  // group departures by day-of-week + hour, accumulating total delay and departure count per slot
  const byDayHour = {};
  for (const departure of data) {
    const scheduledDate = new Date(departure.scheduled);
    const day = scheduledDate.getDay();   // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = scheduledDate.getHours();
    const key = `${day}-${hour}`;
    if (!byDayHour[key]) byDayHour[key] = { day, hour, delay_total: 0, departure_count: 0 };
    byDayHour[key].delay_total += departure.delay_seconds;
    byDayHour[key].departure_count++;
  }
  // divide accumulated delay by departure count to get average delay per slot
  return Object.values(byDayHour).map(slot => ({
    day:       slot.day,
    hour:      slot.hour,
    avg_delay: Math.round(slot.delay_total / slot.departure_count),
  }));
}

async function buildTrend(line) {
  const cutoff = new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { data, error } = await db
    .from('departures')
    .select('scheduled, delay_seconds')
    .eq('line', line)
    .eq('canceled', false)
    .gte('scheduled', cutoff)
    .lt('scheduled', today.toISOString());
  if (error) throw error;
  const byDay = {};
  for (const dep of data) {
    const day = new Date(dep.scheduled).toISOString().slice(0, 10);
    if (!byDay[day]) byDay[day] = { on_time: 0, total: 0 };
    byDay[day].total++;
    if (dep.delay_seconds < 120) byDay[day].on_time++;
  }
  return Object.entries(byDay)
    .filter(([day]) => { const dayOfWeek = new Date(day).getDay(); return dayOfWeek >= 1 && dayOfWeek <= 5; })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, { on_time, total }]) => ({
      day,
      score: Math.round((on_time / total) * 100),
      total,
    }));
}

app.get('/api/stops', (_req, res) => {
  res.json(mock.STOPS);
});

const TRACKED_LINES = ['1', '7', '10', '53', '55', '76'];

app.get('/api/lines', (_req, res) => {
  res.json(TRACKED_LINES);
});

app.get('/api/departures/:areaId', async (req, res) => {
  const { areaId } = req.params;
  const key = `dep:${areaId}`;
  const hit = getCached(key, 60_000);
  if (hit) return res.json(hit);
  try {
    const data = IS_DEV
      ? mock.getDepartures(areaId)
      : parseDepartures(areaId, await fetchDepartures(areaId)).slice(0, 10);
    setCached(key, data);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

app.get('/api/reliability/:line', async (req, res) => {
  const { line } = req.params;
  const key = `rel:${line}`;
  const hit = getCached(key, 5 * 60_000);
  if (hit) return res.json(hit);
  try {
    const data = IS_DEV ? mock.getReliability(line) : await computeReliability(line);
    if (!data) return res.status(404).json({ error: 'Line not found' });
    setCached(key, data);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

app.get('/api/reliability/:line/trend', async (req, res) => {
  const { line } = req.params;
  const key = `trend:${line}`;
  const hit = getCached(key, 5 * 60_000);
  if (hit) return res.json(hit);
  try {
    const data = IS_DEV ? mock.getTrend(line) : await buildTrend(line);
    setCached(key, data);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

app.get('/api/reliability/:line/heatmap', async (req, res) => {
  const { line } = req.params;
  const key = `hm:${line}`;
  const hit = getCached(key, 5 * 60_000);
  if (hit) return res.json(hit);
  try {
    const data = IS_DEV ? mock.getHeatmap(line) : await buildHeatmap(line);
    setCached(key, data);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

startPoller();

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT} [${IS_DEV ? 'dev/mock' : 'prod'}]`);
});
