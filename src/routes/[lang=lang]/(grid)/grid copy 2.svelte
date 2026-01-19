<script module>
	export type ImageRecord = FolioImagesRecord | BookImagesRecord;
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { pocketbase } from '$lib/pocketbase';
	import type {
		BookImagesRecord,
		CollectionRecords,
		FolioImagesRecord
	} from '$lib/pocketbase.types';

	import type { PaginationResult } from '$lib/types';
	import IconArrowLeftUp from '$lib/ui/icons/icon-arrow-left-up.svelte';
	import IconArrowLeft from '$lib/ui/icons/icon-arrow-left.svelte';
	import IconArrowRight from '$lib/ui/icons/icon-arrow-right.svelte';
	import IconZoomIn from '$lib/ui/icons/icon-zoom-in.svelte';
	import IconZoomOut from '$lib/ui/icons/icon-zoom-out.svelte';
	import Image from './image.svelte';

	const {
		pagination,
		collection,
		collection_id,
		route = '',
		folio = false
	}: {
		pagination: PaginationResult<ImageRecord>;
		collection: keyof CollectionRecords;
		collection_id: string;
		route?: string;
		folio?: boolean;
	} = $props();

	const lang = $derived(page.params.lang);
	const base_route = $derived(lang + route);

	const items: ImageRecord[] = $state(pagination.items);

	type Item = ImageRecord & {
		index: number;
		previous: string | null;
		next: string | null;
	};

	const items_map: Map<string, Item> = new Map();

	map_items(items);
	function map_items(items: ImageRecord[]) {
		const base_index = items_map.size;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const previous = items[i - 1]?.id;
			const next = items[i + 1]?.id;
			items_map.set(item.id, { ...item, index: i + base_index, previous, next });
		}
	}

	const current_item = $derived(page.params.id ? items_map.get(page.params.id) : null);

	let current_page = $state(pagination.page);

	async function load_more() {
		if (current_page == pagination.totalPages) return;

		const new_pagination: PaginationResult<ImageRecord> = await pocketbase
			.collection(collection)
			.getList(current_page + 1, pagination.perPage, {
				fields: 'id,title,image,aspect_ratio',
				sort: 'sort_order'
			});

		items.push(...new_pagination.items);
		map_items(new_pagination.items);
		current_page++;
	}

	let zoom = $state(0);
	const MAX_ZOOM = 3;

	function zoom_in() {
		zoom = Math.min(zoom + 1, MAX_ZOOM);
	}
	function zoom_out() {
		zoom = Math.max(zoom - 1, 0);
	}
</script>

<div class={['mb-gap-y flex items-center gap-2 bg-bg text-3xl', current_item && 'hidden']}>
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
<div
	class={[
		'opacity-20- blur-sm- grid gap-gap select-none',
		current_item
			? 'w-12 grid-cols-1 lg:w-md lg:grid-cols-6'
			: zoom == 0
				? 'grid-cols-6 lg:grid-cols-12'
				: zoom == 1
					? 'grid-cols-4 lg:grid-cols-8'
					: zoom == 2
						? 'grid-cols-2 lg:grid-cols-4'
						: zoom == 3
							? 'grid-cols-1 lg:grid-cols-2'
							: ''
	]}
>
	{#each items as { title, id, image, aspect_ratio }, i}
		<a
			class={[
				'hover:opacity-100',
				current_item && current_item.id != id
					? ' opacity-30 '
					: 'transition delay-100 duration-200',
				''
			]}
			href="/{base_route}/{id}"
			data-sveltekit-keepfocus
			data-sveltekit-noscroll
		>
			<Image {id} {image} alt={title} aspect_ratio={aspect_ratio || 1} {collection_id} />
		</a>

		{#if folio}
			{#if i % 11 == 0 || i % 5 == 0}
				<div class=""></div>
			{/if}
		{/if}
	{/each}
</div>
{#if current_page < pagination.totalPages}
	<button class="link-hover mt-36 cursor-pointer" onclick={load_more}>
		Load more <span class="inline-flex translate-y-px">+</span>
	</button>
{/if}

{#if current_item}
	<div
		class="pointer-events-none- fixed top-gap-y right-gap-x bottom-gap-y left-24 flex items-center justify-center max-lg:right-gap-x lg:left-[calc(100vw-56rem)]"
	>
		<div class="grid h-full w-full grid-rows-[auto_1fr_auto] gap-y-gap-y">
			<div class="flex justify-between gap-gap">
				<a class="text-3xl" href="/{base_route}" data-sveltekit-keepfocus data-sveltekit-noscroll>
					<IconArrowLeftUp />
				</a>

				<div class="flex items-center gap-gap">
					<div>
						<div>{current_item.index + 1} / {items.length}</div>
					</div>
					<a
						class="text-3xl"
						href="/{base_route}/{current_item.previous}"
						data-sveltekit-keepfocus
						data-sveltekit-noscroll
					>
						<IconArrowLeft />
					</a>
					<a
						class="text-3xl"
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
				<div class="truncate">{current_item.title}</div>
			</div>
		</div>
	</div>
{/if}
<!-- 
{#if current_item}
	<div
		class="bg-amber-200- pointer-events-none fixed inset-12 left-24 flex items-center justify-center max-lg:right-gap-x lg:left-[calc(100vw-56rem)]"
	>
		<img
			class="max-h-full max-w-full object-contain"
			src="https://api.gerard.3xw.ca/api/files/items/{current_item.id}/{current_item.image}"
			alt="{current_item.title}-lg"
		/>
	</div>
	<div class="fixed top-2.5 right-gap left-22 text-3xl max-lg:top-12 lg:left-200">
		<div class="flex justify-between gap-gap">
			<a class="text-3xl" href="/{lang}" data-sveltekit-keepfocus data-sveltekit-noscroll>
				<IconArrowLeftUp />
			</a>
			<div class="flex items-center gap-gap">
				<a
					class="text-3xl"
					href="/{lang}/{current_item.previous}"
					data-sveltekit-keepfocus
					data-sveltekit-noscroll
				>
					<IconArrowLeft />
				</a>
				<a
					class="text-3xl"
					href="/{lang}/{current_item.next}"
					data-sveltekit-keepfocus
					data-sveltekit-noscroll
				>
					<IconArrowRight />
				</a>
			</div>
		</div>
	</div>
	<div class="fixed right-gap bottom-3 left-22 whitespace-nowrap lg:left-200">
		<div class="flex justify-between gap-gap">
			<div class="truncate">{current_item.title}</div>
			<div>{current_item.index + 1} / {items.length}</div>
		</div>
	</div>
{/if} -->
<!-- 
{#if current_item}
	<div class="pointer-events-none fixed inset-12 flex items-center justify-center">
		<img
			class="max-h-full max-w-full object-contain"
			src="https://api.gerard.3xw.ca/api/files/items/{current_item.id}/{current_item.image}"
			alt="{current_item.title}-lg"
		/>
	</div>
{/if} -->
