import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/site/reveal';
import type { JobOpening } from '@/lib/careers';

/** Open roles as an index of rows: number, title, meta tags, arrow square. */
export function RoleRows({ jobs }: { jobs: JobOpening[] }) {
  return (
    <RevealGroup as="ul" className="border-t border-line">
      {jobs.map((job, i) => (
        <RevealItem as="li" key={job.slug}>
          <Link
            href={`/careers/${job.slug}`}
            data-cursor="Apply"
            className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-7 sm:grid-cols-[5rem_1fr_auto] sm:py-9"
          >
            <span
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              aria-hidden="true"
            />
            <span className="eyebrow relative self-start pt-2 sm:self-center sm:pt-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="relative min-w-0">
              <span className="font-display block text-[clamp(1.75rem,4.4vw,3.75rem)] leading-none font-semibold text-paper transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brand">
                {job.title}
              </span>
              <span className="mt-4 flex flex-wrap gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                <span className="tag tag-brand">{job.department}</span>
                <span className="tag">{job.location}</span>
                <span className="tag">{job.type}</span>
                <span className="tag hidden sm:inline-flex">{job.experience}</span>
              </span>
            </span>
            <span className="relative grid h-11 w-11 place-items-center border border-line-strong text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink sm:h-14 sm:w-14">
              <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
