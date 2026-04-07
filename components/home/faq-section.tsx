'use client';

import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/animate';

const faqs = [
  {
    question: 'What services does Bitropix offer?',
    answer:
      'Bitropix offers a full suite of IT services and digital marketing solutions including web development, mobile app development, UI/UX design, cloud migrations, digital marketing (SEO, PPC, social media), embedded systems, IoT solutions, and digital transformation consulting.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer:
      'Timelines vary based on complexity. A standard business website takes 3-6 weeks, while a custom web application or mobile app can take 8-16 weeks. We provide detailed timelines during our free consultation and keep you updated at every milestone.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Absolutely. We work with businesses of all sizes — from early-stage startups to established enterprises. Our flexible engagement models and competitive pricing make professional IT services accessible to growing businesses.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in modern tech stacks including React, Next.js, Node.js, Python, React Native, Flutter, AWS, Azure, Google Cloud, and more. We choose the best technology for each project based on requirements, scalability, and long-term maintainability.',
  },
  {
    question: 'How does your pricing work?',
    answer:
      'We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team models. Every engagement starts with a free consultation where we understand your requirements and provide a transparent, no-obligation quote.',
  },
  {
    question: 'Where is Bitropix located?',
    answer:
      'Bitropix is headquartered in Noida, India. We serve clients globally and have successfully delivered projects for businesses across India, the US, UK, and the Middle East. We work seamlessly across time zones.',
  },
];

export function FAQSection() {
  return (
    <section className="bg-[#0e0e18] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">FAQ</p>
            <h2 className="mb-4 text-3xl font-bold text-balance text-white sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Everything you need to know about working with Bitropix.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group rounded border border-white/10 bg-[#111119]">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-white/10 px-6 pt-4 pb-6 leading-relaxed text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
