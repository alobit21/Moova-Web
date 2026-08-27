import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import heroBg from "@/assets/hero-bg.png"
import phoneMockup from "@/assets/phone-mockup.png"
import avatar1 from "@/assets/testimonies/testimonial-man-1.png"
import avatar2 from "@/assets/become-one/avatars/woman-portrait.png"
import avatar3 from "@/assets/testimonies/testimonial-man-2.png"
import { DELIVERY_NOTIFICATIONS } from "../data/notifications"
import { useSectionVisibility } from "@/hooks/useInView"
import { AOSReveal, GradientText } from "@/components/animation/AOSReveal"

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
        <div className="text-lg sm:text-xl">{icon}</div>
        <h3 className="mt-2 text-xs font-bold text-white sm:text-[13px]">{title}</h3>
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
                Start Free 14-Day Trial
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
          <img
            src={phoneMockup}
            alt="Moova app showing shop performance and current deliveries"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg drop-shadow-2xl object-contain"
          />
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