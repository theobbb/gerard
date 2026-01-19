<script lang="ts">
	import { page } from '$app/state';
	import GridContainer from '$lib/components/grid/grid-container.svelte';
	import GridSingle from '$lib/components/grid/grid-single.svelte';
	import Image from '$lib/components/grid/image.svelte';
	import Zoom from '$lib/components/grid/zoom.svelte';
	import type { BookImagesRecord, CollectionRecords } from '$lib/pocketbase.types';

	import type { BookView } from './types';

	const {
		books,
		collection,
		collection_id,
		route = '',
		folio = false
	}: {
		books: BookView[];
		collection: keyof CollectionRecords;
		collection_id: string;
		route?: string;
		folio?: boolean;
	} = $props();

	const lang = $derived(page.params.lang);
	const base_route = $derived(lang + route);

	const flat_items: BookImagesRecord[] = books.flatMap((book) => book.images);

	type Item = BookImagesRecord & {
		index: number;
		previous: string | null;
		next: string | null;
	};

	const items_map: Map<string, Item> = new Map();

	map_items(flat_items);
	function map_items(items: BookImagesRecord[]) {
		const base_index = items_map.size;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const previous = items[i - 1]?.id;
			const next = items[i + 1]?.id;
			items_map.set(item.id, { ...item, index: i + base_index, previous, next });
		}
	}

	const current_item = $derived(page.params.id ? items_map.get(page.params.id) : null);

	let zoom = $state(1);
</script>

{#if !current_item}
	<Zoom bind:zoom />
{/if}

<div
	class={[
		'grid grid-cols-1 gap-y-gap-y',
		current_item ? '' : 'lg:grid-cols-[1fr_var(--spacing-drawer)]'
	]}
>
	{#each books as book, book_i}
		<GridContainer
			id={book.id}
			{zoom}
			single_view={current_item != null && current_item != undefined}
		>
			{#each book.images as { title, id, image, aspect_ratio }, i}
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
			{/each}
		</GridContainer>
		{#if !current_item}
			<div
				class="relative text-sm/4.5 text-balance whitespace-nowrap max-lg:top-0! max-lg:-mt-2 max-lg:mb-gap-y lg:sticky lg:text-right"
				style="top: calc(var(--spacing-gap-y) + {book_i * 1.1}rem);"
			>
				<a
					class="link-hover relative block max-w-full text-ellipsis lg:overflow-hidden"
					href="#{book.id}"
					>{book.title}
				</a>
			</div>
		{/if}
	{/each}
	<div class="h-100"></div>
</div>

<GridSingle {current_item} {collection_id} {route} item_length={flat_items.length}>
	{#if current_item}
		<div>
			{current_item.id}
		</div>
	{/if}
</GridSingle>

<!-- {#if current_item}
	<div
		class="pointer-events-none- lg:left-[calc(100vw-56rem)]- fixed top-gap-y right-gap-x bottom-gap-y flex items-center justify-center max-lg:right-gap-x max-lg:left-24 lg:w-[calc(100%-6*var(--spacing-gap-x)-var(--spacing-drawer)-var(--container-md))]"
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

				</div>
			</div>
			<div class="flex justify-between gap-gap text-sm/4.5">
				<div class="truncate">{current_item.title}</div>
			</div>
		</div>
	</div>
{/if} -->
