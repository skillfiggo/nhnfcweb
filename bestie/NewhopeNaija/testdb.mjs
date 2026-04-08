import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false }).limit(5);
  console.log("GALLERY_PHOTOS:");
  console.log(data);
  const { data: st, error: stErr } = await supabase.storage.from('gallery-images').list();
  console.log("STORAGE:");
  console.log(st);
}

run();
