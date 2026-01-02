import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Target, Eye, Heart, Users, Globe, Linkedin, Twitter } from 'lucide-react';

export const metadata = {
  title: 'About Us - Bitropix | Your Trusted IT Partner',
  description:
    'Learn about Bitropix, our mission, vision, values, and the team behind innovative IT solutions and digital transformation services.',
};

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in all our business dealings.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both internally and with our clients.',
  },
  {
    icon: Globe,
    title: 'Innovation',
    description: 'We continuously explore new technologies to deliver cutting-edge solutions.',
  },
];

const milestones = [
  {
    year: '2023',
    title: 'Founded',
    description: 'Bitropix was founded with a vision to transform businesses through technology.',
  },
  {
    year: '2023',
    title: 'First Major Client',
    description: 'Secured our first enterprise client and delivered a successful ERP implementation.',
  },
  {
    year: '2024',
    title: 'Team Expansion',
    description: 'Grew to 15+ team members and expanded our service offerings.',
  },
  { year: '2024', title: 'Product Launch', description: 'Launched our flagship HRMS and E-commerce products.' },
  {
    year: '2025',
    title: '50+ Clients',
    description: 'Reached the milestone of serving 50+ happy clients across industries.',
  },
];

const team = [
  {
    name: 'Arunendrra Ganguly',
    role: 'CEO',
    bio: '18+ years in Data platform and Digital transformation.',
  },
  {
    name: 'Diwakar Jha',
    role: 'CTO',
    bio: 'Expert in cloud architecture and enterprise solutions.',
  },
  {
    name: 'Kapil Sinha',
    role: 'COO',
    bio: 'Designer with passion for user experience.',
  },
  {
    name: 'Gaurav Kushwaha',
    role: 'CMO',
    bio: 'Driving seamless delivery through strategy and execution.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '25+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-primary/10 via-background to-accent/5 absolute inset-0 bg-linear-to-br" />
          <div className="bg-primary/10 absolute top-20 left-10 h-100 w-100 rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-primary mb-2 font-semibold">About Us</p>
                <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
                  Transforming Businesses Through Technology
                </h1>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  Bitropix is a leading IT services company dedicated to helping businesses thrive in the digital age.
                  We combine technical expertise with business acumen to deliver solutions that drive real results.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Since our founding, we have been committed to excellence, innovation, and building long-term
                  partnerships with our clients. Our team of passionate professionals works tirelessly to turn your
                  vision into reality.
                </p>
              </div>
              <div className="relative">
                <div className="border-border aspect-4/3 overflow-hidden rounded border">
                  <img
                    src="/diverse-team-of-professionals-collaborating-in-mod.jpg"
                    alt="Bitropix Team"
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="from-background absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
                </div>
                <div className="from-primary to-accent text-primary-foreground shadow-primary/20 absolute -bottom-6 -left-6 rounded bg-linear-to-br p-6 shadow-lg">
                  <p className="text-3xl font-bold">2+</p>
                  <p className="text-sm opacity-90">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-12">
          <div className="from-secondary via-card to-secondary absolute inset-0 bg-linear-to-r" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-primary mb-1 text-3xl font-bold sm:text-4xl">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="bg-card/30 border-primary/20 group hover:border-primary/40 relative overflow-hidden rounded border p-8 transition-colors">
                <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl transition-colors" />
                <div className="relative">
                  <div className="from-primary/20 to-primary/5 mb-6 flex h-14 w-14 items-center justify-center rounded bg-linear-to-br">
                    <Target className="text-primary h-7 w-7" />
                  </div>
                  <h2 className="text-foreground mb-4 text-2xl font-bold">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower businesses with innovative technology solutions that drive growth, efficiency, and
                    competitive advantage. We aim to be the catalyst for digital transformation, helping organizations
                    of all sizes harness the power of technology.
                  </p>
                </div>
              </div>
              <div className="bg-card/30 border-border group hover:border-primary/30 relative overflow-hidden rounded border p-8 transition-colors">
                <div className="bg-accent/5 group-hover:bg-accent/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl transition-colors" />
                <div className="relative">
                  <div className="from-primary/20 to-primary/5 mb-6 flex h-14 w-14 items-center justify-center rounded bg-linear-to-br">
                    <Eye className="text-primary h-7 w-7" />
                  </div>
                  <h2 className="text-foreground mb-4 text-2xl font-bold">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be recognized globally as a trusted technology partner known for excellence, innovation, and
                    transformative solutions. We envision a future where every business, regardless of size, has access
                    to world-class IT solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-secondary/20 via-background to-background absolute inset-0 bg-linear-to-b" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-primary mb-2 font-semibold">Our Values</p>
              <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">What Drives Us</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Our core values guide everything we do, from how we work with clients to how we grow as a company.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="group text-center">
                  <div className="from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br transition-all">
                    <value.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-primary mb-2 font-semibold">Our Journey</p>
              <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Milestones We're Proud Of</h2>
            </div>
            <div className="relative">
              <div className="from-primary/50 via-border to-primary/50 absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-linear-to-b md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={`${milestone.year}-${index}`}
                    className={`flex flex-col items-center gap-8 md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-primary text-lg font-bold">{milestone.year}</span>
                      <h3 className="text-foreground mt-1 text-xl font-semibold">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                    <div className="from-primary to-accent shadow-primary/30 relative z-10 h-4 w-4 shrink-0 rounded-full bg-linear-to-br shadow-lg" />
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-primary/5 to-accent/5 absolute inset-0 bg-linear-to-r via-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <p className="text-primary mb-2 font-semibold">Our Team</p>
              <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Meet the Leadership</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Our experienced leadership team brings together decades of expertise in technology and business.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="bg-card/30 border-border hover:border-primary/30 group text-center transition-all duration-300"
                >
                  <CardContent className="pt-8">
                    <div className="from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br transition-all">
                      <span className="text-primary text-3xl font-bold">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary mb-2 text-sm">{member.role}</p>
                    <p className="text-muted-foreground mb-4 text-sm">{member.bio}</p>
                    {/* <div className="flex justify-center gap-3">
                      <a
                        href="#"
                        className="w-8 h-8 rounded bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-linear-to-r" />
          <div className="absolute inset-0 bg-[linear-linear(rgba(0,0,0,0.1)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Want to Be Part of Our Story?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              We're always looking for talented individuals to join our team. Check out our open positions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
                asChild
              >
                <Link href="/careers">View Careers</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transition-all duration-300"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
