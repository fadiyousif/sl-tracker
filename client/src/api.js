const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function apiFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    console.error(`Fetch failed: ${url}`);
    return null;
  }
}

export const fetchStops       = () => apiFetch(`${BASE}/api/stops`);
export const fetchLines       = () => apiFetch(`${BASE}/api/lines`);
export const fetchDepartures  = (areaId) => apiFetch(`${BASE}/api/departures/${areaId}`);
export const fetchReliability = (line) => apiFetch(`${BASE}/api/reliability/${line}`);
export const fetchHeatmap     = (line) => apiFetch(`${BASE}/api/reliability/${line}/heatmap`);
