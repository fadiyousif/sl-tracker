# SL Tracker

A commute reliability tracker for Stockholm public transit. Unlike apps that show live departures, SL Tracker focuses on historical patterns — helping commuters understand how reliable their line actually is over time, not just right now.

## Features

- **Reliability score** — percentage of departures running within 2 minutes of schedule, across the last 90 days
- **Reliability trend** — day-by-day on-time percentage for recent weekdays
- **Delay heatmap** — average delay by hour and day of week, so patterns like "Tuesday evenings are always bad" are immediately visible
- **Worst time to travel** — the hour with the highest historical average delay on weekdays
- **Punctuality streak** — flags when a line has been consistently on time recently

## Stack

- **Frontend** — React + Vite, deployed on Vercel
- **Backend** — Express with a cron-based poller, deployed on Railway
- **Database** — Supabase (Postgres)
- **Data** — Trafiklab.se realtime API (CC-BY 4.0)

## How it works

The server polls the Trafiklab API every few minutes during weekday operating hours and writes delay records to Supabase. The React client queries aggregated stats from the Express API — it never calls Trafiklab directly.

## Project structure

```
├── client/        # Vite + React frontend (port 5173)
└── server/        # Express backend (port 3001)
    ├── index.js   # API routes
    ├── poller.js  # Cron job — polls Trafiklab during weekday hours
    └── db.js      # Supabase client
```

## Running locally

```bash
# Start the backend
cd server && node index.js

# Start the frontend (separate terminal)
cd client && npm run dev
```

Set `NODE_ENV=development` in `server/.env` to use mock data instead of hitting Trafiklab or Supabase.

## Attribution

Data provided by [Trafiklab.se](https://www.trafiklab.se) · CC-BY 4.0
