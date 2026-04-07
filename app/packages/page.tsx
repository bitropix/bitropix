import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  Star,
  Shield,
  Headphones,
  Code,
  Palette,
  TrendingUp,
  Search,
  Smartphone,
  Globe,
  ChevronDown,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packages & Pricing - Bitropix | Affordable IT & Marketing Plans',
  description:
    'Explore transparent pricing packages for website development, digital marketing, app development, and SEO services by Bitropix, a leading IT agency in Noida, India.',
  keywords: [
    'IT services pricing India',
    'website development packages',
    'digital marketing pricing',
    'SEO packages India',
    'app development cost India',
    'affordable web development Noida',
    'digital marketing plans',
    'Bitropix pricing',
  ],
};

const faqData = [
  {
    question: 'Can I customize a package to fit my needs?',
    answer:
      'Absolutely! Our listed packages are starting points. We work closely with every client to tailor solutions that match their exact requirements and budget.',
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
  {
    question: 'Do you offer EMI or installment options?',
    answer:
      'Yes, for larger projects we offer flexible payment plans. Contact us to discuss installment options that work for your budget.',
  },
  {
    question: 'What happens after the support period ends?',
    answer:
      'We offer extended maintenance and support contracts at competitive monthly rates. You can also opt for on-demand support as needed.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary by project scope. A starter website takes 2-3 weeks, professional sites 4-6 weeks, and enterprise projects 8-16 weeks. App development typically ranges from 6-20 weeks depending on complexity.',
  },
];

const websitePackages = [
  {
    name: 'Starter',
    price: '₹25,000',
    period: 'one-time',
    description: 'Perfect for small businesses and personal brands getting online.',
    popular: false,
    features: [
      { name: '5-page responsive website', included: true },
      { name: 'Basic SEO setup', included: true },
      { name: 'Contact form integration', included: true },
      { name: 'Mobile responsive design', included: true },
      { name: '1 month post-launch support', included: true },
      { name: 'CMS integration', included: false },
      { name: 'Blog setup', included: false },
      { name: 'Analytics dashboard', included: false },
      { name: 'Social media integration', included: false },
      { name: 'E-commerce functionality', included: false },
    ],
  },
  {
    name: 'Professional',
    price: '₹75,000',
    period: 'one-time',
    description: 'Ideal for growing businesses that need a strong online presence.',
    popular: true,
    features: [
      { name: '10-page website', included: true },
      { name: 'Advanced SEO optimization', included: true },
      { name: 'Contact form integration', included: true },
      { name: 'Mobile responsive design', included: true },
      { name: '3 months post-launch support', included: true },
      { name: 'CMS integration', included: true },
      { name: 'Blog setup', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'Social media integration', included: true },
      { name: 'E-commerce functionality', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: '₹1,50,000+',
    period: 'one-time',
    description: 'For businesses requiring complex, feature-rich web solutions.',
    popular: false,
    features: [
      { name: 'Unlimited pages', included: true },
      { name: 'Advanced SEO optimization', included: true },
      { name: 'Custom features & integrations', included: true },
      { name: 'Mobile responsive design', included: true },
      { name: '6 months post-launch support', included: true },
      { name: 'CMS integration', included: true },
      { name: 'Blog setup', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'Social media integration', included: true },
      { name: 'E-commerce & API integrations', included: true },
    ],
  },
];

const marketingPackages = [
  {
    name: 'Growth Starter',
    price: '₹15,000',
    period: '/mo',
    description: 'Get started with digital marketing and build your online visibility.',
    popular: false,
    features: [
      { name: 'Basic SEO (10 keywords)', included: true },
      { name: 'Social media (2 platforms)', included: true },
      { name: 'Monthly performance report', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'PPC campaign management', included: false },
      { name: 'Content marketing strategy', included: false },
      { name: 'Email marketing', included: false },
      { name: 'Video marketing', included: false },
      { name: 'Influencer marketing', included: false },
      { name: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Growth Pro',
    price: '₹35,000',
    period: '/mo',
    description: 'Accelerate growth with a comprehensive marketing strategy.',
    popular: true,
    features: [
      { name: 'Advanced SEO (25 keywords)', included: true },
      { name: 'Social media (4 platforms)', included: true },
      { name: 'Bi-weekly performance reports', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'PPC campaign management', included: true },
      { name: 'Content marketing strategy', included: true },
      { name: 'Email marketing', included: true },
      { name: 'Video marketing', included: false },
      { name: 'Influencer marketing', included: false },
      { name: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Growth Enterprise',
    price: '₹75,000+',
    period: '/mo',
    description: 'Dominate your market with a full-scale marketing operation.',
    popular: false,
    features: [
      { name: 'Full SEO (unlimited keywords)', included: true },
      { name: 'Social media (all platforms)', included: true },
      { name: 'Weekly performance reports', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'PPC campaign management', included: true },
      { name: 'Content marketing strategy', included: true },
      { name: 'Email marketing', included: true },
      { name: 'Video marketing', included: true },
      { name: 'Influencer marketing', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
  },
];

const appPackages = [
  {
    name: 'MVP',
    price: '₹1,50,000',
    period: 'one-time',
    description: 'Launch your idea fast with a minimum viable product.',
    popular: false,
    features: [
      { name: 'Single platform (iOS or Android)', included: true },
      { name: 'Basic feature set', included: true },
      { name: 'UI/UX design', included: true },
      { name: 'API integration', included: true },
      { name: '1 month post-launch support', included: true },
      { name: 'Admin panel', included: false },
      { name: 'Push notifications', included: false },
      { name: 'Analytics integration', included: false },
      { name: 'Payment integration', included: false },
      { name: 'Custom backend development', included: false },
    ],
  },
  {
    name: 'Standard',
    price: '₹3,00,000',
    period: 'one-time',
    description: 'A full-featured app for businesses ready to scale.',
    popular: true,
    features: [
      { name: 'Cross-platform (iOS & Android)', included: true },
      { name: 'Advanced feature set', included: true },
      { name: 'UI/UX design', included: true },
      { name: 'API integration', included: true },
      { name: '3 months post-launch support', included: true },
      { name: 'Admin panel', included: true },
      { name: 'Push notifications', included: true },
      { name: 'Analytics integration', included: true },
      { name: 'Payment integration', included: false },
      { name: 'Custom backend development', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '₹5,00,000+',
    period: 'one-time',
    description: 'Enterprise-grade native apps with complex functionality.',
    popular: false,
    features: [
      { name: 'Native apps (iOS & Android)', included: true },
      { name: 'Complex feature set', included: true },
      { name: 'UI/UX design', included: true },
      { name: 'API integration', included: true },
      { name: '6 months post-launch support', included: true },
      { name: 'Admin panel', included: true },
      { name: 'Push notifications', included: true },
      { name: 'Analytics integration', included: true },
      { name: 'Payment integration', included: true },
      { name: 'Custom backend & real-time features', included: true },
    ],
  },
];

const seoPackages = [
  {
    name: 'Local SEO',
    price: '₹10,000',
    period: '/mo',
    description: 'Dominate local search results and attract nearby customers.',
    popular: false,
    features: [
      { name: '10 target keywords', included: true },
      { name: 'On-page SEO optimization', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'Local citations building', included: true },
      { name: 'Monthly performance report', included: true },
      { name: 'Off-page SEO & link building', included: false },
      { name: 'Content optimization', included: false },
      { name: 'Competitor analysis', included: false },
      { name: 'Technical SEO audit', included: false },
      { name: 'Conversion optimization', included: false },
    ],
  },
  {
    name: 'National SEO',
    price: '₹25,000',
    period: '/mo',
    description: 'Rank nationally with a comprehensive SEO strategy.',
    popular: true,
    features: [
      { name: '25 target keywords', included: true },
      { name: 'On-page SEO optimization', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'Local citations building', included: true },
      { name: 'Bi-weekly performance reports', included: true },
      { name: 'Off-page SEO & link building', included: true },
      { name: 'Content optimization', included: true },
      { name: 'Competitor analysis', included: true },
      { name: 'Technical SEO audit', included: false },
      { name: 'Conversion optimization', included: false },
    ],
  },
  {
    name: 'E-Commerce SEO',
    price: '₹40,000+',
    period: '/mo',
    description: 'Maximize your online store visibility and drive sales.',
    popular: false,
    features: [
      { name: 'Unlimited target keywords', included: true },
      { name: 'On-page SEO optimization', included: true },
      { name: 'Google My Business optimization', included: true },
      { name: 'Local citations building', included: true },
      { name: 'Weekly performance reports', included: true },
      { name: 'Off-page SEO & link building', included: true },
      { name: 'Content & product optimization', included: true },
      { name: 'Competitor analysis', included: true },
      { name: 'Technical SEO audit & schema markup', included: true },
      { name: 'Conversion optimization', included: true },
    ],
  },
];

const allIncluded = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous testing at every stage to ensure bug-free delivery.',
  },
  {
    icon: Code,
    title: 'Source Code Ownership',
    description: 'You own 100% of the source code and all deliverables.',
  },
  {
    icon: Headphones,
    title: 'Regular Updates',
    description: 'Transparent communication with regular progress updates.',
  },
  {
    icon: Palette,
    title: 'Project Management',
    description: 'Dedicated project management for seamless execution.',
  },
];

const categories = [
  {
    id: 'website',
    icon: Globe,
    label: 'Website Development',
    packages: websitePackages,
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    label: 'Digital Marketing',
    packages: marketingPackages,
  },
  {
    id: 'app',
    icon: Smartphone,
    label: 'App Development',
    packages: appPackages,
  },
  {
    id: 'seo',
    icon: Search,
    label: 'SEO',
    packages: seoPackages,
  },
];

function PricingCard({
  pkg,
}: {
  pkg: {
    name: string;
    price: string;
    period: string;
    description: string;
    popular: boolean;
    features: { name: string; included: boolean }[];
  };
}) {
  return (
    <Card
      className={`relative flex flex-col overflow-hidden ${
        pkg.popular ? 'scale-[1.02] border-[#E03B37] shadow-lg ring-2 ring-[#E03B37]/20' : 'border-white/10'
      }`}
    >
      {pkg.popular && (
        <div className="absolute top-0 right-0 left-0 bg-[#E03B37] py-1.5 text-center text-xs font-semibold tracking-wide text-white uppercase">
          <Star className="mr-1 inline-block h-3.5 w-3.5" />
          Most Popular
        </div>
      )}
      <CardHeader className={pkg.popular ? 'pt-10' : ''}>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold text-white">{pkg.price}</span>
          {pkg.period !== 'one-time' && <span className="text-sm text-gray-400">{pkg.period}</span>}
          {pkg.period === 'one-time' && <span className="ml-1 text-sm text-gray-400">one-time</span>}
        </div>
        <p className="mt-1 text-sm text-gray-400">{pkg.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="mb-6 flex-1 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature.name} className="flex items-start gap-2 text-sm">
              {feature.included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E03B37]" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              )}
              <span className={feature.included ? 'text-white' : 'text-gray-500'}>{feature.name}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={`w-full ${pkg.popular ? 'bg-[#E03B37] text-white hover:bg-[#E03B37]/90' : 'border-white/10 text-white'}`}
          variant={pkg.popular ? 'default' : 'outline'}
        >
          <Link href="/contact">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PackagesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="bg-[#0a0a12] pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0e0e18] py-20">
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-2 font-semibold text-[#E03B37]">Packages &amp; Pricing</p>
            <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl">
              Transparent Pricing, Exceptional Results
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-400">
              Choose from our carefully crafted packages designed for businesses of every size. No hidden fees, no
              surprises — just honest pricing for world-class solutions.
            </p>
            <p className="mt-4 text-sm text-gray-400 italic">
              Prices are indicative. Final pricing depends on project requirements.
            </p>
          </div>
        </section>

        {/* All Packages Include */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">All Packages Include</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allIncluded.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                    <item.icon className="h-7 w-7 text-[#E03B37]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Sections */}
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="border-b border-white/10 py-20 last:border-b-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                  <category.icon className="h-6 w-6 text-[#E03B37]" />
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{category.label} Packages</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {category.packages.map((pkg) => (
                  <PricingCard key={pkg.name} pkg={pkg} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        <section className="bg-[#0e0e18] py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">FAQ</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-gray-400">Common questions about our packages and pricing.</p>
            </div>
            <div className="space-y-4">
              {faqData.map((faq) => (
                <details key={faq.question} className="group rounded border border-white/10 bg-[#111119]">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white">
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
        </section>

        {/* Custom Quote CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Need a Custom Package?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
              Every business is unique. Let us craft a tailored solution that perfectly fits your goals and budget. Get
              a free, no-obligation quote today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[#E03B37] text-white hover:bg-[#E03B37]/90">
                <Link href="/contact">
                  Get a Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
