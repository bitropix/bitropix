import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Eyebrow, PixelMark } from '@/components/site/ui';
import { Reveal, RevealGroup, RevealItem, ScrollText, SplitText } from '@/components/site/reveal';
import { Counter } from '@/components/about/counter';
import { ParallaxImage } from '@/components/about/parallax-image';
import { Timeline } from '@/components/about/timeline';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'About Bitropix | Leading IT Services Company in New Delhi, India' },
  description:
    'Learn about Bitropix, a leading IT services company in New Delhi, India. Founded in 2023, we serve 50+ clients with expert website development, app development, SEO, and digital marketing solutions.',
  keywords: 'IT company Delhi, about Bitropix, IT services India, digital transformation company, tech company New Delhi',
  alternates: {
    canonical: 'https://www.bitropix.com/about',
  },
};

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
  },
  {
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in all our business dealings.',
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both internally and with our clients.',
  },
  {
    title: 'Innovation',
    description: 'We continuously explore new technologies to deliver cutting-edge solutions.',
  },
];

const milestones = [
  {
    year: '2023',
    title: 'Founded',
    description: 'Bitropix was founded with a vision to transform businesses through technology.',
  },
  {
    year: '2023',
    title: 'First major client',
    description: 'Secured our first enterprise client and delivered a successful ERP implementation.',
  },
  {
    year: '2024',
    title: 'Team expansion',
    description: 'Grew to 15+ team members and expanded our service offerings.',
  },
  {
    year: '2024',
    title: 'Product launch',
    description: 'Launched our flagship HRMS and E-commerce products.',
  },
  {
    year: '2025',
    title: '50+ clients',
    description: 'Reached the milestone of serving 50+ happy clients across industries.',
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Projects delivered' },
  { value: 50, suffix: '+', label: 'Happy clients' },
  { value: 25, suffix: '+', label: 'Team members' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
];

const awards = [
  {
    title: 'Top IT Services Company 2025',
    organization: 'Clutch.co',
    year: '2025',
  },
  {
    title: 'Best Startup: Technology',
    organization: 'Startup India',
    year: '2024',
  },
  {
    title: 'Excellence in Digital Transformation',
    organization: 'NASSCOM',
    year: '2024',
  },
];

const H2 = 'font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper';

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.bitropix.com/about' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <PageHero
          title="A studio built by makers."
          crumbs={[{ label: 'About Us' }]}
          description={
            <p>
              Founded in 2023, Bitropix has grown from a small team with a big vision into 25+ designers, engineers and
              strategists serving 50+ clients across industries.
            </p>
          }
          aside={
            <dl className="border-t border-line">
              {[
                { k: 'Founded', v: siteConfig.founded },
                { k: 'Studio', v: siteConfig.location },
                { k: 'Team', v: '25+ makers' },
                { k: 'Serving', v: 'India, US, UK, UAE, Australia' },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="eyebrow">{row.k}</dt>
                  <dd className="text-right text-paper">{row.v}</dd>
                </div>
              ))}
            </dl>
          }
        >
          <ButtonLink href="/contact">Work with us</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            Our services
          </ButtonLink>
        </PageHero>

        {/* Manifesto */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule className="mb-12" index="01">Manifesto</Eyebrow>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-3">
              </div>
              <div className="lg:col-span-9">
                <h2 className="sr-only">Our manifesto</h2>
                <ScrollText
                  className="font-display text-[clamp(1.875rem,4.4vw,4rem)] leading-[1.08] font-medium text-paper"
                  text="We combine technical expertise with deep business understanding to build products that drive real, measurable results. Developers, designers and strategists, working as one team to turn your vision into reality."
                />
                <Reveal className="mt-14 grid gap-8 text-paper-dim sm:grid-cols-2">
                  <p className="leading-relaxed">
                    Bitropix is an IT services company based in {siteConfig.location}. In just two years we have grown
                    into a team of 25+ professionals serving <strong className="font-medium text-paper">50+ clients</strong>{' '}
                    across healthcare, e-commerce, fintech and education.
                  </p>
                  <p className="leading-relaxed">
                    You talk to the people who build your product. No hand-offs, no black boxes: one senior team from
                    discovery to launch, and still there after it.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal className="mt-24">
              <ParallaxImage
                src="/images/studio/about.webp"
                alt="Bitropix team collaborating in a modern office"
                className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
              >
                <div className="absolute bottom-0 left-0 flex items-end gap-5 bg-brand p-6 text-ink sm:p-8">
                  <p className="font-display text-5xl leading-none font-semibold sm:text-6xl">2+</p>
                  <p className="pb-1 font-mono text-xs tracking-[0.14em] uppercase">
                    Years of
                    <br />
                    excellence
                  </p>
                </div>
                <PixelMark className="absolute top-6 right-6 h-6 w-6" />
              </ParallaxImage>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              In numbers
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText as="h2" text="Small studio. Serious output." className={H2} />
              </div>
            </div>
            <RevealGroup className="grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
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
          </div>
        </section>

        {/* Mission & vision */}
        <section className="relative bg-ink-2 py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="03" className="mb-12">
              Purpose
            </Eyebrow>
            <SplitText as="h2" text="Why we exist." className={H2} />

            <div className="mt-20 grid border-t border-line lg:grid-cols-2">
              {[
                {
                  label: 'Mission',
                  lead: 'Empower businesses with technology that drives growth, efficiency and competitive advantage.',
                  body: 'We aim to be the catalyst for digital transformation, helping organizations of all sizes harness the power of technology.',
                },
                {
                  label: 'Vision',
                  lead: 'Be recognized globally as a trusted technology partner known for excellence and innovation.',
                  body: 'We envision a future where every business, regardless of size, has access to world-class IT solutions.',
                },
              ].map((col, i) => (
                <Reveal
                  key={col.label}
                  delay={i * 0.12}
                  className={`pt-10 lg:pt-14 ${i === 0 ? 'pb-14 lg:pr-14 lg:pb-0' : 'border-t border-line lg:border-t-0 lg:border-l lg:pl-14'}`}
                >
                  <p className="eyebrow flex items-center gap-3">
                    <span className="text-paper-dim">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
                  </p>
                  <h3 className="font-display mt-6 text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold text-brand">
                    Our {col.label.toLowerCase()}
                  </h3>
                  <p className="font-display mt-8 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.15] font-medium text-paper">
                    {col.lead}
                  </p>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-dim">{col.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="04" className="mb-12">
              Values
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText as="h2" text="What drives us." className={H2} />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Our core values guide everything we do, from how we work with clients to how we grow as a company.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <RevealItem key={v.title} className="group relative border-r border-b border-line">
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full min-h-80 flex-col p-8 sm:p-10">
                    <div className="flex items-start justify-between">
                      <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className="h-2 w-2 bg-line-strong transition-colors duration-300 group-hover:bg-brand"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-display mt-auto pt-16 text-4xl font-semibold text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                      {v.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-paper-dim">{v.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Journey */}
        <Timeline milestones={milestones} index="05" />

        {/* Awards & recognition */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="06" className="mb-12">
              Recognition
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText as="h2" text="Awards and recognition." className={H2} />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Our commitment to excellence has been recognized by leading industry bodies.
                </p>
              </Reveal>
            </div>

            <div
              className="eyebrow hidden grid-cols-[6rem_1fr_14rem] gap-6 border-b border-line pb-4 md:grid"
              aria-hidden="true"
            >
              <span>Year</span>
              <span>Award</span>
              <span className="text-right">Awarded by</span>
            </div>
            <RevealGroup as="ul" className="border-t border-line md:border-t-0">
              {awards.map((a) => (
                <RevealItem as="li" key={a.title} className="group relative border-b border-line">
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="relative grid gap-2 py-7 sm:py-9 md:grid-cols-[6rem_1fr_14rem] md:items-center md:gap-6">
                    <p className="font-mono text-sm text-mute transition-colors duration-300 group-hover:text-brand">
                      {a.year}
                    </p>
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-semibold text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                      {a.title}
                    </h3>
                    <p className="flex items-center gap-3 text-paper-dim md:justify-end">
                      <span
                        className="h-1.5 w-1.5 bg-line-strong transition-colors duration-300 group-hover:bg-brand"
                        aria-hidden="true"
                      />
                      {a.organization}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Small inline CTA (the global footer carries the big one) */}
            <Reveal className="mt-24 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
              <p className="font-display max-w-xl text-2xl leading-snug font-medium text-paper sm:text-3xl">
                Want to be part of our story? Partner with us, or join the team.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact">Start a project</ButtonLink>
                <ButtonLink href="/careers" variant="ghost">
                  View careers
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
