import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { ButtonLink, PixelMark } from '@/components/site/ui';
import { LocalTime } from '@/components/site/local-time';
import { Magnetic } from '@/components/site/magnetic';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services#web' },
      { label: 'Mobile Apps', href: '/services#mobile' },
      { label: 'UI/UX Design', href: '/services#design' },
      { label: 'Cloud Solutions', href: '/services#cloud' },
      { label: 'Digital Marketing & SEO', href: '/services#marketing' },
      { label: 'Digital Transformation', href: '/services#digital-transformation' },
      { label: 'Embedded Systems', href: '/services#embedded' },
      { label: 'IoT Solutions', href: '/services#iot' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/portfolio' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/blogs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Case Studies', href: '/portfolio' },
      { label: 'Sitemap', href: '/sitemap-html' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      {/* Big CTA band */}
      <div className="container-x grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6">Have an idea?</p>
          <Link
            href="/contact"
            className="group font-display block text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-semibold text-paper"
            data-cursor="Let's talk"
          >
            Let&apos;s build it
            <span className="block text-mute transition-colors duration-500 group-hover:text-brand">together.</span>
          </Link>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end">
          <Magnetic>
            <ButtonLink href="/contact">Start a project</ButtonLink>
          </Magnetic>
          <a href={`mailto:${siteConfig.email}`} className="link-line text-lg text-paper-dim hover:text-paper">
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line py-16 md:grid-cols-4 lg:grid-cols-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-4">
          <Link href="/" className="mb-6 flex items-center gap-3" aria-label="Bitropix home">
            <PixelMark className="h-6 w-6" />
            <span className="font-display text-lg font-bold tracking-[0.18em] text-paper">BITROPIX</span>
          </Link>
          <p className="max-w-xs leading-relaxed text-paper-dim">
            A product studio for web, mobile, cloud and growth. We design, engineer and scale digital products for
            ambitious teams worldwide.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="eyebrow mb-1">Studio</dt>
              <dd className="text-paper">{siteConfig.location}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Local time</dt>
              <dd className="font-mono text-paper tabular-nums">
                <LocalTime />
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Call</dt>
              <dd>
                <a href={siteConfig.phoneHref} className="link-line text-paper">
                  {siteConfig.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="lg:col-span-2">
            <h3 className="eyebrow mb-5">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="link-line text-sm text-paper-dim hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-5">Follow</h3>
          <ul className="space-y-3">
            {Object.entries(siteConfig.social).map(([name, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-sm text-paper-dim capitalize hover:text-paper"
                >
                  {name === 'twitter' ? 'X (Twitter)' : name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="container-x" aria-hidden="true">
        {/* Decorative: drawn as SVG so it scales exactly to the container width */}
        <svg viewBox="0 0 1000 150" className="block w-full translate-y-[14%] select-none" role="presentation">
          <text
            x="500"
            y="140"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            className="font-display fill-ink-3 font-bold"
            style={{ fontSize: 190, letterSpacing: '-0.05em' }}
          >
            BITROPIX
          </text>
        </svg>
      </div>

      <div className="relative border-t border-line bg-ink">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Bitropix. All rights reserved.</p>
          <p className="font-mono tracking-[0.1em] uppercase">Designed and engineered in-house</p>
        </div>
      </div>
    </footer>
  );
}
