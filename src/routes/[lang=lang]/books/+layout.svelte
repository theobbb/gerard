<script lang="ts">
	import { page } from '$app/state';
	import type { BookViewRecord } from '$lib/pocketbase.types';
	import Grid from './grid.svelte';

	const { data, children } = $props();

	const lang = $derived(page.params.lang);
</script>

<div>
	{@render children?.()}
</div>
<Grid
	books={data.books}
	collection="book_images"
	collection_id="pbc_2170393721"
	route={lang == 'en' ? '/books' : '/livres'}
/>
