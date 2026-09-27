'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Eyebrow } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';

const steps = [
  {
    title: 'Discover',
    duration: 'Week 1',
    description:
      'Workshops, audits and user research to understand your business, your customers and what success looks like in numbers.',
    deliverables: ['Goals and KPIs', 'Technical audit', 'Scope and roadmap'],
  },
  {
    title: 'Design',
    duration: 'Weeks 2 to 4',
    description:
      'Wireframes, interface design and clickable prototypes, tested with real users before a single line of production code.',
    deliverables: ['UX flows', 'UI and design system', 'Interactive prototype'],
  },
  {
    title: 'Build',
    duration: 'Weeks 4 to 12',
    description:
      'Agile sprints with demos every two weeks. Clean, tested, documented code on a stack chosen for your scale.',
    deliverables: ['Sprint demos', 'QA and security review', 'Performance budget'],
  },
  {
    title: 'Launch & grow',
    duration: 'Ongoing',
    description:
      'Zero-downtime launch, analytics, SEO and continuous improvement. We stay on as your product and growth partner.',
    deliverables: ['Go-live plan', 'Analytics and SEO', 'Support and iteration'],
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative bg-ink-2 py-24 sm:py-36">
      <div className="container-x">
        <Eyebrow rule index="04" className="mb-12">
          Process
        </Eyebrow>
      </div>
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SplitText
              as="h2"
              text="A clear path from idea to impact."
              className="font-display block text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] font-semibold text-paper"
            />
            <Reveal>
              <p className="mt-8 max-w-md text-paper-dim">
                No black boxes. You see progress every two weeks, own every line of code, and always know what comes
                next.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute top-0 bottom-0 left-[1.1rem] w-px bg-line-strong" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="bg-brand-gradient h-full w-full origin-top" />
          </div>
          <ol className="space-y-20">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pl-16">
                <span
                  className="absolute top-1 left-0 grid h-9 w-9 place-items-center border border-line-strong bg-ink-2 font-mono text-xs text-paper"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Reveal>
                  <p className="eyebrow mb-3">{step.duration}</p>
                  <h3 className="font-display text-4xl font-semibold text-paper sm:text-5xl">{step.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-paper-dim">{step.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="tag">
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
