'use client';

import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { portfolioProjects, type PortfolioProject } from '@/lib/portfolio-data';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';

const featured = portfolioProjects.slice(0, 4);

function WorkCard({
  project,
  index,
  total,
  progress,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks slightly as the ones after it slide over (stacking deck).
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const imgScale = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [1.15, 1]);

  return (
    <div
      className="sticky pb-6"
      // each card pins a little lower than the previous one, so the stack reads as a neat deck
      style={{ zIndex: index + 1, top: `calc(var(--nav-h) + 1rem + ${index * 1.25}rem)` }}
    >
      <motion.article style={{ scale }} className="origin-top border border-line bg-ink-2">
        <Link
          href={`/portfolio/${project.slug}`}
          className="group grid lg:min-h-[70svh] lg:grid-cols-12"
          data-cursor="View"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <SmartImage
                src={project.image}
                alt={`${project.title} website`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </motion.div>
            <span className="eyebrow absolute top-4 left-4 bg-ink/80 px-2 py-1 text-paper backdrop-blur">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-5">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="tag tag-brand">{project.industry}</span>
                <span className="tag">{project.category}</span>
              </div>
              <h3 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] font-semibold text-paper">
                {project.title}
              </h3>
              <p className="mt-4 text-lg text-paper-dim">{project.tagline}</p>
            </div>
            <div>
              <ul className="space-y-3 border-t border-line pt-6">
                {project.results.slice(0, 3).map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-paper-dim">
                    <i className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-paper">
                <span className="link-line">View case study</span>
                <span className="h-px w-10 bg-paper transition-all duration-500 group-hover:w-16 group-hover:bg-brand" />
              </p>
            </div>
          </div>
        </Link>
      </motion.article>
    </div>
  );
}

export function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-x">
        <Eyebrow rule index="03" className="mb-12">
          Selected work
        </Eyebrow>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SplitText
              as="h2"
              text="Work that moves the needle."
              className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
            />
          </div>
          <Reveal className="flex lg:col-span-4 lg:justify-end">
            <ButtonLink href="/portfolio" variant="ghost">
              All projects
            </ButtonLink>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {featured.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
