import { Marquee } from '@/components/site/marquee';
import { Eyebrow } from '@/components/site/ui';

const rowA = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Vue.js', 'Angular', 'Java', '.NET'];
const rowB = ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Flutter', 'React Native', 'PostgreSQL', 'Figma'];

function Chip({ name }: { name: string }) {
  return (
    <span className="mx-2 flex h-16 items-center gap-3 border border-line bg-ink px-6 whitespace-nowrap text-paper-dim transition-colors duration-300 hover:border-brand hover:text-paper sm:h-20 sm:px-8">
      <i className="h-2 w-2 bg-brand" aria-hidden="true" />
      <span className="font-display text-xl font-semibold sm:text-2xl">{name}</span>
    </span>
  );
}

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <Eyebrow rule index="05" className="mb-12">
          Stack
        </Eyebrow>
      </div>
      <div className="container-x mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper">
            Tools we master.
          </h2>
        </div>
        <p className="max-w-sm text-paper-dim">
          We pick technology for your scale and your team, not for our comfort zone.
        </p>
      </div>
      <div className="space-y-4">
        <Marquee duration={50}>
          {rowA.map((t) => (
            <Chip key={t} name={t} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {rowB.map((t) => (
            <Chip key={t} name={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
