'use client';

import Image from 'next/image';
import { Award, Zap, HeartHandshake, Lightbulb } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FadeIn, FadeInLeft, FadeInRight } from '@/components/animate';

const reasons = [
  {
    icon: Award,
    title: 'Proven Expertise',
    description: 'A team with 5+ years of combined experience delivering successful projects across industries.',
  },
  {
    icon: Zap,
    title: 'Agile Methodology',
    description: 'Fast, iterative development process that ensures quick delivery and continuous improvement.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-Centric Approach',
    description: 'Your success is our priority. We work as an extension of your team to achieve your goals.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of technology trends to bring you cutting-edge solutions that give you an edge.',
  },
];

export function WhyUsSection() {
  const [offsetY, setOffsetY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !finePointer) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        setOffsetY(window.scrollY * 0.5);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a12] py-20">
      <div className="absolute inset-0 bg-black/80" />

      {/* Parallax background element */}
      <div
        className="absolute top-1/2 right-0 z-10 h-75 w-75 -translate-y-1/2 rounded-full bg-[#E03B37]/5 blur-[100px]"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeInLeft>
            <div className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded shadow">
                <Image
                  src="/professional-team-meeting-in-modern-office-discuss.jpg"
                  alt="Bitropix team collaborating in a modern office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -right-6 -bottom-6 rounded bg-linear-to-br from-[#E03B37] to-[#E03B37]/80 p-6 text-white shadow-lg shadow-[#E03B37]/20">
                <p className="text-4xl font-bold">98%</p>
                <p className="text-sm opacity-90">Client Retention Rate</p>
              </div>
            </div>
          </FadeInLeft>

          <FadeInRight>
            <div>
              <p className="mb-2 font-semibold text-[#E03B37]">Why Choose Us</p>
              <h2 className="mb-6 text-3xl font-bold text-balance text-white sm:text-4xl">
                Your Trusted Technology Partner
              </h2>
              <p className="mb-8 leading-relaxed text-gray-400">
                We combine technical excellence with business acumen to deliver solutions that not only work but drive
                real business value.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <FadeIn key={reason.title} delay={index * 0.1}>
                    <div className="group flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                        <reason.icon className="h-5 w-5 text-[#E03B37]" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-[#E03B37]">{reason.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">{reason.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
