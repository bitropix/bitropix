import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/page-hero';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal, RevealGroup, RevealItem } from '@/components/site/reveal';
import { JobApplicationForm } from '@/components/careers/job-application-form';
import { RoleRows } from '@/components/careers/role-rows';
import { getJobBySlug, jobOpenings, type JobOpening } from '@/lib/careers';

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
      title: 'Role not found',
    };
  }

  return {
    title: { absolute: `${job.title} | Careers at Bitropix` },
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

const UNIT_LABEL: Record<NonNullable<JobOpening['salary']>['unit'], string> = {
  HOUR: 'per hour',
  DAY: 'per day',
  WEEK: 'per week',
  MONTH: 'per month',
  YEAR: 'per year',
};

function formatSalary(salary: NonNullable<JobOpening['salary']>) {
  const fmt = new Intl.NumberFormat(salary.currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  return { range: `${fmt.format(salary.min)} to ${fmt.format(salary.max)}`, unit: UNIT_LABEL[salary.unit] };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso)
  );
}

export default async function RolePage({ params }: RolePageProps) {
  const { role } = await params;
  const job = getJobBySlug(role);

  if (!job) {
    notFound();
  }

  const jobSchema = buildJobPostingSchema(job);
  const salary = job.salary ? formatSalary(job.salary) : null;
  const otherRoles = jobOpenings.filter((j) => j.slug !== job.slug);

  const meta: { label: string; value: string; sub?: string }[] = [
    { label: 'Department', value: job.department },
    { label: 'Location', value: job.location },
    { label: 'Type', value: job.type },
    { label: 'Experience', value: job.experience },
    ...(salary ? [{ label: 'Salary', value: salary.range, sub: salary.unit }] : []),
  ];

  return (
    <>
      {jobSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
      )}
      <main>
        <PageHero
          title={job.title}
          crumbs={[{ label: 'Careers', href: '/careers' }, { label: job.title }]}
          description={<p>{job.description}</p>}
        >
          <ButtonLink href="#apply">Apply now</ButtonLink>
          <ButtonLink href="/careers#openings" variant="ghost">
            All open roles
          </ButtonLink>
        </PageHero>

        {/* Meta grid */}
        <section aria-label="Role details">
          <div className="container-x">
            <RevealGroup
              as="div"
              className={`grid grid-cols-2 border-l border-line ${meta.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}
            >
              {meta.map((m) => (
                <RevealItem
                  key={m.label}
                  className={`border-r border-b border-line p-6 sm:p-8 ${m.label === 'Salary' ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  <dl>
                    <dt className="eyebrow">{m.label}</dt>
                    <dd className="mt-3 text-lg font-medium text-paper sm:text-xl">{m.value}</dd>
                    {m.sub && <dd className="mt-1 text-sm text-mute">{m.sub}</dd>}
                  </dl>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Role + application */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="01" className="mb-12">
              The role
            </Eyebrow>
          </div>
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                <SplitText
                  as="h2"
                  text="Where you fit in."
                  className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
                />
                <Reveal className="mt-8">
                  <p className="text-lg leading-relaxed text-paper-dim">
                    You will work alongside designers, engineers and growth marketers on products for startups and
                    enterprises across India, the US, UK, UAE and Australia.
                  </p>

                  <h3 className="eyebrow mt-12 mb-4">Skills we are looking for</h3>
                  <ul className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <li key={skill} className="tag h-9! px-3! text-xs! text-paper!">
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <p className="eyebrow mt-12">
                    Posted <time dateTime={job.postedAt}>{formatDate(job.postedAt)}</time>
                  </p>
                </Reveal>
              </div>
            </div>

            <div id="apply" className="scroll-mt-[calc(var(--nav-h)+2rem)] lg:col-span-7">
              <Reveal>
                <div className="border border-line-strong bg-ink-2 p-6 sm:p-10 lg:p-12">
                  <Eyebrow index="02" className="mb-6">
                    Apply
                  </Eyebrow>
                  <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-semibold text-paper">
                    Apply for {job.title}
                  </h2>
                  <p className="mt-4 mb-12 text-paper-dim">Fill in your details and submit your application.</p>
                  <JobApplicationForm initialRole={job.title} isRoleFixed />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {otherRoles.length > 0 && (
          <section className="relative py-24 sm:py-36">
            <div className="container-x relative">
              <Eyebrow rule index="03" className="mb-12">
                More roles
              </Eyebrow>
              <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <SplitText
                    as="h2"
                    text="Other open positions."
                    className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
                  />
                </div>
                <ButtonLink href="/careers" variant="ghost">
                  Life at Bitropix
                </ButtonLink>
              </div>
              <RoleRows jobs={otherRoles} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
