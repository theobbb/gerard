<script>
	const { data } = $props();
</script>

<div>
	{#each data.pagination.items as item}
		<div>{item.title}</div>
	{/each}
</div>
