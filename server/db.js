import { createClient } from '@supabase/supabase-js'

export default process.env.SUPABASE_URL?.startsWith('http')
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null
