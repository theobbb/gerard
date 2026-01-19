<script>
	import IconZoomIn from '$lib/ui/icons/icon-zoom-in.svelte';
	import IconZoomOut from '$lib/ui/icons/icon-zoom-out.svelte';

	let { zoom = $bindable() } = $props();

	const MAX_ZOOM = 3;

	function zoom_in() {
		zoom = Math.min(zoom + 1, MAX_ZOOM);
	}
	function zoom_out() {
		zoom = Math.max(zoom - 1, 0);
	}
</script>

<div class="mb-gap-y flex items-center gap-2 bg-bg text-3xl">
	<button
		class="flex aspect-square items-center justify-center not-disabled:cursor-pointer disabled:opacity-20"
		disabled={zoom == 0}
		onclick={zoom_out}
	>
		<IconZoomOut />
	</button>
	<button
		class="flex aspect-square items-center justify-center not-disabled:cursor-pointer disabled:opacity-20"
		disabled={zoom == MAX_ZOOM}
		onclick={zoom_in}
	>
		<IconZoomIn />
	</button>
</div>
