import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  TrendingUp,
  Cpu,
  Settings,
  Wifi,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Headphones,
  IndianRupee,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'IT Services & Digital Marketing Solutions | Bitropix',
  description:
    'Bitropix offers expert website development, app development, SEO services, cloud solutions, and digital marketing services in India. Get a free consultation today.',
  keywords:
    'website development, app development, SEO services, digital marketing agency India, cloud migration, UI UX design, IoT solutions, IT company Noida',
};

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Website Development Services',
    slug: 'web',
    description:
      'Build high-performance, SEO-optimized websites and web applications tailored to your business goals. Our expert web developers use React, Next.js, and modern frameworks to create fast, responsive, and conversion-focused websites that rank higher on Google.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'CMS Development (WordPress, Headless)',
      'Website Performance Optimization',
    ],
    image: '/images/web.webp',
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'PostgreSQL'],
    relatedServices: ['mobile', 'design', 'marketing'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    slug: 'mobile',
    description:
      'Launch feature-rich native and cross-platform mobile apps for iOS and Android. From startup MVPs to enterprise-grade applications, our mobile development team delivers apps that engage users, drive revenue, and scale with your business.',
    features: [
      'Native iOS Development (Swift)',
      'Native Android Development (Kotlin)',
      'Cross-platform Apps (Flutter, React Native)',
      'App Store Optimization (ASO)',
      'Mobile UI/UX Design',
      'Ongoing App Maintenance & Support',
    ],
    image: '/images/app.webp',
    technologies: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Firebase'],
    relatedServices: ['web', 'design', 'embedded'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design Services',
    slug: 'design',
    description:
      'Create intuitive, beautiful, and accessible digital experiences that convert visitors into customers. Our user-centered design process combines research, prototyping, and testing to deliver interfaces that delight users and drive measurable business results.',
    features: [
      'User Research & Persona Development',
      'Wireframing & Interactive Prototyping',
      'Visual & Brand Design',
      'Design Systems & Component Libraries',
      'Usability Testing & A/B Testing',
      'WCAG Accessibility Compliance',
    ],
    image: '/images/design.webp',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    relatedServices: ['web', 'mobile', 'marketing'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Migration & Solutions',
    slug: 'cloud',
    description:
      'Migrate your infrastructure to the cloud with zero downtime and maximum cost savings. Our certified cloud architects design scalable, secure, and reliable architectures on AWS, Azure, and Google Cloud to future-proof your business operations.',
    features: [
      'Cloud Readiness Assessment',
      'Migration Strategy & Execution',
      'AWS / Azure / GCP Setup & Management',
      'Hybrid & Multi-Cloud Solutions',
      'Cloud Security & Compliance',
      'Cost Optimization & FinOps',
    ],
    image: '/images/cloud.webp',
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
    relatedServices: ['digital-transformation', 'iot', 'web'],
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    title: 'Digital Marketing & SEO',
    slug: 'marketing',
    description:
      'Grow your online visibility, generate qualified leads, and increase ROI with data-driven digital marketing strategies. From SEO and PPC to social media and content marketing, we help businesses dominate search results and outperform competitors.',
    features: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click (PPC) Advertising',
      'Social Media Marketing & Management',
      'Content Marketing & Copywriting',
      'Email Marketing Automation',
      'Analytics, Reporting & CRO',
    ],
    image: '/images/marketing.webp',
    technologies: ['Google Ads', 'Meta Ads', 'HubSpot', 'Google Analytics', 'SEMrush'],
    relatedServices: ['web', 'design', 'digital-transformation'],
  },
  {
    id: 'digital-transformation',
    icon: Settings,
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description:
      'Modernize your business operations with end-to-end digital transformation consulting and implementation. We help organizations automate workflows, modernize legacy systems, and leverage data analytics to stay ahead in a competitive market.',
    features: [
      'Digital Strategy & Roadmapping',
      'Business Process Automation (RPA)',
      'Legacy System Modernization',
      'Data Analytics & Business Intelligence',
      'Change Management & Training',
      'Technology Stack Assessment',
    ],
    image: '/images/trans.webp',
    technologies: ['Power Automate', 'Zapier', 'Salesforce', 'SAP', 'Microsoft 365'],
    relatedServices: ['cloud', 'web', 'marketing'],
  },
  {
    id: 'embedded',
    icon: Cpu,
    title: 'Embedded Systems Development',
    slug: 'embedded',
    description:
      'Design and develop custom embedded solutions for IoT devices, industrial automation, and specialized hardware. Our firmware engineers deliver reliable, optimized, and production-ready embedded software for mission-critical applications.',
    features: [
      'Firmware Development (C/C++)',
      'Hardware-Software Integration',
      'RTOS Development & Optimization',
      'Device Driver Development',
      'System Performance Optimization',
      'Testing, Validation & Certification',
    ],
    image: '/images/embedded.webp',
    technologies: ['C/C++', 'ARM', 'Arduino', 'Raspberry Pi', 'FPGA'],
    relatedServices: ['iot', 'cloud', 'mobile'],
  },
  {
    id: 'iot',
    icon: Wifi,
    title: 'IoT Solutions & Development',
    slug: 'iot',
    description:
      'Build connected device ecosystems that transform operations, unlock new revenue streams, and deliver real-time insights. From sensor integration to cloud dashboards, we deliver end-to-end IoT solutions for smart businesses.',
    features: [
      'IoT Architecture & System Design',
      'Sensor & Device Integration',
      'Real-time Monitoring Dashboards',
      'Predictive Maintenance Systems',
      'IoT Security & Edge Computing',
      'Custom Dashboard Development',
    ],
    image: '/images/iot.webp',
    technologies: ['MQTT', 'LoRaWAN', 'AWS IoT', 'Azure IoT', 'Edge Computing'],
    relatedServices: ['embedded', 'cloud', 'digital-transformation'],
  },
];

