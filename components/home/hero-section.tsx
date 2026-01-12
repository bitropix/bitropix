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
    <section className="relative h-[90vh] flex items-center overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* VIDEO BACKGROUND - Fullscreen autoplay, muted, loop */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/modern-office-team-working-on-computers-with-code-.jpg"
      >
        <source src="/hero-section.mp4" type="video/mp4" />
        <img
          src="/modern-office-team-working-on-computers-with-code-.jpg"
          alt="Team working"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/20" />

      {/* Animated glow orbs */}
      {/* <div className="bg-primary/20 animate-pulse-glow absolute top-20 right-10 h-125 w-125 rounded-full blur-[100px] z-20" /> */}
      {/* <div className="bg-accent/20 animate-pulse-glow absolute bottom-20 left-10 h-100 w-100 rounded-full blur-[100px] delay-500 z-20" /> */}

      <div className="relative z-30 mx-auto w-full px-[15%] py-8">
        <div className="flex justify-start gap-12 w-full">
          
          {/* Left Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            {/* Badge */}
            {/* <div className="bg-primary/20 border-primary/40 text-primary animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur-sm">
              <span className="bg-primary h-2.5 w-2.5 animate-pulse rounded-full" />
              Trusted by 50+ Businesses
            </div> */}

            {/* Heading */}
            <h1 className="text-primary text-4xl leading-tight font-bold text-balance sm:text-3xl lg:text-4xl xl:text-6xl max-w-lg">
              Transform Your Business with innovation
            </h1>

            {/* Description */}
            <p className="text-background mt-6 max-w-xl text-lg leading-relaxed backdrop-blur-sm  rounded-xl ">
              Bitropix delivers cutting-edge IT solutions including software development, digital transformation, 
              cloud migrations, and agile hiring to accelerate your growth.
            </p>

            {/* CTA Buttons */}
            {/* <div className="mt-10 flex justify-center flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary/95 hover:bg-primary text-primary-foreground backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 text-lg px-8 h-14 font-semibold rounded-xl"
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-none hover:border-primary/80 bg-white/10 backdrop-blur-sm text-primary transition-all duration-300 h-14 px-8 text-lg rounded-xl font-semibold"
              >
                <Link href="/about">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Link>
              </Button>
            </div> */}

            {/* Stats */}
            {/* <div className="mt-16 flex justify-center items-center gap-8 flex-wrap">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '50+', label: 'Happy Clients' },
                { value: '2+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="animate-slide-up backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-white/10"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* ZIGZAG BOTTOM WAVE - Exact match to your image */}
      <div className="absolute bottom-0 left-0 w-full h-20 lg:h-28 overflow-hidden z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-background"
        >
          <path d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
