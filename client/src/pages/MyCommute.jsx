import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchStops, fetchDepartures, fetchReliability, fetchLines } from '../api'
import ThemeToggle from '../components/ThemeToggle'

function scoreColor(score) {
  if (score >= 90) return 'var(--green)'
  if (score >= 80) return 'var(--yellow)'
  if (score >= 70) return 'var(--orange)'
  return 'var(--red)'
}

function modeColor(mode) {
  const colors = { TRAM: 'var(--tram)', BUS: 'var(--bus)', TRAIN: 'var(--train)', FERRY: 'var(--ferry)' }
  return colors[mode] || 'var(--gray)'
}

// returns how many minutes until the scheduled departure, clamped to 0 if it's already passed
function minutesAway(scheduled) {
  return Math.max(0, Math.round((new Date(scheduled) - new Date()) / 60_000))
}

// returns a label and color for the status cell in the departures table
// 120s threshold matches the reliability score definition (< 2 min late = on time)
function delayStatus(delay_seconds, canceled) {
  if (canceled) return { label: 'Cancelled', color: 'var(--gray)' }
  if (delay_seconds === 0) return { label: 'On time', color: 'var(--green)' }
  const label = delay_seconds < 60 ? `+${delay_seconds}s` : `+${Math.round(delay_seconds / 60)}m`
  const color = delay_seconds < 120 ? 'var(--yellow)' : 'var(--red)'
  return { label, color }
}

function morningRecommendation(reliability) {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  // only show during weekday mornings (6–10am)
  if (day === 0 || day === 6 || hour < 6 || hour > 10) return null
  if (reliability.warning) return `${reliability.warning}. Consider leaving a few minutes earlier.`
  if (reliability.score >= 90) return 'Running reliably this morning. No issues expected.'
  if (reliability.score < 75) return 'This line has been unreliable lately. Allow extra time.'
  return null
}

export default function MyCommute() {
  const [line, setLine] = useState(() => localStorage.getItem('savedLine') || '13')
  const [stopId, setStopId] = useState(() => localStorage.getItem('savedStop') || '740020749')
  const [lines, setLines] = useState([])
  const [stops, setStops] = useState([])
  const [departures, setDepartures] = useState([])
  const [reliability, setReliability] = useState(null)

  useEffect(() => {
    fetchLines().then(data => data && setLines(data))
    fetchStops().then(data => data && setStops(data))
  }, [])

  // runs on mount and whenever the user changes the selected line
  useEffect(() => {
    localStorage.setItem('savedLine', line) // persist selection across page refreshes
    setReliability(null) // clear old score immediately so stale data isn't shown during fetch
    fetchReliability(line).then(setReliability)
  }, [line])

  useEffect(() => {
    localStorage.setItem('savedStop', stopId)
    fetchDepartures(stopId).then(data => data && setDepartures(data))
    // re-fetch every 60 seconds to keep the departures board current
    const t = setInterval(() => fetchDepartures(stopId).then(data => data && setDepartures(data)), 60_000)
    // clear the interval when the stop changes or the component unmounts,
    // otherwise old intervals keep running and pile up in the background
    return () => clearInterval(t)
  }, [stopId])

  const rec = reliability ? morningRecommendation(reliability) : null

  return (
    <div className="page">
      <nav className="nav">
        <Link to="/"><h1 className="nav-brand">SL Tracker</h1></Link>
        <div className="nav-links">
          <span className="nav-active">My Commute</span>
          <Link to={`/lines/${line}`}>Line {line} Explorer</Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="main">
        <section className="card">
          <h2>Saved Route</h2>
          <div className="selectors">
            <label>
              Line
              <select value={line} onChange={e => setLine(e.target.value)}>
                {lines.map(l => <option key={l} value={l}>Line {l}</option>)}
=             </select>
            </label>
            <label>
              Stop
              <select value={stopId} onChange={e => setStopId(e.target.value)}>
                {stops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </label>
          </div>
        </section>

        {reliability && (
          <section className="card">
            <div className="reliability-header">
              <div>
                <h2>Line {line} Reliability</h2>
                <p className="muted">{reliability.total.toLocaleString()} departures tracked</p>
              </div>
              <span className="score" style={{ color: scoreColor(reliability.score) }}>
                {reliability.score}%
              </span>
            </div>
            <div className="score-track">
              <div className="score-fill" style={{ width: `${reliability.score}%`, background: scoreColor(reliability.score) }} />
            </div>
            {reliability.warning && (
              <div className="warning">⚠️ {reliability.warning}</div>
            )}
          </section>
        )}

        {rec && (
          <section className="card rec">
            <span className="rec-icon">🌅</span>
            <div>
              <h2>Morning Recommendation</h2>
              <p>{rec}</p>
            </div>
          </section>
        )}

        <section className="card">
          <h2>Live Departures</h2>
          {departures.length === 0 ? (
            <p className="muted">Loading…</p>
          ) : (
            <table className="dep-table">
              <thead>
                <tr>
                  <th>Line</th>
                  <th>Destination</th>
                  <th>In</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departures.map((d, i) => {
                  const status = delayStatus(d.delay_seconds, d.canceled)
                  return (
                    <tr key={i} className={d.canceled ? 'row-canceled' : ''}>
                      <td>
                        <Link
                          to={`/lines/${d.line}`}
                          className="line-badge"
                          style={{ background: modeColor(d.transport_mode) }}
                        >
                          {d.line}
                        </Link>
                      </td>
                      <td className={d.canceled ? 'text-canceled' : ''}>{d.destination}</td>
                      <td className="muted">{minutesAway(d.scheduled)} min</td>
                      <td style={{ color: status.color, fontWeight: 600 }}>{status.label}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <footer className="footer">
        Data provided by Trafiklab.se · CC-BY 4.0
      </footer>
    </div>
  )
}
