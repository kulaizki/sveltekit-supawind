<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  onMount(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      // Get the auth callback parameters from the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);

      // If we have an access token, set the session
      if (hashParams.get('access_token')) {
        await supabase.auth.setSession({
          access_token: hashParams.get('access_token') || '',
          refresh_token: hashParams.get('refresh_token') || ''
        });
      } else if (queryParams.get('error')) {
        // Handle errors
        console.error('Auth error:', queryParams.get('error_description'));
      }

      // Redirect to the home page or another protected route
      goto('/');
    };

    handleAuthCallback();
  });
</script>

<div class="flex h-screen items-center justify-center">
  <div class="text-center">
    <h2 class="text-2xl font-bold">Completing login...</h2>
    <p>You will be redirected shortly.</p>
  </div>
</div> 