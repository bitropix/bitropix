'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HeroVisual } from '@/components/site/hero-visual';
import { ButtonLink } from '@/components/site/ui';
import { Magnetic } from '@/components/site/magnetic';

const WORDS = ['websites', 'mobile apps', 'brands', 'platforms', 'growth'];
const EASE = [0.16, 1, 0.3, 1] as const;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* invisible longest word reserves width so the line never jumps */}
      <span className="invisible col-start-1 row-start-1">mobile apps</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          className="text-brand-gradient col-start-1 row-start-1"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const lines = [
  { key: 'a', content: 'We build' },
  { key: 'b', content: <RotatingWord /> },
  { key: 'c', content: 'that stand out.' },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Text + meta bar move up together (never down into each other) and fade late.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      <div
        className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_75%_45%,black,transparent)]"
        aria-hidden="true"
      />

      {/* 3D logo: its own band above the text on phones, right half from md up */}
      <HeroVisual className="absolute top-[var(--nav-h)] right-[-6%] h-[26svh] w-[78%] md:right-0 md:bottom-[5.5rem] md:h-auto md:w-[46%] lg:w-[48%]" />

      <motion.div style={{ y, opacity }} className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="container-x flex flex-1 flex-col justify-end pt-[26svh] pb-8 md:justify-center md:py-10">
          {/* Entrances are CSS (.enter-*) so they run on first paint, not after hydration. */}

          {/* Sized by width AND height so three lines always fit on short laptop screens */}
          <h1 className="font-display max-w-[12ch] text-[clamp(3rem,min(8.2vw,12.5svh),8.5rem)] leading-[0.9] font-semibold text-paper">
            <span className="sr-only">We build websites, mobile apps, brands, platforms and growth that stand out.</span>
            <span aria-hidden="true">
              {lines.map((line, i) => (
                <span key={line.key} className="block overflow-hidden pb-[0.06em]">
                  <span className="enter-rise block!" style={{ ['--delay' as string]: `${150 + i * 90}ms` }}>
                    {line.content}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="enter-fade pointer-events-auto mt-8 grid max-w-xl gap-7" style={{ ['--delay' as string]: '380ms' }}>
            <p className="text-base leading-relaxed text-paper-dim sm:text-lg">
              Bitropix designs and engineers high-performance websites, mobile apps and SEO-led growth engines for
              startups and enterprises across India, the US, UK, UAE and Australia.
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.2}>
                <ButtonLink href="/contact" className="px-5 sm:px-6">
                  Start a project
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/portfolio" variant="ghost" className="bg-ink/60 px-5 backdrop-blur-sm sm:px-6">
                See our work
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="enter-fade container-x" style={{ ['--delay' as string]: '600ms' }}>
          <div className="grid grid-cols-2 gap-6 border-t border-line py-5 sm:grid-cols-4">
            <div>
              <p className="eyebrow mb-1">Services</p>
              <p className="text-sm text-paper">Web, Mobile, Cloud, Growth</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Shipped</p>
              <p className="text-sm text-paper">50+ products</p>
            </div>
            <div className="hidden sm:block">
              <p className="eyebrow mb-1">Working with</p>
              <p className="text-sm text-paper">5 countries</p>
            </div>
            <div className="hidden items-end justify-end sm:flex">
              <span className="eyebrow flex items-center gap-3">
                Scroll
                <span className="relative block h-8 w-px overflow-hidden bg-line-strong" aria-hidden="true">
                  <motion.i
                    className="absolute inset-x-0 top-0 block h-1/2 bg-brand"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
