"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Target, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { ContactDialog } from "@/components/contact-dialog"
import { ExamplesCarousel } from "@/components/examples-carousel"

const testimonials = [
  {
    company: "Ledo Pizza",
    text: "Ledo Pizza partnered with us to reach local students. We helped them drive significantly more student visits in weeks.",
    rating: 5,
    logo: "/ledo-pizza-logo.png",
  },
]

const features = [
  {
    icon: Target,
    title: "Precise Targeting",
    description: "Reach MoCo high schoolers directly with laser-focused advertising.",
  },
  {
    icon: TrendingUp,
    title: "Better ROI",
    description: "More cost-effective than Google Ads with higher engagement.",
  },
  {
    icon: Users,
    title: "Local Focus",
    description: "Connect with your local community of students and families.",
  },
]

const adExamples = [
  {
    src: "/images/ad-example-mobile.png",
    alt: "Mobile in-feed ad example",
    caption: "In-feed mobile placement inside the Grade Melon app.",
  },
  {
    src: "/images/ad-example-grid.png",
    alt: "Desktop in-stream ad example",
    caption: "Large in-stream creative between class cards on desktop.",
  },
  {
    src: "/images/ad-example-rail.png",
    alt: "Desktop right-rail ad example",
    caption: "Right-rail placement on the class details page.",
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const next = () => setCurrentTestimonial((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-[#111727] text-white scroll-smooth">
      <SiteHeader />

      {/* Hero */}
      <section id="hero" className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-red-500 text-white border-0">
          🎯 Hyper-Local Advertising
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Advertise Directly to
          <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent block">
            MoCo Highschoolers!
          </span>
        </h1>
        <p className="text-xl text-slate-200/90 mb-8 max-w-2xl mx-auto">
          Cheaper than Google's ads, but even more powerful. Connect with Montgomery County students where they spend
          their time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#why">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg"
            >
              Why Grademelon?
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>

        {/* At-a-glance list */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {["Trusted local audience", "Cost‑effective campaigns", "Fast setup"].map((item) => (
            <div key={item} className="flex items-center justify-center gap-2 text-slate-200">
              <CheckCircle className="h-5 w-5 text-pink-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Hero CTA */}
        <ContactDialog triggerLabel="Contact Now" />
        <p className="text-slate-300 mt-3" id="contact">
          Interested? Click to start an email and get the ball rolling.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {features.map((f, i) => (
            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
                <p className="text-slate-300 flex-grow">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partners / Testimonials */}
      <section id="partners" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Previous Partners</h2>
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <img
                  src={testimonials[0].logo || "/placeholder.svg"}
                  alt={`${testimonials[0].company} logo`}
                  className="h-12 object-contain"
                />
                <div className="flex">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-slate-100/90 mb-6 leading-relaxed">
                "{testimonials[0].text}"
              </blockquote>
              <p className="text-pink-400 font-semibold">— {testimonials[0].company}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ad Examples */}
      <section id="examples" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Ad Examples</h2>
        <p className="text-slate-200/90 text-center max-w-3xl mx-auto mb-8">
          See how ads appear across mobile and desktop experiences. These placements are designed to be effective yet
          tasteful.
        </p>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Left: static mobile example */}
          <div>
            <div className="text-sm text-slate-300 mb-3">Mobile in‑feed placement</div>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="w-full h-[360px] sm:h-[420px] md:h-[480px] bg-black/40 flex items-center justify-center">
                <img
                  src={"/images/ad-example-mobile.png"}
                  alt="Mobile in‑feed ad example"
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-2 text-slate-300 text-sm">In‑feed mobile placement inside the Grade Melon app.</div>
            </div>
          </div>

          {/* Right: carousel with desktop examples */}
          <div>
            <div className="text-sm text-slate-300 mb-3">Desktop placements</div>
            <ExamplesCarousel
              slides={[
                {
                  src: "/images/ad-example-grid.png",
                  alt: "Desktop in‑stream ad example",
                  caption: "Large in‑stream creative between class cards on desktop.",
                },
                {
                  src: "/images/ad-example-rail.png",
                  alt: "Desktop right‑rail ad example",
                  caption: "Right‑rail placement on the class details page.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-6">Why Grademelon?</h2>
        <p className="text-slate-200/90 max-w-3xl mx-auto text-center mb-10">
          We provide direct access to Montgomery County high school students through targeted, cost‑effective
          advertising that delivers real results for local businesses.
        </p>
        <div className="text-center">
          <ContactDialog triggerLabel="Talk to us" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-slate-300">
              Questions? Reach us at{" "}
              <a className="underline" href="mailto:ads@example.com">
                ads@example.com
              </a>
            </p>
            <p className="text-slate-400 mt-2 text-sm">© {new Date().getFullYear()} Grade Melon</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
