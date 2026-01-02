import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Building2, Users2, ShoppingCart } from 'lucide-react';

const products = [
  {
    icon: Building2,
    title: 'ERP Solutions',
    description:
      'Comprehensive enterprise resource planning system to streamline operations, manage resources, and boost productivity across all departments.',
    features: ['Inventory Management', 'Financial Accounting', 'Supply Chain', 'Reporting & Analytics'],
    href: '/products#erp',
  },
  {
    icon: Users2,
    title: 'HRMS',
    description:
      'Complete human resource management system for efficient employee lifecycle management from recruitment to retirement.',
    features: ['Payroll Management', 'Attendance Tracking', 'Performance Reviews', 'Leave Management'],
    href: '/products#hrms',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Platform',
    description: 'Scalable e-commerce solution with all the features you need to launch and grow your online store.',
    features: ['Multi-vendor Support', 'Payment Gateway', 'Order Management', 'Analytics Dashboard'],
    href: '/products#ecommerce',
  },
];

export function ProductsSection() {
  return (
    <section className="from-background via-secondary/20 to-background relative overflow-hidden bg-gradient-to-b py-20">
      {/* Subtle glow */}
      <div className="bg-primary/5 absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 font-semibold">Our Products</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Ready-to-Deploy Solutions
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Pre-built enterprise solutions that can be customized to fit your unique business requirements.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={product.title}
              className="bg-card/30 border-border hover:border-primary/30 hover:bg-card/50 group backdrop-blur-sm transition-all duration-500"
            >
              <CardHeader>
                <div className="from-primary/30 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/30 mb-4 flex h-14 w-14 items-center justify-center rounded bg-gradient-to-br transition-all duration-500">
                  <product.icon className="text-primary h-7 w-7" />
                </div>
                <CardTitle className="text-foreground text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </CardDescription>
                <ul className="mb-6 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-muted-foreground flex items-center gap-2 text-sm">
                      <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="text-primary inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
            asChild
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
