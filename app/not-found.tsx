import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#E03B37] sm:text-9xl">404</h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#E03B37]" />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Page Not Found</h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-[#E03B37] text-white hover:bg-[#E03B37]/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              <ArrowLeft className="mr-2 h-4 w-4" /> Contact Us
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          <p className="mb-4 text-sm text-gray-400">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="text-sm font-medium text-[#E03B37] hover:underline">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-[#E03B37] hover:underline">
              About Us
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-[#E03B37] hover:underline">
              Blog
            </Link>
            <Link href="/careers" className="text-sm font-medium text-[#E03B37] hover:underline">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
