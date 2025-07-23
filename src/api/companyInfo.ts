import { supabase } from '../supabaseClient';

export async function getCompanyInfo(user_id: string) {
  const { data, error } = await supabase
    .from('company_info')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function updateCompanyInfo(user_id: string, updates: any) {
  const { data, error } = await supabase
    .from('company_info')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', user_id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function createCompanyInfo(user_id: string, info: any) {
  const { data, error } = await supabase
    .from('company_info')
    .insert([{ user_id, ...info }])
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
} 