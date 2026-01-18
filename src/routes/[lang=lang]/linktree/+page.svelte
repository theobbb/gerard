<script>
	import { page } from '$app/state';
	import { links } from '$lib/static';
	import IconArrowRightThin from '$lib/ui/icons/icon-arrow-right-thin.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';

	const lang = $derived(page.params.lang);
	const filtered_links = [...links].filter(
		(l) => l != 'divider' && !l.href.en.startsWith('/linktree')
	);

	const from_url = $derived(page.url.searchParams.get('from'));
</script>

{#if from_url}
	<div class="mx-gap-x my-gap-y text-xl">
		<a class="link-hover" href={from_url}>Retour au site</a>
	</div>
{:else}
	<br />
{/if}
<div class="mx-auto my-24 max-w-md space-y-gap-y px-gap-x text-xl whitespace-nowrap">
	<div class="mb-gap-y flex justify-between font-serif">
		<div class=" underline">Gérard DuBois</div>
		<div>(linktree)</div>
	</div>

	<div>
		<a class=" block border px-gap py-gap-y hover:bg-black/10 hover:text-black" href="/{lang}">
			<div class="flex items-center justify-between gap-gap font-serif">
				<div>Site web</div>
				<div>
					<IconArrowRightThin />
				</div>
			</div>
			<div class="flex flex-wrap gap-x-5">
				{#each filtered_links as link}
					<a class="link-hover" href="/{lang}{link.href[lang] || link.href.en}">
						{link.name[lang] || link.name.en}
					</a>
				{/each}
			</div>
		</a>
	</div>
	<div class="mb-1">
		<div class="mt-12 text-right font-serif underline-offset-4">...(shop)</div>
		<div class=" -ml-px">
			{#if page.params.lang == 'en'}
				Prints
			{:else}
				Imprimés
			{/if}
		</div>
	</div>

	<a
		class="mb-gap-y block border px-gap py-gap-y font-serif italic hover:bg-black/10 hover:text-black"
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
		class="col-start-4 block border px-gap py-gap-y font-serif italic hover:bg-black/10 lg:col-span-5 lg:col-start-2"
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

	<div class="mt-6 mb-1 -ml-px">
		{#if page.params.lang == 'en'}
			For special inquiry, contact me
		{:else}
			Pour toute demande spéciale, contactez moi
		{/if}
	</div>
	<a
		class="block w-full border px-gap py-gap-y font-serif hover:bg-black/10"
		href="/{page.params.lang}/contact"
	>
		<div class="flex items-center justify-between gap-gap">
			<div>Contact</div>
			<div class="">
				<IconArrowRightThin />
			</div>
		</div>
	</a>

	<div class="mb-1">
		<div class="mt-12 text-right font-serif underline-offset-4">...(réseaux)</div>
		<div class=" -ml-px">
			{#if page.params.lang == 'en'}
				Prints
			{:else}
				Imprimés
			{/if}
		</div>
	</div>
	<a
		class="block w-full border px-gap py-gap-y font-serif hover:bg-black/10"
		href="/{page.params.lang}/contact"
	>
		<div class="flex items-center justify-between gap-gap">
			Email
			<IconLink />
		</div>
	</a>
	<a
		class="block w-full border px-gap py-gap-y font-serif hover:bg-black/10"
		href="/{page.params.lang}/contact"
	>
		<div class="flex items-center justify-between gap-gap">
			Instagram
			<IconLink />
		</div>
	</a>
	<a
		class="block w-full border px-gap py-gap-y font-serif hover:bg-black/10"
		href="/{page.params.lang}/contact"
	>
		<div class="flex items-center justify-between gap-gap">
			Facebook
			<IconLink />
		</div>
	</a>
</div>
