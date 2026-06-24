import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as mock from './mock.js'
import { startPoller } from './poller.js'

const app = express()
const PORT = process.env.PORT || 3001
const IS_DEV = process.env.NODE_ENV === 'development'
const corsOrigin = IS_DEV ? 'http://localhost:5173' : process.env.CLIENT_ORIGIN

app.use(cors({ origin: corsOrigin }))

const cache = new Map()

// returns cached value if it exists and hasn't expired, otherwise null
function getCached(key, ttlMs) {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < ttlMs) return entry.value
  return null
}

function setCached(key, value) {
  cache.set(key, { value, ts: Date.now() })
}

app.get('/api/stops', (_req, res) => {
  res.json(mock.STOPS)
})

// the client uses this to show the live departures board on the "My Commute" screen
app.get('/api/departures/:areaId', (req, res) => {
  const { areaId } = req.params
  const key = `dep:${areaId}`
  const hit = getCached(key, 60_000)
  if (hit) {
    return res.json(hit);
  } else {
    const data = mock.getDepartures(areaId)
    setCached(key, data)
    res.json(data)
  }
})

app.get('/api/reliability/:line', (req, res) => {
  const { line } = req.params
  const key = `rel:${line}`
  const hit = getCached(key, 5 * 60_000)
  if (hit) {
    return res.json(hit)
  } else {
    const data = mock.getReliability(line)
    setCached(key, data)
    res.json(data)
  }
})

app.get('/api/reliability/:line/heatmap', (req, res) => {
  const { line } = req.params
  const key = `hm:${line}`
  const hit = getCached(key, 5 * 60_000)
  if (hit) return res.json(hit)
  const data = mock.getHeatmap(line)
  setCached(key, data)
  res.json(data)
})

startPoller()

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT} [${IS_DEV ? 'dev/mock' : 'prod'}]`)
})
