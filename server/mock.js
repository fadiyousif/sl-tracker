export const STOPS = [
  { id: '740020749', name: 'T-Centralen T-bana' },
  { id: '740020101', name: 'Slussen T-bana' },
  { id: '740098559', name: 'Odenplan' },
  { id: '740021661', name: 'Fridhemsplan T-bana' },
  { id: '740021653', name: 'Gamla Stan T-bana' },
  { id: '740037355', name: 'Kungsträdgården' },
]

const TEMPLATES = {
  '740020749': [
    { line: '13', transport_mode: 'METRO', destination: 'Norsborg',      offset: 1,  delay_seconds: 0,   canceled: false },
    { line: '14', transport_mode: 'METRO', destination: 'Fruängen',      offset: 3,  delay_seconds: 120, canceled: false },
    { line: '13', transport_mode: 'METRO', destination: 'Rope',          offset: 5,  delay_seconds: 0,   canceled: false },
    { line: '10', transport_mode: 'METRO', destination: 'Hjulsta',       offset: 7,  delay_seconds: 45,  canceled: false },
    { line: '11', transport_mode: 'METRO', destination: 'Akalla',        offset: 9,  delay_seconds: 0,   canceled: false },
    { line: '14', transport_mode: 'METRO', destination: 'Mörby Centrum', offset: 11, delay_seconds: 0,   canceled: true  },
    { line: '13', transport_mode: 'METRO', destination: 'Norsborg',      offset: 14, delay_seconds: 60,  canceled: false },
  ],
  '740020101': [
    { line: '17', transport_mode: 'METRO', destination: 'Åkeshov',       offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '18', transport_mode: 'METRO', destination: 'Hässelby Strand', offset: 4, delay_seconds: 90, canceled: false },
    { line: '19', transport_mode: 'METRO', destination: 'Hässelby Strand', offset: 5, delay_seconds: 0,  canceled: false },
    { line: '53', transport_mode: 'BUS',   destination: 'Hornstull',     offset: 7,  delay_seconds: 180, canceled: false },
    { line: '17', transport_mode: 'METRO', destination: 'Åkeshov',       offset: 9,  delay_seconds: 0,   canceled: true  },
    { line: '55', transport_mode: 'BUS',   destination: 'Sergels Torg',  offset: 11, delay_seconds: 30,  canceled: false },
    { line: '18', transport_mode: 'METRO', destination: 'Hässelby Strand', offset: 14, delay_seconds: 0, canceled: false },
  ],
  '740098559': [
    { line: '17', transport_mode: 'METRO', destination: 'Skarpnäck',     offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '18', transport_mode: 'METRO', destination: 'Farsta Strand',  offset: 4,  delay_seconds: 0,   canceled: false },
    { line: '40', transport_mode: 'TRAIN', destination: 'Märsta',         offset: 5,  delay_seconds: 240, canceled: false },
    { line: '41', transport_mode: 'TRAIN', destination: 'Södertälje C',   offset: 8,  delay_seconds: 0,   canceled: false },
    { line: '17', transport_mode: 'METRO', destination: 'Skarpnäck',     offset: 10, delay_seconds: 0,   canceled: true  },
    { line: '43', transport_mode: 'BUS',   destination: 'Fridhemsplan',  offset: 12, delay_seconds: 60,  canceled: false },
    { line: '40', transport_mode: 'TRAIN', destination: 'Märsta',         offset: 15, delay_seconds: 0,   canceled: false },
  ],
  '740021661': [
    { line: '10', transport_mode: 'METRO', destination: 'Kungsträdgården', offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '11', transport_mode: 'METRO', destination: 'Kungsträdgården', offset: 4,  delay_seconds: 150, canceled: false },
    { line: '1',  transport_mode: 'BUS',   destination: 'Stora Essingen',  offset: 5,  delay_seconds: 0,   canceled: false },
    { line: '10', transport_mode: 'METRO', destination: 'Kungsträdgården', offset: 8,  delay_seconds: 0,   canceled: false },
    { line: '40', transport_mode: 'BUS',   destination: 'Vällingby',       offset: 10, delay_seconds: 0,   canceled: true  },
    { line: '11', transport_mode: 'METRO', destination: 'Kungsträdgården', offset: 12, delay_seconds: 90,  canceled: false },
    { line: '1',  transport_mode: 'BUS',   destination: 'Stora Essingen',  offset: 15, delay_seconds: 0,   canceled: false },
  ],
  '740021653': [
    { line: '13', transport_mode: 'METRO', destination: 'Rope',           offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '14', transport_mode: 'METRO', destination: 'Mörby Centrum',  offset: 3,  delay_seconds: 0,   canceled: false },
    { line: '17', transport_mode: 'METRO', destination: 'Åkeshov',        offset: 6,  delay_seconds: 200, canceled: false },
    { line: '18', transport_mode: 'METRO', destination: 'Hässelby Strand', offset: 8, delay_seconds: 0,   canceled: false },
    { line: '13', transport_mode: 'METRO', destination: 'Norsborg',       offset: 10, delay_seconds: 0,   canceled: true  },
    { line: '19', transport_mode: 'METRO', destination: 'Hässelby Strand', offset: 12, delay_seconds: 60, canceled: false },
    { line: '14', transport_mode: 'METRO', destination: 'Fruängen',       offset: 15, delay_seconds: 0,   canceled: false },
  ],
  '740037355': [
    { line: '7',  transport_mode: 'TRAM', destination: 'Djurgårdslinjen', offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '76', transport_mode: 'BUS',  destination: 'Ropsten',         offset: 4,  delay_seconds: 75,  canceled: false },
    { line: '7',  transport_mode: 'TRAM', destination: 'Djurgårdslinjen', offset: 7,  delay_seconds: 0,   canceled: false },
    { line: '62', transport_mode: 'BUS',  destination: 'Lidingö',         offset: 9,  delay_seconds: 0,   canceled: false },
    { line: '7',  transport_mode: 'TRAM', destination: 'Djurgårdslinjen', offset: 11, delay_seconds: 300, canceled: false },
    { line: '76', transport_mode: 'BUS',  destination: 'Ropsten',         offset: 13, delay_seconds: 0,   canceled: true  },
    { line: '62', transport_mode: 'BUS',  destination: 'Lidingö',         offset: 16, delay_seconds: 0,   canceled: false },
  ],
}

