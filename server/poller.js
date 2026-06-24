import cron from 'node-cron'

export function startPoller() {
  if (process.env.NODE_ENV === 'development') return

  cron.schedule('* * * * *', async () => {
    // fetch live departures from Trafiklab → write delay records to Supabase
  })
}
