import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { ArrowUpRight } from 'lucide-react';
import type { BlogCardPost } from '@/components/blog/card-post';

/**
 * Journal card used on the blog index and under articles. Designed to sit in a
 * hairline grid: the parent supplies `border-t border-l`, each card `border-r border-b`.
 */
export function BlogCard({ post, headingLevel = 'h3' }: { post: BlogCardPost; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group border-line relative flex h-full flex-col border-r border-b"
      data-cursor="Read"
    >
      <span
        className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        aria-hidden="true"
      />
      <div className="border-line bg-ink-3 relative aspect-[16/10] overflow-hidden border-b">
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover opacity-85 transition-[transform,opacity] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
        />
        <span className="tag bg-ink/85 absolute top-4 left-4 backdrop-blur">{post.category}</span>
      </div>
      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <time dateTime={post.date}>{post.displayDate}</time>
          <span className="bg-mute inline-block h-1 w-1" aria-hidden="true" />
          <span>{post.readTime}</span>
        </p>
        <Heading className="font-display text-paper group-hover:text-brand mt-4 text-[1.625rem] leading-[1.05] font-semibold transition-colors duration-300">
          {post.title}
        </Heading>
        <p className="text-paper-dim mt-4 line-clamp-3 text-[0.9375rem] leading-relaxed">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-8">
          <span className="eyebrow text-paper-dim">By {post.author}</span>
          <span
            className="border-line-strong text-paper group-hover:border-brand group-hover:bg-brand grid h-10 w-10 place-items-center border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:text-ink"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
