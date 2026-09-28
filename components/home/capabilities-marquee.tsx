import { Marquee } from '@/components/site/marquee';

const items = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Cloud Engineering',
  'SEO & Growth',
  'Digital Transformation',
  'IoT & Embedded',
];

export function CapabilitiesMarquee() {
  return (
    <section aria-label="Capabilities" className="border-y border-line bg-ink py-6 sm:py-8">
      <Marquee duration={45}>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="font-display px-6 text-[clamp(2rem,5vw,4.5rem)] leading-none font-semibold whitespace-nowrap text-paper sm:px-10">
              {item}
            </span>
            <i className="bg-brand-gradient inline-block h-3 w-3 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
