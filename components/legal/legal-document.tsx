import type { ReactNode } from 'react';
import { Reveal, SplitText } from '@/components/site/reveal';
import { ButtonLink, Eyebrow, PixelMark } from '@/components/site/ui';
import { siteConfig } from '@/lib/site-config';
import { LegalToc } from '@/components/legal/legal-toc';

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

/**
 * Long-form legal layout: sticky numbered index on the left, prose on the right.
 * Server-rendered; only the table of contents hydrates (for active-section state).
 */
export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  const total = String(sections.length).padStart(2, '0');

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]">
            <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-[calc(var(--nav-h)+2rem)] border-t border-line pt-10 pb-16 first:border-t-0 first:pt-0 last:pb-0 sm:pb-20"
              >
                <Reveal>
                  <p className="eyebrow flex items-center gap-3">
                    <span className="inline-block h-2 w-2 bg-brand" aria-hidden="true" />
                    <span className="text-paper-dim">({num})</span>
                    <span>
                      Section {num} / {total}
                    </span>
                  </p>
                  <h2
                    id={`${s.id}-title`}
                    className="font-display mt-5 text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.02] font-semibold text-paper"
                  >
                    {s.title}
                  </h2>
                  <div className="prose-bx mt-8 max-w-[68ch]">{s.body}</div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Hero aside: hairline meta grid with the revision date and a contact line. */
export function LegalMeta({ updated, updatedIso, sections }: { updated: string; updatedIso: string; sections: number }) {
  return (
    <dl className="grid grid-cols-2 border-t border-l border-line">
      <div className="border-r border-b border-line p-6">
        <dt className="eyebrow">Last updated</dt>
        <dd className="font-display mt-3 text-2xl leading-tight font-semibold text-paper">
          <time dateTime={updatedIso}>{updated}</time>
        </dd>
      </div>
      <div className="border-r border-b border-line p-6">
        <dt className="eyebrow">Sections</dt>
        <dd className="font-display mt-3 text-2xl leading-tight font-semibold text-paper tabular-nums">
          {String(sections).padStart(2, '0')}
        </dd>
      </div>
      <div className="col-span-2 border-r border-b border-line p-6">
        <dt className="eyebrow">Questions</dt>
        <dd className="mt-3 flex items-center justify-between gap-4">
          <a href={`mailto:${siteConfig.email}`} className="link-line text-lg text-paper">
            {siteConfig.email}
          </a>
          <PixelMark className="h-6 w-6 shrink-0" />
        </dd>
      </div>
    </dl>
  );
}

/** Closing call to action shared by the legal pages. */
export function LegalCta({
  index,
  eyebrow,
  title,
  text,
  secondary,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  text: string;
  secondary: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 sm:py-36">
      <div
        className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <Eyebrow rule index={index} className="mb-12">
          {eyebrow}
        </Eyebrow>
      </div>
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SplitText
            as="h2"
            text={title}
            className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
          />
        </div>
        <Reveal className="lg:col-span-4">
          <p className="text-paper-dim">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href={secondary.href} variant="ghost">
              {secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
