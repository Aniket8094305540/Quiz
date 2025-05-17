import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These would typically be environment variables
// For the demo, we'll use placeholders that will be replaced when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Function to save quiz results
export async function saveQuizResult(vibeType: string, sessionId: string) {
  const { error } = await supabase
    .from('quiz_results')
    .insert({ vibe_type: vibeType, session_id: sessionId });
  
  if (error) {
    console.error('Error saving quiz result:', error);
  }
}

// Function to get vibe statistics
export async function getVibeStats() {
  const { data, error } = await supabase
    .from('vibe_stats')
    .select('*')
    .order('count', { ascending: false });
  
  if (error) {
    console.error('Error fetching vibe stats:', error);
    return [];
  }
  
  return data || [];
}

// Function to subscribe to real-time updates
export function subscribeToVibeStats(callback: (payload: any) => void) {
  return supabase
    .channel('vibe_stats_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'vibe_stats' }, 
      callback
    )
    .subscribe();
}