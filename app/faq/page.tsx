import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { groups, allFaqs } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Answers to the most common questions about Bitropix services - web development, mobile apps, SEO, digital marketing, cloud, pricing, timelines, and how we work.',
  alternates: {
    canonical: 'https://www.bitropix.com/faq',
  },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com/' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.bitropix.com/faq' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a12] pt-16">
        <BreadcrumbNav items={[{ label: 'FAQ' }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                <HelpCircle className="h-4 w-4" /> FAQ
              </span>
              <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl lg:text-6xl">
                Frequently{' '}
                <span className="bg-linear-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  Asked Questions
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Everything you need to know about working with Bitropix - services, timelines, pricing, and process.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Quick Navigation */}
        <section className="border-y border-white/10 bg-[#0e0e18] py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-center text-sm font-semibold text-gray-400">Browse by category</p>
            <div className="flex flex-wrap justify-center gap-3">
              {groups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-white/10 bg-[#111119] px-4 py-2 text-sm text-white transition-all duration-300 hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10 hover:text-[#E03B37]"
                >
                  {group.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Groups */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="space-y-16">
              {groups.map((group) => (
                <StaggerItem key={group.id}>
                  <div id={group.id} className="scroll-mt-24">
                    <div className="mb-6">
                      <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{group.title}</h2>
                      <p className="text-gray-400">{group.description}</p>
                    </div>
                    <div className="space-y-4">
                      {group.faqs.map((faq, index) => (
                        <details
                          key={index}
                          className="group rounded border border-white/10 bg-[#111119] transition-colors hover:border-[#E03B37]/30"
                        >
                          <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-semibold text-white">
                            <span>{faq.question}</span>
                            <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="border-t border-white/10 px-6 pt-4 pb-6 leading-relaxed text-gray-400">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <MessageCircle className="mx-auto mb-4 h-10 w-10 text-white" />
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Still have questions?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Send us a message and a senior team member will get back to you within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="border-[#0a0a12] bg-[#0a0a12] text-white transition-all duration-300 hover:bg-[#0a0a12]/90"
                asChild
              >
                <Link href="/contact" className="inline-flex items-center">
                  Talk to us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white transition-all duration-300 hover:bg-white/10"
                asChild
              >
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
