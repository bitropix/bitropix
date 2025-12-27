import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Clock, Shield } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Expert Specialists",
    description: "Access top-tier talent with specialized skills tailored to your project needs.",
  },
  {
    icon: Clock,
    title: "Quick Deployment",
    description: "Get resources onboarded and productive within days, not months.",
  },
  {
    icon: Shield,
    title: "No Hiring Overhead",
    description: "Eliminate recruitment costs, training expenses, and HR administration.",
  },
]

const checkpoints = [
  "Dedicated developer works exclusively for you",
  "Flexible engagement models (full-time/part-time)",
  "Seamless integration with your existing team",
  "Regular performance reviews and reporting",
  "Easy scaling up or down based on needs",
]

export function AgileHiringSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold mb-2">Agile Hiring</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Build Your Dream Team Without the Hassle
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our agile hiring model provides you with dedicated specialists who work exclusively for your company. Get
              the expertise you need without the complexities of traditional hiring.
            </p>

            <ul className="space-y-4 mb-8">
              {checkpoints.map((point, index) => (
                <li key={point} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <Link href="/contact">Hire Talent Now</Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex gap-4 p-6 bg-card/50 backdrop-blur-sm rounded border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
