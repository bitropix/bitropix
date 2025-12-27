"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, MessageSquare, Linkedin, Twitter, Facebook, CheckCircle2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@bitropix.com", "support@bitropix.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 98765 43211"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Tech Park, HSR Layout", "Bangalore, Karnataka 560102"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
  },
]

const services = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Cloud Solutions",
  "Digital Marketing",
  "ERP Implementation",
  "HRMS Setup",
  "E-Commerce Solution",
  "Agile Hiring",
  "IT Consulting",
  "Other",
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative text-center px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground max-w-md mb-8">
              We've received your message and will get back to you within 24 hours. Our team is excited to learn more
              about your project!
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              Send Another Message
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-primary font-semibold mb-2">Get In Touch</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Let's Build Something Great Together
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Have a project in mind? Want to learn more about our services? We'd love to hear from you. Reach out and
              let's start a conversation.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <Card
                  key={info.title}
                  className="bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail) => (
                      <p key={detail} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="bg-card/30 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="bg-card/30 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="bg-card/30 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="bg-card/30 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-foreground">
                        Service Interested In *
                      </Label>
                      <Select
                        required
                        value={formState.service}
                        onValueChange={(value) => setFormState({ ...formState, service: value })}
                      >
                        <SelectTrigger className="bg-card/30 border-border/50">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, "-")}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-foreground">
                        Budget Range
                      </Label>
                      <Select
                        value={formState.budget}
                        onValueChange={(value) => setFormState({ ...formState, budget: value })}
                      >
                        <SelectTrigger className="bg-card/30 border-border/50">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5l">Under ₹5 Lakhs</SelectItem>
                          <SelectItem value="5l-15l">₹5 - 15 Lakhs</SelectItem>
                          <SelectItem value="15l-30l">₹15 - 30 Lakhs</SelectItem>
                          <SelectItem value="above-30l">Above ₹30 Lakhs</SelectItem>
                          <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="bg-card/30 border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>

              <div>
                <div className="aspect-video rounded overflow-hidden bg-card/30 border border-border/50 mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965547633966!2d77.6309395!3d12.9279232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1490fd4b1671%3A0x7b6e3e9b0d7e8d5e!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1702900000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bitropix Office Location"
                  />
                </div>

                <Card className="bg-card/30 border-border/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Follow us on social media to stay updated with our latest projects, insights, and company news.
                    </p>
                    <div className="flex gap-4">
                      {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                        <a
                          key={index}
                          href="#"
                          className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center text-primary hover:from-primary hover:to-accent hover:text-primary-foreground transition-all duration-300"
                          aria-label="Social link"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 p-6 bg-card/30 rounded border border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative">
                    <h3 className="font-semibold text-foreground mb-2">Quick Response Guarantee</h3>
                    <p className="text-muted-foreground text-sm">
                      We value your time. Our team responds to all inquiries within 24 hours during business days. For
                      urgent matters, please call us directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Have questions? Check out our FAQ section or reach out to us directly.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on scope. A simple website takes 4-6 weeks, while complex applications can take 3-6 months.",
                },
                {
                  q: "Do you provide post-launch support?",
                  a: "Yes! We offer various support packages including maintenance, updates, and technical support to ensure smooth operations.",
                },
                {
                  q: "Can I hire dedicated developers?",
                  a: "Our agile hiring model lets you hire dedicated specialists who work exclusively for your company.",
                },
              ].map((faq) => (
                <Card
                  key={faq.q}
                  className="bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
