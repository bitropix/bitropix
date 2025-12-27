"use client"

import Link from "next/link"
import { Globe, Smartphone, Palette, Cloud, TrendingUp, Cpu, Settings, Wifi, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies for optimal performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android that engage users.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive and beautiful digital experiences.",
  },
  {
    icon: Cloud,
    title: "Cloud Migrations",
    description: "Seamless migration to cloud infrastructure for scalability and cost efficiency.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies to grow your online presence and reach.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    description: "Custom embedded solutions for IoT devices and industrial applications.",
  },
  {
    icon: Settings,
    title: "IT Consulting",
    description: "Strategic technology consulting to align IT with your business goals.",
  },
  {
    icon: Wifi,
    title: "IoT Solutions",
    description: "Connected device solutions that transform operations and create value.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive IT Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, we provide end-to-end solutions that drive digital transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
