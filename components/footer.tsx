import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, Heart, Globe, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Web Development', href: '/services#web' },
    { label: 'Mobile Development', href: '/services#mobile' },
    { label: 'UI/UX Design', href: '/services#design' },
    { label: 'Cloud Solutions', href: '/services#cloud' },
    { label: 'Digital Marketing', href: '/services#marketing' },
    { label: 'Digital Transformation', href: '/services#transformation' },
    { label: 'SEO Services', href: '/services#seo' },
    { label: 'IT Consulting', href: '/services#consulting' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  resources: [
    { label: 'HTML Sitemap', href: '/sitemap' },
    { label: 'Case Studies', href: '/contact' },
    { label: 'FAQs', href: '/contact#faq' },
    { label: 'Partners', href: '/contact' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bitropix/about/',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bitropix/',
    icon: Instagram,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/bitropix',
    icon: Twitter,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/bitropix',
    icon: Facebook,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a12]">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-[#E03B37]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded bg-[#E03B37]/20 blur-md" />
                <Image src="/images/logo.png" alt="Bitropix Logo" width={40} height={40} className="relative" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Bitropix</span>
                <span className="text-[10px] font-medium tracking-wider text-[#E03B37]">
                  Innovate. Transform. Deliver.
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-gray-400">
              Transforming businesses through innovative IT solutions. Your trusted partner for digital transformation
              and growth.
            </p>

            {/* Social Links */}
            <div className="mb-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex h-10 w-10 items-center justify-center rounded bg-linear-to-br from-[#E03B37]/20 to-[#E03B37]/5 text-[#E03B37] transition-all duration-300 hover:from-[#E03B37] hover:to-[#c62828] hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <ul className="space-y-3">
              <li className="group flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E03B37]/10 transition-colors group-hover:bg-[#E03B37]/20">
                  <Mail className="h-4 w-4 text-[#E03B37]" />
                </div>
                <a
                  href="mailto:info@bitropix.com"
                  className="text-sm text-gray-400 transition-colors hover:text-[#E03B37]"
                >
                  info@bitropix.com
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E03B37]/10 transition-colors group-hover:bg-[#E03B37]/20">
                  <Phone className="h-4 w-4 text-[#E03B37]" />
                </div>
                <a href="tel:+919318454571" className="text-sm text-gray-400 transition-colors hover:text-[#E03B37]">
                  +91 9318454571
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E03B37]/10 transition-colors group-hover:bg-[#E03B37]/20">
                  <MapPin className="h-4 w-4 text-[#E03B37]" />
                </div>
                <span className="text-sm text-gray-400">Noida, India</span>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-[#E03B37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-[#E03B37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-[#E03B37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Bitropix. All rights reserved.</p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              Made with <Heart className="mx-1 h-4 w-4 fill-red-500 text-red-500" /> in India
            </div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 transition-colors duration-300 hover:text-[#E03B37]"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 transition-colors duration-300 hover:text-[#E03B37]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
