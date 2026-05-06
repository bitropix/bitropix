import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn } from '@/components/animate';
import {
  ScrollText,
  CheckCircle2,
  ShieldAlert,
  CreditCard,
  Copyright,
  Ban,
  Scale,
  RefreshCw,
  Mail,
  Gavel,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Bitropix',
  description:
    'Read the terms and conditions that govern your use of the Bitropix website and services. Includes scope of work, payments, intellectual property, liability, and governing law.',
  alternates: {
    canonical: 'https://www.bitropix.com/terms',
  },
};

type Section = {
  id: string;
  icon: typeof ScrollText;
  title: string;
  content?: string;
  items?: string[];
};

const sections: Section[] = [
  {
    id: 'acceptance',
    icon: CheckCircle2,
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Bitropix website (www.bitropix.com) and related services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the website or engage our services.',
  },
  {
    id: 'services',
    icon: ScrollText,
    title: 'Scope of Services',
    content:
      'Bitropix provides IT services and digital marketing including, but not limited to, web development, mobile app development, UI/UX design, cloud migrations, SEO, and digital transformation consulting. Specific deliverables, timelines, and milestones for each engagement are documented in a separate written proposal or statement of work.',
  },
  {
    id: 'use',
    icon: ShieldAlert,
    title: 'Acceptable Use',
    content:
      "You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. You agree not to:",
    items: [
      'Reverse engineer, decompile, or attempt to extract source code without authorization.',
      'Use automated systems to scrape, crawl, or copy content beyond what robots.txt permits.',
      'Submit false, misleading, or unlawful content through any form on the website.',
      'Attempt to gain unauthorized access to any portion of the website or related systems.',
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payments & Refunds',
    content:
      'Project pricing, billing schedules, and payment terms are agreed in writing before work begins. Unless otherwise stated, invoices are due within seven (7) days of issuance. Late payments may incur additional fees and pause active deliverables. Refunds, if any, are governed by the specific statement of work for the engagement.',
  },
  {
    id: 'ip',
    icon: Copyright,
    title: 'Intellectual Property',
    content:
      'Upon full payment for an engagement, the deliverables produced by Bitropix transfer to the client, except for: (a) third-party libraries, frameworks, and services with their own licenses, (b) Bitropix-owned reusable components, methodologies, and tooling, which are licensed to the client for use within the deliverables. The Bitropix name, logo, and all content on www.bitropix.com remain the property of Bitropix and may not be reused without written permission.',
  },
  {
    id: 'confidentiality',
    icon: ShieldAlert,
    title: 'Confidentiality',
    content:
      'Both parties agree to keep confidential information shared during an engagement strictly confidential and to use it only for the purposes of the engagement. Confidentiality obligations survive termination of the engagement.',
  },
  {
    id: 'warranties',
    icon: Scale,
    title: 'Warranties & Disclaimers',
    content:
      'Bitropix delivers services with reasonable skill and care. The website and any pre-existing content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted or error-free, that defects will be corrected, or that the website is free from viruses or other harmful components.',
  },
  {
    id: 'liability',
    icon: Ban,
    title: 'Limitation of Liability',
    content:
      'To the maximum extent permitted by law, Bitropix shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits or revenue, whether incurred directly or indirectly. Our aggregate liability arising out of or relating to any engagement shall not exceed the fees paid by the client for the relevant deliverable in the three (3) months preceding the claim.',
  },
  {
    id: 'termination',
    icon: RefreshCw,
    title: 'Termination',
    content:
      'Either party may terminate an engagement in accordance with the termination provisions in the relevant statement of work. Outstanding fees for work performed up to the date of termination remain payable. We reserve the right to suspend or terminate access to the website without notice for any user found violating these Terms.',
  },
  {
    id: 'governing-law',
    icon: Gavel,
    title: 'Governing Law',
    content:
      'These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Noida, Uttar Pradesh, India.',
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes to These Terms',
    content:
      'We may update these Terms of Service from time to time. The updated version will be posted on this page with a revised "Last updated" date. Continued use of the website after a change constitutes acceptance of the revised Terms.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a12] pt-16">
        <BreadcrumbNav items={[{ label: 'Terms of Service' }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                <ScrollText className="h-4 w-4" /> Terms of Service
              </span>
              <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl lg:text-6xl">
                The Rules of{' '}
                <span className="bg-linear-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  Working with Us
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                These terms govern your use of the Bitropix website and services. Please read them carefully.
              </p>
              <p className="mt-4 text-sm text-gray-400">Last updated: 6th May, 2026</p>
            </div>
          </FadeIn>
        </section>

        {/* Quick Navigation */}
        <section className="border-y border-white/10 bg-[#0e0e18] py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-center text-sm font-semibold text-gray-400">Quick Navigation</p>
            <div className="flex flex-wrap justify-center gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/10 bg-[#111119] px-4 py-2 text-sm text-white transition-all duration-300 hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10 hover:text-[#E03B37]"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {sections.map((section) => (
                <FadeIn key={section.id}>
                  <div id={section.id} className="scroll-mt-24">
                    <div className="group rounded border border-white/10 bg-[#111119] p-8 transition-all duration-300 hover:border-[#E03B37]/30">
                      <div className="mb-6 flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                          <section.icon className="h-6 w-6 text-[#E03B37]" />
                        </div>
                        <div className="flex-1">
                          <h2 className="mb-3 text-2xl font-bold text-white">{section.title}</h2>
                          {section.content && <p className="leading-relaxed text-gray-400">{section.content}</p>}
                        </div>
                      </div>

                      {section.items && (
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-gray-400">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E03B37]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}

              {/* Contact */}
              <FadeIn>
                <div id="contact" className="scroll-mt-24">
                  <div className="rounded border border-[#E03B37]/30 bg-[#111119] p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/30 to-[#E03B37]/10">
                        <Mail className="h-6 w-6 text-[#E03B37]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="mb-3 text-2xl font-bold text-white">Questions?</h2>
                        <p className="mb-4 leading-relaxed text-gray-400">
                          If you have any questions about these Terms of Service, get in touch:
                        </p>
                        <a
                          href="mailto:info@bitropix.com"
                          className="inline-flex items-center gap-2 font-semibold text-[#E03B37] hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          info@bitropix.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to start a project?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Tell us what you want to build. We'll send back a transparent proposal with scope, timeline, and pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="border-[#0a0a12] bg-[#0a0a12] text-white transition-all duration-300 hover:bg-[#0a0a12]/90"
                asChild
              >
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white transition-all duration-300 hover:bg-white/10"
                asChild
              >
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
