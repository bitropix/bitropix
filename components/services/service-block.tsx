import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, Eyebrow } from '@/components/site/ui';
import { Reveal, RevealGroup, RevealItem, SplitText } from '@/components/site/reveal';
import { ServiceImage } from '@/components/services/service-image';

export interface ServiceBlockData {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
  shortLabel: string;
  related: { id: string; label: string }[];
}

/**
 * One editorial block per service: oversized outlined index, copy, a hairline
 * feature grid, stack tags, related-service anchors and a sticky image.
 * Alternates left/right on desktop.
 */
export function ServiceBlock({ service, index, total }: { service: ServiceBlockData; index: number; total: number }) {
  const num = String(index + 1).padStart(2, '0');
  const reverse = index % 2 === 1;

  return (
    <article id={service.id} className="scroll-mt-20 border-t border-line py-24 first-of-type:border-t-0 sm:py-32">
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-x-12">
        {/* copy */}
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <Reveal className="flex items-end gap-5">
            <span
              className="font-display block text-[clamp(5rem,13vw,11rem)] leading-[0.78] font-semibold text-transparent [-webkit-text-stroke:1px_var(--line-strong)]"
              aria-hidden="true"
            >
              {num}
            </span>
            <Eyebrow className="mb-3">{`of ${String(total).padStart(2, '0')}`}</Eyebrow>
          </Reveal>

          <SplitText
            as="h2"
            text={service.title}
            className="font-display mt-10 block text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[0.95] font-semibold text-paper"
          />

          <Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">{service.description}</p>
          </Reveal>

          <h3 className="eyebrow mt-14 mb-4">What we deliver</h3>
          <RevealGroup as="ul" stagger={0.05} className="grid border-t border-l border-line sm:grid-cols-2">
            {service.features.map((f) => (
              <RevealItem as="li" key={f} className="group relative border-r border-b border-line">
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="relative flex items-start gap-3 p-5">
                  <span
                    className="mt-[0.45em] h-1.5 w-1.5 shrink-0 bg-mute transition-colors duration-300 group-hover:bg-brand"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] leading-snug text-paper-dim transition-colors duration-300 group-hover:text-paper">
                    {f}
                  </span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-4">Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {service.related.length > 0 && (
              <div>
                <h3 className="eyebrow mb-4">Pairs well with</h3>
                <ul className="flex flex-wrap gap-2">
                  {service.related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`#${r.id}`}
                        className="tag group/rel transition-colors duration-300 hover:border-brand hover:text-paper"
                      >
                        {r.label}
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/rel:rotate-45 group-hover/rel:text-brand"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal className="mt-14">
            <ButtonLink href="/contact" aria-label={`Get a quote for ${service.title}`}>
              Get a quote
            </ButtonLink>
          </Reveal>
        </div>

        {/* image */}
        <div
          className={`lg:sticky lg:top-24 lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}
        >
          <ServiceImage src={service.image} alt={`${service.title} by Bitropix`} from={reverse ? 'left' : 'right'} />
          <p className="eyebrow mt-4 flex items-center justify-between gap-4">
            <span>Fig. {num}</span>
            <span>{service.shortLabel}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
