import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building2, Users2, ShoppingCart } from "lucide-react"

const products = [
  {
    icon: Building2,
    title: "ERP Solutions",
    description:
      "Comprehensive enterprise resource planning system to streamline operations, manage resources, and boost productivity across all departments.",
    features: ["Inventory Management", "Financial Accounting", "Supply Chain", "Reporting & Analytics"],
    href: "/products#erp",
  },
  {
    icon: Users2,
    title: "HRMS",
    description:
      "Complete human resource management system for efficient employee lifecycle management from recruitment to retirement.",
    features: ["Payroll Management", "Attendance Tracking", "Performance Reviews", "Leave Management"],
    href: "/products#hrms",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platform",
    description: "Scalable e-commerce solution with all the features you need to launch and grow your online store.",
    features: ["Multi-vendor Support", "Payment Gateway", "Order Management", "Analytics Dashboard"],
    href: "/products#ecommerce",
  },
]

export function ProductsSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2">Our Products</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready-to-Deploy Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pre-built enterprise solutions that can be customized to fit your unique business requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.title}
              className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-500 group"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-accent/20 rounded flex items-center justify-center mb-4 group-hover:from-primary/40 group-hover:to-accent/30 transition-all duration-500">
                  <product.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-transparent"
            asChild
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
