import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/site/ui';
import { Reveal, RevealGroup, RevealItem, SplitText } from '@/components/site/reveal';

const quickLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Insights', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
];

// The logo checkerboard; 1 = filled square.
const CELLS = [1, 0, 1, 0, 1, 0, 1, 0, 1];

/*
 * Page-scoped styles for the animated "0": the checker inverts in a diagonal
 * wave, holds, then flips back. Base state is the logo pattern, so the global
 * reduced-motion rule (1 iteration, ~0ms) simply leaves the static logo.
 */
const css = `
.bx404-mark{display:inline-grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);width:.66em;height:.66em;margin-inline:.06em;vertical-align:.44em}
.bx404-mark>i{position:relative;box-shadow:inset 0 0 0 1px var(--line)}
.bx404-mark>i::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,var(--brand),var(--brand-2));transform:scale(0);animation:bx404-on 6s var(--ease-in-out-quart) infinite;animation-delay:var(--d,0ms)}
.bx404-mark>i[data-on]::before{transform:scale(1);animation-name:bx404-off}
@keyframes bx404-off{0%,30%{transform:scale(1)}42%,70%{transform:scale(0)}82%,100%{transform:scale(1)}}
@keyframes bx404-on{0%,30%{transform:scale(0)}42%,70%{transform:scale(1)}82%,100%{transform:scale(0)}}
`;

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      <style href="bx-404" precedence="default">
        {css}
      </style>
      <div
        className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-x relative flex flex-1 flex-col justify-center py-16 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p
              aria-hidden="true"
              className="font-display text-[clamp(7rem,24vw,20rem)] leading-[0.8] font-semibold text-paper select-none"
            >
              4
              <span className="bx404-mark">
                {CELLS.map((on, i) => {
                  const row = Math.floor(i / 3);
                  const col = i % 3;
                  return (
                    <i
                      key={i}
                      data-on={on ? '' : undefined}
                      style={{ '--d': `${(row + col) * 110}ms` } as CSSProperties}
                    />
                  );
                })}
              </span>
              4
            </p>

            <h1 className="font-display mt-10 max-w-[18ch] text-[clamp(2rem,4.5vw,4rem)] leading-[1] font-semibold text-paper">
              <span className="sr-only">Error 404. </span>
              <SplitText as="span" immediate delay={0.15} text="This page slipped through the grid." className="block" />
            </h1>

            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">
                The link may be broken, or the page may have moved. Head back home, or tell us what you were looking
                for and we will point you to it.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/">Back to home</ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Contact us
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-4">
            <p className="eyebrow mb-4">Or try one of these</p>
            <RevealGroup as="ul" className="border-t border-line" stagger={0.06}>
              {quickLinks.map((l, i) => (
                <RevealItem as="li" key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-line py-4"
                  >
                    <span
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <span className="eyebrow relative pl-2">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display relative text-2xl font-semibold text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-brand">
                      {l.label}
                    </span>
                    <span
                      className="relative mr-2 grid h-9 w-9 place-items-center border border-line-strong text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </nav>
        </div>
      </div>

      <div className="container-x relative">
        <div className="eyebrow flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
          <span>Status 404</span>
          <span>One pixel went missing. Not your fault.</span>
        </div>
      </div>
    </main>
  );
}
