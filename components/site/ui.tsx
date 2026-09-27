import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'light';

/** Two stacked arrows that swap diagonally on hover (see .btn-arrow in globals.css). */
export function ArrowSwap() {
  return (
    <span className="btn-arrow" aria-hidden="true">
      <ArrowUpRight className="h-4 w-4" />
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

/** Square CTA link with a fill-wipe hover. Works in server components. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size,
  className = '',
  arrow = true,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'sm';
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<'a'>, 'href'>) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowSwap />}
    </>
  );
  if (external) {
    const isWeb = href.startsWith('http');
    return (
      <a href={href} className={cls} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

/**
 * Section label, two variants with one rule of use:
 *  - `rule`: opens a main section. Hairline across the FULL container width, number left,
 *    name right. Only place it directly inside `.container-x`, never inside a grid column.
 *  - default: plain "01  Name" label (no line) for sub-blocks, sidebars, cards and panels.
 */
export function Eyebrow({
  index,
  children,
  className = '',
  rule = false,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  if (rule) {
    return (
      <p className={`eyebrow flex w-full items-baseline justify-between gap-6 border-t border-line-strong pt-4 ${className}`}>
        {index && <span className="text-paper tabular-nums">{index}</span>}
        <span className={index ? 'text-right' : ''}>{children}</span>
      </p>
    );
  }
  return (
    <p className={`eyebrow flex items-baseline gap-3 ${className}`}>
      {index && <span className="text-brand tabular-nums">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

/** Small "Scroll" hint for the bottom of full-height heroes. */
export function ScrollCue({ className = '' }: { className?: string }) {
  return (
    <span className={`eyebrow flex items-center gap-3 ${className}`} aria-hidden="true">
      Scroll
      <span className="scroll-cue-line" />
    </span>
  );
}

/** The 3x3 logo checkerboard as a tiny inline mark. */
export function PixelMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <span className={`grid grid-cols-3 ${className}`} aria-hidden="true">
      {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((on, i) => (
        <i key={i} className={on ? 'bg-brand-gradient' : ''} />
      ))}
    </span>
  );
}
