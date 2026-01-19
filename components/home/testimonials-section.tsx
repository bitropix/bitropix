'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Satendra Raghav',
    role: 'CEO, Tourillo Pvt. Ltd.',
    content:
      'We had an excellent experience working with this developer. They captured Tourillo vision beautifully and delivered a website that reflects our brand’s elegance, purpose, and passion for travel. The design is engaging, user-friendly, and perfectly aligned with our focus on personalized journeys and responsible tourism. Their attention to detail, creativity, and professionalism truly stood out. We are extremely happy with the outcome.',
    rating: 5,
  },
  {
    name: 'Sachin Sharma',
    role: 'Founder, Advancedbeauty.in',
    content:
      'An absolute pleasure to work with! The professionalism, creativity, and attention to detail were exceptional. From understanding my preferences to delivering flawless hair and makeup at my doorstep, the entire experience was seamless and stress-free. Truly talented, punctual, and highly skilled—I could not have asked for a better artist.',
    rating: 5,
  },
  {
    name: 'Arnab Gupta',
    role: 'Founder, Fincafe',
    content:
      'Working with them was a great experience. They perfectly understood Fincafe’s vision and translated it into a clean, professional, and impactful website. The design, content flow, and overall user experience truly reflect our brand and mission. Highly reliable, creative, and responsive throughout the project—we are extremely satisfied with the final result.',
    rating: 5,
  },
  {
    name: 'Tom Jung',
    role: 'Director, Data Platform, Elevance Health, Inc.',
    content:
      'Working with the Elevance Health data team was an excellent experience. They integrated ServiceNow and migrated services from Teradata On-Prem to Teradata Vantage, improving system performance by 5% and reducing costs by 25%. Their innovative hackathons generated automation and process improvements that saved hundreds of hours annually and increased revenue. Highly professional, strategic, and results-driven—the team consistently exceeded expectations.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, 5000); // Auto-advance every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

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

        <div className="relative mx-auto max-w-4xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Slider Container */}
          <div className="relative h-100 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <Card className="bg-card/50 border-border hover:border-primary/30 group relative backdrop-blur-sm transition-all duration-300">
                  <CardContent className="flex flex-col pt-8 pb-6">
                    <Quote className="text-primary/20 group-hover:text-primary/30 absolute top-6 right-6 h-8 w-8 transition-colors" />
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="fill-primary text-primary h-4 w-4" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonials[currentIndex].content}"</p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="from-primary/20 to-accent/20 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
                        <span className="text-primary font-semibold">
                          {testimonials[currentIndex].name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">{testimonials[currentIndex].name}</p>
                        <p className="text-muted-foreground text-sm">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="hover:bg-primary/10 hover:border-primary/50 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="hover:bg-primary/10 hover:border-primary/50 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
