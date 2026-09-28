import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Eyebrow } from '@/components/site/ui';
import { Reveal, RevealGroup, RevealItem, SplitText } from '@/components/site/reveal';
import { Accordion } from '@/components/site/accordion';
import { ServiceIndex } from '@/components/services/service-index';
import { ServiceBlock } from '@/components/services/service-block';
import { services } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'IT Services & Digital Marketing Solutions',
  description:
    'Bitropix offers expert website development, app development, SEO services, cloud solutions, and digital marketing services in India. Get a free consultation today.',
  keywords:
    'website development, app development, SEO services, digital marketing agency India, cloud migration, UI UX design, IoT solutions, IT company Delhi',
  alternates: {
    canonical: 'https://www.bitropix.com/services',
  },
};

/** Short names for the sticky index, figure captions and related-service tags. */
const shortLabels: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  design: 'UI/UX',
  cloud: 'Cloud',
  marketing: 'SEO & Marketing',
  'digital-transformation': 'Transformation',
  embedded: 'Embedded',
  iot: 'IoT',
};

const whyChooseUs = [
  {
    title: 'Expert team',
    description:
      '25+ developers, designers and strategists with deep expertise across every layer of the stack. You work with the people who build.',
  },
  {
    title: 'Proven results',
    description:
      '50+ projects delivered with a 98% client satisfaction rate. We would rather show the dashboard than make promises.',
  },
  {
    title: '24/7 support',
    description:
      'Round-the-clock technical support and a dedicated project manager, so your product never misses a beat.',
  },
  {
    title: 'Honest pricing',
    description:
      'World-class engineering at competitive prices. Transparent quotes with no hidden costs or surprises.',
  },
];

const faqs = [
  {
    question: 'What IT services does Bitropix offer?',
    answer:
      'Bitropix offers a comprehensive range of IT services including website development, mobile app development, UI/UX design, cloud migration, digital marketing and SEO, digital transformation consulting, embedded systems development, and IoT solutions.',
  },
  {
    question: 'How much does website development cost in India?',
    answer:
      'Website development costs vary based on complexity, features, and design requirements. A basic business website starts from INR 25,000, while custom web applications and e-commerce solutions range from INR 1,00,000 to INR 10,00,000+. Contact us for a free, detailed quote.',
  },
  {
    question: 'How long does it take to build a mobile app?',
    answer:
      'A simple mobile app typically takes 8 to 12 weeks, while feature-rich applications may take 4 to 6 months. The timeline depends on app complexity, platform (iOS, Android, or both), and specific feature requirements. We provide a detailed timeline during our free consultation.',
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer:
      'Yes, we offer flexible maintenance and support packages for all our services. This includes bug fixes, security updates, performance monitoring, feature enhancements, and 24/7 technical support to keep your digital products running smoothly.',
  },
  {
    question: 'What is your digital marketing approach?',
    answer:
      'Our digital marketing strategy is 100% data-driven. We start with a thorough audit, define clear KPIs, and execute a multi-channel approach including SEO, PPC, social media, and content marketing. Monthly reporting ensures complete transparency on ROI.',
  },
  {
    question: 'Can you help migrate our systems to the cloud?',
    answer:
      'Absolutely. Our certified cloud architects handle end-to-end cloud migrations on AWS, Azure, and Google Cloud. We ensure zero-downtime migration, data integrity, security compliance, and cost optimization throughout the process.',
  },
];

export default function ServicesPage() {
  const SITE_URL = 'https://www.bitropix.com';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  };

  // FAQPage JSON-LD intentionally omitted here: the canonical source is /faq.

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `${SITE_URL}/services#${service.slug}`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
      },
    })),
  };

  const label = (id: string) => shortLabels[id] ?? services.find((s) => s.id === id)?.title ?? id;
  const indexItems = services.map((s) => ({ id: s.id, label: label(s.id) }));
  const total = services.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main>
        <PageHero
          title="Design, engineering and growth under one roof."
          crumbs={[{ label: 'Services' }]}
          description={
            <p>
              From website development and mobile apps to SEO, cloud migration and IoT, we deliver end-to-end technology
              that drives growth, efficiency and a real competitive edge for businesses across India and beyond.
            </p>
          }
          aside={
            <dl className="grid grid-cols-3 border-t border-l border-line">
              {[
                { k: String(total).padStart(2, '0'), v: 'Disciplines' },
                { k: '50+', v: 'Projects delivered' },
                { k: '98%', v: 'Client satisfaction' },
              ].map((s) => (
                <div key={s.v} className="flex flex-col-reverse border-r border-b border-line p-4 sm:p-6">
                  <dt className="eyebrow mt-3">{s.v}</dt>
                  <dd className="font-display text-3xl font-semibold text-paper sm:text-4xl">{s.k}</dd>
                </div>
              ))}
            </dl>
          }
        >
          <ButtonLink href="/contact">Get a free consultation</ButtonLink>
          <ButtonLink href="#web" variant="ghost">
            Explore services
          </ButtonLink>
        </PageHero>

        {/* Sticky index + editorial service blocks */}
        <div className="relative">
          <ServiceIndex items={indexItems} />
          {services.map((service, i) => (
            <ServiceBlock
              key={service.id}
              index={i}
              total={total}
              service={{
                id: service.id,
                title: service.title,
                description: service.description,
                features: service.features,
                technologies: service.technologies,
                image: service.image,
                shortLabel: label(service.id),
                related: service.relatedServices
                  .filter((rid) => services.some((s) => s.id === rid))
                  .map((rid) => ({ id: rid, label: label(rid) })),
              }}
            />
          ))}
        </div>

        {/* Why us */}
        <section className="relative bg-ink-2 py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              Why Bitropix
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="Craft you can see. Results you can measure."
                  className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Technical excellence with a client-first approach. The same senior team takes you from the first call
                  to launch and beyond.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item, i) => (
                <RevealItem key={item.title} className="group relative border-r border-b border-line">
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <i
                    className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col p-8 sm:p-10">
                    <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display mt-16 text-3xl font-semibold text-paper transition-colors duration-300 group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-paper-dim">{item.description}</p>
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
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                <SplitText
                  as="h2"
                  text="Questions, answered."
                  className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
                />
                <Reveal>
                  <p className="mt-8 max-w-sm text-paper-dim">
                    The things clients ask most before we start. More in the{' '}
                    <Link href="/faq" className="link-line text-paper">
                      full FAQ
                    </Link>
                    .
                  </p>
                </Reveal>
              </div>
            </div>
            <Reveal className="lg:col-span-8">
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* Closing statement */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="04" className="mb-12">
              Next step
            </Eyebrow>
          </div>
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SplitText
                as="h2"
                text="Not sure where to start? Start with a conversation."
                className="font-display block text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
              />
            </div>
            <Reveal className="lg:col-span-4">
              <p className="text-paper-dim">
                No commitment required. We will analyse your requirements and send back a tailored solution roadmap.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact">Book a free consultation</ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
