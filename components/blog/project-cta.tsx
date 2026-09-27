import { ButtonLink, PixelMark } from '@/components/site/ui';
import { Reveal } from '@/components/site/reveal';

/** Quiet closing row for journal pages: a nudge towards a real conversation. */
export function ProjectCta() {
  return (
    <section className="border-line border-t py-16 sm:py-20">
      <Reveal className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5">
          <PixelMark className="mt-2 h-5 w-5 shrink-0" />
          <div>
            <p className="font-display text-paper text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1] font-semibold">
              Have a project in mind?
            </p>
            <p className="text-paper-dim mt-3 max-w-md">
              Tell us what you are building. A senior member of the team will reply with next steps.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            Our services
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
