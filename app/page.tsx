import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { CapabilitiesMarquee } from '@/components/home/capabilities-marquee';
import { StudioSection } from '@/components/home/studio-section';
import { ServicesSection } from '@/components/home/services-section';
import { PortfolioSection } from '@/components/home/portfolio-section';
import { ProcessSection } from '@/components/home/process-section';
import { TechnologiesSection } from '@/components/home/technologies-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { FAQSection } from '@/components/home/faq-section';

export const metadata: Metadata = {
  title: { absolute: 'Bitropix | IT Services & Digital Marketing Agency in Delhi' },
  description:
    'Bitropix is a Delhi-based product studio for web development, mobile apps, UI/UX, cloud and SEO-led growth. We design, engineer and scale digital products for businesses worldwide.',
  keywords: [
    'IT services Delhi',
    'digital marketing agency Delhi',
    'web development company Delhi',
    'mobile app development',
    'cloud migration services',
    'SEO agency Delhi',
    'digital transformation consulting',
    'software development India',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bitropix | Product Studio for Web, Mobile & Growth',
    description:
      'We design, engineer and scale high-performance websites, mobile apps and growth engines for ambitious teams worldwide.',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitropix | IT Services & Digital Marketing Agency',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CapabilitiesMarquee />
      <StudioSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
