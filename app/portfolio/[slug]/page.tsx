import type { Metadata } from 'next';
import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { portfolioProjects, getProjectBySlug } from '@/lib/portfolio-data';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Eyebrow } from '@/components/site/ui';
import { SplitText, Reveal, RevealGroup, RevealItem, ScrollText } from '@/components/site/reveal';
import { ParallaxImage } from '@/components/portfolio/parallax-image';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const pad = (n: number) => String(n).padStart(2, '0');

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found',
      description: 'The project you are looking for does not exist.',
    };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: [...project.services, ...project.techStack, project.industry].join(', '),
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://www.bitropix.com/portfolio/${project.slug}`,
      type: 'article',
      images: [
        {
          url: `https://www.bitropix.com${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metaTitle,
      description: project.metaDescription,
      images: [`https://www.bitropix.com${project.image}`],
    },
    alternates: {
      canonical: `https://www.bitropix.com/portfolio/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const total = portfolioProjects.length;
  const currentIndex = portfolioProjects.findIndex((p) => p.slug === project.slug);
  const nextIndex = (currentIndex + 1) % total;
  const nextProject = portfolioProjects[nextIndex];
  const domain = project.url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.bitropix.com/portfolio' },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://www.bitropix.com/portfolio/${project.slug}`,
      },
    ],
  };

  const meta = [
    { label: 'Industry', value: [project.industry] },
    { label: 'Category', value: [project.category] },
    { label: 'Services', value: project.services },
    { label: 'Stack', value: project.techStack },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <PageHero
          title={project.title}
          crumbs={[{ label: 'Portfolio', href: '/portfolio' }, { label: project.title }]}
          description={
            <>
              <p className="font-display text-paper text-2xl leading-tight font-medium sm:text-3xl">
                &ldquo;{project.tagline}&rdquo;
              </p>
              <p className="mt-6">{project.description}</p>
            </>
          }
        >
          <ButtonLink href={project.url} aria-label={`Visit live site: ${project.title} (opens in a new tab)`}>
            Visit live site
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Start a similar project
          </ButtonLink>
        </PageHero>

        {/* Meta row + hero image */}
        <section className="pt-16 pb-24 sm:pt-20 sm:pb-36">
          <div className="container-x">
            <RevealGroup as="div" className="border-line grid border-t border-l sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m) => (
                <RevealItem key={m.label} className="border-line border-r border-b p-6 sm:p-8">
                  <dl>
                    <dt className="eyebrow mb-4">{m.label}</dt>
                    {m.value.map((v) => (
                      <dd key={v} className="text-paper">
                        {v}
                      </dd>
                    ))}
                  </dl>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-6">
              <ParallaxImage src={project.image} alt={`${project.title} website homepage`} />
            </div>
            <p className="eyebrow mt-4 flex items-center justify-between gap-4">
              <span>Live at {domain}</span>
              <span>
                {pad(currentIndex + 1)} / {pad(total)}
              </span>
            </p>
          </div>
        </section>

        {/* Challenge / Solution */}
        {[
          { index: '01', eyebrow: 'Brief', label: 'The challenge', text: project.challenge },
          { index: '02', eyebrow: 'Approach', label: 'Our solution', text: project.solution },
        ].map((block) => (
          <section key={block.index} className="border-line border-t py-24 sm:py-36">
            <div className="container-x relative">
              <Eyebrow rule index={block.index} className="mb-12">
                {block.eyebrow}
              </Eyebrow>
            </div>
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SplitText
                  as="h2"
                  text={block.label}
                  className="font-display text-paper block text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-semibold"
                />
              </div>
              <div className="lg:col-span-8">
                <ScrollText
                  text={block.text}
                  className="font-display text-paper text-[clamp(1.5rem,3vw,2.625rem)] leading-[1.15] font-medium"
                />
              </div>
            </div>
          </section>
        ))}

        {/* Features */}
        <section className="border-line bg-ink-2 border-t py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="03" className="mb-12">
              Features
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="What we built."
                  className="font-display text-paper block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  {pad(project.features.length)} capabilities shipped for {project.title}, from first sketch to
                  production.
                </p>
              </Reveal>
            </div>

            <RevealGroup as="ul" className="border-line grid border-t border-l sm:grid-cols-2 lg:grid-cols-4">
              {project.features.map((feature, i) => (
                <RevealItem
                  as="li"
                  key={feature}
                  className="group border-line relative flex min-h-56 flex-col justify-between gap-10 border-r border-b p-6 sm:p-8"
                >
                  <i
                    className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="eyebrow">{pad(i + 1)}</span>
                  <p className="text-paper text-lg leading-snug">{feature}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Results */}
        <section className="border-line border-t py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="04" className="mb-12">
              Results
            </Eyebrow>
          </div>
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SplitText
                as="h2"
                text="The outcome."
                className="font-display text-paper block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold"
              />
            </div>
            <div className="lg:col-span-8">
              <RevealGroup as="ul" className="border-line border-t">
                {project.results.map((result) => (
                  <RevealItem as="li" key={result} className="border-line flex gap-5 border-b py-8 sm:gap-8 sm:py-10">
                    <i className="bg-brand mt-[0.45em] h-3 w-3 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
                    <p className="font-display text-paper text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.08] font-medium">
                      {result}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal className="mt-12 flex flex-wrap gap-3">
                <ButtonLink href={project.url} aria-label={`Visit ${domain} (opens in a new tab)`}>
                  Visit {domain}
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="ghost">
                  All work
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="border-line bg-ink-2 border-t py-24 sm:py-36">
            <div className="container-x relative">
              <Eyebrow rule className="mb-12" index="05">In their words</Eyebrow>
            </div>
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
              </div>
              <Reveal className="lg:col-span-9">
                <figure>
                  <span className="font-display text-brand block text-[6rem] leading-[0.6]" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="font-display text-paper mt-6 text-[clamp(1.875rem,4.4vw,4rem)] leading-[1.08] font-medium">
                    {project.testimonial}
                  </blockquote>
                  <figcaption className="eyebrow mt-10">{project.title}</figcaption>
                </figure>
              </Reveal>
            </div>
          </section>
        )}

        {/* Next project */}
        <section className="border-line border-t">
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group relative block overflow-hidden"
            data-cursor="Next"
          >
            <span
              className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              aria-hidden="true"
            />
            <div className="container-x relative grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="eyebrow mb-8 flex items-center gap-3">
                  <span className="bg-brand inline-block h-2 w-2" aria-hidden="true" />
                  <span>Next project</span>
                  <span className="text-paper-dim">
                    ({pad(nextIndex + 1)} / {pad(total)})
                  </span>
                </h2>
                <p className="font-display text-paper group-hover:text-brand text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-semibold transition-colors duration-500">
                  {nextProject.title}
                </p>
                <div className="mt-8 flex items-center gap-5">
                  <span className="border-line-strong text-paper group-hover:border-brand group-hover:bg-brand grid h-14 w-14 shrink-0 place-items-center border transition-all duration-500 group-hover:rotate-45 group-hover:text-ink">
                    <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="text-paper-dim max-w-md">{nextProject.tagline}</p>
                </div>
              </div>
              <div className="border-line bg-ink-3 relative aspect-[16/10] overflow-hidden border transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:col-span-5 lg:[clip-path:inset(100%_0_0_0)] lg:group-hover:[clip-path:inset(0_0_0_0)] lg:group-focus-visible:[clip-path:inset(0_0_0_0)]">
                <SmartImage
                  src={nextProject.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="scale-110 object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                />
              </div>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
