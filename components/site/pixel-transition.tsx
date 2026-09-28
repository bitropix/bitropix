'use client';

import { useEffect, useState } from 'react';

let firstLoad = true;

/**
 * Brand-grid "pixel dissolve" played when a new route mounts. It never delays
 * navigation: the new page is already rendered underneath, the squares just
 * fade off it in a random order (~500ms). Skipped on the very first load
 * (the splash owns that moment) and for reduced-motion users.
 */
export function PixelTransition() {
  const [cells, setCells] = useState<number[] | null>(null);

  useEffect(() => {
    // performance.now() guard also covers React strict-mode's double effect run on first load.
    if (firstLoad || performance.now() < 1500) {
      firstLoad = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cols = window.innerWidth < 640 ? 6 : 12;
    const rows = Math.ceil(window.innerHeight / (window.innerWidth / cols));
    const delays = Array.from({ length: cols * rows }, () => Math.random() * 260);
    setCells(delays);
    document.documentElement.style.setProperty('--cols', String(cols));
    const t = window.setTimeout(() => setCells(null), 820);
    return () => window.clearTimeout(t);
  }, []);

  if (!cells) return null;
  return (
    <div className="pixel-veil" aria-hidden="true">
      {cells.map((d, i) => (
        <i key={i} style={{ ['--d' as string]: `${d}ms` }} />
      ))}
    </div>
  );
}
