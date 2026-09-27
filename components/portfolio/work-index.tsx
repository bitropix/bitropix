'use client';

import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, Rows3 } from 'lucide-react';

/** Lean, serialisable slice of a PortfolioProject (keeps the client payload small). */
export interface WorkItem {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  category: string;
  industry: string;
  /** Position in the full index, 1-based. Stays stable while filtering. */
  n: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const ALL = 'All';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Filterable work index. Server-renders every project (filter "All", grid view),
 * then lets visitors narrow by category or switch to a compact list.
 */
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState(ALL);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [{ label: ALL, count: items.length }, ...[...counts].map(([label, count]) => ({ label, count }))];
  }, [items]);

  const shown = filter === ALL ? items : items.filter((p) => p.category === filter);

  return (
    <div>
      <div className="border-line mb-12 flex flex-col gap-6 border-y py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f.label === filter;
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.label)}
                className={`tag h-10 px-4 transition-colors duration-300 ${
                  active ? 'border-paper bg-paper text-ink' : 'hover:border-paper hover:text-paper'
                }`}
              >
                {f.label}
                <span className="opacity-60">({pad(f.count)})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <p className="eyebrow" aria-live="polite">
            Showing {pad(shown.length)} of {pad(items.length)}
          </p>
          <div role="group" aria-label="Layout" className="flex">
            {(
              [
                { id: 'grid', label: 'Grid view', Icon: LayoutGrid },
                { id: 'list', label: 'List view', Icon: Rows3 },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`-ml-px grid h-10 w-10 place-items-center border transition-colors duration-300 ${
                  view === id
                    ? 'border-paper bg-paper text-ink relative z-10'
                    : 'border-line-strong text-paper-dim hover:text-paper'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'grid' ? <WorkGrid items={shown} filter={filter} /> : <WorkList items={shown} filter={filter} />}
    </div>
  );
}

/* ---------- Grid: alternating wide / narrow spans on a 12-col grid ---------- */

function WorkGrid({ items, filter }: { items: WorkItem[]; filter: string }) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24 lg:gap-x-10">
      {items.map((p, i) => {
        const pos = i % 4;
        const wide = pos === 0 || pos === 3;
        const layout = ['md:col-span-7', 'md:col-span-5 md:mt-40', 'md:col-span-5', 'md:col-span-7 md:mt-24'][pos];
        return (
          <motion.li
            key={`${filter}-${p.slug}`}
            className={layout}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease: EASE }}
          >
            <Link href={`/portfolio/${p.slug}`} className="group block" data-cursor="View">
              <div
                className={`border-line bg-ink-2 relative overflow-hidden border ${wide ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
              >
                <SmartImage
                  src={p.image}
                  alt={`${p.title} website`}
                  fill
                  sizes={
                    wide
                      ? '(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1408px) 55vw, 780px'
                      : '(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1408px) 40vw, 560px'
                  }
                  className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <span
                  className="bg-paper text-ink group-hover:bg-brand absolute right-4 bottom-4 grid h-12 w-12 place-items-center transition-all duration-500 group-hover:rotate-45 group-hover:text-ink"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr]">
                <span className="eyebrow pt-2">({pad(p.n)})</span>
                <div>
                  <h3 className="font-display text-paper group-hover:text-brand text-[clamp(1.875rem,3.4vw,3.25rem)] leading-[0.95] font-semibold transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="text-paper-dim mt-3 max-w-md">{p.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="tag tag-brand">{p.industry}</span>
                    <span className="tag">{p.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}

/* ---------- List: index rows with a floating preview that trails the pointer ---------- */

function WorkList({ items, filter }: { items: WorkItem[]; filter: string }) {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = active !== null ? items[active] : undefined;

  return (
    <ul
      ref={listRef}
      className="border-line relative border-t"
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
    >
      {items.map((p, i) => (
        <motion.li
          key={`${filter}-${p.slug}`}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
        >
          <Link
            href={`/portfolio/${p.slug}`}
            className="group border-line relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b py-6 sm:grid-cols-[5rem_1fr_auto] sm:py-8"
            data-cursor="View"
          >
            <span
              className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              aria-hidden="true"
            />
            <span className="eyebrow relative">{pad(p.n)}</span>
            <div className="relative">
              <h3 className="font-display text-paper group-hover:text-brand block text-[clamp(1.75rem,4.6vw,4rem)] leading-none font-semibold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                {p.title}
              </h3>
              <p className="text-mute mt-3 text-sm">{p.industry}</p>
            </div>
            <span className="relative flex items-center gap-2">
              <span className="hidden xl:flex">
                <span className="tag">{p.category}</span>
              </span>
              <span className="border-line-strong text-paper group-hover:border-brand group-hover:bg-brand grid h-11 w-11 place-items-center border transition-all duration-500 group-hover:rotate-45 group-hover:text-ink">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </motion.li>
      ))}

      {/* floating preview (desktop, mouse only) */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[16/10] w-96 -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ x: sx, y: sy }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.slug}
              className="border-line-strong bg-ink-2 absolute inset-0 overflow-hidden border"
              initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0 50% 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0)' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <SmartImage src={current.image} alt="" fill sizes="384px" className="object-cover object-top" />
              <div className="bg-ink/85 text-paper absolute inset-x-0 bottom-0 p-4 text-sm leading-snug backdrop-blur">
                {current.tagline}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ul>
  );
}
