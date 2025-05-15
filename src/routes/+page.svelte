<script lang="ts">
  import Auth from '$lib/components/Auth.svelte';
</script>

<div class="container mx-auto px-4 py-12">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        SvelteKit + Supabase Template
      </h1>
      <p class="text-lg text-gray-500">
        A starter template with authentication using SvelteKit, Supabase, and Tailwind CSS.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">About This Template</h2>
        <p class="mb-4">This template includes:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>SvelteKit for frontend and routing</li>
          <li>Supabase for authentication and database</li>
          <li>Tailwind CSS for styling</li>
          <li>Social authentication with GitHub and Google</li>
          <li>Type-safe environment variables</li>
        </ul>
      </div>
      
      <div class="p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">Authentication</h2>
        <Auth />
      </div>
    </div>
    
    <div class="mt-12 text-center">
      <p class="text-sm text-gray-500">
        Visit <a href="https://kit.svelte.dev/" class="text-blue-600 hover:underline">kit.svelte.dev</a> 
        and <a href="https://supabase.com/" class="text-blue-600 hover:underline">supabase.com</a> 
        to learn more about these technologies.
      </p>
    </div>
  </div>
</div>
