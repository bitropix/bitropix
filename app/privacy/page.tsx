import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
          <div className="from-primary/10 via-background to-accent/5 absolute inset-0 bg-linear-to-br" />
          <div className="bg-primary/10 absolute top-20 left-10 h-100 w-100 rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* <div className="from-primary/20 to-primary/5 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br">
                <Shield className="text-primary h-10 w-10" />
              </div> */}
              <p className="text-primary mb-2 font-semibold">Privacy Policy</p>
              <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
                Your Privacy Matters to Us
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                We are committed to protecting your personal information and being transparent about how we collect,
                use, and safeguard your data.
              </p>
              <p className="text-muted-foreground mt-4 text-sm">Last updated: 30th May, 2025</p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-secondary/30 border-border border-y py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-muted-foreground mb-4 text-center text-sm font-semibold">Quick Navigation</p>
            <div className="flex flex-wrap justify-center gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-foreground hover:bg-primary/10 hover:text-primary border-border bg-card/50 rounded-full border px-4 py-2 text-sm transition-all duration-300"
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
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="bg-card/30 border-border group hover:border-primary/30 rounded p-8 transition-all duration-300">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br transition-all">
                        <section.icon className="text-primary h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-foreground mb-3 text-2xl font-bold">{section.title}</h2>
                        {section.content && <p className="text-muted-foreground leading-relaxed">{section.content}</p>}
                      </div>
                    </div>

                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="text-muted-foreground flex items-start gap-3">
                            <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.subsections && (
                      <div className="mt-6 space-y-6">
                        {section.subsections.map((subsection, idx) => (
                          <div key={idx}>
                            <h3 className="text-foreground mb-3 font-semibold">{subsection.subtitle}</h3>
                            <ul className="space-y-2">
                              {subsection.items.map((item) => (
                                <li key={item} className="text-muted-foreground flex items-start gap-3">
                                  <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
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
              ))}

              {/* Contact Section */}
              <div id="contact" className="scroll-mt-24">
                <div className="bg-card/30 border-primary/30 rounded border p-8">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="from-primary/30 to-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-foreground mb-3 text-2xl font-bold">Contact Us</h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at:
                      </p>
                      <a
                        href="mailto:info@bitropix.com"
                        className="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        info@bitropix.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-linear-to-r" />
          <div className="absolute inset-0 bg-[linear-linear(rgba(0,0,0,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Questions About Your Privacy?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              We're here to help. Reach out to us if you have any concerns or questions about how we handle your data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transition-all duration-300"
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
