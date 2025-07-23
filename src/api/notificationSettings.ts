import { supabase } from '../supabaseClient';

export async function getNotificationSettings(user_id: string) {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function updateNotificationSettings(user_id: string, updates: any) {
  const { data, error } = await supabase
    .from('notification_settings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', user_id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function createNotificationSettings(user_id: string, settings: any) {
  const { data, error } = await supabase
    .from('notification_settings')
    .insert([{ user_id, ...settings }])
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
} 