import { pocketbase } from '$lib/pocketbase';
import type { BookView } from './types';

export async function load() {
	// const pagination: PaginationResult<BookImagesRecord> = await pocketbase
	// 	.collection('book_images')
	// 	.getList(1, 200, { fields: 'id,title,image,aspect_ratio,sort_order,book', sort: 'sort_order' });
	const books: BookView[] = await pocketbase
		.collection('book_view')
		.getFullList({ sort: 'sort_order' });
	return { books };
}
