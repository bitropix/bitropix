import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
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
} from "lucide-react"

export const metadata = {
  title: "Careers - Bitropix | Join Our Team",
  description:
    "Explore career opportunities at Bitropix. Join our team of innovators and help shape the future of technology.",
}

const benefits = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Growth",
    description: "Annual learning budget and access to premium courses.",
  },
  {
    icon: Coffee,
    title: "Flexible Hours",
    description: "Work when you're most productive with flexible schedules.",
  },
  {
    icon: Plane,
    title: "Paid Time Off",
    description: "Generous PTO policy plus paid holidays.",
  },
  {
    icon: Laptop,
    title: "Remote Friendly",
    description: "Work from anywhere with our hybrid work model.",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular team outings, hackathons, and celebrations.",
  },
]

const openings = [
  {
    id: 1,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "4-6 years",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    description:
      "We're looking for an experienced React developer to build scalable web applications for our enterprise clients.",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "3-5 years",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    description: "Join our team to work on end-to-end development of our product suite and client projects.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-5 years",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    description: "Create beautiful, user-centered designs that solve complex problems and delight users.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 years",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    description: "Help us build and maintain robust infrastructure for our products and client solutions.",
  },
  {
    id: 5,
    title: "Flutter Developer",
    department: "Mobile",
    location: "Bangalore / Remote",
    type: "Full-time",
    experience: "2-4 years",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
    description: "Build cross-platform mobile applications with beautiful UI and seamless performance.",
  },
  {
    id: 6,
    title: "Business Development Executive",
    department: "Sales",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-4 years",
    skills: ["B2B Sales", "Lead Generation", "CRM", "Negotiation"],
    description: "Drive business growth by identifying and closing new opportunities in the IT services space.",
  },
]

const culture = [
  {
    icon: Zap,
    title: "Move Fast",
    description: "We ship fast, iterate quickly, and learn from every experience.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "The best solutions come from working together across teams.",
  },
  {
    icon: Heart,
    title: "Care Deeply",
    description: "We genuinely care about our work, our clients, and each other.",
  },
  {
    icon: GraduationCap,
    title: "Keep Learning",
    description: "Continuous learning is embedded in our culture.",
  },
]

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-primary font-semibold mb-2">Careers at Bitropix</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Build the Future With Us
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-8">
              Join a team of passionate innovators who are transforming businesses through technology. We're always
              looking for talented individuals who share our vision.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              asChild
            >
              <a href="#openings">
                View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold mb-2">Our Culture</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">A Place Where You Can Thrive</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  At Bitropix, we believe that great work happens when talented people come together in an environment
                  that supports growth, creativity, and collaboration. We're building more than just software - we're
                  building a community.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {culture.map((item) => (
                    <div key={item.title} className="flex gap-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-[4/3] rounded overflow-hidden border border-border/50">
                <img
                  src="/team-collaboration-in-modern-startup-office-space.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">Benefits & Perks</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">We Take Care of Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer competitive compensation along with benefits designed to support your wellbeing and growth.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 bg-card/30 rounded border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="openings" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-2">Open Positions</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Find Your Role</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our current openings and find the perfect opportunity to grow your career.
              </p>
            </div>
            <div className="space-y-6">
              {openings.map((job) => (
                <Card
                  key={job.id}
                  className="bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-1 text-foreground">{job.title}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                        className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
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
                          className="px-3 py-1 bg-secondary/50 border border-border/50 text-foreground rounded-full text-sm"
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

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">Don't See the Right Role?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
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
  )
}
