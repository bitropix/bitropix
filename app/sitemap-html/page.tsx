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
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="mb-4 text-4xl font-bold text-white">Sitemap</h1>
              <p className="mb-12 text-lg text-gray-400">A complete list of all pages on the Bitropix website.</p>
            </FadeIn>

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
