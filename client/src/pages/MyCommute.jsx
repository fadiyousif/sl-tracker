import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchReliability, fetchLines, fetchTrend } from '../api';
import ThemeToggle from '../components/ThemeToggle';
import TrendChart from '../components/TrendChart';

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

export default function MyCommute() {
  const [line, setLine] = useState(() => localStorage.getItem('savedLine') || '13');
  const [lines, setLines] = useState([]);
  const [reliability, setReliability] = useState(null);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    fetchLines().then(data => data && setLines(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedLine', line);
    setReliability(null);
    setTrend([]);
    fetchReliability(line).then(setReliability);
    fetchTrend(line).then(data => data && setTrend(data));
  }, [line]);

  const rec = reliability ? morningRecommendation(reliability) : null;

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

        {trend.length > 0 && (
          <section className="card">
            <h2>Reliability Trend</h2>
            <p className="muted" style={{ marginBottom: '1rem' }}>On-time percentage by week (last 12 weeks)</p>
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
