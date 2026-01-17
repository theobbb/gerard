import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'en' | 'fr' => {
	return ['en', 'fr'].includes(param);
}) satisfies ParamMatcher;
