'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Phone } from 'lucide-react';
import { FadeIn } from '@/components/animate';

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        backgroundImage: 'url(/modern-office-team-working-on-computers-with-code-.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Let&apos;s Build Something
              <span className="text-[#E03B37]"> Extraordinary </span>
              Together
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
              Whether you need a website, mobile app, cloud migration, or a full digital marketing strategy — our team
              is ready to turn your vision into reality.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-14 bg-[#E03B37] px-8 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                asChild
              >
                <Link href="/contact">
                  Schedule a Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border border-white/20 bg-transparent px-8 text-lg text-white transition-all duration-300 hover:border-[#E03B37]/50 hover:bg-[#E03B37]/10"
                asChild
              >
                <Link href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" /> Call Us Now
                </Link>
              </Button>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 text-[#E03B37]" />
              We typically respond within 2 hours
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
