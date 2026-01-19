import { pocketbase } from '$lib/pocketbase';
import type { FolioImagesRecord } from '$lib/pocketbase.types';

import type { PaginationResult } from '$lib/types';

export async function load() {
	const pagination: PaginationResult<FolioImagesRecord> = await pocketbase
		.collection('folio_images')
		.getList(1, 144, { fields: 'id,title,image,aspect_ratio', sort: 'sort_order' });

	return { pagination };
}
