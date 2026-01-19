'use client';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: '.NET', icon: '🔷' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Azure', icon: '☁️' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '⚙️' },
  { name: 'Flutter', icon: '📱' },
  { name: 'React Native', icon: '📱' },
];

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-secondary/10 via-background to-background absolute inset-0 bg-linear-to-b" />
      <div className="bg-primary/5 absolute -top-40 right-0 h-100 w-100 rounded-full blur-[120px]" />
      <div className="bg-accent/5 absolute bottom-0 left-0 h-75 w-75 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 text-sm font-semibold tracking-widest uppercase">Tech Stack</p>
          <h2 className="text-foreground mb-6 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
            Technologies We Master
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
            We leverage cutting-edge technologies to build robust, scalable, and innovative solutions for your business.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group bg-card/40 hover:border-primary/70 hover:bg-primary/10 hover:shadow-primary/20 relative flex min-h-30 flex-col items-center justify-center gap-3 overflow-hidden rounded border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-125">
                {tech.icon}
              </div>
              <span className="text-foreground group-hover:text-primary text-center text-sm font-semibold transition-colors duration-300">
                {tech.name}
              </span>
              <div className="from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 absolute inset-0 rounded bg-linear-to-br transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
