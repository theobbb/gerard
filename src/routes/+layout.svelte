<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';

	import Header from './header.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

{#if page.route.id == '/[lang=lang]/linktree'}
	{@render children()}
{:else}
	<Header />

	<div class="px-gap py-gap-y text-xl max-lg:mt-10 lg:ml-drawer">
		{@render children()}
	</div>
{/if}
<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>
