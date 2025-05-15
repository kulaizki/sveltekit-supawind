<script lang="ts">
  import { user } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let profile: any = null;
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    // Check if user is authenticated
    if (!$user) {
      goto('/');
      return;
    }

    try {
      // Fetch the user's profile from Supabase
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', $user.id)
        .single();

      if (profileError) throw profileError;
      profile = data;
    } catch (e: any) {
      error = e.message || 'Failed to load profile';
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Protected Page</h1>

    {#if isLoading}
      <div class="p-6 bg-white rounded-lg shadow">
        <p>Loading your profile...</p>
      </div>
    {:else if error}
      <div class="p-6 bg-white rounded-lg shadow border-l-4 border-red-500">
        <h2 class="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p>{error}</p>
        <p class="mt-4 text-sm text-gray-500">
          Note: You need to create a 'profiles' table in Supabase with the appropriate schema.
        </p>
      </div>
    {:else if profile}
      <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">Your Profile</h2>
        <div class="space-y-2">
          <p><span class="font-medium">Username:</span> {profile.username || 'Not set'}</p>
          <p><span class="font-medium">Bio:</span> {profile.bio || 'No bio yet'}</p>
          <p><span class="font-medium">Created at:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    {/if}

    <div class="mt-6">
      <a href="/" class="text-blue-600 hover:underline">← Back to home</a>
    </div>
  </div>
</div> 