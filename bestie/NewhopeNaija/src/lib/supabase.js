import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vsxjimwaugkrqbjeimhw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeGppbXdhdWdrcnFiamVpbWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDE2ODIsImV4cCI6MjA4OTgxNzY4Mn0._69x1nQEgtyQrzB8ZzVo4VYquGTRVoLSN2hmkAj32po';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
