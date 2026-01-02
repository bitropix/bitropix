import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bitropix | IT Services & Digital Transformation Solutions',
  description:
    'Bitropix delivers cutting-edge IT solutions including software development, cloud migrations, digital transformation, agile hiring, ERP, HRMS, and e-commerce solutions.',
  keywords: [
    'IT services',
    'software development',
    'digital transformation',
    'cloud migration',
    'ERP',
    'HRMS',
    'e-commerce',
    'agile hiring',
    'Bitropix',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'Bitropix | IT Services & Digital Transformation Solutions',
    description:
      'Transform your business with innovative IT solutions from Bitropix. Web development, mobile apps, cloud services, and more.',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <NextTopLoader color="#E03B37" height={2} showSpinner={false} />
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
