import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/animate';
import Link from 'next/link';
import { Target, Eye, Heart, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { MilestonesSection } from '@/components/home/milestones-section';
import Image from 'next/image';

export const metadata = {
  title: 'About Bitropix | Leading IT Services Company in Noida, India',
  description:
    'Learn about Bitropix, a leading IT services company in Noida, India. Founded in 2023, we serve 50+ clients with expert website development, app development, SEO, and digital marketing solutions.',
  keywords: 'IT company Noida, about Bitropix, IT services India, digital transformation company, tech company Noida',
};

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in all our business dealings.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both internally and with our clients.',
  },
  {
    icon: Globe,
    title: 'Innovation',
    description: 'We continuously explore new technologies to deliver cutting-edge solutions.',
  },
];

const milestones = [
  {
    year: '2023',
    title: 'Founded',
    description: 'Bitropix was founded with a vision to transform businesses through technology.',
  },
  {
    year: '2023',
    title: 'First Major Client',
    description: 'Secured our first enterprise client and delivered a successful ERP implementation.',
  },
  {
    year: '2024',
    title: 'Team Expansion',
    description: 'Grew to 15+ team members and expanded our service offerings.',
  },
  {
    year: '2024',
    title: 'Product Launch',
    description: 'Launched our flagship HRMS and E-commerce products.',
  },
  {
    year: '2025',
    title: '50+ Clients',
    description: 'Reached the milestone of serving 50+ happy clients across industries.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '25+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
];

const awards = [
  {
    title: 'Top IT Services Company 2025',
    organization: 'Clutch.co',
    year: '2025',
  },
  {
    title: 'Best Startup - Technology',
    organization: 'Startup India',
    year: '2024',
  },
  {
    title: 'Excellence in Digital Transformation',
    organization: 'NASSCOM',
    year: '2024',
  },
];

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://bitropix.com/about' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-block rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                About Us
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Who{' '}
                <span className="bg-linear-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">We Are</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Founded in 2023, Bitropix is a leading IT services company based in Noida, India. We have grown from a
                small team with a big vision to a powerhouse of 25+ professionals serving 50+ clients across industries.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                >
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* About Detail Section */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <FadeInLeft>
                <div>
                  <p className="mb-6 text-lg leading-relaxed text-gray-400">
                    Founded in 2023, Bitropix is a leading IT services company based in Noida, India. In just two years,
                    we have grown from a small team with a big vision to a powerhouse of 25+ professionals serving{' '}
                    <strong className="text-white">50+ clients</strong> across industries including healthcare,
                    e-commerce, fintech, and education.
                  </p>
                  <p className="leading-relaxed text-gray-400">
                    We combine technical expertise with deep business understanding to deliver solutions that drive
                    real, measurable results. Our team of passionate developers, designers, and strategists works
                    tirelessly to turn your vision into reality.
                  </p>
                </div>
              </FadeInLeft>
              <FadeInRight>
                <div className="relative">
                  <div className="aspect-4/3 overflow-hidden rounded">
                    <Image
                      src="/diverse-team-of-professionals-collaborating-in-mod.jpg"
                      width={800}
                      height={600}
                      alt="Bitropix team collaborating in modern office"
                      className="h-full w-full object-cover opacity-100"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 rounded bg-linear-to-br from-[#E03B37] to-[#c62828] p-6 text-white shadow-lg shadow-[#E03B37]/20">
                    <p className="text-3xl font-bold">2+</p>
                    <p className="text-sm opacity-90">Years of Excellence</p>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37]/90 via-[#E03B37]/80 to-[#E03B37]/90" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="mb-1 text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="grid gap-12 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#111119] p-8 transition-colors hover:border-[#E03B37]/40">
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#E03B37]/5 blur-3xl transition-colors group-hover:bg-[#E03B37]/10" />
                  <div className="relative">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                      <Target className="h-7 w-7 text-[#E03B37]" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
                    <p className="leading-relaxed text-gray-400">
                      To empower businesses with innovative technology solutions that drive growth, efficiency, and
                      competitive advantage. We aim to be the catalyst for digital transformation, helping organizations
                      of all sizes harness the power of technology.
                    </p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#111119] p-8 transition-colors hover:border-[#E03B37]/30">
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#c62828]/5 blur-3xl transition-colors group-hover:bg-[#c62828]/10" />
                  <div className="relative">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                      <Eye className="h-7 w-7 text-[#E03B37]" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-white">Our Vision</h2>
                    <p className="leading-relaxed text-gray-400">
                      To be recognized globally as a trusted technology partner known for excellence, innovation, and
                      transformative solutions. We envision a future where every business, regardless of size, has
                      access to world-class IT solutions.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-[#0e0e18] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">Our Values</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">What Drives Us</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Our core values guide everything we do, from how we work with clients to how we grow as a company.
              </p>
            </div>
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="group text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                      <value.icon className="h-8 w-8 text-[#E03B37]" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Our Journey / Milestones */}
        <MilestonesSection milestones={milestones} />

        {/* Awards & Recognition */}
        <section className="bg-[#0e0e18] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">Recognition</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Awards & Recognition</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Our commitment to excellence has been recognized by leading industry bodies.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="group flex items-start gap-4 rounded-lg border border-white/10 bg-[#111119] p-6 transition-all duration-300 hover:border-[#E03B37]/30"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                    <Award className="h-7 w-7 text-[#E03B37]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{award.title}</h3>
                    <p className="text-sm font-medium text-[#E03B37]">{award.organization}</p>
                    <p className="text-xs text-gray-400">{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Want to Be Part of Our Story?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              Whether you are looking for a technology partner or a career opportunity, we would love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-6 py-3 text-sm font-semibold text-[#0a0a12] transition-all duration-300 hover:bg-white/90"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                View Careers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
