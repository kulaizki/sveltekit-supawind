import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

export const user = writable<User | null>(null);

// Initialize the auth state
export const initAuth = async () => {
  // Set initial user state
  const { data } = await supabase.auth.getSession();
  user.set(data.session?.user || null);

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user || null);
  });
};

// Sign in with email/password
export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

// Sign in with a third-party provider
export const signInWithProvider = async (provider: 'google' | 'github' | 'discord') => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${import.meta.env.PUBLIC_SITE_URL}/auth/callback`
    }
  });
};

// Sign up with email/password
export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: `${import.meta.env.PUBLIC_SITE_URL}/auth/callback`
    }
  });
};

// Sign out
export const signOut = async () => {
  return await supabase.auth.signOut();
}; 