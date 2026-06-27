import cron from 'node-cron'
import db from './db.js'
import { STOPS } from './mock.js'

const BASE = 'https://realtime-api.trafiklab.se/v1'


async function fetchDepartures(stopId) {
  const url = `${BASE}/departures/${stopId}?key=${process.env.TRAFIKLAB_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function toRecords(stopId, data) {
  if (!data.departures?.length) return [];
  return data.departures.map(dep => ({
      stop_area_id:   stopId,
      line:           dep.route.designation,
      transport_mode: dep.route.transport_mode,
      destination:    dep.route.direction,
      scheduled:      dep.scheduled,
      delay_seconds:  dep.delay ?? 0,
      canceled:       dep.canceled ?? false,
    }))
}

async function poll() {
  const ts = new Date().toISOString()
  for (const stop of STOPS) {
    try {
      const data = await fetchDepartures(stop.id)
      const records = toRecords(stop.id, data)
      if (records.length === 0) continue;
      const { error } = await db.from('departures').insert(records)
      if (error) console.error(`[${ts}] Supabase error for ${stop.name}:`, error.message)
      else console.log(`[${ts}] ${stop.name}: wrote ${records.length} records`)
    } catch (err) {
      console.error(`[${ts}] Fetch error for ${stop.name}:`, err.message)
    }
  }
}

export function startPoller() {
  if (process.env.NODE_ENV === 'development') return;
  cron.schedule('*/2 7-9,16-18 * * 1-5', poll)  // rush hours
  cron.schedule('*/5 6,10-15,19-21 * * 1-5', poll) // off-peak
  console.log('Poller started')
}
