'use client';

import { useEffect, useState } from 'react';

/**
 * Reading progress for the article with id `targetId`.
 * Desktop: a vertical hairline gauge + percentage in the sticky rail.
 * Mobile: a thin brand bar pinned to the bottom of the viewport.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const read = Math.min(Math.max(-rect.top + window.innerHeight * 0.25, 0), Math.max(total, 1));
      setPct(Math.round((read / Math.max(total, 1)) * 100));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <>
      <div className="hidden lg:block">
        <p className="eyebrow mb-4 flex items-center justify-between">
          <span>Progress</span>
          <span className="text-paper tabular-nums">{String(pct).padStart(2, '0')}%</span>
        </p>
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="bg-line-strong relative h-px w-full"
        >
          <div
            className="bg-brand-gradient absolute inset-0 origin-left"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
      </div>
      <div className="bg-line fixed inset-x-0 bottom-0 z-40 h-0.5 lg:hidden" aria-hidden="true">
        <div className="bg-brand-gradient h-full origin-left" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </>
  );
}
