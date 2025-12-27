import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Target, Eye, Heart, Users, Globe, Linkedin, Twitter } from "lucide-react"

export const metadata = {
  title: "About Us - Bitropix | Your Trusted IT Partner",
  description:
    "Learn about Bitropix, our mission, vision, values, and the team behind innovative IT solutions and digital transformation services.",
}

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every project, delivering solutions that exceed expectations.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with complete transparency and honesty in all our business dealings.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork, both internally and with our clients.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We continuously explore new technologies to deliver cutting-edge solutions.",
  },
]

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description: "Bitropix was founded with a vision to transform businesses through technology.",
  },
  {
    year: "2020",
    title: "First Major Client",
    description: "Secured our first enterprise client and delivered a successful ERP implementation.",
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew to 15+ team members and expanded our service offerings.",
  },
  { year: "2022", title: "Product Launch", description: "Launched our flagship HRMS and E-commerce products." },
  {
    year: "2023",
    title: "50+ Clients",
    description: "Reached the milestone of serving 50+ happy clients across industries.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Started serving international clients and expanded operations.",
  },
]

const team = [
  {
    name: "Rahul Verma",
    role: "Founder & CEO",
    bio: "10+ years in software development and digital transformation.",
  },
  {
    name: "Ananya Singh",
    role: "CTO",
    bio: "Expert in cloud architecture and enterprise solutions.",
  },
  {
    name: "Vikram Patel",
    role: "Head of Design",
    bio: "Award-winning designer with passion for user experience.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Delivery",
    bio: "PMP certified with expertise in agile project management.",
  },
]

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "25+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold mb-2">About Us</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                  Transforming Businesses Through Technology
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
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
                <div className="aspect-[4/3] rounded overflow-hidden border border-border/50">
                  <img
                    src="/diverse-team-of-professionals-collaborating-in-mod.jpg"
                    alt="Bitropix Team"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary to-accent p-6 rounded text-primary-foreground shadow-lg shadow-primary/20">
                  <p className="text-3xl font-bold">5+</p>
                  <p className="text-sm opacity-90">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-card to-secondary" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-card/30 rounded border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower businesses with innovative technology solutions that drive growth, efficiency, and
                    competitive advantage. We aim to be the catalyst for digital transformation, helping organizations
                    of all sizes harness the power of technology.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-card/30 rounded border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
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

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">Our Values</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What Drives Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our core values guide everything we do, from how we work with clients to how we grow as a company.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">Our Journey</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Milestones We're Proud Of</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-border to-primary/50 hidden md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                    <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full relative z-10 shrink-0 shadow-lg shadow-primary/30" />
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">Our Team</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet the Leadership</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our experienced leadership team brings together decades of expertise in technology and business.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="text-center bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <CardContent className="pt-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <span className="text-3xl font-bold text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-3">
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Want to Be Part of Our Story?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
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
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
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
  )
}
