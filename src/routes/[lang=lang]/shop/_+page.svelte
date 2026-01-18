<script>
	import { page } from '$app/state';

	import IconArrowLeftUp from '$lib/ui/icons/icon-arrow-left-up.svelte';
	import IconArrowRightThin from '$lib/ui/icons/icon-arrow-right-thin.svelte';
	import IconArrowRight from '$lib/ui/icons/icon-arrow-right.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';
</script>

<div class="grid-12">
	<div class=" lg:col-span-5 lg:col-start-6">
		<div class="mb-1 -ml-px">
			{#if page.params.lang == 'en'}
				Prints
			{:else}
				Imprimés
			{/if}
		</div>

		<a
			class="mb-gap-y block border px-gap py-gap-y font-serif italic hover:bg-black/15 hover:text-black"
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
			class="col-start-4 block border px-gap py-gap-y font-serif italic hover:bg-black/15 lg:col-span-5 lg:col-start-2"
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

		<div class="mt-12 mb-1 -ml-px">
			{#if page.params.lang == 'en'}
				For special inquiry, contact me
			{:else}
				Pour toute demande spéciale, contactez moi
			{/if}
		</div>
		<a
			class="block w-full border px-gap py-gap-y font-serif hover:bg-black/15"
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
</div>
