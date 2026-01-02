import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
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
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Services - Bitropix | IT Solutions & Digital Transformation',
  description:
    'Explore our comprehensive IT services including web development, mobile apps, cloud migrations, digital marketing, IoT, and more.',
};

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'CMS Development',
      'Performance Optimization',
    ],
    image: '/images/web.webp',
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android that engage users and drive business growth.',
    features: [
      'Native iOS Development',
      'Native Android Development',
      'Cross-platform Apps',
      'App Store Optimization',
      'Mobile UI/UX Design',
      'App Maintenance & Support',
    ],
    image: '/images/app.webp',
    technologies: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Firebase'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centered design that creates intuitive, beautiful, and accessible digital experiences that convert.',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems',
      'Usability Testing',
      'Accessibility Compliance',
    ],
    image: '/images/design.webp',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Migrations',
    description: 'Seamless migration to cloud infrastructure for scalability, reliability, and cost efficiency.',
    features: [
      'Cloud Assessment',
      'Migration Strategy',
      'AWS/Azure/GCP Setup',
      'Hybrid Cloud Solutions',
      'Cloud Security',
      'Cost Optimization',
    ],
    image: '/images/cloud.webp',
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Data-driven marketing strategies to grow your online presence, generate leads, and increase conversions.',
    features: [
      'SEO Optimization',
      'PPC Campaigns',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
    ],
    image: '/images/marketing.webp',
    technologies: ['Google Ads', 'Meta Ads', 'HubSpot', 'Google Analytics', 'SEMrush'],
  },
  {
    id: 'digital-transformation',
    icon: Settings,
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation services to modernize your business operations and processes.',
    features: [
      'Digital Strategy',
      'Process Automation',
      'Legacy System Modernization',
      'Data Analytics',
      'Change Management',
      'Technology Roadmap',
    ],
    image: '/images/trans.webp',
    technologies: ['Power Automate', 'Zapier', 'Salesforce', 'SAP', 'Microsoft 365'],
  },
  {
    id: 'embedded',
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Custom embedded solutions for IoT devices, industrial applications, and specialized hardware.',
    features: [
      'Firmware Development',
      'Hardware Integration',
      'RTOS Development',
      'Driver Development',
      'System Optimization',
      'Testing & Validation',
    ],
    image: '/images/embedded.webp',
    technologies: ['C/C++', 'ARM', 'Arduino', 'Raspberry Pi', 'FPGA'],
  },
  {
    id: 'iot',
    icon: Wifi,
    title: 'IoT Solutions',
    description: 'Connected device solutions that transform operations, create new revenue streams, and add value.',
    features: [
      'IoT Architecture Design',
      'Sensor Integration',
      'Real-time Monitoring',
      'Predictive Maintenance',
      'IoT Security',
      'Dashboard Development',
    ],
    image: '/images/iot.webp',
    technologies: ['MQTT', 'LoRaWAN', 'AWS IoT', 'Azure IoT', 'Edge Computing'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-primary/10 via-background to-accent/5 absolute inset-0 bg-linear-to-br" />
          <div className="bg-primary/10 absolute top-20 right-10 h-100 w-100 rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-primary mb-2 font-semibold">Our Services</p>
            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
              Comprehensive IT Solutions for Your Business
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              From concept to deployment, we provide end-to-end solutions that drive digital transformation and
              accelerate your growth.
            </p>
          </div>
        </section>

        <section className="relative py-20">
          <div className="from-background via-secondary/10 to-background absolute inset-0 bg-linear-to-b" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="from-primary/20 to-primary/5 mb-6 flex h-16 w-16 items-center justify-center rounded bg-linear-to-br">
                      <service.icon className="text-primary h-8 w-8" />
                    </div>
                    <h2 className="text-foreground mb-4 text-3xl font-bold">{service.title}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-6">
                      <h3 className="text-foreground mb-3 font-semibold">What We Offer:</h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-foreground mb-3 font-semibold">Technologies:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-card/50 border-border text-foreground rounded-full border px-3 py-1 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
                    >
                      <Link href="/contact">
                        Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="bg-card/30 border-border group relative aspect-4/3 overflow-hidden rounded border">
                      <div className="from-primary/10 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <Image
                        src={service.image}
                        width={10000000}
                        height={10000000}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-70"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-linear-to-r" />
          <div className="absolute inset-0 bg-[linear-linear(rgba(0,0,0,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              Let's discuss how our services can help transform your business. Get a free consultation today.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
              asChild
            >
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
