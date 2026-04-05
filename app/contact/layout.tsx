import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Bitropix | Get Free IT Consultation',
  description:
    'Get in touch with Bitropix for a free IT consultation. Request a quote for web development, mobile apps, ERP, HRMS, and digital marketing services. Response within 2 hours.',
  keywords: [
    'contact Bitropix',
    'free IT consultation',
    'get a quote',
    'IT services consultation Noida',
    'web development quote',
    'software development inquiry',
    'ERP consultation India',
    'digital marketing consultation',
  ],
  openGraph: {
    title: 'Contact Bitropix | Get Free IT Consultation',
    description: 'Reach out to Bitropix for a free IT consultation. We respond within 2 hours during business days.',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
