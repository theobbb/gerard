<script lang="ts">
	import { page } from '$app/state';
	import { links as static_links } from '$lib/static';
	import Dialog from '$lib/ui/dialog.svelte';
	import IconArrowRightThin from '$lib/ui/icons/icon-arrow-right-thin.svelte';
	import IconLink from '$lib/ui/icons/icon-link.svelte';

	const lang = $derived(['en', 'fr'].includes(page.params.lang || '') ? page.params.lang : 'en') as
		| 'en'
		| 'fr';

	let menu_mobile_open = $state(false);

	const links = $derived(
		[...static_links].map((link) => {
			if (link == 'divider') return link;
			if (link.href.en.startsWith('/linktree')) {
				link.href.en = `/linktree?from=${encodeURIComponent(page.url.pathname)}`;
			}
			return link;
		})
	);

	const filtered_links = static_links.filter((link) => link != 'divider');

	const active_link = $derived.by(() => {
		const full_route = page.route.id || '';
		if (full_route == '/[lang=lang]/(grid)' || full_route == '/[lang=lang]/(grid)/[id]')
			return filtered_links[0];
		const route = full_route.replace('/[lang=lang]', '');
		return filtered_links.find((link) => link.href.en.includes(route));
	});

	function get_translated(target_lang: 'en' | 'fr') {
		const new_active_link = active_link?.href[target_lang] || active_link?.href.en;
		const path = `/${target_lang}${new_active_link}`;

		return path; // Keep query params if any
	}

	let dialog_shop_open = $state(false);
	function close_dialog_shop() {
		dialog_shop_open = false;
	}
</script>

{#snippet nav()}
	{#each links as link}
		{#if link != 'divider'}
			<li>
				<a
					class={[
						'link-hover max-lg:flex max-lg:w-full',
						active_link?.href == link.href ? '' : 'text-2',
						'hover:bg-black/15-'
					]}
					href="/{page.params.lang}{link.href[lang] || link.href.en}"
				>
					{link.name[lang] || link.name.en}
				</a>
			</li>
		{:else}
			<br />
		{/if}
	{/each}
{/snippet}

<header
	class={[
		'fixed top-0 left-0 z-100 h-svh text-xl max-lg:right-0 lg:w-drawer',
		menu_mobile_open ? 'max-lg:bg-bg' : 'max-lg:pointer-events-none'
	]}
>
	<div class="flex h-full flex-col justify-between px-gap py-gap-y">
		<nav class="">
			<div class="pointer-events-auto flex justify-between gap-gap">
				<a href="/" class={[' whitespace-nowrap']}>Gérard DuBois</a>
				<button
					class="pointer-events-auto -m-3 p-3 lg:hidden"
					onclick={() => (menu_mobile_open = !menu_mobile_open)}
				>
					{#if menu_mobile_open}
						{#if lang == 'en'}
							Close
						{:else}
							Fermer
						{/if}
					{:else}
						Menu
					{/if}
				</button>
			</div>
			<br />
			<br />
			<br />
			<br />
			<ul class="max-lg:hidden">
				{@render nav()}
			</ul>
			{#if menu_mobile_open}
				<ul class="font-serif leading-14! lg:hidden">
					{@render nav()}
				</ul>
			{/if}
		</nav>

		<div class={[menu_mobile_open ? '' : 'max-lg:hidden']}>
			<div class="flex flex-col text-sm/4.5 text-black/75">
				<a class="link-hover" href="https://www.instagram.com/gduboisstudio/" target="_blank">
					Instagram
				</a>
				<a class="link-hover" href="https://www.facebook.com/gduboisstudio/" target="_blank">
					Facebook
				</a>
			</div>
			<br />
			<div class="flex items-center gap-0.5">
				<a class={['link-hover', lang == 'fr' ? '' : 'text-2']} href={get_translated('fr')}> Fr </a>
				<span class="text-2"> / </span>
				<a class={['link-hover', lang == 'en' ? '' : 'text-2']} href={get_translated('en')}>En </a>
			</div>
		</div>
	</div>
</header>

{#if dialog_shop_open}
	<Dialog onclose={close_dialog_shop}>
		<div class="px-gap-x py-gap-y">
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
	</Dialog>
{/if}
<!-- <div class={['pointer-events-none fixed inset-0 z-100 lg:hidden', menu_mobile_open && 'bg-bg']}>
	<div class="mx-gap my-gap-y">
		{#if menu_mobile_open}
			<nav class="pointer-events-auto mt-12 font-serif">
				<ul class="flex flex-col gap-gap-y">
					{#each links as link}
						{#if link != 'divider'}
							<li class="flex w-full">
								<a
									class={['flex w-full', active_link?.href == link.href ? '' : 'text-2']}
									href="/{page.params.lang}{link.href[lang] || link.href.en}"
								>
									{link.name[lang] || link.name.en}
								</a>
							</li>
						{:else}
							<div class="invisible" aria-hidden="true">*</div>
						{/if}
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</div> -->
