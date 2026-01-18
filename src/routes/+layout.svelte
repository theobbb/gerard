<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';

	import { page } from '$app/state';
	// import Grid from './[lang=lang]/grid.svelte';
	import Header from './header.svelte';

	let { data, children } = $props();
</script>

<Header />

<div class="px-gap py-gap-y text-xl max-lg:mt-10 lg:ml-56">
	{@render children()}
	<!-- {#if page.route.id == '/[lang=lang]' || page.route.id == '/[lang=lang]/[id]'}
		<Grid pagination={data.pagination} />
	{/if} -->
</div>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>
