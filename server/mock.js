export const STOPS = [
  { id: '740000002', name: 'Göteborg Centralstation' },
  { id: '740015560', name: 'Brunnsparken' },
  { id: '740015578', name: 'Korsvägen' },
  { id: '740015585', name: 'Nordstan' },
  { id: '740015573', name: 'Hjalmar Brantingsplatsen' },
  { id: '740015568', name: 'Heden' },
]

const TEMPLATES = {
  '740000002': [
    { line: '16', transport_mode: 'TRAM', destination: 'Saltholmen',   offset: 1,  delay_seconds: 0,   canceled: false },
    { line: '9',  transport_mode: 'TRAM', destination: 'Kortedala',    offset: 3,  delay_seconds: 120, canceled: false },
    { line: '25', transport_mode: 'BUS',  destination: 'Frölunda',     offset: 5,  delay_seconds: 45,  canceled: false },
    { line: '16', transport_mode: 'TRAM', destination: 'Saltholmen',   offset: 9,  delay_seconds: 0,   canceled: false },
    { line: '55', transport_mode: 'BUS',  destination: 'Bergsjön',     offset: 11, delay_seconds: 300, canceled: false },
    { line: '2',  transport_mode: 'TRAM', destination: 'Mölndal',      offset: 14, delay_seconds: 0,   canceled: true  },
    { line: '9',  transport_mode: 'TRAM', destination: 'Kortedala',    offset: 16, delay_seconds: 60,  canceled: false },
  ],
  '740015560': [
    { line: '7',  transport_mode: 'TRAM', destination: 'Tynnered',         offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '1',  transport_mode: 'TRAM', destination: 'Östra Sjukhuset',  offset: 3,  delay_seconds: 90,  canceled: false },
    { line: '7',  transport_mode: 'TRAM', destination: 'Tynnered',         offset: 6,  delay_seconds: 180, canceled: false },
    { line: '25', transport_mode: 'BUS',  destination: 'Eriksberg',        offset: 7,  delay_seconds: 0,   canceled: false },
    { line: '1',  transport_mode: 'TRAM', destination: 'Östra Sjukhuset',  offset: 9,  delay_seconds: 0,   canceled: true  },
    { line: '7',  transport_mode: 'TRAM', destination: 'Tynnered',         offset: 12, delay_seconds: 30,  canceled: false },
    { line: '2',  transport_mode: 'TRAM', destination: 'Mölndal',          offset: 14, delay_seconds: 0,   canceled: false },
  ],
  '740015578': [
    { line: '5',  transport_mode: 'TRAM', destination: 'Torp',         offset: 1,  delay_seconds: 0,   canceled: false },
    { line: '6',  transport_mode: 'TRAM', destination: 'Länsmansgården', offset: 4, delay_seconds: 75, canceled: false },
    { line: '7',  transport_mode: 'TRAM', destination: 'Bergsjön',     offset: 5,  delay_seconds: 0,   canceled: false },
    { line: '10', transport_mode: 'TRAM', destination: 'Väderilsgatan', offset: 8, delay_seconds: 0,   canceled: false },
    { line: '5',  transport_mode: 'TRAM', destination: 'Torp',         offset: 10, delay_seconds: 240, canceled: false },
    { line: '6',  transport_mode: 'TRAM', destination: 'Länsmansgården', offset: 12, delay_seconds: 0, canceled: true  },
    { line: '7',  transport_mode: 'TRAM', destination: 'Bergsjön',     offset: 15, delay_seconds: 60,  canceled: false },
  ],
  '740015585': [
    { line: '16', transport_mode: 'TRAM', destination: 'Eketrägatan',  offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '50', transport_mode: 'BUS',  destination: 'Hisings Backa', offset: 4, delay_seconds: 0,   canceled: false },
    { line: '25', transport_mode: 'BUS',  destination: 'Eriksberg',    offset: 5,  delay_seconds: 150, canceled: false },
    { line: '16', transport_mode: 'TRAM', destination: 'Eketrägatan',  offset: 9,  delay_seconds: 0,   canceled: false },
    { line: '50', transport_mode: 'BUS',  destination: 'Hisings Backa', offset: 11, delay_seconds: 0,  canceled: true  },
    { line: '25', transport_mode: 'BUS',  destination: 'Eriksberg',    offset: 13, delay_seconds: 90,  canceled: false },
    { line: '55', transport_mode: 'BUS',  destination: 'Bergsjön',     offset: 16, delay_seconds: 0,   canceled: false },
  ],
  '740015573': [
    { line: '9',  transport_mode: 'TRAM', destination: 'Sandarna',     offset: 3,  delay_seconds: 0,   canceled: false },
    { line: '11', transport_mode: 'TRAM', destination: 'Saltholmen',   offset: 5,  delay_seconds: 0,   canceled: false },
    { line: '9',  transport_mode: 'TRAM', destination: 'Sandarna',     offset: 8,  delay_seconds: 200, canceled: false },
    { line: '55', transport_mode: 'BUS',  destination: 'Bergsjön',     offset: 10, delay_seconds: 0,   canceled: false },
    { line: '11', transport_mode: 'TRAM', destination: 'Saltholmen',   offset: 12, delay_seconds: 0,   canceled: true  },
    { line: '9',  transport_mode: 'TRAM', destination: 'Sandarna',     offset: 14, delay_seconds: 60,  canceled: false },
    { line: '55', transport_mode: 'BUS',  destination: 'Bergsjön',     offset: 17, delay_seconds: 0,   canceled: false },
  ],
  '740015568': [
    { line: '2',  transport_mode: 'TRAM', destination: 'Ekmanska',     offset: 2,  delay_seconds: 0,   canceled: false },
    { line: '13', transport_mode: 'TRAM', destination: 'Sahlgrenska',  offset: 4,  delay_seconds: 0,   canceled: false },
    { line: '2',  transport_mode: 'TRAM', destination: 'Ekmanska',     offset: 7,  delay_seconds: 120, canceled: false },
    { line: '13', transport_mode: 'TRAM', destination: 'Sahlgrenska',  offset: 9,  delay_seconds: 0,   canceled: false },
    { line: '2',  transport_mode: 'TRAM', destination: 'Ekmanska',     offset: 12, delay_seconds: 0,   canceled: true  },
    { line: '58', transport_mode: 'BUS',  destination: 'Frölunda',     offset: 14, delay_seconds: 45,  canceled: false },
    { line: '13', transport_mode: 'TRAM', destination: 'Sahlgrenska',  offset: 16, delay_seconds: 0,   canceled: false },
  ],
}

