import type { Metadata } from 'next';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal, RevealGroup, RevealItem } from '@/components/site/reveal';
import { Accordion } from '@/components/site/accordion';
import { LocalTime } from '@/components/site/local-time';
import { ContactForm } from '@/components/contact/contact-form';
import { siteConfig, absoluteUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'Contact Bitropix | Get Free IT Consultation' },
  description:
    'Get in touch with Bitropix for a free IT consultation. Request a quote for web development, mobile apps, ERP, HRMS, and digital marketing services. Response within 2 hours.',
  keywords: [
    'contact Bitropix',
    'free IT consultation',
    'get a quote',
    'IT services consultation Delhi',
    'web development quote',
    'software development inquiry',
    'ERP consultation India',
    'digital marketing consultation',
  ],
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
  openGraph: {
    title: 'Contact Bitropix | Get Free IT Consultation',
    description: 'Reach out to Bitropix for a free IT consultation. We respond within 2 hours during business days.',
    type: 'website',
    url: absoluteUrl('/contact'),
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Bitropix',
  description: 'Get in touch with Bitropix for a free IT consultation and project quote.',
  url: absoluteUrl('/contact'),
  mainEntity: {
    '@type': 'Organization',
    name: siteConfig.siteName,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
  },
};

// FAQPage JSON-LD intentionally lives on /faq only, to avoid duplicate structured data.
const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope. A simple website takes 4 to 6 weeks, while complex applications can take 3 to 6 months. You get a detailed timeline with your proposal.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer support packages that cover maintenance, updates and technical support, so everything keeps running smoothly after launch.',
  },
  {
    question: 'Can I hire dedicated developers?',
    answer: 'Yes. Our agile hiring model lets you hire dedicated specialists who work exclusively for your company.',
  },
];

const steps = [
  {
    when: 'Within 2 hours',
    title: 'We review your requirements',
    body: 'Our team reads your brief and analyses the project scope and goals during business hours.',
  },
  {
    when: 'Within 24 hours',
    title: 'Discovery call scheduled',
    body: 'A domain expert reaches out to set up a call, ask the right questions and map the constraints.',
  },
  {
    when: 'After the call',
    title: 'Tailored proposal delivered',
    body: 'You receive a detailed proposal with timeline, tech stack and pricing. No obligation.',
  },
];

const MAPS_URL = 'https://maps.google.com/?q=New+Delhi+India';

function ContactAside() {
  const rows = [
    { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: 'Phone', value: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
    { label: 'Studio', value: siteConfig.location, href: MAPS_URL, external: true },
  ];
  return (
    <dl className="border-t border-line">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-line py-5">
          <dt className="eyebrow">{r.label}</dt>
          <dd>
            <a
              href={r.href}
              className="link-line font-display text-xl font-semibold break-words text-paper transition-colors duration-300 hover:text-brand sm:text-2xl"
              {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {r.value}
              {r.external && <span className="sr-only"> (opens Google Maps in a new tab)</span>}
            </a>
          </dd>
        </div>
      ))}
      <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-line py-5">
        <dt className="eyebrow">Hours</dt>
        <dd className="space-y-1 text-paper-dim">
          <p className="text-paper">Mon to Fri, 9:00 AM to 6:00 PM</p>
          <p>Sat, 10:00 AM to 2:00 PM</p>
          <p className="eyebrow pt-2">
            Delhi now: <LocalTime />
          </p>
        </dd>
      </div>
    </dl>
  );
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />

      <main>
        <PageHero
          title="Tell us what you are building."
          crumbs={[{ label: 'Contact' }]}
          description={
            <p>
              Free consultation, an honest opinion and a clear quote. Share a few details and the right people get back
              to you, usually within 2 hours on business days.
            </p>
          }
          aside={<ContactAside />}
        >
          <ButtonLink href="#brief">Start your brief</ButtonLink>
          <span className="tag tag-brand self-center">Replies within 2 hours</span>
        </PageHero>

        {/* Form */}
        <section id="brief" className="relative scroll-mt-[var(--nav-h)] py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="01" className="mb-12">
              The brief
            </Eyebrow>
          </div>
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                <SplitText
                  as="h2"
                  text="Start with a few details."
                  className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
                />
                <Reveal className="mt-8 space-y-8">
                  <p className="max-w-sm text-paper-dim">
                    Two minutes now saves a week of back and forth. Tell us what you need and we will come back with
                    the right people and a plan.
                  </p>
                  <div>
                    <p className="eyebrow mb-3">Prefer email?</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-line text-lg text-paper transition-colors hover:text-brand"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Follow the studio</p>
                    <div className="flex gap-2">
                      {[
                        { href: siteConfig.social.linkedin, label: 'Bitropix on LinkedIn', Icon: Linkedin },
                        { href: siteConfig.social.instagram, label: 'Bitropix on Instagram', Icon: Instagram },
                      ].map(({ href, label, Icon }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="group relative grid h-12 w-12 place-items-center overflow-hidden border border-line-strong text-paper transition-colors duration-500 hover:border-brand hover:text-ink"
                        >
                          <span
                            className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                            aria-hidden="true"
                          />
                          <Icon className="relative h-5 w-5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section className="relative bg-ink-2 py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              What happens next
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="From hello to kickoff."
                  className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Three simple steps, no sales scripts and no waiting around.
                </p>
              </Reveal>
            </div>

            <RevealGroup as="ol" className="grid border-t border-l border-line md:grid-cols-3">
              {steps.map((s, i) => (
                <RevealItem
                  as="li"
                  key={s.title}
                  className="group relative overflow-hidden border-r border-b border-line p-8 sm:p-10"
                >
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none font-semibold text-paper transition-colors duration-500 group-hover:text-brand">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="tag">{s.when}</span>
                    </div>
                    <h3 className="mt-12 text-xl font-medium text-paper sm:text-2xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-paper-dim">{s.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="03" className="mb-12">
              FAQ
            </Eyebrow>
          </div>
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SplitText
                as="h2"
                text="Before you ask."
                className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
              />
              <Reveal className="mt-8">
                <p className="mb-8 text-paper-dim">
                  Anything else on your mind? Call{' '}
                  <a href={siteConfig.phoneHref} className="link-line text-paper hover:text-brand">
                    {siteConfig.phoneDisplay}
                  </a>{' '}
                  for urgent matters.
                </p>
                <ButtonLink href="/faq" variant="ghost">
                  All FAQs
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-6">
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* Location strip */}
        <section className="border-t border-line">
          <div className="container-x">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Map"
              className="group relative grid grid-cols-[1fr_auto] items-center gap-6 overflow-hidden py-12 sm:py-16"
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="relative">
                <span className="eyebrow block">Studio location</span>
                <span className="font-display mt-3 block text-[clamp(2rem,5vw,4rem)] leading-none font-semibold text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  {siteConfig.location}
                </span>
              </span>
              <span className="relative grid h-14 w-14 place-items-center border border-line-strong text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
                <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open in Google Maps (new tab)</span>
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
