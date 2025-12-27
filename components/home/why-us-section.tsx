import { Award, Zap, HeartHandshake, Lightbulb } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Proven Expertise",
    description: "5+ years of delivering successful projects across industries with a team of certified professionals.",
  },
  {
    icon: Zap,
    title: "Agile Methodology",
    description: "Fast, iterative development process that ensures quick delivery and continuous improvement.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric Approach",
    description: "Your success is our priority. We work as an extension of your team to achieve your goals.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of technology trends to bring you cutting-edge solutions that give you an edge.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] relative rounded overflow-hidden border border-border/50">
              <img
                src="/professional-team-meeting-in-modern-office-discuss.jpg"
                alt="Our team at work"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-accent p-6 rounded text-primary-foreground shadow-lg shadow-primary/20">
              <p className="text-4xl font-bold">98%</p>
              <p className="text-sm opacity-90">Client Retention Rate</p>
            </div>
          </div>

          <div>
            <p className="text-primary font-semibold mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Your Trusted Technology Partner
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We combine technical excellence with business acumen to deliver solutions that not only work but drive
              real business value.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <reason.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
