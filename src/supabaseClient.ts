import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etqpknqdtlnysdvlmrin.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cXBrbnFkdGxueXNkdmxtcmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzI2MjksImV4cCI6MjA2ODY0ODYyOX0.Zx6xS-TLXe2IV0nfxNBsOFUwNTWC57SsdSLWpBvA4As';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 