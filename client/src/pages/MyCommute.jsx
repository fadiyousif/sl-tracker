import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchReliability, fetchLines, fetchTrend, fetchHeatmap } from '../api';
import ThemeToggle from '../components/ThemeToggle';
import TrendChart from '../components/TrendChart';
import Spinner from '../components/Spinner';

function scoreColor(score) {
  if (score >= 90) return 'var(--green)';
  if (score >= 80) return 'var(--yellow)';
  if (score >= 70) return 'var(--orange)';
  return 'var(--red)';
}

function morningRecommendation(reliability) {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  // only show during weekday mornings (6–10am)
  if (day === 0 || day === 6 || hour < 6 || hour > 10) return null;
  if (reliability.warning) return `${reliability.warning}. Consider leaving a few minutes earlier.`;
  if (reliability.score >= 90) return 'Running reliably this morning. No issues expected.';
  if (reliability.score < 75) return 'This line has been unreliable lately. Allow extra time.';
  return null;
}

function punctualityStreak(trend) {
  let streak = 0;
  for (const entry of [...trend].reverse()) {
    if (entry.score >= 80) streak++;
    else break;
  }
  return streak;
}

// averages delay across all weekdays per hour, returns the hour with the highest average
function worstHour(heatmap) {
  const byHour = {};
  for (const slot of heatmap) {
    if (!byHour[slot.hour]) byHour[slot.hour] = { total: 0, count: 0 };
    byHour[slot.hour].total += slot.avg_delay;
    byHour[slot.hour].count++;
  }
  let worst = null;
  for (const [hour, { total, count }] of Object.entries(byHour)) {
    const avg = total / count;
    if (!worst || avg > worst.avg) worst = { hour: Number(hour), avg };
  }
  return worst?.hour ?? null;
}

export default function MyCommute() {
  const [line, setLine] = useState(() => localStorage.getItem('savedLine') || '1');
  const [lines, setLines] = useState([]);
  const [reliability, setReliability] = useState(null);
  const [trend, setTrend] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    fetchLines().then(data => data && setLines(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedLine', line);
    setReliability(null);
    setTrend([]);
    setHeatmap([]);
    fetchReliability(line).then(setReliability);
    fetchTrend(line).then(data => data && setTrend(data));
    fetchHeatmap(line).then(data => data && setHeatmap(data));
  }, [line]);

  const rec = reliability ? morningRecommendation(reliability) : null;
  const worst = heatmap.length > 0 ? worstHour(heatmap) : null;
  const streak = trend.length > 0 ? punctualityStreak(trend) : 0;

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
          <h2>Your Route</h2>
          <div className="selectors">
            <label>
              Line
              <select value={line} onChange={e => setLine(e.target.value)}>
                {lines.map(l => <option key={l} value={l}>Line {l}</option>)}
              </select>
            </label>
          </div>
        </section>

        {!reliability && (
          <section className="card">
            <Spinner />
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
            {worst !== null && (
              <p className="muted" style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>
                Historically, Line {line} is most delayed at {worst}:00–{worst + 1}:00 on weekdays.
              </p>
            )}
            {streak >= 2 && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--green)' }}>
                On time for {streak} weekdays in a row.
              </p>
            )}
            {streak === 1 && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--green)' }}>
                On time yesterday.
              </p>
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

        {trend.length > 0 && (
          <section className="card">
            <h2>Reliability Trend</h2>
            <p className="muted" style={{ marginBottom: '1rem' }}>On-time percentage by day (recent weekdays)</p>
            <TrendChart data={trend} />
          </section>
        )}
      </main>

      <footer className="footer">
        Data provided by Trafiklab.se · CC-BY 4.0
      </footer>
    </div>
  );
}
