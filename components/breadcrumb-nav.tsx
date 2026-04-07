import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="border-b border-white/10 bg-[#0a0a12]" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="transition-colors hover:text-[#E03B37]">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="transition-colors hover:text-[#E03B37]">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-white">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
