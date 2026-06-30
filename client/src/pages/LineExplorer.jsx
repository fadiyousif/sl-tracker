import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchReliability, fetchHeatmap } from '../api'
import ThemeToggle from '../components/ThemeToggle'

const DAY_NAMES = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri' }
const DAYS = [1, 2, 3, 4, 5]
const HOURS = []
for (let i = 6; i <= 21; i++) {
  HOURS.push(i)
}


function scoreColor(score) {
  if (score >= 90) return 'var(--green)'
  if (score >= 80) return 'var(--yellow)'
  if (score >= 70) return 'var(--orange)'
  return 'var(--red)'
}

// maps avg delay in seconds to a color from green (low) to red (high)
// hue 120 = green, 60 = yellow, 0 = red — sliding from green toward red as delay increases
// Math.max(0, ...) prevents hue going negative, which would wrap around to pink
function delayColor(seconds) {
  const hue = Math.max(0, 120 - seconds / 3)
  return `hsl(${hue}, 65%, 42%)` // saturation and lightness stay fixed, only hue changes
}

function HeatmapCell({ day, hour, delay }) {
  return (
    <div
      className="hm-cell"
      style={{ background: delayColor(delay) }}
      title={`${DAY_NAMES[day]} ${hour}:00 — avg ${delay}s`}
    />
  )
}

export default function LineExplorer() {
  const { line } = useParams()
  const [reliability, setReliability] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [heatmap, setHeatmap] = useState([])

  useEffect(() => {
    setReliability(null)
    setNotFound(false)
    setHeatmap([])
    fetchReliability(line).then(data => {
      if (!data) return setNotFound(true)
      setReliability(data)
      fetchHeatmap(line).then(data => data && setHeatmap(data))
    })
  }, [line])

  function getDelay(day, hour) {
    return heatmap.find(h => h.day === day && h.hour === hour)?.avg_delay ?? 0
  }

  const worstTimes = [...heatmap]
    .sort((a, b) => b.avg_delay - a.avg_delay)
    .slice(0, 3)

  function generateHeatmapCells() {
    const cells = []
    for (const h of HOURS) {
      cells.push(<div key={`l${h}`} className="hm-hour">{h}:00</div>)
      for (const d of DAYS) {
        cells.push(<HeatmapCell key={`${d}-${h}`} day={d} hour={h} delay={getDelay(d, h)} />)
      }
    }
    return cells
  }

  return (
    <div className="page">
      <nav className="nav">
        <Link to="/"><h1 className="nav-brand">SL Tracker</h1></Link>
        <div className="nav-links">
          <Link to="/">My Commute</Link>
          <span className="nav-active">Line {line} Explorer</span>
          <ThemeToggle />
        </div>
      </nav>

      <main className="main">
        {notFound && (
          <section className="card">
            <p className="muted">Line {line} not found.</p>
          </section>
        )}
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

        {heatmap.length > 0 && (
          <section className="card">
            <h2>Delay Heatmap</h2>
            <p className="muted" style={{ marginBottom: '1rem' }}>Average delay in seconds by hour and day</p>
            <div className="heatmap-grid">
              <div></div>
              {DAYS.map(d => <div key={d} className="hm-day">{DAY_NAMES[d]}</div>)}
              {generateHeatmapCells()}
            </div>
            <div className="heatmap-legend">
              <span style={{ color: delayColor(0) }}>On time</span>
              <div className="legend-bar" />
              <span style={{ color: delayColor(360) }}>+6 min late</span>
            </div>
          </section>
        )}

        {worstTimes.length > 0 && (
          <section className="card">
            <h2>Worst Times</h2>
            <ul className="worst-list">
              {worstTimes.map(({ day, hour, avg_delay }) => (
                <li key={`${day}-${hour}`}>
                  <span className="worst-time">{DAY_NAMES[day]} {hour}:00–{hour + 1}:00</span>
                  <span style={{ color: delayColor(avg_delay), fontWeight: 600 }}>
                    avg +{Math.round(avg_delay)}s
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="footer">
        Data provided by Trafiklab.se · CC-BY 4.0
      </footer>
    </div>
  )
}
