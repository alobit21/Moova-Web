import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import heroBg from "@/assets/hero-bg.png"
import avatar1 from "@/assets/testimonies/testimonial-man-1.png"
import avatar2 from "@/assets/become-one/avatars/woman-portrait.png"
import avatar3 from "@/assets/testimonies/testimonial-man-2.png"
import { DELIVERY_NOTIFICATIONS } from "../data/notifications"
import { useSectionVisibility } from "@/hooks/useInView"
import { AOSReveal, GradientText } from "@/components/animation/AOSReveal"

import mainHeroPhoto from "@/assets/hero/main-hero-photo.png"
import mainHeroPhoto1 from "@/assets/hero/main-hero-photo1.png"
import m1 from "@/assets/hero/m1.png"
import m12 from "@/assets/hero/m12.png"
import m13 from "@/assets/hero/m13.png"
import imgBadge1 from "@/assets/hero/image.png"
import imgBadge2 from "@/assets/hero/image copy.png"
import imgBadge3 from "@/assets/hero/image copy 2.png"

const HERO_SLIDES = [
  {
    id: 1,
    image: mainHeroPhoto,
    alt: "Happy Moova merchant fulfilling orders with AI dispatch",
    badges: [
      { src: m1, className: "top-[8%] -right-[8%] w-[65%] sm:w-[50%]" },
      { src: m12, className: "bottom-[22%] -left-[8%] w-[65%] sm:w-[50%]" },
      { src: m13, className: "-bottom-[4%] -right-[6%] w-[65%] sm:w-[50%]" },
    ]
  },
  {
    id: 2,
    image: mainHeroPhoto1,
    alt: "Merchant upgrading their delivery operations with Moova",
    badges: [
      { src: imgBadge1, className: "top-[10%] -right-[6%] w-[65%] sm:w-[50%]" },
      { src: imgBadge2, className: "bottom-[25%] -left-[8%] w-[65%] sm:w-[50%]" },
      { src: imgBadge3, className: "bottom-[2%] -right-[8%] w-[65%] sm:w-[50%]" },
    ]
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

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto group pb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Container */}
      <div className="relative w-full overflow-visible rounded-2xl sm:rounded-3xl aspect-[1/1] lg:aspect-[1.05/1]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto z-10"
                  : "opacity-0 scale-95 pointer-events-none z-0"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Main Image */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-[82%] h-[90%] object-cover rounded-[32px] drop-shadow-2xl z-10"
                />
                
                {/* Floating Badges */}
                {slide.badges.map((badge, bIndex) => (
                  <img
                    key={bIndex}
                    src={badge.src}
                    alt="Feature badge"
                    className={`absolute z-20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-2xl transition-all hover:scale-105 hover:-translate-y-1 duration-500 ${badge.className}`}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Chevrons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all cursor-pointer shadow-lg"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all cursor-pointer shadow-lg"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Indicators Dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
           
          </AOSReveal>
        </div>

        <AOSReveal animation="fade-left" delay={300} duration={1000} className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
          <HeroCarousel />
        </AOSReveal>
      </div>

      {/* Marquee cards inside hero section - paused when off-screen */}
      <div className="relative z-10 mt-10 sm:mt-14 lg:mt-20 overflow-hidden edge-fade">
        <div
          className={`flex w-max animate-marquee ${
            isVisible ? "" : "animation-paused"
          }`}
        >
          <div className="flex shrink-0 items-center gap-3 sm:gap-5 pr-3 sm:pr-5">
            {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
              <HeroNotificationCard key={`a-${i}`} {...item} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-5 pr-3 sm:pr-5">
            {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
              <HeroNotificationCard key={`b-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}