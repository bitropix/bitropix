'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blogs', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On home page: transparent when at top, solid on scroll
  // On other pages: always solid
  const showSolidBg = !isHome || scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        showSolidBg
          ? 'border-b border-white/5 bg-[#0a0a12] shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Bitropix Logo" width={36} height={36} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-widest text-white uppercase">Bitropix</span>
              <span className="text-[9px] font-medium tracking-wider text-[#E03B37]">
                Innovate. Transform. Deliver.
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href) ? 'text-[#E03B37]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Phone + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="tel:+919318454571"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              +91 9318454571
            </Link>
            <Button asChild className="bg-[#E03B37] text-white hover:bg-[#E03B37]/90">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md text-gray-300 hover:text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
            isOpen ? 'max-h-125 pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href) ? 'text-[#E03B37]' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-3">
              <a
                href="tel:+919318454571"
                className="flex items-center gap-2 px-3 text-sm text-gray-400 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +91 9318454571
              </a>
              <Button asChild className="bg-[#E03B37] text-white hover:bg-[#E03B37]/90">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
