'use client';

import type React from 'react';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Linkedin,
  Instagram,
  CheckCircle2,
  XCircle,
  Send,
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
    details: ['+91 9318454571', '+91 9004569903'],
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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
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

    // Show loading toast
    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Show success toast
      toast.success((t) => (
        <div className="flex items-start gap-3">
          <div>
            <p className="font-semibold text-gray-900">Message sent successfully!</p>
          </div>
        </div>
      ));

      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error(
        (t) => (
          <div className="flex items-start gap-3">
            <div>
              <p className="font-semibold text-gray-900">Failed to send message</p>
            </div>
          </div>
        ),
        {
          duration: 5000,
          style: {
            background: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/50 via-background to-primary/5 absolute inset-0 bg-linear-to-br" />
          <div className="bg-primary/10 absolute right-0 bottom-0 h-125 w-125 rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-primary mb-2 font-semibold">Get In Touch</p>
            <h1 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
              Let's Build Something Great Together
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              Have a project in mind? Want to learn more about our services? We'd love to hear from you. Reach out and
              let's start a conversation.
            </p>
          </div>
        </section>

        <section className="border-border border-b py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <Card
                  key={info.title}
                  className="bg-card/30 border-border hover:border-primary/30 group transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded bg-linear-to-br transition-all">
                      <info.icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-foreground mb-2 font-semibold">{info.title}</h3>
                    {info.details.map((detail) => (
                      <p key={detail} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-card/30 border-border border-2 p-6 transition-all duration-300">
                <div className="mb-8">
                  <h2 className="text-foreground mb-3 text-3xl font-bold">Send Us a Message</h2>
                  <p className="text-muted-foreground text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 border-2 transition-all focus:ring-2"
                        minLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 border-2 transition-all focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 border-2 transition-all focus:ring-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground text-sm font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 border-2 transition-all focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-foreground text-sm font-medium">
                        Service Interested In <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        required
                        value={formState.service}
                        onValueChange={(value) => setFormState({ ...formState, service: value })}
                      >
                        <SelectTrigger className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 w-full border-2 transition-all focus:ring-2">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-foreground text-sm font-medium">
                        Budget Range
                      </Label>
                      <Select
                        value={formState.budget}
                        onValueChange={(value) => setFormState({ ...formState, budget: value })}
                      >
                        <SelectTrigger className="border-border bg-background focus:border-primary focus:ring-primary/20 h-11 w-full border-2 transition-all focus:ring-2">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5l">Under ₹5 Lakhs</SelectItem>
                          <SelectItem value="5l-15l">₹5 - 15 Lakhs</SelectItem>
                          <SelectItem value="15l-30l">₹15 - 30 Lakhs</SelectItem>
                          <SelectItem value="above-30l">Above ₹30 Lakhs</SelectItem>
                          <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground text-sm font-medium">
                      Project Details <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={6}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="border-border bg-background focus:border-primary focus:ring-primary/20 h-40 resize-none border-2 transition-all focus:ring-2"
                      minLength={10}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs">{formState.message.length}/10 characters minimum</p>
                      <p className="text-muted-foreground text-xs">{formState.message.length}/500</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/25 h-12 w-full cursor-pointer px-8 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
              <div className="space-y-6">
                <Card className="bg-card/30 border-border hover:border-primary/30 border-2 transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-foreground mb-4 text-lg font-semibold">Connect With Us</h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      Follow us on social media to stay updated with our latest projects, insights, and company news.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/company/bitropix/about/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="from-primary/20 to-primary/5 text-primary hover:from-primary hover:to-primary/90 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-lg"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.instagram.com/bitropix/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="from-primary/20 to-primary/5 text-primary hover:from-primary hover:to-primary/90 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-lg"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-primary/20 group hover:border-primary/40 overflow-hidden border-2 transition-all duration-300">
                  <CardContent className="relative pt-6">
                    <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 h-24 w-24 rounded-full blur-2xl transition-all duration-300" />
                    <div className="relative">
                      <div className="mb-3 flex items-start gap-3">
                        <div className="from-primary/20 to-primary/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br">
                          <Clock className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground text-base font-semibold">Quick Response Guarantee</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We value your time. Our team responds to all inquiries within 24 hours during business days. For
                        urgent matters, please call us directly at{' '}
                        <span className="text-primary font-medium">+91 9004569903</span>.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="from-primary/10 to-secondary/10 border-primary/20 border-2 bg-linear-to-br">
                  <CardContent className="pt-6">
                    <h3 className="text-foreground mb-3 text-base font-semibold">What Happens Next?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          <span className="text-primary text-xs font-bold">1</span>
                        </div>
                        <p className="text-muted-foreground text-sm">We review your project details within 2 hours</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          <span className="text-primary text-xs font-bold">2</span>
                        </div>
                        <p className="text-muted-foreground text-sm">Our expert gets in touch within 24 hours</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          <span className="text-primary text-xs font-bold">3</span>
                        </div>
                        <p className="text-muted-foreground text-sm">We schedule a call to discuss your needs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/20 via-background to-background absolute inset-0 bg-linear-to-b" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-foreground mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
              Have questions? Check out our FAQ section or reach out to us directly.
            </p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              {[
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
              ].map((faq) => (
                <Card
                  key={faq.q}
                  className="bg-card/30 border-border hover:border-primary/30 border-2 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <h3 className="text-foreground mb-3 text-base font-semibold">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
