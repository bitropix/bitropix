import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/site/ui';
import { LegalCta, LegalDocument, LegalMeta, type LegalSection } from '@/components/legal/legal-document';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms and conditions that govern your use of the Bitropix website and services. Includes scope of work, payments, intellectual property, liability, and governing law.',
  alternates: {
    canonical: 'https://www.bitropix.com/terms',
  },
};

const UPDATED = '6 May 2026';
const UPDATED_ISO = '2026-05-06';

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    body: (
      <p>
        By accessing or using the Bitropix website (www.bitropix.com) and related services, you agree to be bound by
        these Terms of Service. If you do not agree, please do not use the website or engage our services.
      </p>
    ),
  },
  {
    id: 'services',
    title: 'Scope of services',
    body: (
      <p>
        Bitropix provides IT services and digital marketing including, but not limited to, web development, mobile app
        development, UI/UX design, cloud migrations, SEO, and digital transformation consulting. Specific deliverables,
        timelines, and milestones for each engagement are documented in a separate written proposal or statement of
        work.
      </p>
    ),
  },
  {
    id: 'use',
    title: 'Acceptable use',
    body: (
      <>
        <p>
          You agree to use our website and services only for lawful purposes and in a way that does not infringe the
          rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the website. You agree not to:
        </p>
        <ul>
          <li>Reverse engineer, decompile, or attempt to extract source code without authorisation.</li>
          <li>Use automated systems to scrape, crawl, or copy content beyond what robots.txt permits.</li>
          <li>Submit false, misleading, or unlawful content through any form on the website.</li>
          <li>Attempt to gain unauthorised access to any portion of the website or related systems.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'payments',
    title: 'Payments and refunds',
    body: (
      <p>
        Project pricing, billing schedules, and payment terms are agreed in writing before work begins. Unless otherwise
        stated, invoices are due within seven (7) days of issuance. Late payments may incur additional fees and pause
        active deliverables. Refunds, if any, are governed by the specific statement of work for the engagement.
      </p>
    ),
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    body: (
      <>
        <p>Upon full payment for an engagement, the deliverables produced by Bitropix transfer to the client, except for:</p>
        <ol type="a" className="list-[lower-alpha]!">
          <li>third-party libraries, frameworks, and services with their own licences;</li>
          <li>
            Bitropix-owned reusable components, methodologies, and tooling, which are licensed to the client for use
            within the deliverables.
          </li>
        </ol>
        <p>
          The Bitropix name, logo, and all content on www.bitropix.com remain the property of Bitropix and may not be
          reused without written permission.
        </p>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    body: (
      <p>
        Both parties agree to keep confidential information shared during an engagement strictly confidential and to use
        it only for the purposes of the engagement. Confidentiality obligations survive termination of the engagement.
      </p>
    ),
  },
  {
    id: 'warranties',
    title: 'Warranties and disclaimers',
    body: (
      <p>
        Bitropix delivers services with reasonable skill and care. The website and any pre-existing content are provided
        &ldquo;as is&rdquo; without warranties of any kind, either express or implied. We do not warrant that the
        website will be uninterrupted or error-free, that defects will be corrected, or that the website is free from
        viruses or other harmful components.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the maximum extent permitted by law, Bitropix shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including lost profits or revenue, whether incurred directly or indirectly.
        Our aggregate liability arising out of or relating to any engagement shall not exceed the fees paid by the
        client for the relevant deliverable in the three (3) months preceding the claim.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    body: (
      <p>
        Either party may terminate an engagement in accordance with the termination provisions in the relevant statement
        of work. Outstanding fees for work performed up to the date of termination remain payable. We reserve the right
        to suspend or terminate access to the website without notice for any user found violating these Terms.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: (
      <p>
        These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall
        be subject to the exclusive jurisdiction of the courts of New Delhi, Delhi, India.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these Terms of Service from time to time. The updated version will be posted on this page with a
        revised &ldquo;Last updated&rdquo; date. Continued use of the website after a change constitutes acceptance of
        the revised Terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Questions?',
    body: (
      <>
        <p>If you have any questions about these Terms of Service, get in touch:</p>
        <ul>
          <li>
            Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </li>
          <li>
            Phone: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </li>
          <li>
            Or use the form on our <Link href="/contact">contact page</Link>.
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        title="The rules of working with us."
        crumbs={[{ label: 'Terms of Service' }]}
        description="These terms govern your use of the Bitropix website and services. Please read them carefully."
        aside={<LegalMeta updated={UPDATED} updatedIso={UPDATED_ISO} sections={sections.length} />}
      >
        <ButtonLink href="#acceptance" variant="ghost">
          Start reading
        </ButtonLink>
      </PageHero>

      <LegalDocument sections={sections} />

      <LegalCta
        eyebrow="Next step"
        title="Ready to start a project?"
        text="Tell us what you want to build. We'll send back a transparent proposal with scope, timeline, and pricing."
        secondary={{ href: '/privacy', label: 'Privacy Policy' }}
      />
    </main>
  );
}
