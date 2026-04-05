import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FadeIn } from '@/components/animate';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  CreditCard,
  Users,
  FileText,
  AlertCircle,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - Bitropix | Data Protection & Privacy',
  description:
    'Learn how Bitropix collects, uses, and protects your personal information. Our commitment to data privacy and security.',
};

const sections = [
  {
    id: 'introduction',
    icon: Shield,
    title: 'Introduction',
    content:
      'This Privacy Policy explains how we collect, use, process, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.',
  },
  {
    id: 'information-collected',
    icon: Database,
    title: 'Information We Collect',
    subsections: [
      {
        subtitle: 'Personal Information',
        items: [
          'Name and contact information',
          'Email address',
          'Billing and payment information',
          'Company information (if applicable)',
          'Usage data and preferences',
        ],
      },
      {
        subtitle: 'Automatically Collected Information',
        items: [
          'IP address and device information',
          'Browser type and version',
          'Operating system',
          'Time zone and location',
          'Usage patterns and interactions',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: Eye,
    title: 'How We Use Your Information',
    items: [
      'To provide and maintain our services',
      'To process payments and transactions',
      'To improve our services and user experience',
      'To send administrative information and updates',
      'To provide customer support',
      'To detect and prevent fraud',
    ],
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies and Tracking Technologies',
    content:
      'We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amount of data that may include an anonymous unique identifier.',
    subsections: [
      {
        subtitle: 'Types of Cookies We Use',
        items: [
          'Essential cookies: Required for the operation of our website',
          'Analytical cookies: To analyze how users interact with our service',
          'Functional cookies: To remember your preferences',
          'Advertising cookies: To deliver relevant advertisements',
        ],
      },
    ],
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'Payment Information',
    content:
      'We use trusted third-party payment processors to handle all payments. We do not store your payment information on our servers. All payment data is encrypted and securely processed through our payment partners.',
    subsections: [
      {
        subtitle: 'Payment Data We Process',
        items: [
          'Transaction history',
          'Billing address',
          'Payment method details (last 4 digits only)',
          'Subscription information',
        ],
      },
    ],
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Data Security',
    content: 'We implement appropriate security measures to protect your personal information, including:',
    items: [
      'Encryption of data in transit and at rest',
      'Regular security assessments',
      'Access controls and authentication',
      'Secure data backups',
    ],
  },
  {
    id: 'third-party',
    icon: Users,
    title: 'Third-Party Services',
    content:
      'We may employ third-party companies and individuals to facilitate our service, provide service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf.',
  },
  {
    id: 'your-rights',
    icon: FileText,
    title: 'Your Rights',
    items: [
      'Right to access your personal data',
      'Right to correct inaccurate data',
      'Right to request data deletion',
      'Right to object to data processing',
      'Right to data portability',
    ],
  },
  {
    id: 'changes',
    icon: AlertCircle,
    title: 'Changes to This Privacy Policy',
    content:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="absolute top-20 left-10 h-100 w-100 rounded-full bg-[#E03B37]/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BreadcrumbNav items={[{ label: 'Privacy Policy' }]} />
              <FadeIn>
                <p className="mb-2 font-semibold text-[#E03B37]">Privacy Policy</p>
                <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl">
                  Your Privacy Matters to Us
                </h1>
                <p className="mx-auto max-w-3xl text-lg text-gray-400">
                  We are committed to protecting your personal information and being transparent about how we collect,
                  use, and safeguard your data.
                </p>
                <p className="mt-4 text-sm text-gray-400">Last updated: 30th May, 2025</p>
              </FadeIn>
            </div>
          </div>
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
                  className="rounded-full border border-white/10 bg-[#111119] px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-[#E03B37]/10 hover:text-[#E03B37]"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {sections.map((section, index) => (
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

                      {section.subsections && (
                        <div className="mt-6 space-y-6">
                          {section.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h3 className="mb-3 font-semibold text-white">{subsection.subtitle}</h3>
                              <ul className="space-y-2">
                                {subsection.items.map((item) => (
                                  <li key={item} className="flex items-start gap-3 text-gray-400">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E03B37]" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}

              {/* Contact Section */}
              <FadeIn>
                <div id="contact" className="scroll-mt-24">
                  <div className="rounded border border-[#E03B37]/30 bg-[#111119] p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/30 to-[#E03B37]/10">
                        <Mail className="h-6 w-6 text-[#E03B37]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="mb-3 text-2xl font-bold text-white">Contact Us</h2>
                        <p className="mb-4 leading-relaxed text-gray-400">
                          If you have any questions about this Privacy Policy, please contact us at:
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

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="absolute inset-0 bg-[linear-linear(rgba(0,0,0,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Questions About Your Privacy?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              We're here to help. Reach out to us if you have any concerns or questions about how we handle your data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-[#0a0a12] bg-[#0a0a12] text-white transition-all duration-300 hover:bg-[#0a0a12]/90"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white transition-all duration-300 hover:bg-white/10"
                asChild
              >
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
