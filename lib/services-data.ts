import { Globe, Smartphone, Palette, Cloud, TrendingUp, Cpu, Settings, Wifi } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  features: string[];
  image: string;
  technologies: string[];
  relatedServices: string[];
}

/**
 * Canonical list of the services Bitropix offers. Single source of truth used
 * by the /services page, the sitemap, and the llms.txt generators.
 */
export const services: Service[] = [
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
