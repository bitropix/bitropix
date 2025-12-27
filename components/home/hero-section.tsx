"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-transparent" />

      {/* Animated glow orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,45,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,45,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted by 100+ Businesses
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Transform Your Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Innovation</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Bitropix delivers cutting-edge IT solutions including software development, digital transformation, cloud
              migrations, and agile hiring to accelerate your growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-transparent"
              >
                <Link href="/about">
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats with animation */}
            <div className="mt-12 flex items-center gap-8">
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`animate-slide-up`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Gradient background card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded rotate-6 animate-float" />
              <div className="absolute inset-0 rounded overflow-hidden border border-border/50 bg-secondary/50 backdrop-blur-sm">
                <img
                  src="/modern-office-team-working-on-computers-with-code-.jpg"
                  alt="Team working on innovative solutions"
                  className="w-full h-full object-cover opacity-60"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded border border-border/50 backdrop-blur-sm animate-slide-up delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xl font-bold">98%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Client Satisfaction</p>
                    <p className="text-sm text-muted-foreground">Based on reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
