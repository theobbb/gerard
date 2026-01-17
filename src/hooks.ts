import type { Reroute } from '@sveltejs/kit';
import { links } from '$lib/static';

// 1. Generate the translation map dynamically from your links array
const translated: Record<string, string> = {};

links.forEach((link) => {
	if (link === 'divider') return;

	// For every language, map the localized URL to the 'en' (filesystem) version
	// e.g., translated['/fr/a-propos'] = '/fr/about'
	if (link.href.fr) {
		translated[`/fr${link.href.fr}`] = `/fr${link.href.en}`;
	}
	// English usually maps to itself, but we include it for safety
	translated[`/en${link.href.en}`] = `/en${link.href.en}`;
});

export const reroute: Reroute = ({ url }) => {
	// Check if the current path exists in our translation map
	if (url.pathname in translated) {
		return translated[url.pathname];
	}

	// If no match is found, SvelteKit continues as normal
};
