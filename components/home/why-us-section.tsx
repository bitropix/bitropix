'use client';

import { Award, Zap, HeartHandshake, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

const reasons = [
  {
    icon: Award,
    title: 'Proven Expertise',
    description: '5+ years of delivering successful projects across industries with a team of certified professionals.',
  },
  {
    icon: Zap,
    title: 'Agile Methodology',
    description: 'Fast, iterative development process that ensures quick delivery and continuous improvement.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-Centric Approach',
    description: 'Your success is our priority. We work as an extension of your team to achieve your goals.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of technology trends to bring you cutting-edge solutions that give you an edge.',
  },
];

export function WhyUsSection() {
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
        backgroundImage: 'url(/professional-team-meeting-in-modern-office-discuss.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Parallax background element */}
      <div 
        className="bg-primary/5 absolute top-1/2 right-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full blur-[100px] z-10"
        style={{ transform: `translateY(${offsetY}px)` }}
      />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="border-border relative aspect-[4/3] overflow-hidden rounded border">
              <img
                src="/professional-team-meeting-in-modern-office-discuss.jpg"
                alt="Our team at work"
                className="h-full w-full object-cover"
              />
              {/* <div className="from-background via-background/50 absolute inset-0 bg-gradient-to-t to-transparent" /> */}
            </div>
            {/* Floating stat card */}
            <div className="from-primary to-accent text-primary-foreground shadow-primary/20 absolute -right-6 -bottom-6 rounded bg-gradient-to-br p-6 shadow-lg">
              <p className="text-4xl font-bold">98%</p>
              <p className="text-sm opacity-90">Client Retention Rate</p>
            </div>
          </div>

          <div>
            <p className="text-primary mb-2 font-semibold">Why Choose Us</p>
            <h2 className="text-secondary mb-6 text-3xl font-bold text-balance sm:text-4xl">
              Your Trusted Technology Partner
            </h2>
            <p className="text-muted mb-8 leading-relaxed">
              We combine technical excellence with business acumen to deliver solutions that not only work but drive
              real business value.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="group flex gap-4">
                  <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br transition-all">
                    <reason.icon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-primary mb-1 font-semibold">{reason.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
