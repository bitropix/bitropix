'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import { portfolioProjects } from '@/lib/portfolio-data';

export function PortfolioSection() {
  return (
    <section className="relative overflow-hidden bg-[#0e0e18] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E03B37]/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-2 font-semibold tracking-wide text-[#E03B37] uppercase">Our Work</p>
            <h2 className="mb-4 text-3xl font-bold text-balance text-white sm:text-4xl">
              Projects That Speak for Themselves
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              From travel platforms to enterprise solutions — we build digital products that drive real business results
              across industries.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-8 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="h-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-[#111119] transition-all duration-500 hover:-translate-y-1 hover:border-[#E03B37]/30 hover:shadow-xl hover:shadow-[#E03B37]/5">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-[#E03B37] px-3 py-1 text-xs font-medium text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#E03B37]">
                        {project.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-gray-500 opacity-0 transition-all group-hover:text-[#E03B37] group-hover:opacity-100" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-[#E03B37]">{project.industry}</p>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#E03B37] transition-all duration-300 hover:gap-3"
            >
              View All Projects <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
