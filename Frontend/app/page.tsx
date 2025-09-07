"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Scale,
  Shield,
  Users,
  MessageSquare,
  FileText,
  CreditCard,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

function AnimatedFeatureCard({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`${className} group transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20`}
      {...props}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DHAARA.AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/lawyers"
                className="text-muted-foreground hover:text-secondary transition-all duration-300 font-medium"
              >
                Find Lawyers
              </Link>
              <Link
                href="/ai-services"
                className="text-muted-foreground hover:text-secondary transition-all duration-300 font-medium"
              >
                AI Services
              </Link>
              <Link
                href="/resources"
                className="text-muted-foreground hover:text-secondary transition-all duration-300 font-medium"
              >
                Resources
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:bg-secondary/10 hover:text-secondary" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge
            variant="secondary"
            className="mb-8 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-secondary/20 to-accent/20 border-secondary/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Legal Services
          </Badge>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 text-balance leading-tight">
            Connect with{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Expert Lawyers
            </span>{" "}
            Using AI
          </h1>

          <p className="text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            Get matched with specialized lawyers instantly. Our AI understands your case and connects you with the right
            legal expert for your needs.
          </p>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-secondary/20 pulse-glow">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
              <Input
                placeholder="Describe your legal issue (e.g., 'I need help with a contract dispute')"
                className="pl-16 py-8 text-lg border-0 bg-transparent rounded-2xl text-foreground placeholder:text-muted-foreground/70"
              />
              <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 px-8 py-3 rounded-xl shadow-lg">
                Find Lawyers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-foreground">Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-foreground">10,000+ Verified Lawyers</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <Star className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-foreground">4.9/5 Client Rating</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                DHAARA.AI?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced technology meets legal expertise to provide you with the best possible legal representation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-secondary/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">AI Legal Assistant</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Advanced NLP understands your case details and recommends the perfect lawyer category
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-accent/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Document Generation</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Automated legal document creation based on your chat inputs and case requirements
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-secondary/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Secure Escrow</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Payment protection with escrow system - funds released only upon your satisfaction
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-accent/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Verified Lawyers</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Comprehensive rating and review system ensures you work with trusted professionals
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-accent/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Secure Consultations</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Built-in video/audio calling with end-to-end encryption for confidential discussions
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard>
              <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 h-full bg-gradient-to-br from-white to-accent/5 shadow-xl">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">Case Tracking</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Real-time updates and push notifications keep you informed throughout your case
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">Legal Expertise Areas</h2>
            <p className="text-xl text-muted-foreground">Find specialized lawyers for any legal matter</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Criminal Defense",
              "Civil Litigation",
              "Corporate Law",
              "Family Law",
              "Personal Injury",
              "Real Estate",
              "Immigration",
              "Intellectual Property",
            ].map((category, index) => (
              <AnimatedFeatureCard key={category}>
                <Card className="text-center hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 cursor-pointer group h-full border-2 border-secondary/20 hover:border-secondary/40 bg-gradient-to-br from-white to-secondary/5">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-bold group-hover:text-secondary transition-colors duration-300">
                      {category}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AnimatedFeatureCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl floating-animation"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl floating-animation"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8">Ready to Find Your Legal Expert?</h2>
          <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied clients who found the perfect lawyer through our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              asChild
            >
              <Link href="/register">
                Start Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              asChild
            >
              <Link href="/lawyers">Browse Lawyers</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-16 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DHAARA.AI
                </span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                AI-powered legal services connecting you with expert lawyers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/ai-chat" className="hover:text-primary">
                    AI Legal Chat
                  </Link>
                </li>
                <li>
                  <Link href="/document-generation" className="hover:text-primary">
                    Document Generation
                  </Link>
                </li>
                <li>
                  <Link href="/lawyer-matching" className="hover:text-primary">
                    Lawyer Matching
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal Areas</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/criminal" className="hover:text-primary">
                    Criminal Defense
                  </Link>
                </li>
                <li>
                  <Link href="/civil" className="hover:text-primary">
                    Civil Litigation
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-primary">
                    Corporate Law
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p className="text-lg">&copy; 2024 DHAARA.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
