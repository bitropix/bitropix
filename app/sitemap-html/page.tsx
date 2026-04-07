import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { blogPosts } from '@/lib/blog-data';
import { jobOpenings } from '@/lib/careers';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

export const metadata: Metadata = {
  title: 'Sitemap - Bitropix | All Pages',
  description:
    'Browse the complete sitemap of Bitropix. Find links to all our services, products, blog posts, career openings, and more.',
  alternates: {
    canonical: 'https://www.bitropix.com/sitemap-html',
  },
};

const services = [
  { name: 'Web Development', href: '/services/web' },
  { name: 'Mobile App Development', href: '/services/mobile' },
  { name: 'UI/UX Design', href: '/services/design' },
  { name: 'Cloud Services', href: '/services/cloud' },
  { name: 'Digital Marketing', href: '/services/marketing' },
  { name: 'Digital Transformation', href: '/services/digital-transformation' },
  { name: 'Embedded Systems', href: '/services/embedded' },
  { name: 'IoT Solutions', href: '/services/iot' },
];

export default function SitemapHtmlPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'Sitemap' }]} />
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-block rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                Sitemap
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                All{' '}
                <span className="bg-linear-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">Pages</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                A complete list of all pages on the Bitropix website.
              </p>
            </div>
          </FadeIn>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Main Pages */}
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold text-white">Main Pages</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-[#E03B37] hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-[#E03B37] hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-[#E03B37] hover:underline">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-[#E03B37] hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </StaggerItem>

              {/* Services */}
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold text-white">Services</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/services" className="text-[#E03B37] hover:underline">
                      All Services
                    </Link>
                  </li>
                  {services.map((service) => (
                    <li key={service.href} className="pl-4">
                      <Link href={service.href} className="text-[#E03B37] hover:underline">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              {/* Blog */}
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold text-white">Blog</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blogs" className="text-[#E03B37] hover:underline">
                      All Blog Posts
                    </Link>
                  </li>
                  {blogPosts.map((post) => (
                    <li key={post.slug} className="pl-4">
                      <Link href={`/blogs/${post.slug}`} className="text-[#E03B37] hover:underline">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              {/* Careers */}
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold text-white">Careers</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/careers" className="text-[#E03B37] hover:underline">
                      All Openings
                    </Link>
                  </li>
                  {jobOpenings.map((job) => (
                    <li key={job.slug} className="pl-4">
                      <Link href={`/careers/${job.slug}`} className="text-[#E03B37] hover:underline">
                        {job.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
