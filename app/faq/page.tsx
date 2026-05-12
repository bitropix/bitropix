import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Answers to the most common questions about Bitropix services - web development, mobile apps, SEO, digital marketing, cloud, pricing, timelines, and how we work.',
  alternates: {
    canonical: 'https://www.bitropix.com/faq',
  },
};

type FAQ = { question: string; answer: string };

type FAQGroup = {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
};

const groups: FAQGroup[] = [
  {
    id: 'general',
    title: 'About Bitropix',
    description: 'Who we are, where we work, and how we engage with clients.',
    faqs: [
      {
        question: 'What services does Bitropix offer?',
        answer:
          'Bitropix offers a full suite of IT services and digital marketing solutions including web development, mobile app development, UI/UX design, cloud migrations, digital marketing (SEO, PPC, social media), embedded systems, IoT solutions, and digital transformation consulting.',
      },
      {
        question: 'Where is Bitropix located?',
        answer:
          'Bitropix is headquartered in Noida, India. We serve clients globally and have successfully delivered projects for businesses across India, the US, UK, and the Middle East. We work seamlessly across time zones.',
      },
      {
        question: 'Do you work with startups and small businesses?',
        answer:
          'Absolutely. We work with businesses of all sizes - from early-stage startups to established enterprises. Our flexible engagement models and competitive pricing make professional IT services accessible to growing businesses.',
      },
      {
        question: 'What technologies do you specialize in?',
        answer:
          'We specialize in modern tech stacks including React, Next.js, Node.js, Python, React Native, Flutter, AWS, Azure, Google Cloud, and more. We choose the best technology for each project based on requirements, scalability, and long-term maintainability.',
      },
    ],
  },
  {
    id: 'projects',
    title: 'Projects & Timelines',
    description: 'Estimating delivery time, scope, and ongoing support.',
    faqs: [
      {
        question: 'How long does it take to build a website or app?',
        answer:
          'Timelines vary based on complexity. A standard business website takes 3-6 weeks, while a custom web application or mobile app can take 8-16 weeks. We provide detailed timelines during our free consultation and keep you updated at every milestone.',
      },
      {
        question: 'How long does it take to build a mobile app?',
        answer:
          'A simple mobile app typically takes 8-12 weeks, while feature-rich applications may take 4-6 months. The timeline depends on app complexity, platform (iOS, Android, or both), and specific feature requirements. We provide a detailed timeline during our free consultation.',
      },
      {
        question: 'Do you offer ongoing maintenance and support?',
        answer:
          'Yes, we offer flexible maintenance and support packages for all our services. This includes bug fixes, security updates, performance monitoring, feature enhancements, and 24/7 technical support to keep your digital products running smoothly.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Engagement',
    description: 'How we quote, bill, and engage with new clients.',
    faqs: [
      {
        question: 'How does your pricing work?',
        answer:
          'We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team models. Every engagement starts with a free consultation where we understand your requirements and provide a transparent, no-obligation quote.',
      },
      {
        question: 'How much does website development cost in India?',
        answer:
          'Website development costs vary based on complexity, features, and design requirements. A basic business website starts from INR 25,000, while custom web applications and e-commerce solutions range from INR 1,00,000 to INR 10,00,000+. Contact us for a free, detailed quote.',
      },
      {
        question: 'Can I customize a quote to fit my specific needs?',
        answer:
          'Yes - every engagement is tailored. We work closely with each client to scope work that matches their exact requirements and budget, and we send a transparent, milestone-based proposal before any work begins.',
      },
      {
        question: 'Are there any hidden charges?',
        answer:
          'No. We believe in complete transparency. All costs are discussed and agreed upon before the project begins. Any additional requirements are communicated with revised estimates upfront.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers (NEFT/RTGS/IMPS), UPI, credit/debit cards, and PayPal for international clients. We typically follow a milestone-based payment structure.',
      },
    ],
  },
  {
    id: 'marketing-cloud',
    title: 'Marketing & Cloud',
    description: 'How we approach SEO, paid media, and infrastructure work.',
    faqs: [
      {
        question: 'What is your digital marketing approach?',
        answer:
          'Our digital marketing strategy is 100% data-driven. We start with a thorough audit, define clear KPIs, and execute a multi-channel approach including SEO, PPC, social media, and content marketing. Monthly reporting ensures complete transparency on ROI.',
      },
      {
        question: 'Can you help migrate our systems to the cloud?',
        answer:
          'Absolutely. Our certified cloud architects handle end-to-end cloud migrations on AWS, Azure, and Google Cloud. We ensure zero-downtime migration, data integrity, security compliance, and cost optimization throughout the process.',
      },
    ],
  },
];

const allFaqs: FAQ[] = groups.flatMap((g) => g.faqs);

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
