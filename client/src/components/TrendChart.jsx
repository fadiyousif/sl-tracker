import { useState } from 'react';

export default function TrendChart({ data }) {
  if (!data || data.length < 2) return <p className="muted">Not enough data yet.</p>;

  const [hovered, setHovered] = useState(null);

  const scores = data.map(d => d.score);
  const minScore = Math.max(0, Math.min(...scores) - 10);
  const maxScore = 100;
  const range = maxScore - minScore;

  const W = 500;
  const H = 120;
  const padL = 8;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const cx = (i) => padL + (i / (data.length - 1)) * innerW;
  const cy = (score) => padT + (1 - (score - minScore) / range) * innerH;

  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${cx(i).toFixed(1)} ${cy(d.score).toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }} aria-label="Reliability trend">
      {[70, 80, 90, 100].filter(v => v > minScore).map(v => (
        <line key={v} x1={padL} x2={W - padR} y1={cy(v)} y2={cy(v)} stroke="var(--border)" strokeWidth="1" />
      ))}
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onTouchStart={(e) => { e.preventDefault(); setHovered(i); }}
          onTouchEnd={() => setHovered(null)}
        >
          <circle cx={cx(i)} cy={cy(d.score)} r="16" fill="transparent" />
          <circle
            cx={cx(i)}
            cy={cy(d.score)}
            r={hovered === i ? 7 : 4}
            fill={hovered === i ? '#2563eb' : '#3b82f6'}
            className="trend-dot"
          />
        </g>
      ))}
      {hovered !== null && (() => {
        const x = cx(hovered);
        const y = cy(data[hovered].score);
        const label = `W${data[hovered].week.split('-W')[1]} · ${data[hovered].score}%`;
        const rectW = 80;
        const rectH = 24;
        const rectX = Math.min(Math.max(x - rectW / 2, padL), W - padR - rectW);
        const rectY = y - 42 < padT ? y + 14 : y - 42;
        return (
          <>
            <rect x={rectX} y={rectY} width={rectW} height={rectH} rx="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
            <text x={rectX + rectW / 2} y={rectY + 16} textAnchor="middle" fontSize="12">
              <tspan fill="var(--muted)" fontWeight="400">{`W${data[hovered].week.split('-W')[1]} · `}</tspan>
              <tspan fill="#3b82f6" fontWeight="700">{`${data[hovered].score}%`}</tspan>
            </text>
          </>
        );
      })()}
      {data.map((d, i) => (i === 0 || i === data.length - 1 || i % 2 === 0) && (
        <text key={i} x={cx(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--muted)">
          {`W${d.week.split('-W')[1]}`}
        </text>
      ))}
    </svg>
  );
}
