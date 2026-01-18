import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'en' | 'fr' => {
	return param === 'en' || param === 'fr';
}) satisfies ParamMatcher;
