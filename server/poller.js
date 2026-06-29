import cron from 'node-cron'
import db from './db.js'
import { STOPS } from './mock.js'
import { fetchDepartures, parseDepartures } from './trafiklab.js'

async function poll() {
  const ts = new Date().toISOString()
  for (const stop of STOPS) {
    try {
      const data = await fetchDepartures(stop.id)
      const records = parseDepartures(stop.id, data)
      if (records.length === 0) continue;
      // upsert instead of insert to avoid duplicates across polls —
      // if the same departure already exists, update its delay and canceled status
      const { error } = await db.from('departures').upsert(records, {
        onConflict: 'stop_area_id,line,scheduled', // match on these three fields
        ignoreDuplicates: false,                    // update the row on conflict, don't skip it
      })
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
