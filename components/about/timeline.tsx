'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Eyebrow } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

/**
 * About page journey: sticky heading on the left, milestones on the right
 * with a vertical line that fills as the reader scrolls (mirrors the home
 * page process section).
 */
export function Timeline({ milestones, index = '05' }: { milestones: Milestone[]; index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const first = milestones[0]?.year;
  const last = milestones[milestones.length - 1]?.year;

  return (
    <section className="relative bg-ink-2 py-24 sm:py-36">
      <div className="container-x relative">
        <Eyebrow rule index={index} className="mb-12">
          Our journey
        </Eyebrow>
      </div>
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SplitText
              as="h2"
              text="Milestones we are proud of."
              className="font-display block text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] font-semibold text-paper"
            />
            {first && last && (
              <Reveal>
                <p className="font-display mt-10 text-[clamp(3rem,7vw,6rem)] leading-none font-semibold text-transparent [-webkit-text-stroke:1px_var(--line-strong)]">
                  <span className="sr-only">From </span>
                  {first}
                  <span className="text-brand [-webkit-text-stroke:0]" aria-hidden="true">
                    /
                  </span>
                  <span className="sr-only"> to </span>
                  {last}
                </p>
              </Reveal>
            )}
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute top-0 bottom-0 left-[1.1rem] w-px bg-line-strong" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="bg-brand-gradient h-full w-full origin-top" />
          </div>
          <ol className="space-y-20">
            {milestones.map((m, i) => (
              <li key={`${m.year}-${m.title}`} className="relative pl-16">
                <span
                  className="absolute top-1 left-0 grid h-9 w-9 place-items-center border border-line-strong bg-ink-2 font-mono text-xs text-paper"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Reveal>
                  <p className="eyebrow mb-3">
                    <span className="text-brand">{m.year}</span>
                  </p>
                  <h3 className="font-display text-4xl font-semibold text-paper sm:text-5xl">{m.title}</h3>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-paper-dim">{m.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
