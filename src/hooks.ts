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
	const p = url.pathname;

	// 1. Check for an exact match (e.g., /fr/livres)
	if (p in translated) {
		return translated[p];
	}

	// 2. Check for a prefix match (e.g., /fr/livres/123)
	for (const [localizedPrefix, canonicalPrefix] of Object.entries(translated)) {
		// We check for localizedPrefix + '/' to ensure we don't accidentally
		// match /fr/livres-new when looking for /fr/livres
		if (p.startsWith(localizedPrefix + '/')) {
			const remainingPath = p.slice(localizedPrefix.length);
			return canonicalPrefix + remainingPath;
		}
	}
};