const whyChooseUs = [
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Our team of 25+ skilled developers, designers, and strategists brings deep expertise across every technology stack.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description:
      '50+ successful projects delivered with a 98% client satisfaction rate. We let our results speak for themselves.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Round-the-clock technical support and dedicated project managers ensure your project never misses a beat.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description:
      'Get world-class IT solutions at competitive prices. Transparent pricing with no hidden costs or surprises.',
  },
];

const faqs = [
  {
    question: 'What IT services does Bitropix offer?',
    answer:
      'Bitropix offers a comprehensive range of IT services including website development, mobile app development, UI/UX design, cloud migration, digital marketing & SEO, digital transformation consulting, embedded systems development, and IoT solutions.',
  },
  {
    question: 'How much does website development cost in India?',
    answer:
      'Website development costs vary based on complexity, features, and design requirements. A basic business website starts from INR 25,000, while custom web applications and e-commerce solutions range from INR 1,00,000 to INR 10,00,000+. Contact us for a free, detailed quote.',
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
];

export default function ServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://bitropix.com/services' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'Services' }]} />
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0e0e18] py-24">
          <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-[#E03B37]/8 blur-[120px]" />
          <div className="absolute bottom-10 left-10 h-60 w-60 rounded-full bg-[#E03B37]/5 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <FadeIn>
              <p className="mb-3 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">Our Services</p>
              <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl lg:text-6xl">
                IT Services & Digital Solutions
                <span className="text-[#E03B37]"> That Deliver Results</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-400">
                From website development and mobile apps to SEO, cloud migration, and IoT -- we provide end-to-end
                technology solutions that drive growth, efficiency, and competitive advantage for businesses across
                India and beyond.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                >
                  Get a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#web"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">Why Bitropix</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Why Choose Our Services</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                We combine technical excellence with a client-first approach to deliver IT solutions that truly make a
                difference.
              </p>
            </div>
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="group rounded-lg border border-white/10 bg-[#111119] p-6 text-center transition-all duration-300 hover:border-[#E03B37]/30">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                      <item.icon className="h-8 w-8 text-[#E03B37]" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Services Detail */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-[#0a0a12]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <FadeIn key={service.id}>
                  <div
                    id={service.id}
                    className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                        <service.icon className="h-8 w-8 text-[#E03B37]" />
                      </div>
                      <h2 className="mb-4 text-3xl font-bold text-white">{service.title}</h2>
                      <p className="mb-6 leading-relaxed text-gray-400">{service.description}</p>

                      <div className="mb-6">
                        <h3 className="mb-3 font-semibold text-white">What We Offer:</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-gray-400">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E03B37]" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="mb-3 font-semibold text-white">Technologies:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-[#111119] px-3 py-1 text-sm text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Related Services Links */}
                      <div className="mb-8">
                        <h3 className="mb-3 text-sm font-semibold text-white">Related Services:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.relatedServices.map((relatedId) => {
                            const related = services.find((s) => s.id === relatedId);
                            if (!related) return null;
                            return (
                              <Link
                                key={relatedId}
                                href={`#${relatedId}`}
                                className="rounded-full border border-[#E03B37]/20 px-3 py-1 text-xs text-[#E03B37] transition-colors hover:border-[#E03B37]/40 hover:text-[#E03B37]/80"
                              >
                                {related.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#E03B37] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-lg hover:shadow-[#E03B37]/25"
                      >
                        Get a Quote <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="group relative aspect-4/3 overflow-hidden rounded bg-[#111119]">
                        <div className="absolute inset-0 bg-linear-to-br from-[#E03B37]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <Image
                          src={service.image}
                          width={800}
                          height={600}
                          alt={`${service.title} - Bitropix IT Services`}
                          className="h-full w-full object-cover opacity-100"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative overflow-hidden bg-[#0e0e18] py-20">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-16 text-center">
                <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">FAQ</p>
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-2xl text-gray-400">
                  Got questions about our IT services? Find answers to the most commonly asked questions below.
                </p>
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

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Transform Your Business?</h2>
            <p className="mx-auto mb-4 max-w-2xl text-lg text-white/80">
              Let&apos;s discuss how our IT services can help you achieve your business goals. Get a free consultation
              and project estimate today.
            </p>
            <p className="mx-auto mb-8 max-w-xl text-sm text-white/60">
              No commitment required. We will analyze your requirements and provide a tailored solution roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-6 py-3 text-sm font-semibold text-[#0a0a12] transition-all duration-300 hover:bg-white/90"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
