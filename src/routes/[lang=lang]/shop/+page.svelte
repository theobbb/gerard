<script>
	import { page } from '$app/state';

	import IconArrowLeftUp from '$lib/ui/icons/icon-arrow-left-up.svelte';
	import IconArrowRightThin from '$lib/ui/icons/icon-arrow-right-thin.svelte';
	import IconArrowRight from '$lib/ui/icons/icon-arrow-right.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
</script>

<div class="grid-12">
	<div class="text-2- text-xl lg:col-span-full lg:col-start-2">
		{#if page.params.lang == 'en'}
			Prints
		{:else}
			Imprimés
		{/if}
	</div>
	<a
		class=" border px-gap py-gap-y font-serif italic hover:bg-black/15 hover:text-black lg:col-span-5 lg:col-start-2"
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
		class="col-start-4 border px-gap py-gap-y font-serif italic hover:bg-black/15 lg:col-span-5 lg:col-start-2"
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
	<div class="text-2- mt-12 text-xl lg:col-span-full lg:col-start-2">
		For special inquiry, please contact me
	</div>

	<a
		class="border px-gap py-gap-y font-serif hover:bg-black/15 lg:col-span-5 lg:col-start-2"
		href="/{page.params.lang}/contact"
	>
		<div class="flex items-center justify-between gap-gap">
			<div>Contact</div>
			<div class="">
				<IconArrowRightThin />
			</div>
		</div>
	</a>
</div>
