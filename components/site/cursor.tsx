'use client';

import { useEffect, useRef } from 'react';

/**
 * Square cursor that trails the pointer. Grows over links, and shows a label
 * over any element with `data-cursor="Label"`. Fine pointers only; the DOM is
 * written directly inside rAF so it never triggers React renders.
 *
 * Canvas content (the 3D hero) can't mark individual shapes with data-cursor, so it
 * drives the label directly: window.dispatchEvent(new CustomEvent('bx-cursor', { detail: 'Drag' | null })).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    let mx = -100;
    let my = -100;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;
    let forced: string | null = null;
    let hoverState = '';
    let hoverLabel = '';

    const paint = () => {
      const state = forced ? 'label' : hoverState;
      ring.current!.dataset.state = state;
      dot.current!.dataset.state = state;
      label.current!.textContent = forced ?? hoverLabel;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        dot.current!.style.opacity = '1';
        ring.current!.style.opacity = '1';
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      const link = target?.closest('a, button, [role="button"], summary, label');
      hoverState = labelled ? 'label' : link ? 'link' : '';
      hoverLabel = labelled?.dataset.cursor ?? '';
      paint();
    };

    const onForce = (e: Event) => {
      forced = (e as CustomEvent<string | null>).detail || null;
      paint();
    };

    const onLeave = () => {
      visible = false;
      dot.current!.style.opacity = '0';
      ring.current!.style.opacity = '0';
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.current!.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.current!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('bx-cursor', onForce);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('bx-cursor', onForce);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="bx-cursor bx-cursor-dot opacity-0" aria-hidden="true" />
      <div ref={ring} className="bx-cursor bx-cursor-ring opacity-0" aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
