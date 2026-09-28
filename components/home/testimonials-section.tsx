'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/site/ui';

const testimonials = [
  {
    name: 'Satendra Raghav',
    role: 'CEO, Tourillo Pvt. Ltd.',
    quote:
      "They captured Tourillo's vision beautifully and delivered a website that reflects our brand's elegance, purpose and passion for travel. Their attention to detail, creativity and professionalism truly stood out.",
  },
  {
    name: 'Arnab Gupta',
    role: 'Founder, Fincafe',
    quote:
      "They perfectly understood Fincafe's vision and translated it into a clean, professional and impactful website. Highly reliable, creative and responsive throughout the project. We are extremely satisfied with the result.",
  },
  {
    name: 'Tom Jung',
    role: 'Director, Data Platform, Elevance Health, Inc.',
    quote:
      'They migrated services from Teradata On-Prem to Teradata Vantage, improving system performance by 5% and reducing costs by 25%. Highly professional, strategic and results-driven. The team consistently exceeded expectations.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => {
    setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, go, index]);

  const t = testimonials[index];

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="container-x">
        <Eyebrow rule index="06" className="mb-14">
          Client voices
        </Eyebrow>

        <div className="relative min-h-[22rem] pt-12 sm:min-h-[20rem] sm:pt-16">
          <span
            className="font-display pointer-events-none absolute -top-10 -left-2 text-[10rem] leading-none text-brand select-none sm:-top-16 sm:text-[14rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.7, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              className="relative cursor-grab active:cursor-grabbing"
              data-cursor="Drag"
            >
              <blockquote className="font-display max-w-5xl text-[clamp(1.625rem,3.6vw,3.25rem)] leading-[1.15] font-medium text-paper">
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="bg-brand-gradient grid h-12 w-12 place-items-center font-mono text-sm font-medium text-ink">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span>
                  <span className="block font-medium text-paper">{t.name}</span>
                  <span className="block text-sm text-mute">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-12 w-12 place-items-center border border-line-strong text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-12 w-12 place-items-center border border-line-strong text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="ml-4 flex flex-1 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="relative h-1 flex-1 max-w-24 overflow-hidden bg-line-strong"
              >
                <span
                  className={`bg-brand absolute inset-0 origin-left transition-transform duration-500 ${i === index ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            ))}
          </div>
          <p className="font-mono text-sm text-paper-dim tabular-nums" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
