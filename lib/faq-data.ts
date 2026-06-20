export type FAQ = { question: string; answer: string };

export type FAQGroup = {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
};

/**
 * Canonical FAQ content. Single source of truth used by the /faq page (rendered
 * groups + FAQPage JSON-LD) and the llms-full.txt generator.
 */
export const groups: FAQGroup[] = [
  {
    id: 'general',
    title: 'About Bitropix',
    description: 'Who we are, where we work, and how we engage with clients.',
    faqs: [
      {
        question: 'What services does Bitropix offer?',
        answer:
          'Bitropix offers a full suite of IT services and digital marketing solutions including web development, mobile app development, UI/UX design, cloud migrations, digital marketing (SEO, PPC, social media), embedded systems, IoT solutions, and digital transformation consulting.',
      },
      {
        question: 'Where is Bitropix located?',
        answer:
          'Bitropix is headquartered in Noida, India. We serve clients globally and have successfully delivered projects for businesses across India, the US, UK, and the Middle East. We work seamlessly across time zones.',
      },
      {
        question: 'Do you work with startups and small businesses?',
        answer:
          'Absolutely. We work with businesses of all sizes - from early-stage startups to established enterprises. Our flexible engagement models and competitive pricing make professional IT services accessible to growing businesses.',
      },
      {
        question: 'What technologies do you specialize in?',
        answer:
          'We specialize in modern tech stacks including React, Next.js, Node.js, Python, React Native, Flutter, AWS, Azure, Google Cloud, and more. We choose the best technology for each project based on requirements, scalability, and long-term maintainability.',
      },
    ],
  },
  {
    id: 'projects',
    title: 'Projects & Timelines',
    description: 'Estimating delivery time, scope, and ongoing support.',
    faqs: [
      {
        question: 'How long does it take to build a website or app?',
        answer:
          'Timelines vary based on complexity. A standard business website takes 3-6 weeks, while a custom web application or mobile app can take 8-16 weeks. We provide detailed timelines during our free consultation and keep you updated at every milestone.',
      },
      {
        question: 'How long does it take to build a mobile app?',
        answer:
          'A simple mobile app typically takes 8-12 weeks, while feature-rich applications may take 4-6 months. The timeline depends on app complexity, platform (iOS, Android, or both), and specific feature requirements. We provide a detailed timeline during our free consultation.',
      },
      {
        question: 'Do you offer ongoing maintenance and support?',
        answer:
          'Yes, we offer flexible maintenance and support packages for all our services. This includes bug fixes, security updates, performance monitoring, feature enhancements, and 24/7 technical support to keep your digital products running smoothly.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Engagement',
    description: 'How we quote, bill, and engage with new clients.',
    faqs: [
      {
        question: 'How does your pricing work?',
        answer:
          'We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team models. Every engagement starts with a free consultation where we understand your requirements and provide a transparent, no-obligation quote.',
      },
      {
        question: 'How much does website development cost in India?',
        answer:
          'Website development costs vary based on complexity, features, and design requirements. A basic business website starts from INR 25,000, while custom web applications and e-commerce solutions range from INR 1,00,000 to INR 10,00,000+. Contact us for a free, detailed quote.',
      },
      {
        question: 'Can I customize a quote to fit my specific needs?',
        answer:
          'Yes - every engagement is tailored. We work closely with each client to scope work that matches their exact requirements and budget, and we send a transparent, milestone-based proposal before any work begins.',
      },
      {
        question: 'Are there any hidden charges?',
        answer:
          'No. We believe in complete transparency. All costs are discussed and agreed upon before the project begins. Any additional requirements are communicated with revised estimates upfront.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers (NEFT/RTGS/IMPS), UPI, credit/debit cards, and PayPal for international clients. We typically follow a milestone-based payment structure.',
      },
    ],
  },
  {
    id: 'marketing-cloud',
    title: 'Marketing & Cloud',
    description: 'How we approach SEO, paid media, and infrastructure work.',
    faqs: [
      {
        question: 'What is your digital marketing approach?',
        answer:
          'Our digital marketing strategy is 100% data-driven. We start with a thorough audit, define clear KPIs, and execute a multi-channel approach including SEO, PPC, social media, and content marketing. Monthly reporting ensures complete transparency on ROI.',
      },
      {
        question: 'Can you help migrate our systems to the cloud?',
        answer:
          'Absolutely. Our certified cloud architects handle end-to-end cloud migrations on AWS, Azure, and Google Cloud. We ensure zero-downtime migration, data integrity, security compliance, and cost optimization throughout the process.',
      },
    ],
  },
];

/** Flattened list of every FAQ across all groups. */
export const allFaqs: FAQ[] = groups.flatMap((g) => g.faqs);
