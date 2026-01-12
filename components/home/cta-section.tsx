'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CTASection() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative overflow-hidden py-20"
      style={{
        backgroundImage: 'url(/modern-office-team-working-on-computers-with-code-.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded p-8 text-center md:p-16">
          {/* Gradient border effect */}
          {/* <div className="from-primary/20 via-secondary to-accent/20 absolute inset-0 rounded bg-linear-to-br" /> */}
          {/* <div className="bg-card absolute inset-px rounded" /> */}

          {/* Glow effects */}
          {/* <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 rounded-full blur-[100px]" /> */}
          {/* <div className="bg-accent/10 absolute bottom-0 left-0 h-48 w-48 rounded-full blur-[100px]" /> */}

          <div className="relative z-20">
            <h2 className="text-background mb-4 text-3xl font-bold text-balance sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted mx-auto mb-8 max-w-2xl">
              Let's discuss how Bitropix can help you achieve your technology goals. Get a free consultation with our
              experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
                asChild
              >
                <Link href="/contact">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-muted hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
                asChild
              >
                <Link href="mailto:info@bitropix.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
