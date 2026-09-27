import { Accordion } from '@/components/site/accordion';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';

const faqs = [
  {
    question: 'What services does Bitropix offer?',
    answer:
      'Web development, mobile app development, UI/UX design, cloud migrations, digital marketing (SEO, PPC, social media), embedded systems, IoT solutions and digital transformation consulting. One team, end to end.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer:
      'A standard business website takes 3 to 6 weeks. A custom web application or mobile app usually takes 8 to 16 weeks. You get a detailed timeline in the free consultation and an update at every milestone.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. We work with early-stage startups through to established enterprises. Flexible engagement models and transparent pricing make senior product teams accessible to growing businesses.',
  },
  {
    question: 'How does your pricing work?',
    answer:
      'Fixed-price projects, time and materials, or a dedicated team. Every engagement starts with a free consultation and a clear, no-obligation quote. No hidden costs.',
  },
  {
    question: 'Where is Bitropix based?',
    answer:
      'Our studio is in New Delhi, India. We work with clients across India, the US, UK, UAE and Australia, and plan our hours to overlap with your time zone.',
  },
];

export function FAQSection() {
  // FAQPage JSON-LD intentionally lives on /faq only, to avoid duplicate structured data.
  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-x">
        <Eyebrow rule index="07" className="mb-12">
          FAQ
        </Eyebrow>
      </div>
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SplitText
            as="h2"
            text="Questions, answered."
            className="font-display block text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
          />
          <Reveal className="mt-8">
            <p className="mb-8 text-paper-dim">Still curious? We reply within two business hours.</p>
            <ButtonLink href="/faq" variant="ghost">
              All FAQs
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
