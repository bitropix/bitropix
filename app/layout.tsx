import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const SITE_URL = 'https://www.bitropix.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bitropix | Best IT Services & Digital Marketing Agency in India',
    template: '%s | Bitropix',
  },
  description:
    'Bitropix is a leading IT services and digital marketing agency in Noida, India. We offer website development, app development, SEO, digital marketing, cloud solutions, UI/UX design, ERP, HRMS & e-commerce solutions to help businesses grow.',
  keywords: [
    'IT services company India',
    'digital marketing agency Noida',
    'website development company',
    'app development India',
    'SEO services India',
    'digital marketing services',
    'cloud migration services',
    'UI/UX design agency',
    'ERP solutions India',
    'HRMS software',
    'e-commerce development',
    'software development company Noida',
    'web development agency',
    'mobile app development',
    'digital transformation',
    'IT consulting India',
    'Bitropix',
  ],
  authors: [{ name: 'Bitropix', url: SITE_URL }],
  creator: 'Bitropix',
  publisher: 'Bitropix',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Bitropix',
    title: 'Bitropix | Best IT Services & Digital Marketing Agency in India',
    description:
      'Transform your business with Bitropix. Leading IT services & digital marketing agency offering web development, app development, SEO, cloud solutions, and more.',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bitropix - IT Services & Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitropix | Best IT Services & Digital Marketing Agency in India',
    description:
      'Transform your business with Bitropix. Leading IT services & digital marketing agency offering web development, app development, SEO, cloud solutions, and more.',
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: '@bitropix',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bitropix',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      'Bitropix is a leading IT services and digital marketing agency in Noida, India offering website development, app development, SEO, digital marketing, cloud solutions, and more.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
      postalCode: '201301',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9318454571',
        contactType: 'sales',
        email: 'info@bitropix.com',
        areaServed: ['IN', 'US', 'GB', 'AE', 'AU'],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: ['https://www.linkedin.com/company/bitropix/', 'https://www.instagram.com/bitropix/'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bitropix',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Bitropix',
    image: `${SITE_URL}/images/logo.png`,
    url: SITE_URL,
    telephone: '+91-9318454571',
    email: 'info@bitropix.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6273928,
      longitude: 77.3764,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.6273928,
        longitude: 77.3764,
      },
      geoRadius: '50000',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Noida" />
        <meta name="geo.position" content="28.6273928;77.3764" />
        <meta name="ICBM" content="28.6273928, 77.3764" />
        <link rel="canonical" href={SITE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <NextTopLoader color="#E03B37" height={3} showSpinner={false} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#e5e5e5',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}
