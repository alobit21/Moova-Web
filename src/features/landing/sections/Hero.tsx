import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import heroBg from "@/assets/hero-bg.png"
import phoneMockup from "@/assets/phone-mockup.png"
import heroMerchant from "@/assets/hero-merchant.png"
import avatar1 from "@/assets/testimonies/testimonial-man-1.png"
import avatar2 from "@/assets/become-one/avatars/woman-portrait.png"
import avatar3 from "@/assets/testimonies/testimonial-man-2.png"
import { DELIVERY_NOTIFICATIONS } from "../data/notifications"
import { useSectionVisibility } from "@/hooks/useInView"
import { AOSReveal, GradientText } from "@/components/animation/AOSReveal"

const HERO_SLIDES = [
  {
    id: 1,
    image: heroMerchant,
    alt: "Moova merchant fulfillment with AI dispatch and live tracking stats",
  },
  {
    id: 2,
    image: phoneMockup,
    alt: "Moova app showing shop performance and current deliveries",
  },
]

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <div
      className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto group pb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Container */}
      <div className="relative aspect-[4/3.2] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto z-10"
                  : "opacity-0 scale-95 pointer-events-none z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          )
        })}
      </div>

      {/* Navigation Chevrons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-900/50 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-slate-900/80 transition-all cursor-pointer shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-900/50 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-slate-900/80 transition-all cursor-pointer shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive ? "w-8 bg-[#5DD586]" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

function HeroNotificationCard({
  icon,
  title,
  body,
}: {
  icon: string
  title: string
  body: string
}) {
  return (
    <Card className="flex h-[150px] sm:h-[160px] w-[230px] sm:w-[265px] shrink-0 rounded-2xl border border-white/10 bg-[#254685]/80 p-0 font-instrument shadow-none backdrop-blur-xs">
      <CardContent className="flex flex-col p-4 sm:p-5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2">
          <img src={icon} alt="" className="w-full h-full object-contain" />
        </div>
        <h3 className="mt-1 sm:mt-2 text-xs font-bold text-white sm:text-[13px]">{title}</h3>
        <p className="mt-1 text-[11px] leading-relaxed text-white/70 line-clamp-3">{body}</p>
      </CardContent>
    </Card>
  )
}

export function Hero() {
  const [sectionRef, isVisible] = useSectionVisibility<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-[#1c3b7a] pb-10 pt-28 sm:pb-14 sm:pt-36 lg:pb-16 lg:pt-40"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-90"
        />
      </div>

      <div
        className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-12"
      >
        <div className="mx-auto max-w-xl text-center lg:text-left">
          <AOSReveal animation="fade-down" delay={0} duration={1000}>
            <Badge
              variant="secondary"
              className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 sm:py-2 pl-2 pr-4 sm:pr-5 backdrop-blur-sm border-0 font-normal"
            >
              <div className="flex -space-x-2.5">
                <img
                  src={avatar1}
                  alt="Customer avatar"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-white/60 object-cover shadow-sm"
                />
                <img
                  src={avatar2}
                  alt="Customer avatar"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-white/60 object-cover shadow-sm"
                />
                <img
                  src={avatar3}
                  alt="Customer avatar"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-white/60 object-cover shadow-sm"
                />
              </div>
              <p className="text-xs sm:text-sm text-white">
                <span className="font-semibold">Trusted by 150+ brands</span>
              </p>
            </Badge>
          </AOSReveal>

          <AOSReveal animation="fade-up" delay={150} duration={1000}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
              Every Delivery Builds Customer Trust.
            </h1>
          </AOSReveal>

          <AOSReveal animation="fade-up" delay={300} duration={1000}>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-xl mx-auto lg:mx-0">
              Winning a customer&apos;s first order is hard. Keeping their trust is
              even harder. Moova helps online businesses manage deliveries with
              real-time visibility that turns first-time buyers into{" "}
              <GradientText gradient="from-[#5DD586] via-[#A7F3D0] to-[#5DD586]">
                loyal customers
              </GradientText>
              .
            </p>
          </AOSReveal>

          <AOSReveal animation="fade-up" delay={450} duration={1000}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <Button
                className="w-full sm:w-auto h-13 sm:h-14 rounded-full bg-[#5DD586] px-8 sm:px-10 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-950/20 hover:bg-[#4ed079] active:scale-[0.98] transition-all cursor-pointer"
              >
                Start Delivering Smarter
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-13 sm:h-14 rounded-full border-white/50 bg-white/5 px-8 sm:px-10 text-base font-semibold text-white backdrop-blur-xs hover:bg-white/15 hover:border-white/80 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
              >
                Watch Product Demo
              </Button>
            </div>
            <p className="mt-3 text-xs text-white/70 text-center lg:text-left">
              No credit card required &middot; Cancel anytime
            </p>
          </AOSReveal>
        </div>

        <AOSReveal animation="fade-left" delay={300} duration={1000} className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
          <HeroCarousel />
        </AOSReveal>
      </div>

      {/* Marquee cards inside hero section - paused when off-screen */}
      <div className="relative z-10 mt-10 sm:mt-14 lg:mt-20 overflow-hidden edge-fade">
        <div
          className={`flex w-max animate-marquee gap-3 sm:gap-5 ${
            isVisible ? "" : "animation-paused"
          }`}
        >
          {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
            <HeroNotificationCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}