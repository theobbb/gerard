<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let { onclose, children }: { onclose: () => void; class?: string; children: Snippet } = $props();

	function init(el: HTMLDialogElement) {
		el.showModal();
	}
</script>

<dialog class="m-auto" use:init closedby="any" {onclose}>
	<div>
		{@render children()}
	</div>
</dialog>

<!-- <div class="border border-text! bg-bg px-4.5 py-3 text-text">
		<div class="text-right">
			<button onclick={onclose} class="mb-16 font-serif uppercase italic">X</button>
		</div>
		<div>{@render children()}</div>
	</div> -->

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
		/* background-color: rgb(from var(--color-text) r g b / 80%); */
	}
</style>
