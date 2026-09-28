'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  title: string;
}

/**
 * Sticky "On this page" index for long legal documents. Highlights the section
 * currently crossing a thin band near the top of the viewport.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // First section (in document order) inside the band wins.
        const first = items.find((i) => visible.has(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="eyebrow mb-6">On this page</p>
      <ol className="border-l border-line">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative -ml-px flex items-baseline gap-4 border-l py-2.5 pl-5 text-sm transition-colors duration-300 ${
                  isActive ? 'border-brand text-paper' : 'border-transparent text-mute hover:text-paper'
                }`}
              >
                <span
                  className={`font-mono text-[0.6875rem] tracking-[0.14em] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-brand' : 'text-mute'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                >
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
