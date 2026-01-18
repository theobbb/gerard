<script lang="ts">
	import { page } from '$app/state';
	import { links } from '$lib/static';

	const lang = $derived(['en', 'fr'].includes(page.params.lang || '') ? page.params.lang : 'en') as
		| 'en'
		| 'fr';

	let menu_mobile_open = $state(true);

	const filtered_links = links.filter((link) => link != 'divider');

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
</script>

{#snippet nav()}
	{#each links as link}
		{#if link != 'divider'}
			<li>
				<a
					class={[
						'flex w-full',
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
		'fixed top-0 z-100 h-svh text-xl max-lg:inset-0 lg:w-64',
		menu_mobile_open && 'max-lg:bg-bg'
	]}
>
	<div class="flex h-full flex-col justify-between px-gap py-gap-y">
		<nav class="">
			<div class="flex justify-between gap-gap">
				<a href="/">Gérard DuBois</a>
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

		<div class="flex items-center gap-0.5">
			<a class={[lang == 'fr' ? '' : 'text-2']} href={get_translated('fr')}>Fr </a><span
				class="text-2">/</span
			>
			<a class={[lang == 'en' ? '' : 'text-2']} href={get_translated('en')}>En </a>
		</div>
	</div>
</header>

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
