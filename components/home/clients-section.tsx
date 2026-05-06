'use client';

import { Briefcase } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

// Real engagements only - keep the list short and verifiable.
const clients = [
  { name: 'Tourillo', industry: 'Travel & Tourism' },
  { name: 'Advanced Beauty', industry: 'Beauty & Wellness' },
  { name: 'Beverly Agrovet', industry: 'Agriculture' },
  { name: 'Dishaa Vertex', industry: 'Education' },
];

export function ClientsSection() {
  return (
    <section className="border-y border-white/10 bg-[#0e0e18] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Selected client engagements</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 items-center gap-8 sm:grid-cols-4">
          {clients.map((client) => (
            <StaggerItem key={client.name}>
              <div className="flex flex-col items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-white">
                <Briefcase className="h-7 w-7 opacity-60" />
                <span className="text-center text-sm font-semibold text-white">{client.name}</span>
                <span className="text-center text-xs text-gray-500">{client.industry}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
