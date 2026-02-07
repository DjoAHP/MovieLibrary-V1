import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // ton URL Supabase
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // ta clé anon public

export const supabase = createClient(supabaseUrl, supabaseKey);
