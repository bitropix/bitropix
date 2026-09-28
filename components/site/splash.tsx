'use client';

import { useEffect, useState } from 'react';

/**
 * Inline <head> script: decides before first paint whether the splash shows.
 * It plays on every full page load (first visit, reload, hard reload). In-site
 * navigation never reloads the document, so it doesn't replay while browsing.
 * Reduced-motion users skip it (html[data-splash="off"] hides it via CSS).
 */
export const splashBootScript = `try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.splash=r?'off':'on';}catch(e){document.documentElement.dataset.splash='off';}`;

const LETTERS = 'BITROPIX'.split('');
// 3x3 checkerboard that mirrors the logo: corners + centre are filled.
const CELLS = [1, 0, 1, 0, 1, 0, 1, 0, 1];

/**
 * Page-load splash. The whole animation is CSS (see globals.css) so it plays
 * even before hydration; this component only unmounts it afterwards.
 */
export function Splash() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.splash === 'off') {
      setGone(true);
      return;
    }
    // Once the curtain has lifted: mark the hero entrances already on screen as done (so they
    // don't replay), then re-enable entrance animations for pages visited later in this tab.
    const t = window.setTimeout(() => {
      document.querySelectorAll('.enter-rise, .enter-fade').forEach((el) => el.classList.add('enter-done'));
      document.documentElement.dataset.splash = 'off';
      setGone(true);
    }, 2300);
    return () => window.clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div id="bx-splash" aria-hidden="true">
      <div className="flex flex-col items-center">
        <div className="splash-grid">
          {CELLS.map((on, i) => (
            <i key={i} className={on ? 'on' : ''} style={{ animationDelay: `${80 + i * 40}ms` }} />
          ))}
        </div>
        <div className="splash-word">
          {LETTERS.map((l, i) => (
            <span key={i} style={{ animationDelay: `${380 + i * 35}ms` }}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <p className="splash-meta eyebrow">Digital products, engineered</p>
      <div className="splash-count" />
      <div className="splash-bar" />
    </div>
  );
}
