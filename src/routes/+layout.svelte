<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initAuth } from '$lib/stores/auth';

	let { children } = $props();

	onMount(async () => {
		// Initialize authentication
		await initAuth();
	});
</script>

<div class="min-h-screen bg-gray-50">
	{@render children()}
</div>
