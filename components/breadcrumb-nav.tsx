import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="text-gray-500 transition-colors hover:text-[#E03B37]">
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-600" />
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="text-gray-500 transition-colors hover:text-[#E03B37]">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight className="h-3 w-3 text-gray-600" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
