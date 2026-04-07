'use client';

import type React from 'react';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/animate';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Instagram,
  Send,
  Zap,
  ChevronDown,
  CalendarCheck,
  Handshake,
  FileCheck,
  ExternalLink,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@bitropix.com'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 9318454571'],
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Noida, Uttar Pradesh'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
  },
];

const services = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud Solutions',
  'Digital Marketing',
  'ERP Implementation',
  'HRMS Setup',
  'E-Commerce Solution',
  'Agile Hiring',
  'IT Consulting',
  'Other',
];

const organizationTypes = [
  { value: 'startup', label: 'Startup' },
  { value: 'smb-msme', label: 'SMB / MSME' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'education', label: 'Education' },
  { value: 'self-employed', label: 'Self-Employed' },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary based on scope. A simple website takes 4-6 weeks, while complex applications can take 3-6 months.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes! We offer various support packages including maintenance, updates, and technical support to ensure smooth operations.',
  },
  {
    q: 'Can I hire dedicated developers?',
    a: 'Our agile hiring model lets you hire dedicated specialists who work exclusively for your company.',
  },
];

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Bitropix',
  description: 'Get in touch with Bitropix for a free IT consultation and project quote.',
  url: 'https://bitropix.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Bitropix',
    telephone: '+91-9318454571',
    email: 'info@bitropix.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    organizationType: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formState.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      setIsLoading(false);
      return;
    }

    if (formState.message.trim().length < 10) {
      toast.error('Please provide more details about your project (at least 10 characters)');
      setIsLoading(false);
      return;
    }

    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success(() => (
        <div className="flex items-start gap-3">
          <div>
            <p className="font-semibold">Message sent successfully!</p>
          </div>
        </div>
      ));

      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        organizationType: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch {
      toast.dismiss(loadingToast);
      toast.error(
        () => (
          <div className="flex items-start gap-3">
            <div>
              <p className="font-semibold">Failed to send message</p>
            </div>
          </div>
        ),
        { duration: 5000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />
      <main className="pt-16">
        <BreadcrumbNav items={[{ label: 'Contact' }]} />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0e0e18] py-20">
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#E03B37]/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-[#E03B37]/10 px-4 py-1.5 text-sm font-semibold text-[#E03B37]">
              <Zap className="h-4 w-4" />
              Response time: Within 2 hours
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">Get Your Free IT Consultation Today</h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-400">
              Whether you need a custom software solution, want to modernize your infrastructure, or are looking for a
              technology partner — we are here to help. Tell us about your project and get a tailored proposal.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="border-b border-white/10 bg-[#0a0a12] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <StaggerItem key={info.title}>
                  <div className="group rounded-lg border border-white/10 bg-[#111119] p-6 transition-all duration-300 hover:border-[#E03B37]/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 transition-all group-hover:from-[#E03B37]/30 group-hover:to-[#E03B37]/10">
                      <info.icon className="h-6 w-6 text-[#E03B37]" />
                    </div>
                    <h3 className="mb-2 font-semibold text-white">{info.title}</h3>
                    {info.details.map((detail) => (
                      <p key={detail} className="text-sm text-gray-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Form + Sidebar Section */}
        <section className="bg-[#0a0a12] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Contact Form */}
              <FadeInLeft>
                <div className="rounded-lg border border-white/10 bg-[#111119] p-6">
                  <div className="mb-8">
                    <h2 className="mb-3 text-3xl font-bold text-white">Send Us a Message</h2>
                    <p className="text-base text-gray-400">
                      Fill out the form below and we will get back to you within 2 hours during business days.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-white">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="h-11 border-2 border-white/10 bg-[#0a0a12] text-white transition-all placeholder:text-gray-500 focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20"
                          minLength={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-white">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="h-11 border-2 border-white/10 bg-[#0a0a12] text-white transition-all placeholder:text-gray-500 focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="h-11 border-2 border-white/10 bg-[#0a0a12] text-white transition-all placeholder:text-gray-500 focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium text-white">
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          placeholder="Your Company"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="h-11 border-2 border-white/10 bg-[#0a0a12] text-white transition-all placeholder:text-gray-500 focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20"
                        />
                      </div>
                    </div>

                    {/* Organization Type */}
                    <div className="space-y-2">
                      <Label htmlFor="organizationType" className="text-sm font-medium text-white">
                        Organization Type
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {organizationTypes.map((org) => (
                          <button
                            key={org.value}
                            type="button"
                            onClick={() => setFormState({ ...formState, organizationType: org.value })}
                            className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              formState.organizationType === org.value
                                ? 'border-[#E03B37] bg-[#E03B37]/10 text-[#E03B37]'
                                : 'border-white/10 bg-[#0a0a12] text-gray-400 hover:border-[#E03B37]/30 hover:bg-[#E03B37]/5'
                            }`}
                          >
                            {org.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-sm font-medium text-white">
                          Service Interested In <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          required
                          value={formState.service}
                          onValueChange={(value) => setFormState({ ...formState, service: value })}
                        >
                          <SelectTrigger className="h-11 w-full border-2 border-white/10 bg-[#0a0a12] text-white transition-all focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#111119]">
                            {services.map((service) => (
                              <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-sm font-medium text-white">
                          Budget Range
                        </Label>
                        <Select
                          value={formState.budget}
                          onValueChange={(value) => setFormState({ ...formState, budget: value })}
                        >
                          <SelectTrigger className="h-11 w-full border-2 border-white/10 bg-[#0a0a12] text-white transition-all focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#111119]">
                            <SelectItem value="under-5l">Under 5 Lakhs</SelectItem>
                            <SelectItem value="5l-15l">5 - 15 Lakhs</SelectItem>
                            <SelectItem value="15l-30l">15 - 30 Lakhs</SelectItem>
                            <SelectItem value="above-30l">Above 30 Lakhs</SelectItem>
                            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-white">
                        Project Details <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                        rows={6}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="h-40 resize-none border-2 border-white/10 bg-[#0a0a12] text-white transition-all placeholder:text-gray-500 focus:border-[#E03B37] focus:ring-2 focus:ring-[#E03B37]/20"
                        minLength={10}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{formState.message.length}/10 characters minimum</p>
                        <p className="text-xs text-gray-500">{formState.message.length}/500</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E03B37] px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#E03B37]/90 hover:shadow-xl hover:shadow-[#E03B37]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        {isLoading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Get Free Consultation
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </FadeInLeft>

              {/* Sidebar */}
              <FadeInRight>
                <div className="space-y-6">
                  {/* Connect With Us */}
                  <div className="rounded-lg border border-white/10 bg-[#111119] p-6 transition-all duration-300 hover:border-[#E03B37]/30">
                    <h3 className="mb-4 text-lg font-semibold text-white">Connect With Us</h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-400">
                      Follow us on social media to stay updated with our latest projects, insights, and company news.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/company/bitropix/about/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 text-[#E03B37] transition-all duration-300 hover:scale-110 hover:from-[#E03B37] hover:to-[#E03B37]/90 hover:text-white hover:shadow-lg"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.instagram.com/bitropix/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 text-[#E03B37] transition-all duration-300 hover:scale-110 hover:from-[#E03B37] hover:to-[#E03B37]/90 hover:text-white hover:shadow-lg"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  {/* Response Guarantee */}
                  <div className="group relative overflow-hidden rounded-lg border border-[#E03B37]/20 bg-[#111119] p-6 transition-all duration-300 hover:border-[#E03B37]/40">
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[#E03B37]/5 blur-2xl transition-all duration-300 group-hover:bg-[#E03B37]/10" />
                    <div className="relative">
                      <div className="mb-3 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5">
                          <Zap className="h-5 w-5 text-[#E03B37]" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">2-Hour Response Guarantee</h3>
                          <p className="text-sm font-medium text-[#E03B37]">During business hours</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-400">
                        We value your time. Our team responds to all inquiries within 2 hours during business days. For
                        urgent matters, please call us directly at{' '}
                        <span className="font-medium text-[#E03B37]">+91 9318454571</span>.
                      </p>
                    </div>
                  </div>

                  {/* What Happens Next */}
                  <div className="rounded-lg border border-[#E03B37]/20 bg-gradient-to-br from-[#E03B37]/10 to-[#111119] p-6">
                    <h3 className="mb-4 text-base font-semibold text-white">What Happens After You Reach Out?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E03B37]/20">
                          <FileCheck className="h-4 w-4 text-[#E03B37]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">We Review Your Requirements</p>
                          <p className="text-xs text-gray-500">
                            Within 2 hours, our team analyzes your project scope and goals.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E03B37]/20">
                          <CalendarCheck className="h-4 w-4 text-[#E03B37]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Discovery Call Scheduled</p>
                          <p className="text-xs text-gray-500">
                            A domain expert reaches out within 24 hours to set up a call.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E03B37]/20">
                          <Handshake className="h-4 w-4 text-[#E03B37]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Tailored Proposal Delivered</p>
                          <p className="text-xs text-gray-500">
                            You receive a detailed proposal with timeline, tech stack, and pricing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Placeholder */}
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-[#111119]">
                    <div className="flex h-48 items-center justify-center bg-[#161622]">
                      <div className="text-center">
                        <MapPin className="mx-auto mb-2 h-8 w-8 text-[#E03B37]" />
                        <p className="mb-1 text-sm font-semibold text-white">Bitropix - Noida, Uttar Pradesh</p>
                        <a
                          href="https://maps.google.com/?q=Noida+Uttar+Pradesh+India"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#E03B37] transition-colors hover:text-[#E03B37]/80"
                        >
                          View on Google Maps
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative overflow-hidden bg-[#0e0e18] py-20">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wider text-[#E03B37] uppercase">FAQ</p>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Have questions? Find answers to the most commonly asked questions below.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded border border-white/10 bg-[#111119]">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white">
                    <span>{faq.q}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-white/10 px-6 pt-4 pb-6 leading-relaxed text-gray-400">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
