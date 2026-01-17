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
		if (full_route == '/[lang=lang]' || full_route == '/[lang=lang]/[id]') return filtered_links[0];
		const route = full_route.replace('/[lang=lang]', '');
		return filtered_links.find((link) => link.href.en.includes(route));
	});

	function get_translated(target_lang: 'en' | 'fr') {
		const new_active_link = active_link?.href[target_lang] || active_link?.href.en;
		const path = `/${target_lang}${new_active_link}`;

		return path; // Keep query params if any
	}
</script>

<header class="fixed top-0 h-svh w-64 text-xl max-lg:invisible">
	<div class="flex h-full flex-col justify-between px-gap py-gap-y">
		<nav class="">
			<h1>Gérard DuBois</h1>
			<br />
			<br />
			<br />
			<br />
			<ul>
				{#each links as link}
					{#if link != 'divider'}
						<li>
							<a
								class={[active_link?.href == link.href ? '' : 'text-2']}
								href="/{page.params.lang}{link.href[lang] || link.href.en}"
							>
								{link.name[lang] || link.name.en}
							</a>
						</li>
					{:else}
						<br />
					{/if}
				{/each}
			</ul>
		</nav>
		<div>
			<a href={get_translated('fr')}>Fr </a>/
			<a href={get_translated('en')}>En </a>
		</div>
	</div>
</header>
<div class={['pointer-events-none fixed inset-0 z-100 lg:hidden', menu_mobile_open && 'bg-bg']}>
	<div class="mx-gap my-gap-y">
		<div class="flex justify-between gap-gap">
			<h1>Gérard DuBois</h1>
			<button
				class="pointer-events-auto -m-3 p-3"
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
</div>
