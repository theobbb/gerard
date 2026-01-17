import { pocketbase } from '$lib/pocketbase';
import type { ItemsRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';

export const prerender = true;

export async function load() {
	const pagination: PaginationResult<ItemsRecord> = await pocketbase
		.collection('items')
		.getList(1, 144, { fields: 'id,title,image,aspect_ratio', sort: 'sort_order' });

	return { pagination };
}
