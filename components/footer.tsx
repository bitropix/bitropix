import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Web Development', href: '/services#web' },
    { label: 'Mobile Development', href: '/services#mobile' },
    { label: 'UI/UX Design', href: '/services#design' },
    { label: 'Cloud Solutions', href: '/services#cloud' },
    { label: 'Digital Marketing', href: '/services#marketing' },
  ],
  products: [
    { label: 'ERP Solutions', href: '/products#erp' },
    { label: 'HRMS', href: '/products#hrms' },
    { label: 'E-Commerce', href: '/products#ecommerce' },
  ],
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    // { label: "Blogs", href: "/blogs" },
    { label: 'Contact', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="from-background relative overflow-hidden bg-linear-to-b to-[#050508]">
      {/* Subtle gradient glow */}
      <div className="bg-primary/5 absolute top-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 rounded blur-md" />
                <Image src="/images/logo.png" alt="Bitropix Logo" width={40} height={40} className="relative" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-xl font-bold">Bitropix</span>
                <span className="text-primary text-[10px] font-medium tracking-wider">
                  Innovate. Transform. Deliver.
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Transforming businesses through innovative IT solutions. Your trusted partner for digital transformation.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-foreground mb-4 font-semibold">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* <h3 className="font-semibold mb-4 text-foreground">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul> */}
            <h3 className="text-foreground mb-4 font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-4 font-semibold">Contact</h3>
            <ul className="space-y-4">
              <li className="group flex items-start gap-3">
                <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors">
                  <Mail className="text-primary h-4 w-4" />
                </div>
                <a
                  href="mailto:info@bitropix.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  info@bitropix.com
                </a>
              </li>

              <li className="group flex items-start gap-3">
                <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors">
                  <Phone className="text-primary h-4 w-4" />
                </div>
                <a
                  href="tel:+919004569903"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  +91 9004569903
                </a>
              </li>

              <li className="group flex items-start gap-3">
                <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors">
                  <MapPin className="text-primary h-4 w-4" />
                </div>
                <span className="text-muted-foreground text-sm">Noida, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/50 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">&copy; 2025 Bitropix. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
