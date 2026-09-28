'use client';

import { useEffect } from 'react';

/** Registers /sw.js (production only) once the page is idle, so it never competes with first paint. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const register = () => navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(register, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(register, 2500);
    return () => clearTimeout(t);
  }, []);
  return null;
}
