import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // Get the session from the cookie
  const accessToken = cookies.get('sb-access-token');
  const refreshToken = cookies.get('sb-refresh-token');
  
  if (!accessToken || !refreshToken) {
    throw redirect(303, '/');
  }
  
  // Validate the session
  const { data, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !data.user) {
    // Clear cookies and redirect
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
    throw redirect(303, '/');
  }
  
  return {
    user: data.user
  };
}; 