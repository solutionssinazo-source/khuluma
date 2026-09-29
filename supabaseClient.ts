import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings (Project Settings > API).
// Set them as environment variables in Vercel — never hardcode the service key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