// offset is minutes from now — keeps mock departures always in the future
const DEFAULT_TEMPLATE = [
  { line: '13', transport_mode: 'METRO', destination: 'Norsborg',       offset: 2,  delay_seconds: 0,   canceled: false },
  { line: '17', transport_mode: 'METRO', destination: 'Skarpnäck',      offset: 4,  delay_seconds: 60,  canceled: false },
  { line: '40', transport_mode: 'TRAIN', destination: 'Märsta',          offset: 6,  delay_seconds: 0,   canceled: false },
  { line: '7',  transport_mode: 'TRAM',  destination: 'Djurgårdslinjen', offset: 8,  delay_seconds: 0,   canceled: true  },
  { line: '55', transport_mode: 'BUS',   destination: 'Sergels Torg',   offset: 10, delay_seconds: 120, canceled: false },
  { line: '14', transport_mode: 'METRO', destination: 'Fruängen',       offset: 14, delay_seconds: 0,   canceled: false },
]

export function getDepartures(areaId) {
  const now = new Date()
  const templates = TEMPLATES[areaId] || DEFAULT_TEMPLATE
  return templates.map(t => ({
    stop_area_id: areaId,
    line: t.line,
    transport_mode: t.transport_mode,
    destination: t.destination,
    // current time + offset minutes, as an ISO string
    scheduled: new Date(now.getTime() + t.offset * 60_000).toISOString(),
    delay_seconds: t.delay_seconds,
    canceled: t.canceled,
  }))
}

// pre-computed reliability stats per line — in production these come from aggregating the departures table
// score = Math.round(on_time / total * 100) — percentage of departures with delay_seconds < 120, excluding cancellations
// total = total number of departures recorded for that line across all stops – not departures from a specific stop.
// warning = optional, shown as an inline alert on the commute screen when a recent pattern is detected
const RELIABILITY = {
  '1':  { score: 88, total: 1240, on_time: 1091 },
  '7':  { score: 74, total: 980,  on_time: 725, warning: 'Late 4 of the last 5 Tuesday mornings' },
  '10': { score: 91, total: 2840, on_time: 2584 },
  '11': { score: 89, total: 2760, on_time: 2456 },
  '13': { score: 85, total: 3100, on_time: 2635 },
  '14': { score: 87, total: 2980, on_time: 2593 },
  '17': { score: 82, total: 2640, on_time: 2165 },
  '18': { score: 84, total: 2580, on_time: 2167 },
  '19': { score: 83, total: 1920, on_time: 1594 },
  '40': { score: 78, total: 1560, on_time: 1217, warning: 'Cancelled 2 of the last 5 Friday evenings' },
  '41': { score: 81, total: 1420, on_time: 1150 },
  '43': { score: 86, total: 890,  on_time: 765 },
  '53': { score: 79, total: 760,  on_time: 600 },
  '55': { score: 76, total: 1100, on_time: 836 },
  '62': { score: 90, total: 640,  on_time: 576 },
  '76': { score: 83, total: 720,  on_time: 598 },
}

export function getLines() {
  return Object.keys(RELIABILITY).sort((a, b) => Number(a) - Number(b))
}

export function getReliability(line) {
  return RELIABILITY[line] ?? null
}

// returns a fake but realistic avg delay in seconds for a given day and hour
// the % operator adds variation between cells so they don't all look identical
function heatDelay(day, hour) {
  if (hour >= 7 && hour <= 9)   return 90  + (day * 3 + hour * 7) % 60  // morning rush: high delays
  if (hour >= 16 && hour <= 18) return 110 + (day * 5 + hour * 4) % 70  // evening rush: highest delays
  if (hour <= 7 || hour >= 21)  return 10  + (day + hour) % 15           // quiet hours: low delays
  return 25 + (day * 2 + hour * 3) % 35                                  // off-peak: moderate delays
}

export function getHeatmap(_line) {
  // 1 = Monday, 2 = Tuesday, ..., 5 = Friday
  const days = [1, 2, 3, 4, 5]

  // build an array of hours from 6 to 22
  const hours = []
  for (let i = 6; i <= 22; i++) {
    hours.push(i)
  }

  // for each day, loop over every hour and produce one object
  // flatMap flattens the result so we get a single array of 80 objects instead of an array of arrays
  return days.flatMap(day =>
    hours.map(hour => ({ day, hour, avg_delay: heatDelay(day, hour) }))
  )
}
