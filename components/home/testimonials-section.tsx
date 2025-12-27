import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechStart India",
    content:
      "Bitropix transformed our entire digital infrastructure. Their team's expertise in cloud migration saved us 40% on operational costs.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "CTO, FinanceFlow",
    content:
      "The HRMS solution they built for us has streamlined our HR operations completely. Excellent support and continuous improvements.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Founder, RetailMax",
    content:
      "Their e-commerce platform helped us scale from 100 to 10,000 orders per day. Truly a game-changer for our business.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="pt-8">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20 group-hover:text-primary/30 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
