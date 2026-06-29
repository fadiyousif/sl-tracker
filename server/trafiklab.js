const BASE = 'https://realtime-api.trafiklab.se/v1'

export async function fetchDepartures(stopId) {
  const url = `${BASE}/departures/${stopId}?key=${process.env.TRAFIKLAB_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function parseDepartures(stopId, data) {
  if (!data.departures?.length) return []
  return data.departures.map(dep => ({
    stop_area_id:   stopId,
    line:           dep.route.designation,
    transport_mode: dep.route.transport_mode,
    destination:    dep.route.direction,
    scheduled:      dep.scheduled,
    delay_seconds:  dep.delay,
    canceled:       dep.canceled,
  }))
}
