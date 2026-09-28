import { blogPosts } from '@/lib/blog-data';
import { jobOpenings } from '@/lib/careers';
import { portfolioProjects } from '@/lib/portfolio-data';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { RevealGroup, RevealItem } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'Sitemap | All Pages',
  description:
    'Browse the complete sitemap of Bitropix. Find links to all our services, blog posts, career openings, case studies, and more.',
  alternates: {
    canonical: 'https://www.bitropix.com/sitemap-html',
  },
};

const services = [
  { name: 'Web Development', href: '/services#web' },
  { name: 'Mobile App Development', href: '/services#mobile' },
  { name: 'UI/UX Design', href: '/services#design' },
  { name: 'Cloud Services', href: '/services#cloud' },
  { name: 'Digital Marketing', href: '/services#marketing' },
  { name: 'Digital Transformation', href: '/services#digital-transformation' },
  { name: 'Embedded Systems', href: '/services#embedded' },
  { name: 'IoT Solutions', href: '/services#iot' },
];

interface SitemapLink {
  name: string;
  href: string;
}

interface SitemapGroup {
  id: string;
  title: string;
  /** Landing page for the group, rendered as the first, emphasised row. */
  index?: SitemapLink;
  links: SitemapLink[];
  /** Wide cell with a two-column list (for long groups). */
  wide?: boolean;
}

const groups: SitemapGroup[] = [
  {
    id: 'pages',
    title: 'Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Work', href: '/portfolio' },
      { name: 'Insights', href: '/blogs' },
      { name: 'Careers', href: '/careers' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    index: { name: 'All services', href: '/services' },
    links: services,
  },
  {
    id: 'work',
    title: 'Work',
    index: { name: 'All case studies', href: '/portfolio' },
    links: portfolioProjects.map((p) => ({ name: p.title, href: `/portfolio/${p.slug}` })),
  },
  {
    id: 'insights',
    title: 'Insights',
    index: { name: 'All blog posts', href: '/blogs' },
    links: blogPosts.map((post) => ({ name: post.title, href: `/blogs/${post.slug}` })),
    wide: true,
  },
  {
    id: 'careers',
    title: 'Careers',
    index: { name: 'All openings', href: '/careers' },
    links: jobOpenings.map((job) => ({ name: job.title, href: `/careers/${job.slug}` })),
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

const totalLinks = groups.reduce((n, g) => n + g.links.length + (g.index ? 1 : 0), 0);

function Row({ link, emphasis = false }: { link: SitemapLink; emphasis?: boolean }) {
  return (
    <li className="border-b border-line">
      <Link
        href={link.href}
        className={`group relative flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] leading-snug transition-colors duration-300 hover:text-paper ${
          emphasis ? 'font-medium text-paper' : 'text-paper-dim'
        }`}
      >
        <span className="link-line">{link.name}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink ${
            emphasis ? 'border-line-strong text-paper' : 'border-line text-mute'
          }`}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </li>
  );
}

export default function SitemapHtmlPage() {
  return (
    <main>
      <PageHero
        title="Every page, one index."
        crumbs={[{ label: 'Sitemap' }]}
        description="A complete list of every page on the Bitropix website, grouped the way we think about it."
        aside={
          <dl className="grid grid-cols-2 border-t border-l border-line">
            <div className="border-r border-b border-line p-6">
              <dt className="eyebrow">Sections</dt>
              <dd className="font-display mt-3 text-4xl leading-none font-semibold text-paper tabular-nums">
                {String(groups.length).padStart(2, '0')}
              </dd>
            </div>
            <div className="border-r border-b border-line p-6">
              <dt className="eyebrow">Links</dt>
              <dd className="font-display mt-3 text-4xl leading-none font-semibold text-paper tabular-nums">
                {totalLinks}
              </dd>
            </div>
          </dl>
        }
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <RevealGroup className="grid grid-flow-dense border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => (
              <RevealItem
                key={g.id}
                className={`group/cell relative border-r border-b border-line p-6 sm:p-8 ${
                  g.wide ? 'md:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <i
                  className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cell:scale-x-100"
                  aria-hidden="true"
                />
                <section aria-labelledby={`sitemap-${g.id}`}>
                  <div className="mb-6 flex items-baseline justify-between gap-4">
                    <h2
                      id={`sitemap-${g.id}`}
                      className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold text-paper"
                    >
                      {g.title}
                    </h2>
                    <span className="eyebrow tabular-nums">
                      ({String(i + 1).padStart(2, '0')}) {g.links.length + (g.index ? 1 : 0)} links
                    </span>
                  </div>
                  <ul className={`border-t border-line ${g.wide ? 'md:grid md:grid-cols-2 md:gap-x-10' : ''}`}>
                    {g.index && <Row link={g.index} emphasis />}
                    {g.links.map((l) => (
                      <Row key={l.href} link={l} />
                    ))}
                  </ul>
                </section>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
