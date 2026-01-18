<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';

	import Header from './header.svelte';

	let { children } = $props();
</script>

<Header />

<div class="px-gap py-gap-y text-xl max-lg:mt-10 lg:ml-56">
	{@render children()}
</div>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>
