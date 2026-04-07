import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { portfolioProjects } from '@/lib/portfolio-data';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

export const metadata: Metadata = {
  title: 'Portfolio - Our Work | Bitropix',
  description:
    'Explore our portfolio of successful projects across travel, beauty, agriculture, and infrastructure industries. See how Bitropix delivers digital solutions that drive real results.',
  keywords: [
    'web development portfolio',
    'Bitropix projects',
    'case studies',
    'Next.js projects',
    'digital agency portfolio',
    'website design portfolio India',
  ],
  openGraph: {
    title: 'Portfolio - Our Work | Bitropix',
    description:
      'Explore our portfolio of successful projects. From travel platforms to corporate websites — see the digital solutions we build.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bitropix.com/portfolio',
  },
};

export default function PortfolioPage() {
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
      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'Portfolio' }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E03B37]/8 via-transparent to-transparent" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-block rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                Our Portfolio
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Projects That Drive{' '}
                <span className="bg-gradient-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  Real Results
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                We don&apos;t just build websites — we craft digital experiences that transform businesses. Explore our
                work across industries and see the impact we create.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Stats Bar */}
        <FadeIn>
          <div className="border-y border-white/10 bg-[#111119]">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
              {[
                { value: '4+', label: 'Projects Delivered' },
                { value: '4', label: 'Industries Served' },
                { value: '100%', label: 'Client Satisfaction' },
                { value: '5/5', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-8 text-center">
                  <p className="text-3xl font-bold text-[#E03B37]">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <section className="bg-[#0a0a12] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="space-y-20">
              {portfolioProjects.map((project, index) => (
                <StaggerItem key={project.id}>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${index % 2 === 1 ? 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]' : ''}`}
                  >
                    {/* Image */}
                    <Link href={`/portfolio/${project.slug}`} className="group">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-[#E03B37] px-4 py-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                          View Project <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-3 py-1 text-xs font-medium text-[#E03B37]">
                          {project.category}
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-gray-400">
                          {project.industry}
                        </span>
                      </div>
                      <h2 className="mb-2 text-3xl font-bold text-white">{project.title}</h2>
                      <p className="mb-2 text-lg font-medium text-[#E03B37]">&ldquo;{project.tagline}&rdquo;</p>
                      <p className="mb-6 leading-relaxed text-gray-400">{project.description}</p>

                      {/* Key Results */}
                      <div className="mb-6 space-y-2">
                        {project.results.slice(0, 3).map((result) => (
                          <div key={result} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E03B37]" />
                            {result}
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/20"
                        >
                          View Case Study <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                        >
                          Visit Website <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/10 bg-[#0e0e18] py-16 sm:py-24">
          <FadeIn>
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Build Something{' '}
                <span className="bg-gradient-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  Amazing
                </span>
                ?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
                Let&apos;s discuss your project and create a digital solution that drives real business results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/20"
              >
                Start Your Project <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
