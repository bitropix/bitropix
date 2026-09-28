import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

/** Standalone breadcrumb row for pages that don't use <PageHero>. */
export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-[calc(var(--nav-h)+2rem)]">
      <ol className="eyebrow flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="link-line hover:text-paper">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="link-line hover:text-paper">
                {item.label}
              </Link>
            ) : (
              <span className="text-paper" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
