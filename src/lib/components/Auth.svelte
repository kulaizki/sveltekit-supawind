<script lang="ts">
  import { user, signOut, signInWithProvider } from '$lib/stores/auth';

  const handleLogin = async (provider: 'google' | 'github' | 'discord') => {
    await signInWithProvider(provider);
  };

  const handleLogout = async () => {
    await signOut();
  };
</script>

<div class="p-4 rounded-lg border border-gray-200 shadow-sm">
  {#if $user}
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        {#if $user.user_metadata?.avatar_url}
          <img 
            src={$user.user_metadata.avatar_url} 
            alt="User avatar" 
            class="w-10 h-10 rounded-full"
          />
        {:else}
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {$user.email?.[0].toUpperCase() || 'U'}
          </div>
        {/if}
        <div>
          <p class="font-medium">{$user.user_metadata?.full_name || $user.email}</p>
          <p class="text-sm text-gray-500">{$user.email}</p>
        </div>
      </div>
      <button 
        on:click={handleLogout}
        class="w-full py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
      >
        Sign out
      </button>
    </div>
  {:else}
    <div class="space-y-3">
      <h3 class="text-lg font-medium">Sign in</h3>
      <div class="space-y-2">
        <button 
          on:click={() => handleLogin('github')}
          class="w-full py-2 px-4 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
          </svg>
          Sign in with GitHub
        </button>
        <button 
          on:click={() => handleLogin('google')}
          class="w-full py-2 px-4 flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  {/if}
</div> 