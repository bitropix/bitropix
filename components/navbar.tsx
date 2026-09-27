'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';
import { ArrowSwap } from '@/components/site/ui';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blogs', label: 'Insights' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Hide on scroll down, reveal on scroll up; go solid once past the top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 240);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + Esc to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 h-[var(--nav-h)] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${solid && !open ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'}`}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Bitropix home">
            <Image
              src="/images/logo.png"
              alt=""
              width={28}
              height={28}
              priority
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
            />
            <span className="font-display text-xl font-bold tracking-[0.18em] text-paper">BITROPIX</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`roll flex items-center text-sm ${isActive(link.href) ? 'text-paper' : 'text-paper-dim hover:text-paper'}`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {isActive(link.href) && <i className="inline-block h-1.5 w-1.5 bg-brand" aria-hidden="true" />}
                      {link.label}
                    </span>
                    <span aria-hidden="true" className="flex items-center gap-2">
                      {isActive(link.href) && <i className="inline-block h-1.5 w-1.5 bg-brand" />}
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              <span>Start a project</span>
              <ArrowSwap />
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="bx-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 items-center gap-3 border border-line-strong px-3 text-sm text-paper transition-colors hover:border-paper lg:hidden"
            >
              <span className="font-mono text-xs tracking-[0.14em] uppercase">{open ? 'Close' : 'Menu'}</span>
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <i
                  className={`absolute left-0 h-px w-4 bg-paper transition-all duration-500 ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
                />
                <i
                  className={`absolute left-0 h-px w-4 bg-paper transition-all duration-500 ${open ? 'top-1/2 -rotate-45' : 'top-full'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="bx-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 flex flex-col bg-ink pt-[var(--nav-h)] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="bg-pixel-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <nav aria-label="Mobile" className="container-x relative flex-1 overflow-y-auto py-10" data-lenis-prevent>
              <ul className="space-y-1">
                {[{ href: '/', label: 'Home' }, ...navLinks].map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={`group flex items-baseline gap-4 py-1 ${isActive(link.href) && link.href !== '/' ? 'text-brand' : 'text-paper'}`}
                      >
                        <span className="eyebrow w-8">0{i + 1}</span>
                        <span className="font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-[1.05] font-semibold transition-transform duration-500 group-hover:translate-x-2">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-x relative grid gap-6 border-t border-line py-8 sm:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div>
                <p className="eyebrow mb-2">Say hello</p>
                <a href={`mailto:${siteConfig.email}`} className="link-line text-lg text-paper">
                  {siteConfig.email}
                </a>
                <br />
                <a href={siteConfig.phoneHref} className="link-line text-lg text-paper">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end sm:self-end">
                {Object.entries(siteConfig.social).map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-sm text-paper-dim capitalize hover:text-paper"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
