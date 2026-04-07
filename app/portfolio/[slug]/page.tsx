import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Globe,
  Layers,
  Target,
  Lightbulb,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { portfolioProjects, getProjectBySlug } from '@/lib/portfolio-data';
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/animate';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

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
      title: 'Project Not Found | Bitropix Portfolio',
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

  const currentIndex = portfolioProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? portfolioProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioProjects.length - 1 ? portfolioProjects[currentIndex + 1] : null;
  const otherProjects = portfolioProjects.filter((p) => p.slug !== project.slug);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'Portfolio', href: '/portfolio' }, { label: project.title }]} />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E03B37]/8 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <FadeInLeft>
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-3 py-1 text-xs font-medium text-[#E03B37]">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-gray-400">
                      {project.industry}
                    </span>
                  </div>
                  <h1 className="mb-3 text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
                  <p className="mb-4 text-xl font-medium text-[#E03B37]">&ldquo;{project.tagline}&rdquo;</p>
                  <p className="mb-8 text-lg leading-relaxed text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/20"
                    >
                      Visit Live Website <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                    >
                      Start Your Project
                    </Link>
                  </div>
                </div>
              </FadeInLeft>
              <FadeInRight>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-[#E03B37]/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Services & Tech Stack */}
        <section className="border-y border-white/10 bg-[#111119]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <FadeIn>
                <div className="py-8 sm:pr-8">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-[#E03B37] uppercase">
                    <Layers className="h-4 w-4" /> Services Provided
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="py-8 sm:pl-8">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-[#E03B37] uppercase">
                    <Code2 className="h-4 w-4" /> Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="bg-[#0a0a12] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <FadeInLeft>
                <div className="h-full rounded-lg border border-white/10 bg-[#111119] p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#E03B37]/10">
                    <Target className="h-6 w-6 text-[#E03B37]" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-white">The Challenge</h2>
                  <p className="leading-relaxed text-gray-400">{project.challenge}</p>
                </div>
              </FadeInLeft>
              <FadeInRight>
                <div className="h-full rounded-lg border border-white/10 bg-[#111119] p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#E03B37]/10">
                    <Lightbulb className="h-6 w-6 text-[#E03B37]" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-white">Our Solution</h2>
                  <p className="leading-relaxed text-gray-400">{project.solution}</p>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-[#0e0e18] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-12 text-center">
                <p className="mb-2 font-semibold tracking-wide text-[#E03B37] uppercase">Features</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Key Features We Built</h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.features.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="flex h-full items-start gap-3 rounded-lg border border-white/10 bg-[#111119] p-5 transition-all duration-300 hover:border-[#E03B37]/20">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E03B37]" />
                    <p className="text-sm leading-relaxed text-gray-300">{feature}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Results */}
        <section className="bg-[#0a0a12] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-12 text-center">
                <p className="mb-2 font-semibold tracking-wide text-[#E03B37] uppercase">Impact</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Results & Impact</h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.results.map((result, index) => (
                <StaggerItem key={result}>
                  <div className="h-full rounded-lg border border-white/10 bg-[#111119] p-6 text-center transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E03B37]/10 text-lg font-bold text-[#E03B37]">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{result}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Visit Website CTA */}
        <section className="border-y border-white/10 bg-[#111119]">
          <FadeIn>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#E03B37]/10">
                    <Globe className="h-7 w-7 text-[#E03B37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">See {project.title} Live</h3>
                    <p className="text-sm text-gray-400">Visit the website and experience it yourself</p>
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/20"
                >
                  Visit {project.url.replace('https://', '').replace('www.', '').replace(/\/$/, '')}{' '}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Project Navigation */}
        <section className="bg-[#0a0a12] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {prevProject ? (
                <Link
                  href={`/portfolio/${prevProject.slug}`}
                  className="group rounded-lg border border-white/10 bg-[#111119] p-6 transition-all duration-300 hover:border-[#E03B37]/30"
                >
                  <span className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                    <ArrowLeft className="h-3 w-3" /> Previous Project
                  </span>
                  <p className="font-bold text-white transition-colors group-hover:text-[#E03B37]">
                    {prevProject.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{prevProject.industry}</p>
                </Link>
              ) : (
                <div />
              )}
              {nextProject && (
                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="group rounded-lg border border-white/10 bg-[#111119] p-6 text-right transition-all duration-300 hover:border-[#E03B37]/30"
                >
                  <span className="mb-2 flex items-center justify-end gap-1 text-xs text-gray-400">
                    Next Project <ArrowRight className="h-3 w-3" />
                  </span>
                  <p className="font-bold text-white transition-colors group-hover:text-[#E03B37]">
                    {nextProject.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{nextProject.industry}</p>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Other Projects */}
        <section className="border-t border-white/10 bg-[#0e0e18] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold text-white">More Projects</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {otherProjects.map((other) => (
                <StaggerItem key={other.id}>
                  <Link href={`/portfolio/${other.slug}`} className="group block">
                    <div className="h-full overflow-hidden rounded-lg border border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={other.image}
                          alt={other.title}
                          fill
                          className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <span className="mb-3 inline-block rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-2.5 py-0.5 text-xs font-medium text-[#E03B37]">
                          {other.industry}
                        </span>
                        <h3 className="mb-1 font-bold text-white transition-colors group-hover:text-[#E03B37]">
                          {other.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-gray-400">{other.tagline}</p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-[#0a0a12] py-16 sm:py-20">
          <FadeIn>
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Want a Website Like{' '}
                <span className="bg-gradient-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  {project.title}
                </span>
                ?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
                Let&apos;s build something amazing together. Tell us about your project and we&apos;ll make it happen.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/20"
              >
                Get in Touch <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
