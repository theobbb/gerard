<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		src,
		alt = '',
		class: cx = '',
		aspect_ratio
	}: HTMLImgAttributes & { aspect_ratio: number } = $props();

	let loaded = $state(false);
	let error = $state(false);

	function onload() {
		loaded = true;
		console.log('loaded');
	}

	function handleError() {
		error = true;
	}

	function sync_check(node: HTMLImageElement) {
		// If the image is already in cache, 'complete' will be true immediately
		if (node.complete && node.naturalWidth !== 0) {
			loaded = true;
		}
	}
</script>

<div style="aspect-ratio: {aspect_ratio};" class={['relative overflow-hidden', { cx }]}>
	{#if !loaded && !error}
		<div class="h-full w-full animate-pulse bg-neutral-300" aria-hidden="true"></div>
	{/if}
	<img {src} {alt} {onload} onerror={handleError} use:sync_check />
</div>
