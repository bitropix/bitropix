'use client';

import { useEffect, useRef, useState } from 'react';

export interface ServiceIndexItem {
  id: string;
  label: string;
}

/**
 * Sticky in-page index for /services. Plain anchor links (so the #ids keep
 * working without JS); the active item is tracked with an IntersectionObserver.
 */
export function ServiceIndex({ items }: { items: ServiceIndexItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active link visible inside the horizontally scrolling bar (mobile).
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left: link.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
  }, [active]);

  const activeIndex = active ? items.findIndex((it) => it.id === active) : -1;

  return (
    <nav aria-label="Services index" className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="container-x flex items-center gap-6">
        <p className="eyebrow hidden shrink-0 lg:block">Index</p>
        <ul
          ref={listRef}
          className="relative -mx-1 flex flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  data-id={it.id}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative flex h-14 items-center gap-2 px-3 text-sm whitespace-nowrap transition-colors duration-300 sm:px-4 ${
                    isActive ? 'text-paper' : 'text-mute hover:text-paper'
                  }`}
                >
                  <span className={`font-mono text-[0.6875rem] ${isActive ? 'text-brand' : ''}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{it.label}</span>
                  <span
                    className={`absolute inset-x-3 bottom-0 h-px origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-4 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-line-strong'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="eyebrow hidden shrink-0 tabular-nums md:block" aria-hidden="true">
          <span className="text-paper">{activeIndex >= 0 ? String(activeIndex + 1).padStart(2, '0') : '00'}</span> /{' '}
          {String(items.length).padStart(2, '0')}
        </p>
      </div>
    </nav>
  );
}
