'use client';

import { useMemo, useState } from 'react';
import { Reveal } from '@/components/site/reveal';
import { BlogCard } from '@/components/blog/blog-card';
import type { BlogCardPost } from '@/components/blog/card-post';

const PAGE_SIZE = 6;

/**
 * Category filter + "load more" for the journal grid. The page stays a server
 * component; only this list is interactive. All cards for the first page are
 * in the server HTML, so crawlers see them without JS.
 */
export function BlogIndex({
  posts,
  featuredId,
  categories,
}: {
  posts: BlogCardPost[];
  featuredId: number;
  categories: { name: string; count: number }[];
}) {
  const [active, setActive] = useState('All');
  const [visible, setVisible] = useState(PAGE_SIZE);

  // "All" skips the featured story (it sits above); a category shows everything in it.
  const filtered = useMemo(
    () => (active === 'All' ? posts.filter((p) => p.id !== featuredId) : posts.filter((p) => p.category === active)),
    [active, posts, featuredId]
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const select = (name: string) => {
    setActive(name);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          {[{ name: 'All', count: posts.length }, ...categories].map((c) => {
            const on = active === c.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                onClick={() => select(c.name)}
                className={`inline-flex h-9 items-center gap-2 border px-3 font-mono text-[0.6875rem] tracking-[0.08em] uppercase transition-colors duration-300 ${
                  on
                    ? 'border-brand bg-brand text-ink'
                    : 'border-line-strong text-paper-dim hover:border-paper hover:text-paper'
                }`}
              >
                {c.name}
                <span className={on ? 'text-ink' : 'text-mute'}>{String(c.count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
        <p className="eyebrow shrink-0" aria-live="polite">
          Showing {shown.length} of {filtered.length}
        </p>
      </div>

      {shown.length === 0 ? (
        <div className="border-line border p-12 text-center">
          <p className="text-paper-dim text-lg">No articles in this category yet.</p>
          <button type="button" onClick={() => select('All')} className="btn btn-ghost btn-sm mt-6">
            <span>View all articles</span>
          </button>
        </div>
      ) : (
        <ul className="border-line grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, i) => (
            <li key={`${active}-${post.id}`} className="h-full">
              <Reveal className="h-full" delay={(i % 3) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn btn-ghost">
            <span>Load more articles</span>
            <span className="eyebrow">+{Math.min(remaining, PAGE_SIZE)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
