'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-background relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Subtle linear overlays */}
      <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent" />
      <div className="from-accent/5 absolute inset-0 bg-linear-to-tl via-transparent to-transparent" />

      {/* Animated glow orbs */}
      <div className="bg-primary/10 animate-pulse-glow absolute top-20 right-10 h-125 w-125 rounded-full blur-[100px]" />
      <div className="bg-accent/10 animate-pulse-glow absolute bottom-20 left-10 h-100 w-100 rounded-full blur-[100px] delay-500" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-linear(rgba(255,77,45,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(255,77,45,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="bg-primary/10 border-primary/20 text-primary animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              Trusted by 50+ Businesses
            </div>
            <h1 className="text-foreground text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
              Transform Your Business with{' '}
              <span className="from-primary to-accent bg-linear-to-r bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              Bitropix delivers cutting-edge IT solutions including software development, digital transformation, cloud
              migrations, and agile hiring to accelerate your growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
              >
                <Link href="/about">
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats with animation */}
            <div className="mt-12 flex items-center gap-8">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '50+', label: 'Happy Clients' },
                { value: '2+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`animate-slide-up`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <p className="text-foreground text-3xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div
            className={`relative transition-all delay-300 duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* linear background card */}
              <div className="from-primary/20 to-accent/20 animate-float absolute inset-0 rotate-6 rounded bg-linear-to-br" />
              <div className="border-border bg-secondary/50 absolute inset-0 overflow-hidden rounded border backdrop-blur-sm">
                <img
                  src="/modern-office-team-working-on-computers-with-code-.jpg"
                  alt="Team working on innovative solutions"
                  className="h-full w-full object-cover opacity-60"
                />
                {/* Overlay linear */}
                <div className="from-background absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="bg-card border-border animate-slide-up absolute -bottom-6 -left-6 rounded border p-4 backdrop-blur-sm delay-500">
                <div className="flex items-center gap-3">
                  <div className="from-primary to-accent flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
                    <span className="text-primary-foreground text-xl font-bold">98%</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Client Satisfaction</p>
                    <p className="text-muted-foreground text-sm">Based on reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
