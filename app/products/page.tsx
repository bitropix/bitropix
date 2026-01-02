import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
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
} from 'lucide-react';

export const metadata = {
  title: 'Products - Bitropix | ERP, HRMS & E-Commerce Solutions',
  description:
    'Explore our ready-to-deploy enterprise solutions including ERP, HRMS, and E-Commerce platforms customized for your business.',
};

const products = [
  {
    id: 'erp',
    icon: Building2,
    title: 'ERP Solutions',
    tagline: 'Streamline Your Entire Business Operations',
    description:
      'A comprehensive enterprise resource planning system designed to integrate all facets of your business operations. From inventory management to financial accounting, our ERP solution provides real-time visibility and control.',
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

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/50 via-background to-primary/5 absolute inset-0 bg-gradient-to-br" />
          <div className="bg-primary/10 absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-primary mb-2 font-semibold">Our Products</p>
            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
              Ready-to-Deploy Enterprise Solutions
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              Pre-built, battle-tested solutions that can be customized and deployed quickly to meet your unique
              business requirements.
            </p>
          </div>
        </section>

        <section className="border-border border-b py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`#${product.id}`}
                  className="bg-card/30 border-border hover:border-primary/30 hover:bg-card/50 group flex items-center gap-4 rounded border p-4 transition-all duration-300"
                >
                  <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-12 w-12 items-center justify-center rounded bg-gradient-to-br transition-all">
                    <product.icon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">{product.title}</h3>
                    <p className="text-muted-foreground text-sm">Learn more</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {products.map((product, index) => (
          <section key={product.id} id={product.id} className="relative overflow-hidden py-20">
            {index % 2 === 1 && (
              <div className="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent" />
            )}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-16 grid items-start gap-12 lg:grid-cols-2">
                <div>
                  <div className="from-primary/20 to-primary/5 mb-6 flex h-16 w-16 items-center justify-center rounded bg-gradient-to-br">
                    <product.icon className="text-primary h-8 w-8" />
                  </div>
                  <h2 className="text-foreground mb-2 text-3xl font-bold sm:text-4xl">{product.title}</h2>
                  <p className="text-primary mb-4 text-xl">{product.tagline}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                  <div className="mb-8">
                    <h3 className="text-foreground mb-4 font-semibold">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-foreground mb-3 font-semibold">Industries:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.industries.map((industry) => (
                        <span
                          key={industry}
                          className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-sm"
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
                      className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
                    >
                      <Link href="/contact">
                        Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent"
                    >
                      <Link href="/contact">Get Pricing</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-card/30 border-border aspect-video overflow-hidden rounded border">
                  <img
                    src={`/.jpg?height=400&width=600&query=${product.title} software dashboard dark`}
                    alt={`${product.title} Dashboard`}
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-8 text-center text-2xl font-bold">Features</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {product.features.map((feature) => (
                    <Card
                      key={feature.title}
                      className="bg-card/30 border-border hover:border-primary/30 group transition-all duration-300"
                    >
                      <CardHeader className="pb-2">
                        <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 mb-3 flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br transition-all">
                          <feature.icon className="text-primary h-5 w-5" />
                        </div>
                        <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-gradient-to-r" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">Need a Custom Solution?</h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              Our products can be customized to fit your exact requirements. Let's discuss how we can tailor these
              solutions for your business.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
              asChild
            >
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
