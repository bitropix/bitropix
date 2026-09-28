import type { ReactNode } from 'react';

/**
 * Infinite CSS marquee (no JS). Content is rendered twice; the copy is
 * aria-hidden so screen readers hear it once. Pauses on hover.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className = '',
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
