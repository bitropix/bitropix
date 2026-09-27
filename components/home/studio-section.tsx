'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { ScrollText, Reveal, RevealGroup, RevealItem } from '@/components/site/reveal';
import { Eyebrow, ButtonLink } from '@/components/site/ui';

const stats = [
  { value: 50, suffix: '+', label: 'Products shipped' },
  { value: 50, suffix: '+', label: 'Clients served' },
  { value: 25, suffix: '+', label: 'Makers on the team' },
  { value: 98, suffix: '%', label: 'Client retention' },
];

// Real engagements only - keep the list short and verifiable.
const clients = ['Tourillo', 'Advanced Beauty', 'Beverly Agrovet', 'Dishaa Vertex', 'BookUrEvents', 'Proteam'];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(value);

  // The server renders the real number (no-JS / SEO). After hydration, if the counter is still
  // below the fold, reset it to 0 off-screen so the count-up never visibly jumps backwards.
  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(0);
    }
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

export function StudioSection() {
  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-x">
        <Eyebrow rule index="01" className="mb-12">
          The studio
        </Eyebrow>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <ScrollText
              className="font-display text-[clamp(1.875rem,4.4vw,4rem)] leading-[1.08] font-medium text-paper"
              text="We are designers, engineers and growth marketers who turn ambitious ideas into fast, beautiful and measurable digital products. No templates. No fluff. Just craft, clean code and results you can see on the dashboard."
            />
            <Reveal className="mt-12 flex flex-wrap items-center gap-6">
              <ButtonLink href="/about" variant="ghost">
                Meet the studio
              </ButtonLink>
              <p className="max-w-sm text-sm text-mute">
                One senior team from discovery to launch and beyond. You talk to the people who build your product.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-24 grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="group relative border-r border-b border-line p-6 sm:p-10">
              <i
                className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <p className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-semibold text-paper">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="eyebrow mt-4">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center">
          <p className="eyebrow shrink-0">Trusted by</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {clients.map((c) => (
              <li
                key={c}
                className="font-display text-xl font-semibold text-paper-dim transition-colors duration-300 hover:text-paper sm:text-2xl"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
