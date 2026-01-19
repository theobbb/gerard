<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { links as static_links } from '$lib/static';

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
		console.log(full_route);
		const route = full_route.replace('/[lang=lang]', '');
		return filtered_links.find((link, i) => {
			if (i == 0) return false;
			return route.startsWith(link.href.en);
		});
	});

	function get_translated(target_lang: 'en' | 'fr') {
		// 1. Get the base path we are translating from (e.g., /fr/livres)
		// We use the active_link to find the known "prefix"
		const current_localized_prefix = active_link?.href[lang] || active_link?.href.en || '';
		const full_localized_prefix = `/${lang}${current_localized_prefix}`;

		// 2. Get the new base path (e.g., /en/books)
		const target_localized_prefix = active_link?.href[target_lang] || active_link?.href.en || '';
		const new_base = `/${target_lang}${target_localized_prefix}`;

		// 3. Capture the dynamic part (the [id] or whatever follows)
		// If current path is /fr/livres/123, the 'tail' is /123
		const current_path = page.url.pathname;

		if (current_path.startsWith(full_localized_prefix) && current_localized_prefix !== '/') {
			const tail = current_path.slice(full_localized_prefix.length);
			return new_base + tail;
		}

		// Fallback for homepage or if prefixes don't match
		return new_base;
	}

	onNavigate(() => {
		menu_mobile_open = false;
	});
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
		'fixed top-0 left-0 z-100 h-lvh text-xl max-lg:right-0 lg:w-drawer',
		menu_mobile_open ? 'max-lg:bg-bg' : 'max-lg:pointer-events-none'
	]}
>
	<div class="flex h-svh flex-col justify-between px-gap py-gap-y">
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
			<div class="flex flex-col text-black/75 max-lg:gap-0.5 lg:text-sm/4.5">
				<a class="link-hover" href="https://www.instagram.com/gduboisstudio/" target="_blank">
					Instagram
				</a>
				<a class="link-hover" href="https://www.facebook.com/gduboisstudio/" target="_blank">
					Facebook
				</a>
			</div>
			<br />
			<div class="flex items-center gap-2 lg:gap-0.5">
				<a class={['link-hover', lang == 'fr' ? '' : 'text-2']} href={get_translated('fr')}> Fr </a>
				<span class="text-2"> / </span>
				<a class={['link-hover', lang == 'en' ? '' : 'text-2']} href={get_translated('en')}>En </a>
			</div>
		</div>
	</div>
</header>
