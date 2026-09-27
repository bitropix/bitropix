'use client';

import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';

const services = [
  {
    id: 'web',
    title: 'Web Development',
    tags: ['Next.js', 'SaaS', 'E-commerce'],
    image: '/images/services/web.webp',
    blurb: 'Fast, SEO-ready websites and web apps, from launch pages to enterprise platforms.',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    tags: ['iOS', 'Android', 'Flutter'],
    image: '/images/services/mobile.webp',
    blurb: 'Native and cross-platform apps with offline-first architecture and polished UX.',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    tags: ['Research', 'Systems', 'Prototypes'],
    image: '/images/services/design.webp',
    blurb: 'Research-led interfaces and design systems that turn visitors into customers.',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    tags: ['AWS', 'Azure', 'GCP'],
    image: '/images/services/cloud.webp',
    blurb: 'Zero-downtime migrations and cloud-native infrastructure that costs less to run.',
  },
  {
    id: 'marketing',
    title: 'SEO & Growth',
    tags: ['SEO', 'PPC', 'Content'],
    image: '/images/services/growth.webp',
    blurb: 'Data-driven search, paid and content programs with ROI you can track.',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    tags: ['Automation', 'ERP', 'AI'],
    image: '/images/services/transformation.webp',
    blurb: 'Modernise legacy systems, automate workflows and get ready for an AI-first future.',
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    tags: ['Firmware', 'RTOS', 'Hardware'],
    image: '/images/services/embedded.webp',
    blurb: 'Custom firmware and embedded solutions for smart hardware and automation.',
  },
  {
    id: 'iot',
    title: 'IoT Solutions',
    tags: ['Edge', 'Telemetry', 'Analytics'],
    image: '/images/services/iot.webp',
    blurb: 'Connected device platforms with real-time monitoring and predictive analytics.',
  },
];

/**
 * Interactive index: hovering a row reveals a floating preview that trails
 * the pointer (desktop). Touch devices get the inline blurb instead.
 */
export function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-x">
        <Eyebrow rule index="02" className="mb-12">
          Capabilities
        </Eyebrow>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SplitText
              as="h2"
              text="Everything you need to launch, scale and win."
              className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-paper-dim">
              Eight disciplines under one roof, so strategy, design, engineering and marketing move as one team.
            </p>
          </Reveal>
        </div>

        <ul
          ref={listRef}
          className="relative border-t border-line"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          {services.map((s, i) => (
            <li key={s.id} onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}>
              <Link
                href={`/services#${s.id}`}
                className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-6 sm:grid-cols-[5rem_1fr_auto] sm:py-8"
                data-cursor="Explore"
              >
                <span
                  className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="eyebrow relative">{String(i + 1).padStart(2, '0')}</span>
                <span className="relative">
                  <span className="font-display block text-[clamp(1.75rem,4.6vw,4rem)] leading-none font-semibold text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brand">
                    {s.title}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm text-mute md:hidden">{s.blurb}</span>
                </span>
                <span className="relative flex items-center gap-2">
                  <span className="hidden gap-2 xl:flex">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="grid h-11 w-11 place-items-center border border-line-strong text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}

          {/* floating preview (desktop, mouse only) */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 z-10 hidden h-64 w-80 -translate-x-1/2 -translate-y-1/2 md:block"
            style={{ x: sx, y: sy }}
            aria-hidden="true"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={services[active].id}
                  className="absolute inset-0 overflow-hidden border border-line-strong bg-ink-2"
                  initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0 50% 0)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0)' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SmartImage src={services[active].image} alt="" fill sizes="320px" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-4 text-sm leading-snug text-paper backdrop-blur">
                    {services[active].blurb}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>

        <Reveal className="mt-12">
          <ButtonLink href="/services" variant="ghost">
            All services in detail
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
