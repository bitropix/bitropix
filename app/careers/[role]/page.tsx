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
    title: `${job.title} - Careers at Bitropix`,
    description: `Apply for the ${job.title} role at Bitropix.`,
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { role } = await params;
  const job = getJobBySlug(role);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a12] pt-16">
        <BreadcrumbNav items={[{ label: 'Careers', href: '/careers' }, { label: job.title }]} />
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <FadeInLeft>
                <Card className="border border-white/10 bg-[#111119]/30 p-6 sm:p-8">
                  <CardHeader className="px-0 pt-0">
                    <p className="mb-2 font-semibold text-[#E03B37]">Open Position</p>
                    <CardTitle className="text-3xl text-white sm:text-4xl">{job.title}</CardTitle>
                    <CardDescription className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
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
                  </CardHeader>
                  <CardContent className="space-y-6 px-0 pb-0">
                    <p className="text-gray-400">{job.description}</p>
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
              </FadeInLeft>
            </FadeIn>
          </div>
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
