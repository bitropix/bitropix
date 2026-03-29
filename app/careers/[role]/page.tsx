import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, MapPin, Building2 } from 'lucide-react';
import { JobApplicationForm } from '@/components/careers/job-application-form';
import { getJobBySlug, jobOpenings } from '@/lib/careers';

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
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/50 via-background to-primary/5 absolute inset-0 bg-gradient-to-br" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-card/30 border-border border p-6 sm:p-8">
              <CardHeader className="px-0 pt-0">
                <p className="text-primary mb-2 font-semibold">Open Position</p>
                <CardTitle className="text-foreground text-3xl sm:text-4xl">{job.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-4 flex flex-wrap gap-4 text-sm">
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
                <p className="text-muted-foreground">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-secondary/50 border-border text-foreground rounded-full border px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-card/30 border-border border p-6 sm:p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-foreground text-2xl">Apply for {job.title}</CardTitle>
                <CardDescription>Fill in your details and submit your application.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <JobApplicationForm initialRole={job.title} isRoleFixed />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
