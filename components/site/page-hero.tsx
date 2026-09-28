import Link from 'next/link';
import type { ReactNode } from 'react';
import { SplitText } from '@/components/site/reveal';
import { ScrollCue } from '@/components/site/ui';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Shared hero for every inner page: breadcrumb trail, oversized split-reveal
 * title, and a description/actions row. Keeps all inner pages visually related.
 */
export function PageHero({
  title,
  description,
  crumbs,
  children,
  aside,
}: {
  title: string;
  description?: ReactNode;
  crumbs: Crumb[];
  /** Action buttons under the description */
  children?: ReactNode;
  /** Optional right-hand column (stats, meta, etc.) */
  aside?: ReactNode;
}) {
  return (
    // Full-height (100svh): breadcrumb pinned top, title block centred, scroll cue at the bottom.
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-line pt-[calc(var(--nav-h)+2.5rem)] pb-8">
      <div
        className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        aria-hidden="true"
      />
      <div className="container-x relative flex flex-1 flex-col">
        <nav aria-label="Breadcrumb">
          <ol className="eyebrow flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="link-line hover:text-paper">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="link-line hover:text-paper">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-paper" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="my-auto py-12">
        <SplitText
          as="h1"
          immediate
          text={title}
          className="font-display block max-w-[16ch] text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] font-semibold text-paper"
        />

        {(description || children || aside) && (
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="enter-fade lg:col-span-6" style={{ ['--delay' as string]: '280ms' }}>
              {description && <div className="text-lg leading-relaxed text-paper-dim sm:text-xl">{description}</div>}
              {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </div>
            {aside && (
              <div className="enter-fade lg:col-span-5 lg:col-start-8" style={{ ['--delay' as string]: '420ms' }}>
                {aside}
              </div>
            )}
          </div>
        )}
        </div>

        <div className="flex justify-end">
          <ScrollCue />
        </div>
      </div>
    </section>
  );
}
