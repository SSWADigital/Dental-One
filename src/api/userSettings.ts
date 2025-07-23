import { supabase } from '../supabaseClient';

export interface UserSettings {
  user_id: string;
  currency: string;
  language: string;
  theme: string;
  notification_email: boolean;
  notification_push: boolean;
  timezone?: string;
  date_format?: string;
  [key: string]: any;
}

// Get user settings by user_id
export async function getUserSettings(user_id: string) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Update user settings (all fields)
export async function updateUserSettings(user_id: string, updates: Partial<UserSettings>) {
  const { data, error } = await supabase
    .from('user_settings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', user_id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Create user settings (all fields)
export async function createUserSettings(user_id: string, settings: Partial<UserSettings>) {
  const { data, error } = await supabase
    .from('user_settings')
    .insert([{ user_id, ...settings }])
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
} 