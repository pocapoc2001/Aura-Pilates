import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Check if the URL is at least valid format (starts with http) to avoid obscure fetch errors
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-url.supabase.co';
const cleanUrl = finalUrl.replace(/\/rest\/v1\/?$/, '');

export const supabase = createClient(cleanUrl, supabaseAnonKey);
