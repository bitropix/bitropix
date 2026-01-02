import { Search, Pencil, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We analyze your requirements, understand your business goals, and define the project scope.',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Design',
    description: 'Our designers create intuitive interfaces and user experiences that align with your brand.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our engineers build your solution using agile methodology with regular updates and feedback.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Delivery',
    description: 'We deploy, test thoroughly, and provide ongoing support to ensure successful implementation.',
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 font-semibold">Our Process</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">How We Work</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            A streamlined process designed to deliver exceptional results on time and within budget.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="group relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="from-border absolute top-12 left-full z-0 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r to-transparent lg:block" />
              )}
              <div className="relative z-10 text-center">
                <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-500">
                  <step.icon className="text-primary h-10 w-10" />
                  <span className="from-primary to-accent text-primary-foreground shadow-primary/20 absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-foreground mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
