import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { ClientsSection } from '@/components/home/clients-section';
// import { AgileHiringSection } from '@/components/home/agile-hiring-section';
// import { ProductsSection } from '@/components/home/products-section';
import { WhyUsSection } from '@/components/home/why-us-section';
import { TechnologiesSection } from '@/components/home/technologies-section';
import { ProcessSection } from '@/components/home/process-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { StatsSection } from '@/components/home/stats-section';
import { FAQSection } from '@/components/home/faq-section';
import { CTASection } from '@/components/home/cta-section';

export const metadata: Metadata = {
  title: 'Bitropix - IT Services & Digital Marketing Agency in Noida, India',
  description:
    "India's fastest-growing IT services and digital marketing agency. Web development, mobile apps, cloud migrations, SEO, and digital transformation for businesses worldwide.",
  keywords: [
    'IT services Noida',
    'digital marketing agency India',
    'web development company',
    'mobile app development',
    'cloud migration services',
    'SEO agency Noida',
    'digital transformation consulting',
    'software development India',
  ],
  openGraph: {
    title: 'Bitropix - IT Services & Digital Marketing Agency',
    description:
      "India's fastest-growing IT services and digital marketing agency helping businesses scale with cutting-edge technology.",
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ClientsSection />
        <StatsSection />
        <WhyUsSection />
        <TechnologiesSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
