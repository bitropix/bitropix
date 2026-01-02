'use client';

import Link from 'next/link';
import { Globe, Smartphone, Palette, Cloud, TrendingUp, Cpu, Settings, Wifi, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps for iOS and Android that engage users.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive and beautiful digital experiences.',
  },
  {
    icon: Cloud,
    title: 'Cloud Migrations',
    description: 'Seamless migration to cloud infrastructure for scalability and cost efficiency.',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to grow your online presence and reach.',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Custom embedded solutions for IoT devices and industrial applications.',
  },
  {
    icon: Settings,
    title: 'IT Consulting',
    description: 'Strategic technology consulting to align IT with your business goals.',
  },
  {
    icon: Wifi,
    title: 'IoT Solutions',
    description: 'Connected device solutions that transform operations and create value.',
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Subtle gradient background */}
      <div className="from-secondary/30 via-background to-background absolute inset-0 bg-gradient-to-b" />
      <div className="bg-primary/5 absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 font-semibold">What We Do</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Comprehensive IT Services
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            From concept to deployment, we provide end-to-end solutions that drive digital transformation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group bg-card/50 border-border hover:border-primary/50 hover:shadow-primary/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="from-primary/20 to-primary/5 group-hover:from-primary group-hover:to-accent mb-4 flex h-12 w-12 items-center justify-center rounded bg-gradient-to-br transition-all duration-500">
                  <service.icon className="text-primary group-hover:text-primary-foreground h-6 w-6 transition-colors duration-500" />
                </div>
                <CardTitle className="text-foreground text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="text-primary inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
