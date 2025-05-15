import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Create a Supabase client for each request
  event.locals.supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Get access token from cookies
  const accessToken = event.cookies.get('sb-access-token');
  const refreshToken = event.cookies.get('sb-refresh-token');

  if (accessToken && refreshToken) {
    // If we have a token in the cookies, let's get the user
    const { error } = await event.locals.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    // If there's an error, clear the cookies
    if (error) {
      event.cookies.delete('sb-access-token', { path: '/' });
      event.cookies.delete('sb-refresh-token', { path: '/' });
    }
  }

  // Expose session getter to routes
  event.locals.getSession = async () => {
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event);
}; 