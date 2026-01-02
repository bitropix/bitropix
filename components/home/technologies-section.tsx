'use client';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: '.NET', category: 'Backend' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Swift', category: 'Mobile' },
];

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-secondary/20 via-background to-background absolute inset-0 bg-gradient-to-b" />
      <div className="bg-primary/5 absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 font-semibold">Tech Stack</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">
            Technologies We Work With
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            We leverage the latest technologies to build robust, scalable, and future-proof solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="bg-card/50 border-border hover:border-primary/50 hover:bg-primary/10 group cursor-default rounded-full border px-6 py-3 backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-foreground group-hover:text-primary font-medium transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
