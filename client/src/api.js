const BASE = 'http://localhost:3001'

export async function fetchStops() {
  const res = await fetch(`${BASE}/api/stops`)
  return res.json()
}

export async function fetchLines() {
  const res = await fetch(`${BASE}/api/lines`)
  return res.json()
}

export async function fetchDepartures(areaId) {
  const res = await fetch(`${BASE}/api/departures/${areaId}`)
  return res.json()
}

export async function fetchReliability(line) {
  const res = await fetch(`${BASE}/api/reliability/${line}`)
  if (!res.ok) return null
  return res.json()
}

export async function fetchHeatmap(line) {
  const res = await fetch(`${BASE}/api/reliability/${line}/heatmap`)
  return res.json()
}
