import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Users2,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Package,
  FileText,
  Wallet,
  Clock,
  Shield,
  Zap,
  Check,
  X,
  IndianRupee,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Solutions - ERP, HRMS & E-Commerce | Bitropix',
  description:
    'Ready-to-deploy enterprise solutions including ERP, HRMS, and E-Commerce platforms. Customizable, scalable, and built for Indian businesses. Starting from 1,00,000.',
  keywords: [
    'ERP software India',
    'HRMS software Noida',
    'e-commerce platform India',
    'enterprise solutions',
    'business management software',
    'custom ERP development',
    'HR management system',
    'online store platform',
  ],
  openGraph: {
    title: 'Enterprise Solutions - ERP, HRMS & E-Commerce | Bitropix',
    description:
      'Pre-built, battle-tested enterprise solutions that can be customized and deployed quickly for your business.',
    type: 'website',
  },
};

const products = [
  {
    id: 'erp',
    icon: Building2,
    title: 'ERP Solutions',
    tagline: 'Streamline Your Entire Business Operations',
    description:
      'A comprehensive enterprise resource planning system designed to integrate all facets of your business operations. From inventory management to financial accounting, our ERP solution provides real-time visibility and control.',
    image: '/images/web.webp',
    price: '2,00,000',
    features: [
      { icon: Package, title: 'Inventory Management', desc: 'Track stock levels, orders, and deliveries in real-time' },
      { icon: Wallet, title: 'Financial Accounting', desc: 'Complete accounting suite with GST compliance' },
      { icon: FileText, title: 'Purchase & Sales', desc: 'Streamlined procurement and sales order processing' },
      { icon: BarChart3, title: 'Business Intelligence', desc: 'Advanced reporting and analytics dashboards' },
      { icon: Clock, title: 'Production Planning', desc: 'Efficient manufacturing and resource planning' },
      { icon: Shield, title: 'Quality Control', desc: 'Ensure product quality at every stage' },
    ],
    benefits: [
      'Reduce operational costs by up to 30%',
      'Real-time data for better decision making',
      'Eliminate manual data entry errors',
      'Improve supply chain efficiency',
      'Scalable as your business grows',
    ],
    industries: ['Manufacturing', 'Retail', 'Distribution', 'Healthcare', 'Construction'],
  },
  {
    id: 'hrms',
    icon: Users2,
    title: 'HRMS',
    tagline: 'Complete Human Resource Management',
    description:
      'An all-in-one human resource management system that simplifies employee lifecycle management from recruitment to retirement. Automate HR processes and focus on what matters - your people.',
    image: '/images/cloud.webp',
    price: '1,50,000',
    features: [
      {
        icon: Users2,
        title: 'Employee Management',
        desc: 'Centralized employee database and self-service portal',
      },
      { icon: Wallet, title: 'Payroll Processing', desc: 'Automated salary calculations with tax compliance' },
      { icon: Clock, title: 'Attendance & Leave', desc: 'Biometric integration and leave management' },
      { icon: BarChart3, title: 'Performance Reviews', desc: '360-degree feedback and appraisal system' },
      { icon: FileText, title: 'Recruitment', desc: 'End-to-end applicant tracking system' },
      { icon: Zap, title: 'Training & Development', desc: 'Learning management and skill tracking' },
    ],
    benefits: [
      'Save 40+ hours per month on HR tasks',
      'Ensure payroll accuracy and compliance',
      'Improve employee engagement',
      'Data-driven HR decisions',
      'Paperless HR operations',
    ],
    industries: ['IT Services', 'Manufacturing', 'Healthcare', 'Education', 'Retail'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Platform',
    tagline: 'Launch Your Online Store with Confidence',
    description:
      "A scalable e-commerce solution with all the features you need to launch, manage, and grow your online business. From single vendor to marketplace, we've got you covered.",
    image: '/images/marketing.webp',
    price: '1,00,000',
    features: [
      { icon: ShoppingCart, title: 'Product Management', desc: 'Easy catalog management with variants support' },
      { icon: Wallet, title: 'Payment Gateway', desc: 'Multiple payment options including UPI, cards, wallets' },
      { icon: Package, title: 'Order Management', desc: 'Streamlined order processing and fulfillment' },
      { icon: Users2, title: 'Multi-vendor Support', desc: 'Run your own marketplace with vendor management' },
      { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Sales insights and customer behavior analytics' },
      { icon: Zap, title: 'Marketing Tools', desc: 'Built-in SEO, coupons, and promotional features' },
    ],
    benefits: [
      'Go live in weeks, not months',
      'Mobile-first responsive design',
      'Handle 10,000+ concurrent users',
      'Integrated logistics support',
      '24/7 technical support',
    ],
    industries: ['Fashion', 'Electronics', 'Grocery', 'B2B Commerce', 'D2C Brands'],
  },
];

const comparisonFeatures = [
  { name: 'Custom Branding', erp: true, hrms: true, ecommerce: true },
  { name: 'Cloud Hosted', erp: true, hrms: true, ecommerce: true },
  { name: 'Mobile App', erp: false, hrms: true, ecommerce: true },
  { name: 'API Access', erp: true, hrms: true, ecommerce: true },
  { name: 'Multi-location Support', erp: true, hrms: true, ecommerce: false },
  { name: 'GST Compliance', erp: true, hrms: true, ecommerce: true },
  { name: 'Inventory Management', erp: true, hrms: false, ecommerce: true },
  { name: 'Payroll Processing', erp: false, hrms: true, ecommerce: false },
  { name: 'Payment Gateway', erp: false, hrms: false, ecommerce: true },
  { name: 'Dedicated Support', erp: true, hrms: true, ecommerce: true },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://bitropix.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: 'https://bitropix.com/products',
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />
      <main className="bg-[#0a0a12] pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-[#E03B37]/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-[#E03B37]/10 px-4 py-1.5 text-sm font-semibold text-[#E03B37]">
              <Zap className="h-4 w-4" />
              Deploy in Weeks, Not Months
            </div>
            <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl">
              Enterprise-Grade Solutions Built for Indian Businesses
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-400">
              Pre-built, battle-tested solutions with GST compliance, UPI integration, and localized workflows.
              Customize and deploy quickly to meet your unique business requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#E03B37] text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
              >
                <Link href="/contact">
                  Get a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/10 bg-transparent text-white hover:border-[#E03B37]/50 hover:bg-[#E03B37]/5"
              >
                <Link href="#comparison">Compare Solutions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="border-b border-white/10 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`#${product.id}`}
                  className="group flex items-center gap-4 rounded border border-white/10 bg-[#111119]/30 p-4 transition-all duration-300 hover:border-[#E03B37]/30 hover:bg-[#111119]/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                    <product.icon className="h-6 w-6 text-[#E03B37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{product.title}</h3>
                    <p className="text-sm font-medium text-[#E03B37]">Starting from &#8377;{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Product Sections */}
        {products.map((product, index) => (
          <section key={product.id} id={product.id} className="relative overflow-hidden py-20">
            {index % 2 === 1 && <div className="absolute inset-0 bg-[#0e0e18]" />}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-16 grid items-start gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                    <product.icon className="h-8 w-8 text-[#E03B37]" />
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">{product.title}</h2>
                  <p className="mb-4 text-xl text-[#E03B37]">{product.tagline}</p>

                  {/* Pricing Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-2">
                    <IndianRupee className="h-5 w-5 text-[#E03B37]" />
                    <span className="text-lg font-bold text-white">Starting from &#8377;{product.price}</span>
                    <span className="text-sm text-gray-400">+ customization</span>
                  </div>

                  <p className="mb-8 leading-relaxed text-gray-400">{product.description}</p>

                  <div className="mb-8">
                    <h3 className="mb-4 font-semibold text-white">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E03B37]" />
                          <span className="text-gray-400">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="mb-3 font-semibold text-white">Industries:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.industries.map((industry) => (
                        <span
                          key={industry}
                          className="rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-3 py-1 text-sm text-[#E03B37]"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      asChild
                      className="bg-[#E03B37] text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                    >
                      <Link href="/contact">
                        Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="border-white/10 bg-transparent text-white hover:border-[#E03B37]/50 hover:bg-[#E03B37]/5"
                    >
                      <Link href="/contact">Get Pricing</Link>
                    </Button>
                  </div>
                </div>

                <div className="aspect-video overflow-hidden rounded border border-white/10 bg-[#111119]/30">
                  <Image
                    src={product.image}
                    alt={`${product.title} Dashboard`}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-8 text-center text-2xl font-bold text-white">Features</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {product.features.map((feature) => (
                    <Card
                      key={feature.title}
                      className="group border-white/10 bg-[#111119]/30 transition-all duration-300 hover:border-[#E03B37]/30"
                    >
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                          <feature.icon className="h-5 w-5 text-[#E03B37]" />
                        </div>
                        <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-gray-400">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section id="comparison" className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Compare Our Solutions</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                See which solution fits your needs best. All products include free setup, training, and 3 months of
                support.
              </p>
            </div>

            <div className="overflow-hidden rounded border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#161622]">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                        <div className="flex flex-col items-center gap-1">
                          <Building2 className="h-5 w-5 text-[#E03B37]" />
                          <span>ERP</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                        <div className="flex flex-col items-center gap-1">
                          <Users2 className="h-5 w-5 text-[#E03B37]" />
                          <span>HRMS</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                        <div className="flex flex-col items-center gap-1">
                          <ShoppingCart className="h-5 w-5 text-[#E03B37]" />
                          <span>E-Commerce</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Pricing Row */}
                    <tr className="border-b border-white/10 bg-[#E03B37]/5">
                      <td className="px-6 py-4 text-sm font-semibold text-white">Starting Price</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-[#E03B37]">&#8377;2,00,000</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-[#E03B37]">&#8377;1,50,000</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-[#E03B37]">&#8377;1,00,000</span>
                      </td>
                    </tr>
                    {comparisonFeatures.map((feature, idx) => (
                      <tr
                        key={feature.name}
                        className={`border-b border-white/10 ${idx % 2 === 0 ? 'bg-[#111119]' : 'bg-[#0e0e18]'}`}
                      >
                        <td className="px-6 py-3.5 text-sm text-white">{feature.name}</td>
                        <td className="px-6 py-3.5 text-center">
                          {feature.erp ? (
                            <Check className="mx-auto h-5 w-5 text-[#E03B37]" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {feature.hrms ? (
                            <Check className="mx-auto h-5 w-5 text-[#E03B37]" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {feature.ecommerce ? (
                            <Check className="mx-auto h-5 w-5 text-[#E03B37]" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c42f2b]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Not Sure Which Solution Is Right for You?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Book a free 30-minute consultation with our solutions architect. We will analyze your requirements and
              recommend the best-fit product, customized for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-white text-[#0a0a12] transition-all duration-300 hover:bg-white/90"
                asChild
              >
                <Link href="/contact">
                  Schedule Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white transition-all duration-300 hover:bg-white/10"
                asChild
              >
                <Link href="tel:+919318454571">Call Us: +91 9318454571</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
