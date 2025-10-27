import { createBrowserClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Legacy export for backward compatibility
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create the legacy client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
  : null as any;