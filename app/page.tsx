import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { AgileHiringSection } from '@/components/home/agile-hiring-section';
import { ProductsSection } from '@/components/home/products-section';
import { WhyUsSection } from '@/components/home/why-us-section';
import { TechnologiesSection } from '@/components/home/technologies-section';
import { ProcessSection } from '@/components/home/process-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { StatsSection } from '@/components/home/stats-section';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AgileHiringSection />
        {/* <ProductsSection /> */}
        <WhyUsSection />
        <TechnologiesSection />
        <ProcessSection />
        <TestimonialsSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
