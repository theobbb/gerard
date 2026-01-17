<script>
	let { src, alt = '', class: cx = '' } = $props();

	let loaded = $state(false);
	let error = $state(false);

	function handleLoad() {
		loaded = true;
	}

	function handleError() {
		error = true;
	}
</script>

<div class={cx}>
	{#if !loaded && !error}
		<div class="placeholder" aria-hidden="true">
			<div class="shimmer"></div>
		</div>
	{/if}

	{#if error}
		<div class="error-state">
			<span>Failed to load image</span>
		</div>
	{:else}
		<img {src} {alt} onload={handleLoad} onerror={handleError} />
	{/if}
</div>
