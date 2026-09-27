import type { Metadata } from 'next';
import { portfolioProjects } from '@/lib/portfolio-data';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Eyebrow } from '@/components/site/ui';
import { SplitText, Reveal, ScrollText } from '@/components/site/reveal';
import { WorkIndex, type WorkItem } from '@/components/portfolio/work-index';

export const metadata: Metadata = {
  title: 'Portfolio | Our Work',
  description:
    'Explore our portfolio of successful projects across events, travel, beauty, agriculture, infrastructure, and staffing industries. See how Bitropix delivers digital solutions that drive real results.',
  keywords: [
    'web development portfolio',
    'Bitropix projects',
    'case studies',
    'Next.js projects',
    'digital agency portfolio',
    'website design portfolio India',
  ],
  openGraph: {
    title: 'Portfolio | Our Work',
    description:
      'Explore our portfolio of successful projects. From travel platforms to corporate websites, see the digital solutions we build.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bitropix.com/portfolio',
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function PortfolioPage() {
  const industries = [...new Set(portfolioProjects.map((p) => p.industry))];
  const disciplines = new Set(portfolioProjects.flatMap((p) => p.services));

  const stats = [
    { label: 'Projects', value: portfolioProjects.length },
    { label: 'Industries', value: industries.length },
    { label: 'Disciplines', value: disciplines.size },
  ];

  const items: WorkItem[] = portfolioProjects.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    image: p.image,
    category: p.category,
    industry: p.industry,
    n: i + 1,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.bitropix.com/portfolio' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <PageHero
          title="Projects that drive real results."
          crumbs={[{ label: 'Portfolio' }]}
          description="We don't just build websites. We craft digital experiences that transform businesses. Explore the work across industries and see the impact it creates."
          aside={
            <div>
              <dl className="border-line grid grid-cols-3 border-t border-l">
                {stats.map((s) => (
                  <div key={s.label} className="border-line flex flex-col-reverse border-r border-b p-5 sm:p-6">
                    <dt className="eyebrow mt-3">{s.label}</dt>
                    <dd className="font-display text-paper text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold">
                      {pad(s.value)}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Industries">
                {industries.map((ind) => (
                  <li key={ind} className="tag">
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            What we do
          </ButtonLink>
        </PageHero>

        {/* Work index */}
        <section id="work" className="py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              Index
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="Every project, built to perform."
                  className="font-display text-paper block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Websites, platforms and storefronts for teams in {industries.length} industries. Filter by the kind of
                  build, or switch to the list to scan everything at once.
                </p>
              </Reveal>
            </div>

            <WorkIndex items={items} />
          </div>
        </section>

        {/* Approach statement */}
        <section className="border-line bg-ink-2 border-t py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule className="mb-12" index="03">Approach</Eyebrow>
          </div>
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
            </div>
            <div className="lg:col-span-9">
              <h2 className="sr-only">How we approach every project</h2>
              <ScrollText
                className="font-display text-paper text-[clamp(1.875rem,4.4vw,4rem)] leading-[1.08] font-medium"
                text="Every project here started with a conversation. We learn the business first, then design, engineer and ship a product that is fast, findable and built to convert."
              />
              <Reveal className="mt-12 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Discuss your project</ButtonLink>
                <ButtonLink href="/about" variant="ghost">
                  Meet the studio
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
