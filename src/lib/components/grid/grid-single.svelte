<script lang="ts">
	import type { CollectionRecords, FolioImagesRecord } from '$lib/pocketbase.types';
	import IconArrowLeftUp from '$lib/ui/icons/icon-arrow-left-up.svelte';
	import IconArrowLeft from '$lib/ui/icons/icon-arrow-left.svelte';
	import IconArrowRight from '$lib/ui/icons/icon-arrow-right.svelte';

	import type { HTMLAttributes } from 'svelte/elements';
	import Image from './image.svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	const {
		current_item,

		collection_id,
		item_length,
		route = '',
		children
	}: HTMLAttributes<any> & {
		current_item: any;
		collection_id: string;
		item_length: number;
		route?: string;
		children: Snippet;
	} = $props();
	const lang = $derived(page.params.lang);
	const base_route = $derived(lang + route);
</script>

{#if current_item}
	<div
		class={[
			'fixed top-[calc(6*var(--spacing-gap-y))] right-gap-x bottom-gap-y flex items-center justify-center  max-lg:right-gap-x max-lg:left-24',
			'lg:top-gap-y  lg:w-[calc(100%-4*var(--spacing-gap-x)-var(--spacing-drawer)-var(--container-xs))]',
			'2xl:w-[calc(100%-6*var(--spacing-gap-x)-var(--spacing-drawer)-var(--container-md))]'
		]}
	>
		<div class="grid h-full w-full grid-rows-[auto_1fr_auto] gap-y-gap-y whitespace-nowrap">
			<div class="-mx-1 flex flex-wrap justify-between gap-gap">
				<a class="text-2xl" href="/{base_route}" data-sveltekit-keepfocus data-sveltekit-noscroll>
					<IconArrowLeftUp />
				</a>

				<div class="flex items-center gap-gap">
					<div>
						<div>{current_item.index + 1} / {item_length}</div>
					</div>
					<a
						class="text-2xl"
						href="/{base_route}/{current_item.previous}"
						data-sveltekit-keepfocus
						data-sveltekit-noscroll
					>
						<IconArrowLeft />
					</a>
					<a
						class="text-2xl"
						href="/{base_route}/{current_item.next}"
						data-sveltekit-keepfocus
						data-sveltekit-noscroll
					>
						<IconArrowRight />
					</a>
				</div>
			</div>
			<div class="relative h-full">
				<div class="absolute inset-0">
					{#key current_item.id}
						<Image
							id={current_item.id}
							image={current_item.image}
							alt={current_item.title}
							aspect_ratio={current_item.aspect_ratio || 1}
							{collection_id}
						/>
					{/key}
					<!-- <img
						class="max-h-full max-w-full object-contain"
						src="https://api.gerard.3xw.ca/api/files/items/{current_item.id}/{current_item.image}"
						alt="{current_item.title}-lg"
					/> -->
				</div>
			</div>
			<div class="flex justify-between gap-gap text-sm/4.5">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