// offset is minutes from now — keeps mock departures always in the future
const DEFAULT_TEMPLATE = [
  { line: '7',  transport_mode: 'TRAM', destination: 'Tynnered',  offset: 2,  delay_seconds: 0,   canceled: false },
  { line: '25', transport_mode: 'BUS',  destination: 'Centrum',   offset: 4,  delay_seconds: 60,  canceled: false },
  { line: '16', transport_mode: 'TRAM', destination: 'Saltholmen', offset: 6, delay_seconds: 0,   canceled: false },
  { line: '55', transport_mode: 'BUS',  destination: 'Bergsjön',  offset: 8,  delay_seconds: 0,   canceled: true  },
  { line: '7',  transport_mode: 'TRAM', destination: 'Bergsjön',  offset: 10, delay_seconds: 120, canceled: false },
  { line: '2',  transport_mode: 'TRAM', destination: 'Ekmanska',  offset: 14, delay_seconds: 0,   canceled: false },
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
  '1':  { score: 88, total: 1420, on_time: 1250 },
  '2':  { score: 91, total: 850,  on_time: 774 },
  '5':  { score: 83, total: 1100, on_time: 913 },
  '6':  { score: 85, total: 960,  on_time: 816 },
  '7':  { score: 74, total: 980,  on_time: 725, warning: 'Late 4 of the last 5 Tuesday mornings' },
  '9':  { score: 86, total: 760,  on_time: 654 },
  '10': { score: 89, total: 680,  on_time: 605 },
  '11': { score: 84, total: 720,  on_time: 605 },
  '13': { score: 87, total: 800,  on_time: 696 },
  '16': { score: 82, total: 1200, on_time: 984 },
  '25': { score: 78, total: 1560, on_time: 1217, warning: 'Cancelled 2 of the last 5 Friday evenings' },
  '50': { score: 90, total: 640,  on_time: 576 },
  '55': { score: 71, total: 890,  on_time: 632 },
  '58': { score: 80, total: 540,  on_time: 432 },
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
  // flatMap flattens the result so we get a single array of 85 objects instead of an array of arrays
  return days.flatMap(day =>
    hours.map(hour => ({ day, hour, avg_delay: heatDelay(day, hour) }))
  )
}
