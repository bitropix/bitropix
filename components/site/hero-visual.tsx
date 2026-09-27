'use client';

import { useEffect, useRef, useState } from 'react';

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Hero 3D logo. A static CSS checkerboard renders immediately (zero JS cost);
 * the Three.js scene is fetched as a separate chunk only once the browser is
 * idle, then cross-fades in. Reduced-motion / no-WebGL keep the static mark.
 */
/** `className` must include a position utility (e.g. `absolute ...`); none is hardcoded to avoid conflicts. */
export function HeroVisual({ className = 'relative' }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !supportsWebGL()) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const { createHeroScene } = await import('./hero-scene');
      if (cancelled) return;
      dispose = createHeroScene(el, () => window.scrollY / window.innerHeight, { lite: touch });
      requestAnimationFrame(() => setReady(true));
    };

    // Phones / touch devices: the scene costs noticeable CPU on mid-range hardware, so it starts on
    // the first touch or scroll only (the identical static logo shows until then) and uses a lighter
    // render path. Desktop: start as soon as the browser is idle.
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const events = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
    let fired = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const kick = () => {
      if (fired) return;
      fired = true;
      events.forEach((ev) => window.removeEventListener(ev, kick));
      if (timer) clearTimeout(timer);
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(start, { timeout: 1500 });
      else timer = setTimeout(start, 300);
    };

    if (touch) {
      events.forEach((ev) => window.addEventListener(ev, kick, { once: true, passive: true }));
    } else {
      kick();
    }

    return () => {
      cancelled = true;
      events.forEach((ev) => window.removeEventListener(ev, kick));
      if (timer) clearTimeout(timer);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      dispose?.();
    };
  }, []);

  return (
    <div className={className}>
      {/* static fallback, identical silhouette to the 3D logo */}
      <div
        className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
        <div className="grid aspect-square w-[46%] rotate-[-8deg] grid-cols-3">
          {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((on, i) => (
            <i key={i} className={on ? 'bg-brand-gradient' : ''} />
          ))}
        </div>
      </div>
      <div
        ref={mount}
        className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
