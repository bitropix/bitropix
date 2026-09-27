import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/site/ui';
import { LegalCta, LegalDocument, LegalMeta, type LegalSection } from '@/components/legal/legal-document';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection & Privacy',
  description:
    'Learn how Bitropix collects, uses, and protects your personal information. Our commitment to data privacy and security.',
  alternates: {
    canonical: 'https://www.bitropix.com/privacy',
  },
};

const UPDATED = '30 May 2025';
const UPDATED_ISO = '2025-05-30';

const sections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    body: (
      <p>
        This Privacy Policy explains how we collect, use, process, and protect your personal information. By using our
        services, you agree to the collection and use of information in accordance with this policy.
      </p>
    ),
  },
  {
    id: 'information-collected',
    title: 'Information we collect',
    body: (
      <>
        <h3>Personal information</h3>
        <ul>
          <li>Name and contact information</li>
          <li>Email address</li>
          <li>Billing and payment information</li>
          <li>Company information (if applicable)</li>
          <li>Usage data and preferences</li>
        </ul>
        <h3>Automatically collected information</h3>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Time zone and location</li>
          <li>Usage patterns and interactions</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: (
      <ul>
        <li>To provide and maintain our services</li>
        <li>To process payments and transactions</li>
        <li>To improve our services and user experience</li>
        <li>To send administrative information and updates</li>
        <li>To provide customer support</li>
        <li>To detect and prevent fraud</li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and tracking technologies',
    body: (
      <>
        <p>
          We use cookies and similar tracking technologies to track activity on our service and hold certain
          information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        </p>
        <h3>Types of cookies we use</h3>
        <ul>
          <li>
            <strong>Essential cookies:</strong> required for the operation of our website.
          </li>
          <li>
            <strong>Analytical cookies:</strong> to analyse how users interact with our service.
          </li>
          <li>
            <strong>Functional cookies:</strong> to remember your preferences.
          </li>
          <li>
            <strong>Advertising cookies:</strong> to deliver relevant advertisements.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'payment',
    title: 'Payment information',
    body: (
      <>
        <p>
          We use trusted third-party payment processors to handle all payments. We do not store your payment
          information on our servers. All payment data is encrypted and securely processed through our payment
          partners.
        </p>
        <h3>Payment data we process</h3>
        <ul>
          <li>Transaction history</li>
          <li>Billing address</li>
          <li>Payment method details (last 4 digits only)</li>
          <li>Subscription information</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Data security',
    body: (
      <>
        <p>We implement appropriate security measures to protect your personal information, including:</p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication</li>
          <li>Secure data backups</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party services',
    body: (
      <p>
        We may employ third-party companies and individuals to facilitate our service, provide service-related
        services, or assist us in analysing how our service is used. These third parties have access to your personal
        information only to perform these tasks on our behalf.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <ul>
        <li>Right to access your personal data</li>
        <li>Right to correct inaccurate data</li>
        <li>Right to request data deletion</li>
        <li>Right to object to data processing</li>
        <li>Right to data portability</li>
      </ul>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page and updating the &ldquo;Last updated&rdquo; date.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
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

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        title="Your privacy matters to us."
        crumbs={[{ label: 'Privacy Policy' }]}
        description="We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data."
        aside={<LegalMeta updated={UPDATED} updatedIso={UPDATED_ISO} sections={sections.length} />}
      >
        <ButtonLink href="#introduction" variant="ghost">
          Start reading
        </ButtonLink>
      </PageHero>

      <LegalDocument sections={sections} />

      <LegalCta
        eyebrow="Still curious"
        title="Questions about your privacy?"
        text="We're here to help. Reach out if you have any concerns or questions about how we handle your data."
        secondary={{ href: '/terms', label: 'Terms of Service' }}
      />
    </main>
  );
}
