<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		zoom,
		single_view,
		children,
		...props
	}: HTMLAttributes<any> & { zoom: Number; single_view: boolean; children: Snippet } = $props();
</script>

<div
	{...props}
	class={[
		' grid scroll-mt-gap-y gap-gap select-none',
		single_view
			? 'w-12 grid-cols-1 lg:w-xs lg:grid-cols-4 2xl:w-md 2xl:grid-cols-6'
			: zoom == 0
				? 'grid-cols-6 lg:grid-cols-12'
				: zoom == 1
					? 'grid-cols-4 lg:grid-cols-7'
					: zoom == 2
						? 'grid-cols-2 lg:grid-cols-4'
						: zoom == 3
							? 'grid-cols-1 lg:grid-cols-2'
							: ''
	]}
>
	{@render children()}
</div>
