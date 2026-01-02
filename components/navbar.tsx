'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  // { href: "/careers", label: "Careers" },
  // { href: "/blogs", label: "Blogs" },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-background/80 border-border/50 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="bg-primary/20 absolute inset-0 rounded blur-md transition-all group-hover:blur-lg" />
              <Image src="/images/logo.png" alt="Bitropix Logo" width={40} height={40} className="relative" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-xl font-bold">Bitropix</span>
              <span className="text-primary text-[10px] font-medium tracking-wider">Innovate. Transform. Deliver.</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-border/50 animate-fade-in from-background to-secondary/50 border-t bg-linear-to-b py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`animate-slide-up text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="animate-slide-up w-fit" style={{ animationDelay: '350ms' }}>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
