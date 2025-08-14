"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Slide = {
  src: string
  alt: string
  caption: string
}

const defaultSlides: Slide[] = [
  { src: "/mobile-in-feed-ad.png", alt: "Mobile in‑feed ad", caption: "In‑feed mobile placement inside the app." },
  {
    src: "/desktop-grid-ad.png",
    alt: "Desktop in‑stream ad",
    caption: "Large in‑stream creative between class cards.",
  },
  {
    src: "/desktop-right-rail-ad.png",
    alt: "Right‑rail ad",
    caption: "Right‑rail placement on the class details page.",
  },
]

export function ExamplesCarousel({ slides = defaultSlides }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let startX = 0
    let isDown = false
    const onDown = (e: TouchEvent | MouseEvent) => {
      isDown = true
      startX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX
    }
    const onUp = (e: TouchEvent | MouseEvent) => {
      if (!isDown) return
      const x = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
      const delta = x - startX
      if (delta > 50) prev()
      if (delta < -50) next()
      isDown = false
    }
    el.addEventListener("touchstart", onDown)
    el.addEventListener("touchend", onUp)
    el.addEventListener("mousedown", onDown)
    el.addEventListener("mouseup", onUp)
    return () => {
      el.removeEventListener("touchstart", onDown)
      el.removeEventListener("touchend", onUp)
      el.removeEventListener("mousedown", onDown)
      el.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Ad examples"
      className="relative mx-auto w-full max-w-5xl"
    >
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Fixed, moderate height with object-contain so the whole image is visible */}
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((s, i) => (
                  <div key={i} className="min-w-full">
                    <div className="w-full h-[360px] sm:h-[420px] md:h-[480px] bg-black/40 flex items-center justify-center">
                      <img
                        src={s.src || "/placeholder.svg"}
                        alt={s.alt}
                        className="max-h-full max-w-full object-contain"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="p-2 text-slate-300 text-sm">{s.caption}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous slide"
                onClick={prev}
                className="border-white/20 text-white bg-black/30 hover:bg-black/50 backdrop-blur"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Next slide"
                onClick={next}
                className="border-white/20 text-white bg-black/30 hover:bg-black/50 backdrop-blur"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-pink-500" : "bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  )
}
