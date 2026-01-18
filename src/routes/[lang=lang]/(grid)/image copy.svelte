<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		src,
		alt = '',
		class: cx = '',
		aspect_ratio
	}: HTMLImgAttributes & { aspect_ratio: number } = $props();

	let loaded = $state(false);
	let last_src = $state(src);

	// When the src prop changes (zoom change), we mark it as not loaded,
	// but we don't clear the previous_src until the NEW one is fully ready.
	$effect(() => {
		if (src !== last_src) {
			loaded = false;
		}
	});

	function onload() {
		loaded = true;
		last_src = src;
	}

	function sync_check(node: HTMLImageElement) {
		// If the image is already in cache, 'complete' will be true immediately
		if (node.complete && node.naturalWidth !== 0) {
			loaded = true;
		}
	}
</script>

<div
	style="aspect-ratio: {aspect_ratio};"
	class={['relative w-full overflow-hidden bg-neutral-300', { cx }]}
>
	<img class="absolute inset-0 h-full w-full object-cover" {src} {alt} {onload} use:sync_check />

	<div
		class={[
			'animate-pulse- absolute inset-0 h-full w-full bg-neutral-300',
			loaded && 'opacity-0',
			'transition duration-200 ease-in'
		]}
		aria-hidden="true"
	></div>
</div>
