import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded p-8 text-center md:p-16">
          {/* Gradient border effect */}
          <div className="from-primary/20 via-secondary to-accent/20 absolute inset-0 rounded bg-linear-to-br" />
          <div className="bg-card absolute inset-px rounded" />

          {/* Glow effects */}
          <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 rounded-full blur-[100px]" />
          <div className="bg-accent/10 absolute bottom-0 left-0 h-48 w-48 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
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
                className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
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
