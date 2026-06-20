/**
 * Central site configuration - single source of truth for the canonical URL,
 * brand name, and core business facts. Reused by the metadata layout, sitemap,
 * robots, and the llms.txt / llms-full.txt generators.
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bitropix.com';

export const siteConfig = {
  siteName: 'Bitropix',
  /** Canonical origin, never with a trailing slash. */
  siteUrl: RAW_SITE_URL.replace(/\/+$/, ''),
  tagline: 'IT Services & Digital Marketing Agency in Noida, India',
  description:
    'Bitropix is an IT services and digital marketing agency headquartered in Noida, India. We design, build, and grow digital products for startups and enterprises across India, the US, UK, UAE, and Australia. Core capabilities: web development, mobile app development, UI/UX design, SEO and digital marketing, cloud migrations, embedded systems, IoT, and digital transformation consulting.',
  email: 'info@bitropix.com',
  phone: '+91-9318454571',
  location: 'Noida, Uttar Pradesh, India',
  founded: '2023',
  serviceArea: ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
  social: {
    linkedin: 'https://www.linkedin.com/company/bitropix/',
    instagram: 'https://www.instagram.com/bitropix/',
    twitter: 'https://twitter.com/bitropix',
    facebook: 'https://www.facebook.com/bitropix',
  },
} as const;

/** Build an absolute URL from a path (or pass-through an already-absolute URL). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}
