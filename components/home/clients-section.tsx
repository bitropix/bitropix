'use client';

import { Building2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

const clients = [
  'TechCorp India',
  'GrowthBox',
  'NovaPay',
  'MediTrack',
  'UrbanNest',
  'CloudSync',
  'FinEdge',
  'RetailPulse',
];

export function ClientsSection() {
  return (
    <section className="border-y border-white/10 bg-[#0e0e18] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
              Trusted by innovative companies
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 items-center gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {clients.map((client) => (
            <StaggerItem key={client}>
              <div className="flex flex-col items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-white">
                <Building2 className="h-8 w-8 opacity-60" />
                <span className="text-center text-xs font-medium">{client}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
