'use client';

import { Search, Pencil, Code, Rocket } from 'lucide-react';
import { FadeIn } from '@/components/animate';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We analyze your requirements, understand your business goals, and define the project scope.',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Design',
    description: 'Our designers create intuitive interfaces and user experiences that align with your brand.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our engineers build your solution using agile methodology with regular updates and feedback.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Delivery',
    description: 'We deploy, test thoroughly, and provide ongoing support to ensure successful implementation.',
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#0e0e18] py-20">
      <div className="absolute inset-0 bg-linear-to-r from-[#E03B37]/5 via-transparent to-[#E03B37]/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-2 font-semibold text-[#E03B37]">Our Process</p>
            <h2 className="mb-4 text-3xl font-bold text-balance text-white sm:text-4xl">How We Work</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              A streamlined process designed to deliver exceptional results on time and within budget.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.15}>
              <div className="group relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-full z-0 hidden h-0.5 w-full -translate-x-1/2 bg-linear-to-r from-white/10 to-transparent lg:block" />
                )}
                <div className="relative z-10 text-center">
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all duration-500 group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                    <step.icon className="h-10 w-10 text-[#E03B37]" />
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#E03B37] to-[#E03B37]/80 text-sm font-bold text-white shadow-lg shadow-[#E03B37]/20">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
