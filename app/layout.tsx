import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SmoothScroll } from '@/components/site/smooth-scroll';
import { Cursor } from '@/components/site/cursor';
import { Splash, splashBootScript } from '@/components/site/splash';
import { ServiceWorkerRegister } from '@/components/site/sw-register';
import { siteConfig } from '@/lib/site-config';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: 'variable',
  axes: ['opsz'],
});

const SITE_URL = siteConfig.siteUrl;

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bitropix | IT Services & Digital Marketing Agency in Delhi',
    template: '%s | Bitropix',
  },
  description:
    'Bitropix is an IT services and digital marketing agency in Delhi. We offer website development, app development, SEO, digital marketing, cloud solutions, UI/UX design, ERP, HRMS & e-commerce solutions to help businesses grow.',
  keywords: [
    'IT services company Delhi',
    'digital marketing agency Delhi',
    'website development company Delhi',
    'app development company Delhi',
    'SEO services Delhi',
    'digital marketing services',
    'cloud migration services',
    'UI/UX design agency',
    'ERP solutions India',
    'HRMS software',
    'e-commerce development',
    'software development company Delhi',
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
    canonical: '/',
    languages: {
      'en-IN': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Bitropix',
    title: 'Bitropix | IT Services & Digital Marketing Agency in Delhi',
    description:
      'A product studio for web, mobile, cloud and growth. Bitropix designs, engineers and scales digital products for ambitious teams worldwide.',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bitropix | IT Services & Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitropix | IT Services & Digital Marketing Agency in Delhi',
    description:
      'A product studio for web, mobile, cloud and growth. Bitropix designs, engineers and scales digital products for ambitious teams worldwide.',
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: '@bitropix',
  },
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  category: 'technology',
};

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  addressCountry: siteConfig.address.country,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Bitropix',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.png`,
    width: 512,
    height: 512,
  },
  email: siteConfig.email,
  description: siteConfig.description,
  foundingDate: '2023-01-01',
  address: postalAddress,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'sales',
      email: siteConfig.email,
      areaServed: ['IN', 'US', 'GB', 'AE', 'AU'],
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: Object.values(siteConfig.social),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Bitropix',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#localbusiness`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  name: 'Bitropix',
  image: `${SITE_URL}/images/logo.png`,
  url: SITE_URL,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
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
  priceRange: 'INR 25,000 - INR 10,00,000+',
  areaServed: [
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'Country', name: 'India' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
        <meta name="geo.region" content={siteConfig.address.regionCode} />
        <meta name="geo.placename" content={siteConfig.address.locality} />
        <meta name="geo.position" content={`${siteConfig.geo.latitude};${siteConfig.geo.longitude}`} />
        <meta name="ICBM" content={`${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`} />
        <link rel="alternate" type="application/llms.txt" href="/llms.txt" />
        <link rel="alternate" type="application/vnd.google-earth.kml+xml" href="/bitropix.kml" />
      </head>
      {/* suppressHydrationWarning: browser extensions commonly add attributes to <body> before React loads */}
      <body
        className={`${geist.variable} ${geistMono.variable} ${display.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only z-100 bg-brand px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Splash />
        <NextTopLoader color="#ff4a1f" height={2} showSpinner={false} shadow={false} />
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
        <SmoothScroll />
        <Cursor />
        <ServiceWorkerRegister />
        <Analytics />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#121214',
              color: '#f3f0ea',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 0,
              fontSize: '0.9375rem',
            },
            success: { iconTheme: { primary: '#ff4a1f', secondary: '#fff' } },
          }}
        />
        {/* Structured data lives in <body> (Google reads it anywhere): extensions that inject
            scripts into <head> then can't collide with it during hydration. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
