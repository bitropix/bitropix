'use client';

import Link from 'next/link';
import { Globe, Smartphone, Palette, Cloud, TrendingUp, Cpu, Zap, Wifi, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

const services = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description:
      'High-performance websites and web applications built with Next.js, React, and modern frameworks. From landing pages to enterprise SaaS platforms — we deliver fast, scalable, and SEO-optimized solutions.',
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android using React Native and Flutter. We build apps that users love with seamless UX, push notifications, and offline-first architecture.',
  },
  {
    id: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Research-driven design that converts visitors into customers. We create intuitive interfaces, design systems, and prototypes that elevate your brand and maximize user engagement.',
  },
  {
    id: 'cloud-migrations',
    icon: Cloud,
    title: 'Cloud Migrations',
    description:
      'Seamless migration to AWS, Azure, or Google Cloud with zero downtime. We architect cloud-native infrastructure that reduces costs by up to 40% while boosting performance and reliability.',
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Data-driven SEO, PPC, social media, and content marketing strategies that deliver measurable ROI. We help brands dominate search rankings and grow organic traffic consistently.',
  },
  {
    id: 'embedded-systems',
    icon: Cpu,
    title: 'Embedded Systems',
    description:
      'Custom firmware and embedded solutions for IoT devices, industrial automation, and smart hardware. From microcontroller programming to real-time operating systems.',
  },
  {
    id: 'digital-transformation',
    icon: Zap,
    title: 'Digital Transformation',
    description:
      'End-to-end digital transformation consulting that modernizes your legacy systems, automates workflows, and positions your business for the AI-first future with measurable outcomes.',
  },
  {
    id: 'iot-solutions',
    icon: Wifi,
    title: 'IoT Solutions',
    description:
      'Connected device ecosystems that transform operations. We design, build, and deploy IoT platforms with real-time monitoring, predictive analytics, and edge computing capabilities.',
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a12] py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-2 font-semibold tracking-wide text-[#E03B37] uppercase">What We Do</p>
            <h2 className="mb-4 text-3xl font-bold text-balance text-white sm:text-4xl">
              Comprehensive IT Services &amp; Digital Marketing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              From concept to deployment, we provide end-to-end solutions that drive digital transformation and
              measurable business growth.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link href={`/services#${service.id}`}>
                <Card
                  className="group h-full cursor-pointer border-white/10 bg-[#111119] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#E03B37]/50 hover:bg-[#E03B37]/10 hover:shadow-lg hover:shadow-[#E03B37]/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all duration-500 group-hover:from-[#E03B37] group-hover:to-[#E03B37]/80">
                      <service.icon className="h-6 w-6 text-[#E03B37] transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <CardTitle className="text-lg text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed text-gray-400">{service.description}</CardDescription>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#E03B37] opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#E03B37] transition-all duration-300 hover:gap-3"
            >
              View All Services <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
