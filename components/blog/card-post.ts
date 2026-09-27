import { formatBlogDate, type BlogPost } from '@/lib/blog-data';

/**
 * The fields a blog card needs, with the date pre-formatted on the server.
 * Kept slim so client-side lists never ship the full article HTML.
 */
export type BlogCardPost = Pick<
  BlogPost,
  'id' | 'slug' | 'title' | 'excerpt' | 'image' | 'author' | 'date' | 'readTime' | 'category'
> & { displayDate: string };

export function toCardPost(p: BlogPost): BlogCardPost {
  const { id, slug, title, excerpt, image, author, date, readTime, category } = p;
  return { id, slug, title, excerpt, image, author, date, readTime, category, displayDate: formatBlogDate(date) };
}
