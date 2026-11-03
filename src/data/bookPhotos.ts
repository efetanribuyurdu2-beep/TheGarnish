/**
 * Photos for the Cocktail Book, from Unsplash (https://unsplash.com/license).
 * Chosen through the official API (UNSPLASH_ACCESS_KEY), checked by eye, and
 * credited on the page as Unsplash asks. `url` is the API's `urls.raw` value:
 * the page adds its own size parameters (hotlinked, as the API guidelines ask).
 * A page with no entry here shows its glass drawn large instead.
 */
export interface BookPhoto {
  id: string; // Unsplash photo id
  url: string; // urls.raw
  alt: { tr: string; en: string };
  author: string; // photographer's name
  authorUrl: string; // their Unsplash profile (links.html of the user)
  photoUrl: string; // the photo's Unsplash page (links.html)
  color?: string; // the photo's average colour, shown while it loads
}

export const BOOK_PHOTOS: Record<string, BookPhoto> = {};
