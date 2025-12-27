import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded p-8 md:p-16 text-center overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-accent/20 rounded" />
          <div className="absolute inset-[1px] bg-card rounded" />

          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss how Bitropix can help you achieve your technology goals. Get a free consultation with our
              experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                asChild
              >
                <Link href="/contact">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="mailto:info@bitropix.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
