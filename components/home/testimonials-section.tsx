import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Satendra Raghav',
    role: 'CEO, Tourillo Pvt. Ltd.',
    content:
      'We had an excellent experience working with this developer. They captured Tourillo’s vision beautifully and delivered a website that reflects our brand’s elegance, purpose, and passion for travel. The design is engaging, user-friendly, and perfectly aligned with our focus on personalized journeys and responsible tourism. Their attention to detail, creativity, and professionalism truly stood out. We’re extremely happy with the outcome.',
    rating: 5,
  },
  {
    name: 'Sachin Sharma',
    role: 'CTO, FinanceFlow',
    content:
      'An absolute pleasure to work with! The professionalism, creativity, and attention to detail were exceptional. From understanding my preferences to delivering flawless hair and makeup at my doorstep, the entire experience was seamless and stress-free. Truly talented, punctual, and highly skilled—I couldn’t have asked for a better artist.',
    rating: 5,
  },
  {
    name: 'Arnab Gupta',
    role: 'Founder, Fincafe',
    content:
      'Working with this developer was a great experience. They perfectly understood Fincafe’s vision and translated it into a clean, professional, and impactful website. The design, content flow, and overall user experience truly reflect our brand and mission. Highly reliable, creative, and responsive throughout the project—we’re extremely satisfied with the final result.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-secondary/30 via-background to-background absolute inset-0 bg-linear-to-b" />
      <div className="bg-primary/5 absolute top-0 right-1/4 h-75 w-75 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 font-semibold">Testimonials</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance sm:text-4xl">What Our Clients Say</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="bg-card/50 border-border/50 hover:border-primary/30 group relative backdrop-blur-sm transition-all duration-300"
            >
              <CardContent className="pt-8">
                <Quote className="text-primary/20 group-hover:text-primary/30 absolute top-6 right-6 h-8 w-8 transition-colors" />
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="fill-primary text-primary h-4 w-4" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="from-primary/20 to-accent/20 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
                    <span className="text-primary font-semibold">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
