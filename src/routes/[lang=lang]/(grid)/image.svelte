<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		id,
		image,
		alt = '',
		class: cx = '',
		aspect_ratio
	}: { id: string; image: string; aspect_ratio: number } & HTMLImgAttributes = $props();

	let loaded = $state(false);
	let width = $state(200); // Default starting width

	const baseUrl = `https://api.gerard.3xw.ca/api/files/items/${id}/${image}`;

	// 1. Define the available sizes in PocketBase
	const srcset = `
        ${baseUrl}?thumb=200x200f 150w,
        ${baseUrl}?thumb=400x400f 300w,
        ${baseUrl}?thumb=800x800f 600w,
        ${baseUrl}?thumb=1200x1200f 800w
    `;

	// 2. Measure the actual element width to tell the browser what to pick
	function measure_width(node: HTMLElement) {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				// Update width; 'sizes' will react, and browser will pick new src
				width = Math.ceil(entry.contentRect.width);
			}
		});
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	function onload() {
		loaded = true;
	}

	function sync_check(node: HTMLImageElement) {
		if (node.complete && node.naturalWidth !== 0) loaded = true;
	}
</script>

<div
	use:measure_width
	style="aspect-ratio: {aspect_ratio}; max-width: 1000px;"
	class={['relative max-h-full max-w-full overflow-hidden ', cx]}
>
	<img
		class={['absolute inset-0 h-full w-full object-cover', loaded ? 'opacity-100' : 'opacity-0']}
		{srcset}
		sizes="{width}px"
		{alt}
		{onload}
		use:sync_check
		loading="lazy"
	/>
	<div
		class={[
			'absolute inset-0 bg-neutral-300',
			loaded ? 'opacity-0' : 'opacity-100',
			'transition duration-200'
		]}
	></div>
</div>
