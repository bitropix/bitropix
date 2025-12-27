import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  TrendingUp,
  Cpu,
  Settings,
  Wifi,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export const metadata = {
  title: "Services - Bitropix | IT Solutions & Digital Transformation",
  description:
    "Explore our comprehensive IT services including web development, mobile apps, cloud migrations, digital marketing, IoT, and more.",
}

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "CMS Development",
      "Performance Optimization",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "PHP", "PostgreSQL"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android that engage users and drive business growth.",
    features: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-platform Apps",
      "App Store Optimization",
      "Mobile UI/UX Design",
      "App Maintenance & Support",
    ],
    technologies: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that creates intuitive, beautiful, and accessible digital experiences that convert.",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
      "Usability Testing",
      "Accessibility Compliance",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Migrations",
    description: "Seamless migration to cloud infrastructure for scalability, reliability, and cost efficiency.",
    features: [
      "Cloud Assessment",
      "Migration Strategy",
      "AWS/Azure/GCP Setup",
      "Hybrid Cloud Solutions",
      "Cloud Security",
      "Cost Optimization",
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow your online presence, generate leads, and increase conversions.",
    features: [
      "SEO Optimization",
      "PPC Campaigns",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Google Analytics", "SEMrush"],
  },
  {
    id: "digital-transformation",
    icon: Settings,
    title: "Digital Transformation",
    description: "End-to-end digital transformation services to modernize your business operations and processes.",
    features: [
      "Digital Strategy",
      "Process Automation",
      "Legacy System Modernization",
      "Data Analytics",
      "Change Management",
      "Technology Roadmap",
    ],
    technologies: ["Power Automate", "Zapier", "Salesforce", "SAP", "Microsoft 365"],
  },
  {
    id: "embedded",
    icon: Cpu,
    title: "Embedded Systems",
    description: "Custom embedded solutions for IoT devices, industrial applications, and specialized hardware.",
    features: [
      "Firmware Development",
      "Hardware Integration",
      "RTOS Development",
      "Driver Development",
      "System Optimization",
      "Testing & Validation",
    ],
    technologies: ["C/C++", "ARM", "Arduino", "Raspberry Pi", "FPGA"],
  },
  {
    id: "iot",
    icon: Wifi,
    title: "IoT Solutions",
    description: "Connected device solutions that transform operations, create new revenue streams, and add value.",
    features: [
      "IoT Architecture Design",
      "Sensor Integration",
      "Real-time Monitoring",
      "Predictive Maintenance",
      "IoT Security",
      "Dashboard Development",
    ],
    technologies: ["MQTT", "LoRaWAN", "AWS IoT", "Azure IoT", "Edge Computing"],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-primary font-semibold mb-2">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Comprehensive IT Solutions for Your Business
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              From concept to deployment, we provide end-to-end solutions that drive digital transformation and
              accelerate your growth.
            </p>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-6">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3">What We Offer:</h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold text-foreground mb-3">Technologies:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-card/50 border border-border/50 rounded-full text-sm text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                    >
                      <Link href="/contact">
                        Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="aspect-[4/3] rounded overflow-hidden bg-card/30 border border-border/50 relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={`/.jpg?height=400&width=600&query=${service.title} service illustration`}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-70"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Let's discuss how our services can help transform your business. Get a free consultation today.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
              asChild
            >
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
