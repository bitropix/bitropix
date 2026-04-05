'use client';

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: '.NET', icon: '🔷' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Azure', icon: '☁️' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '⚙️' },
  { name: 'Flutter', icon: '📱' },
  { name: 'React Native', icon: '📱' },
];

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-linear-to-b from-[#0e0e18] via-[#0a0a12] to-[#0a0a12]" />
      <div className="absolute -top-40 right-0 h-100 w-100 rounded-full bg-[#E03B37]/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-75 w-75 rounded-full bg-[#E03B37]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#E03B37] uppercase">Tech Stack</p>
            <h2 className="mb-6 text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
              Technologies We Master
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              We leverage cutting-edge technologies to build robust, scalable, and innovative solutions for your
              business.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group relative flex min-h-30 flex-col items-center justify-center gap-3 overflow-hidden rounded border border-white/10 bg-[#161622] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#E03B37]/70 hover:bg-[#E03B37]/10 hover:shadow-lg hover:shadow-[#E03B37]/20">
                <div className="text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-125">
                  {tech.icon}
                </div>
                <span className="text-center text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#E03B37]">
                  {tech.name}
                </span>
                <div className="absolute inset-0 rounded bg-linear-to-br from-[#E03B37]/0 to-[#E03B37]/0 transition-all duration-300 group-hover:from-[#E03B37]/5 group-hover:to-[#E03B37]/5" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
