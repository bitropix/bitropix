import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Clock, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Expert Specialists',
    description: 'Access top-tier talent with specialized skills tailored to your project needs.',
  },
  {
    icon: Clock,
    title: 'Quick Deployment',
    description: 'Get resources onboarded and productive within days, not months.',
  },
  {
    icon: Shield,
    title: 'No Hiring Overhead',
    description: 'Eliminate recruitment costs, training expenses, and HR administration.',
  },
];

const checkpoints = [
  'Dedicated developer works exclusively for you',
  'Flexible engagement models (full-time/part-time)',
  'Seamless integration with your existing team',
  'Regular performance reviews and reporting',
  'Easy scaling up or down based on needs',
];

export function AgileHiringSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-primary/5">
      {/* <div className="from-primary/10 to-accent/5 absolute inset-0 bg-linear-to-b via-transparent" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-primary mb-2 font-semibold">Agile Hiring</p>
            <h2 className="text-foreground mb-6 text-3xl font-bold text-balance sm:text-4xl">
              Build Your Dream Team Without the Hassle
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our agile hiring model provides you with dedicated specialists who work exclusively for your company. Get
              the expertise you need without the complexities of traditional hiring.
            </p>

            <ul className="mb-8 space-y-4">
              {checkpoints.map((point, index) => (
                <li key={point} className="group flex items-start gap-3">
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors">
                    <CheckCircle2 className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/contact">Hire Talent Now</Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-card/50 border-border hover:border-primary/30 hover:bg-card/80 group flex gap-4 rounded border p-6 backdrop-blur-sm transition-all duration-300"
              >
                <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br transition-all">
                  <benefit.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
