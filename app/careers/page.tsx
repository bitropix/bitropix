import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  Heart,
  GraduationCap,
  Coffee,
  Plane,
  Laptop,
  Users,
  Zap,
  ArrowRight,
  Building2,
} from 'lucide-react';

export const metadata = {
  title: 'Careers - Bitropix | Join Our Team',
  description:
    'Explore career opportunities at Bitropix. Join our team of innovators and help shape the future of technology.',
};

const benefits = [
  {
    icon: Heart,
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Growth',
    description: 'Annual learning budget and access to premium courses.',
  },
  {
    icon: Coffee,
    title: 'Flexible Hours',
    description: "Work when you're most productive with flexible schedules.",
  },
  {
    icon: Plane,
    title: 'Paid Time Off',
    description: 'Generous PTO policy plus paid holidays.',
  },
  {
    icon: Laptop,
    title: 'Remote Friendly',
    description: 'Work from anywhere with our hybrid work model.',
  },
  {
    icon: Users,
    title: 'Team Events',
    description: 'Regular team outings, hackathons, and celebrations.',
  },
];

const openings = [
  {
    id: 1,
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experience: '4-6 years',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    description:
      "We're looking for an experienced React developer to build scalable web applications for our enterprise clients.",
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    description: 'Join our team to work on end-to-end development of our product suite and client projects.',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'Create beautiful, user-centered designs that solve complex problems and delight users.',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Help us build and maintain robust infrastructure for our products and client solutions.',
  },
  {
    id: 5,
    title: 'Flutter Developer',
    department: 'Mobile',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experience: '2-4 years',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    description: 'Build cross-platform mobile applications with beautiful UI and seamless performance.',
  },
  {
    id: 6,
    title: 'Business Development Executive',
    department: 'Sales',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '2-4 years',
    skills: ['B2B Sales', 'Lead Generation', 'CRM', 'Negotiation'],
    description: 'Drive business growth by identifying and closing new opportunities in the IT services space.',
  },
];

const culture = [
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We ship fast, iterate quickly, and learn from every experience.',
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'The best solutions come from working together across teams.',
  },
  {
    icon: Heart,
    title: 'Care Deeply',
    description: 'We genuinely care about our work, our clients, and each other.',
  },
  {
    icon: GraduationCap,
    title: 'Keep Learning',
    description: 'Continuous learning is embedded in our culture.',
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/50 via-background to-primary/5 absolute inset-0 bg-gradient-to-br" />
          <div className="bg-primary/15 animate-pulse-glow absolute top-0 right-0 h-96 w-96 rounded-full blur-[100px]" />
          <div className="bg-accent/10 animate-pulse-glow absolute bottom-0 left-0 h-72 w-72 rounded-full blur-[100px] delay-500" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-primary mb-2 font-semibold">Careers at Bitropix</p>
            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
              Build the Future With Us
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg">
              Join a team of passionate innovators who are transforming businesses through technology. We're always
              looking for talented individuals who share our vision.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
              asChild
            >
              <a href="#openings">
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-primary mb-2 font-semibold">Our Culture</p>
                <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl">A Place Where You Can Thrive</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  At Bitropix, we believe that great work happens when talented people come together in an environment
                  that supports growth, creativity, and collaboration. We're building more than just software - we're
                  building a community.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {culture.map((item) => (
                    <div key={item.title} className="group flex gap-3">
                      <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br transition-all">
                        <item.icon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-border/50 aspect-[4/3] overflow-hidden rounded border">
                <img
                  src="/team-collaboration-in-modern-startup-office-space.jpg"
                  alt="Team collaboration"
                  className="h-full w-full object-cover opacity-70"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/20 via-background to-background absolute inset-0 bg-gradient-to-b" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-primary mb-2 font-semibold">Benefits & Perks</p>
              <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">We Take Care of Our Team</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                We offer competitive compensation along with benefits designed to support your wellbeing and growth.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card/30 border-border/50 hover:border-primary/30 group flex gap-4 rounded border p-6 transition-all duration-300"
                >
                  <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br transition-all">
                    <benefit.icon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="openings" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-primary mb-2 font-semibold">Open Positions</p>
              <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Find Your Role</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Explore our current openings and find the perfect opportunity to grow your career.
              </p>
            </div>
            <div className="space-y-6">
              {openings.map((job) => (
                <Card
                  key={job.id}
                  className="bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-foreground mb-1 text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" /> {job.experience}
                          </span>
                        </CardDescription>
                      </div>
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:shadow-lg"
                      >
                        <Link href={`/contact?job=${encodeURIComponent(job.title)}`}>
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-secondary/50 border-border/50 text-foreground rounded-full border px-3 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-gradient-to-r" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">Don't See the Right Role?</h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for
              future opportunities.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
              asChild
            >
              <Link href="/contact">Send Your Resume</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
