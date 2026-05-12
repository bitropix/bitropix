import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, MapPin, Building2 } from 'lucide-react';
import { JobApplicationForm } from '@/components/careers/job-application-form';
import { getJobBySlug, jobOpenings } from '@/lib/careers';
import { FadeIn, FadeInLeft, FadeInRight } from '@/components/animate';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

type RolePageProps = {
  params: Promise<{ role: string }>;
};

export function generateStaticParams() {
  return jobOpenings.map((job) => ({
    role: job.slug,
  }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { role } = await params;
  const job = getJobBySlug(role);

  if (!job) {
    return {
      title: 'Role Not Found - Bitropix',
    };
  }

  return {
    title: { absolute: `${job.title} - Careers at Bitropix` },
    description: `Apply for the ${job.title} role at Bitropix. ${job.description}`,
    alternates: {
      canonical: `https://www.bitropix.com/careers/${job.slug}`,
    },
  };
}

const SITE_URL = 'https://www.bitropix.com';

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function buildJobPostingSchema(job: ReturnType<typeof getJobBySlug>) {
  if (!job) return null;
  const datePosted = job.postedAt;
  const validThrough = job.validThrough ?? addDays(job.postedAt, 90);
  const remote = /remote/i.test(job.location);
  const city = job.city ?? job.location.split('/')[0].trim();
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description} Required skills: ${job.skills.join(', ')}. Experience: ${job.experience}.`,
    datePosted,
    validThrough,
    employmentType: job.type.toUpperCase().includes('FULL') ? 'FULL_TIME' : 'CONTRACTOR',
    industry: 'Information Technology',
    occupationalCategory: job.department,
    experienceRequirements: job.experience,
    skills: job.skills.join(', '),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Bitropix',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: job.regionCode,
        addressCountry: 'IN',
      },
    },
    ...(job.salary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.salary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary.min,
          maxValue: job.salary.max,
          unitText: job.salary.unit,
        },
      },
    }),
    ...(remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: {
            '@type': 'Country',
            name: 'India',
          },
        }
      : {}),
    directApply: true,
    url: `${SITE_URL}/careers/${job.slug}`,
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { role } = await params;
  const job = getJobBySlug(role);

  if (!job) {
    notFound();
  }

  const jobSchema = buildJobPostingSchema(job);

  return (
    <>
      {jobSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
      )}
      <Navbar />
      <main className="bg-[#0a0a12] pt-16">
        <BreadcrumbNav items={[{ label: 'Careers', href: '/careers' }, { label: job.title }]} />
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E03B37]/15 blur-[100px]" />
          <div className="animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#E03B37]/10 blur-[100px] delay-500" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <span className="mb-6 inline-block rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-4 py-1.5 text-sm font-medium text-[#E03B37]">
                Open Position
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                <span className="bg-linear-to-r from-[#E03B37] to-[#ff6b6b] bg-clip-text text-transparent">
                  {job.title}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">{job.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
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
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-[#161622] px-3 py-1 text-sm text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FadeInRight>
              <Card className="border border-white/10 bg-[#111119]/30 p-6 sm:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl text-white">Apply for {job.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill in your details and submit your application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <JobApplicationForm initialRole={job.title} isRoleFixed />
                </CardContent>
              </Card>
            </FadeInRight>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
