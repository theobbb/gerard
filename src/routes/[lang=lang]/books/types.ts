import type { BookImagesRecord, BookViewRecord } from '$lib/pocketbase.types';

export type BookView = BookViewRecord & { images: BookImagesRecord[] };
