import type { Metadata } from 'next';
import { groups, allFaqs } from '@/lib/faq-data';
import { siteConfig } from '@/lib/site-config';
import { PageHero } from '@/components/site/page-hero';
import { Accordion } from '@/components/site/accordion';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';
import { FaqNav } from '@/components/faq/faq-nav';

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions',
  description:
    'Answers to the most common questions about Bitropix services: web development, mobile apps, SEO, digital marketing, cloud, pricing, timelines, and how we work.',
  alternates: {
    canonical: 'https://www.bitropix.com/faq',
  },
};

// FAQPage JSON-LD lives here only: this is the canonical FAQ schema for the site.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com/' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.bitropix.com/faq' },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <PageHero
          title="Straight answers, before you ask."
          crumbs={[{ label: 'FAQ' }]}
          description="Everything you need to know about working with Bitropix: services, timelines, pricing and process. If something is missing, just ask."
          aside={
            <dl className="border-line grid grid-cols-2 border-t border-l">
              <div className="border-line border-r border-b p-5 sm:p-6">
                <dt className="eyebrow">Answers</dt>
                <dd className="font-display text-paper mt-3 text-5xl leading-none font-semibold">
                  {String(allFaqs.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="border-line border-r border-b p-5 sm:p-6">
                <dt className="eyebrow">Topics</dt>
                <dd className="font-display text-paper mt-3 text-5xl leading-none font-semibold">
                  {String(groups.length).padStart(2, '0')}
                </dd>
              </div>
            </dl>
          }
        >
          <ButtonLink href="/contact">Ask us directly</ButtonLink>
        </PageHero>

        <section className="py-24 sm:py-32">
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <FaqNav items={groups.map((g) => ({ id: g.id, title: g.title, count: g.faqs.length }))} />
              </div>
            </div>

            <div className="space-y-24 sm:space-y-32 lg:col-span-8 lg:col-start-5">
              {groups.map((group, gi) => (
                <section key={group.id} id={group.id} className="scroll-mt-[calc(var(--nav-h)+2rem)]">
                  <Eyebrow index={String(gi + 1).padStart(2, '0')} className="mb-6">
                    {group.faqs.length} questions
                  </Eyebrow>
                  <SplitText
                    as="h2"
                    text={group.title}
                    className="font-display text-paper block text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] font-semibold"
                  />
                  <Reveal className="mt-6 mb-10">
                    <p className="text-paper-dim max-w-xl">{group.description}</p>
                  </Reveal>
                  <Reveal>
                    <Accordion items={group.faqs} defaultOpen={gi === 0 ? 0 : null} />
                  </Reveal>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-line bg-ink-2 relative overflow-hidden border-t py-24 sm:py-36">
          <div
            className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_60%)]"
            aria-hidden="true"
          />
          <div className="container-x relative">
            <Eyebrow rule className="mb-12">Still curious</Eyebrow>
          </div>
          <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SplitText
                as="h2"
                text="Still have questions?"
                className="font-display text-paper block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold"
              />
              <Reveal className="mt-8">
                <p className="text-paper-dim max-w-xl text-lg">
                  Send us a message and a senior team member will get back to you within 24 hours.
                </p>
              </Reveal>
            </div>
            <Reveal className="flex flex-col gap-6 lg:col-span-4 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact">Talk to us</ButtonLink>
                <ButtonLink href="/services" variant="ghost">
                  Explore services
                </ButtonLink>
              </div>
              <a href={`mailto:${siteConfig.email}`} className="eyebrow link-line text-paper-dim hover:text-paper">
                {siteConfig.email}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
