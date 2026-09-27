'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky category index for /faq. Plain anchor links (work without JS); the
 * client part only highlights the section currently in view.
 */
export function FaqNav({ items }: { items: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="FAQ categories">
      <p className="eyebrow mb-5">Topics</p>
      <ol className="border-line border-t">
        {items.map((item, i) => {
          const on = active === item.id;
          return (
            <li key={item.id} className="border-line border-b">
              <a
                href={`#${item.id}`}
                aria-current={on ? 'location' : undefined}
                className={`group flex items-center gap-4 py-4 transition-colors duration-300 ${on ? 'text-paper' : 'text-paper-dim hover:text-paper'}`}
              >
                <span
                  className={`h-2 w-2 shrink-0 transition-colors duration-300 ${on ? 'bg-brand' : 'bg-line-strong group-hover:bg-paper'}`}
                  aria-hidden="true"
                />
                <span className="eyebrow w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-medium">{item.title}</span>
                <span className="eyebrow tabular-nums">{String(item.count).padStart(2, '0')}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
