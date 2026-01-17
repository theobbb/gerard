<script>
	import { page } from '$app/state';

	import IconArrowLeftUp from '$lib/ui/icons/icon-arrow-left-up.svelte';
	import IconArrowRightThin from '$lib/ui/icons/icon-arrow-right-thin.svelte';
	import IconArrowRight from '$lib/ui/icons/icon-arrow-right.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
</script>

<div class="text-2 mb-2 text-xl">
	{#if page.params.lang == 'en'}
		Prints
	{:else}
		Imprimés
	{/if}
</div>
<div class="grid-12">
	<a
		class="row-start-1 border px-gap py-gap-y font-serif italic lg:col-span-4"
		href="https://surtonmur.com/collections/gerard-dubois"
		target="_blank"
	>
		<div class="flex items-center justify-between gap-gap">
			<div>Sur ton mur</div>
			<div>
				<IconLink />
			</div>
		</div>
	</a>
	<a
		class="row-start-2 border px-gap py-gap-y font-serif italic lg:col-span-4"
		href="https://blackdragonpress.co.uk/collections/gerard-dubois"
		target="_blank"
	>
		<div class="flex items-center justify-between gap-gap">
			<div>Black Dragon Press</div>
			<div class="rotate-">
				<IconLink />
			</div>
		</div>
	</a>
</div>
<div class="text-2 mt-12 mb-2 text-xl">For special inquiry, please contact me</div>
<div class="grid-12">
	<a class="border px-gap py-gap-y font-serif lg:col-span-4" href="/{page.params.lang}/contact">
		<div class="flex items-center justify-between gap-gap">
			<div>Contact</div>
			<div class="">
				<IconArrowRightThin />
			</div>
		</div>
	</a>
</div>
