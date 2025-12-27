import { Search, Pencil, Code, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "We analyze your requirements, understand your business goals, and define the project scope.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Design",
    description: "Our designers create intuitive interfaces and user experiences that align with your brand.",
  },
  {
    number: "03",
    icon: Code,
    title: "Development",
    description: "Our engineers build your solution using agile methodology with regular updates and feedback.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Delivery",
    description: "We deploy, test thoroughly, and provide ongoing support to ensure successful implementation.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">Our Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">How We Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined process designed to deliver exceptional results on time and within budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-6 relative group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                  <step.icon className="h-10 w-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
