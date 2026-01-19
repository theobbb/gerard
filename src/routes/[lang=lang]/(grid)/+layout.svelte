<script lang="ts">
	import Grid from './grid.svelte';

	const { data, children } = $props();
</script>

<div>
	{@render children?.()}
</div>
<Grid pagination={data.pagination} collection="folio_images" collection_id="pbc_710432678" folio />
