import type { Metadata } from 'next';
import { SmartImage } from '@/components/site/smart-image';
import { Heart, GraduationCap, Coffee, Plane, Laptop, Users } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { Eyebrow, ButtonLink, PixelMark } from '@/components/site/ui';
import { SplitText, Reveal, RevealGroup, RevealItem } from '@/components/site/reveal';
import { SendResumeModal } from '@/components/careers/send-resume-modal';
import { RoleRows } from '@/components/careers/role-rows';
import { jobOpenings } from '@/lib/careers';
import { absoluteUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'Careers at Bitropix | Job Openings in IT, Design & Marketing | Delhi' },
  description:
    'Explore career opportunities at Bitropix, an IT services and digital marketing agency in New Delhi, India. We are hiring Full Stack Developers, Flutter Developers, and UI/UX Designers. Join our team of innovators building cutting-edge software solutions.',
  keywords: [
    'Bitropix careers',
    'IT jobs Delhi',
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

const culture = [
  { title: 'Move fast', description: 'We ship fast, iterate quickly, and learn from every experience.' },
  { title: 'Collaborate', description: 'The best solutions come from working together across teams.' },
  { title: 'Care deeply', description: 'We genuinely care about our work, our clients, and each other.' },
  { title: 'Keep learning', description: 'Continuous learning is embedded in our culture.' },
];

const benefits = [
  { icon: Heart, title: 'Health insurance', description: 'Comprehensive health coverage for you and your family.' },
  { icon: GraduationCap, title: 'Learning & growth', description: 'Annual learning budget and access to premium courses.' },
  { icon: Coffee, title: 'Flexible hours', description: "Work when you're most productive with flexible schedules." },
  { icon: Plane, title: 'Paid time off', description: 'Generous PTO policy plus paid holidays.' },
  { icon: Laptop, title: 'Remote friendly', description: 'Work from anywhere with our hybrid work model.' },
  { icon: Users, title: 'Team events', description: 'Regular team outings, hackathons, and celebrations.' },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: absoluteUrl('/careers') },
  ],
};

export default function CareersPage() {
  const departments = Array.from(new Set(jobOpenings.map((j) => j.department)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <PageHero
          title="Build what's next with us."
          crumbs={[{ label: 'Careers' }]}
          description={
            <p>
              Join a team of passionate makers transforming businesses through technology. We are always looking for
              talented people who share our vision.
            </p>
          }
          aside={
            <dl className="grid grid-cols-2 border-t border-l border-line">
              <div className="border-r border-b border-line p-6">
                <dt className="eyebrow">Open roles</dt>
                <dd className="font-display mt-3 text-5xl leading-none font-semibold text-paper tabular-nums">
                  {String(jobOpenings.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="border-r border-b border-line p-6">
                <dt className="eyebrow">Work model</dt>
                <dd className="mt-3 text-lg text-paper">Hybrid, remote friendly</dd>
              </div>
              <div className="col-span-2 border-r border-b border-line p-6">
                <dt className="eyebrow">Hiring in</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {departments.map((d) => (
                    <span key={d} className="tag">
                      {d}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          }
        >
          <ButtonLink href="#openings">View open roles</ButtonLink>
          <SendResumeModal variant="ghost" />
        </PageHero>

        {/* Culture */}
        <section className="relative py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="01" className="mb-12">
              Culture
            </Eyebrow>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SplitText
                  as="h2"
                  text="A place where you can thrive."
                  className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                />
                <Reveal>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim">
                    Great work happens when talented people come together in an environment that supports growth,
                    creativity and collaboration. We are building more than software. We are building a community.
                  </p>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-5" delay={0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden border border-line">
                  <SmartImage
                    src="/images/studio/careers.webp"
                    alt="Bitropix team members discussing a project in a meeting"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <PixelMark className="absolute top-4 left-4 h-5 w-5" />
                </div>
              </Reveal>
            </div>

            <RevealGroup className="mt-20 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
              {culture.map((item, i) => (
                <RevealItem
                  key={item.title}
                  className="group relative overflow-hidden border-r border-b border-line p-8 sm:p-10"
                >
                  <i
                    className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display mt-12 text-3xl font-semibold text-paper sm:text-4xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-paper-dim">{item.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative bg-ink-2 py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              Benefits & perks
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="We take care of our team."
                  className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Competitive compensation, plus benefits designed to support your wellbeing and your growth.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <RevealItem
                  key={b.title}
                  className="group relative overflow-hidden border-r border-b border-line p-8 sm:p-10"
                >
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center border border-line-strong text-paper transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
                        <b.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-10 text-xl font-medium text-paper sm:text-2xl">{b.title}</h3>
                    <p className="mt-3 leading-relaxed text-paper-dim">{b.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Open roles */}
        <section id="openings" className="relative scroll-mt-[var(--nav-h)] py-24 sm:py-36">
          <div className="container-x relative">
            <Eyebrow rule index="03" className="mb-12">
              Open roles
            </Eyebrow>
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="Find your role."
                  className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  {jobOpenings.length} open {jobOpenings.length === 1 ? 'position' : 'positions'} right now. Pick one
                  to read the details and apply in a couple of minutes.
                </p>
              </Reveal>
            </div>
            <RoleRows jobs={jobOpenings} />
          </div>
        </section>

        {/* Send resume CTA */}
        <section className="relative border-t border-line py-24 sm:py-36">
          <div className="container-x">
            <div className="relative overflow-hidden border border-line-strong bg-ink-2 p-8 sm:p-14 lg:p-20">
              <div
                className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_65%)]"
                aria-hidden="true"
              />
              <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <Eyebrow index="04" className="mb-6">
                    Open application
                  </Eyebrow>
                  <SplitText
                    as="h2"
                    text="Don't see the right role?"
                    className="font-display block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold text-paper"
                  />
                  <Reveal>
                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim">
                      We are always interested in meeting talented people. Send us your resume and we will keep you in
                      mind for future opportunities.
                    </p>
                  </Reveal>
                </div>
                <Reveal className="lg:col-span-4 lg:justify-self-end" delay={0.15}>
                  <SendResumeModal />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
