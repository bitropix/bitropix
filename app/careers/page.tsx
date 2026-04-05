import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import Link from 'next/link';
import { SendResumeModal } from '@/components/careers/send-resume-modal';
import { jobOpenings } from '@/lib/careers';
import {
  Briefcase,
  MapPin,
  Clock,
  Heart,
  GraduationCap,
  Coffee,
  Plane,
  Laptop,
  Users,
  Zap,
  ArrowRight,
  Building2,
} from 'lucide-react';

export const metadata = {
  title: 'Careers at Bitropix | Job Openings in IT, Design & Marketing | Noida',
  description:
    'Explore career opportunities at Bitropix in Noida, India. We are hiring Full Stack Developers, Flutter Developers, and UI/UX Designers. Join our team of innovators building cutting-edge software solutions.',
  keywords: [
    'Bitropix careers',
    'IT jobs Noida',
    'software developer jobs',
    'Flutter developer jobs',
    'UI UX designer jobs',
    'tech jobs India',
    'remote developer jobs',
    'full stack developer hiring',
  ],
  alternates: {
    canonical: 'https://www.bitropix.com/careers',
  },
};

const benefits = [
  {
    icon: Heart,
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Growth',
    description: 'Annual learning budget and access to premium courses.',
  },
  {
    icon: Coffee,
    title: 'Flexible Hours',
    description: "Work when you're most productive with flexible schedules.",
  },
  {
    icon: Plane,
    title: 'Paid Time Off',
    description: 'Generous PTO policy plus paid holidays.',
  },
  {
    icon: Laptop,
    title: 'Remote Friendly',
    description: 'Work from anywhere with our hybrid work model.',
  },
  {
    icon: Users,
    title: 'Team Events',
    description: 'Regular team outings, hackathons, and celebrations.',
  },
];

const culture = [
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We ship fast, iterate quickly, and learn from every experience.',
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'The best solutions come from working together across teams.',
  },
  {
    icon: Heart,
    title: 'Care Deeply',
    description: 'We genuinely care about our work, our clients, and each other.',
  },
  {
    icon: GraduationCap,
    title: 'Keep Learning',
    description: 'Continuous learning is embedded in our culture.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.bitropix.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Careers',
      item: 'https://www.bitropix.com/careers',
    },
  ],
};

export default function CareersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="bg-[#0a0a12] pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <BreadcrumbNav items={[{ label: 'Careers' }]} />
            <FadeIn>
              <p className="mb-2 font-semibold text-[#E03B37]">Careers at Bitropix</p>
              <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl">Build the Future With Us</h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-400">
                Join a team of passionate innovators who are transforming businesses through technology. We're always
                looking for talented individuals who share our vision.
              </p>
              <Button
                size="lg"
                className="bg-[#E03B37] text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                asChild
              >
                <a href="#openings">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </FadeIn>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <p className="mb-2 font-semibold text-[#E03B37]">Our Culture</p>
                  <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">A Place Where You Can Thrive</h2>
                  <p className="mb-8 leading-relaxed text-gray-400">
                    At Bitropix, we believe that great work happens when talented people come together in an environment
                    that supports growth, creativity, and collaboration. We're building more than just software - we're
                    building a community.
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {culture.map((item) => (
                      <div key={item.title} className="group flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                          <item.icon className="h-5 w-5 text-[#E03B37]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded border border-white/10">
                  <img
                    src="/professional-team-meeting-in-modern-office-discuss.jpg"
                    alt="Team collaboration"
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 font-semibold text-[#E03B37]">Benefits & Perks</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">We Take Care of Our Team</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                We offer competitive compensation along with benefits designed to support your wellbeing and growth.
              </p>
            </div>
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit.title}>
                  <div className="group flex gap-4 rounded border border-white/10 bg-[#111119]/30 p-6 transition-all duration-300 hover:border-[#E03B37]/30">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                      <benefit.icon className="h-6 w-6 text-[#E03B37]" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section id="openings" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 font-semibold text-[#E03B37]">Open Positions</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Find Your Role</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Explore our current openings and find the perfect opportunity to grow your career.
              </p>
            </div>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <FadeIn key={job.id} delay={index * 0.1}>
                  <Card className="border-white/10 bg-[#111119]/30 transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                    <CardHeader>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="mb-1 text-xl text-white">{job.title}</CardTitle>
                          <CardDescription className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" /> {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" /> {job.experience}
                            </span>
                          </CardDescription>
                        </div>
                        <Button
                          asChild
                          className="bg-[#E03B37] text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                        >
                          <Link href={`/careers/${job.slug}`}>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-400">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-white/10 bg-[#161622] px-3 py-1 text-sm text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c42f2b]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Don't See the Right Role?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for
              future opportunities.
            </p>
            <SendResumeModal />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
