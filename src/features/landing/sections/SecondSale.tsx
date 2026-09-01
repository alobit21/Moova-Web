import type { ReactNode } from "react"
import {
  CheckCircle2,
  Coffee,
  Navigation,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useInView } from "@/hooks/useInView"

const STATS = [
  { icon: Users, value: "150+", label: "Businesses onboarded" },
  { icon: CheckCircle2, value: "98.7%", label: "Delivery success rate" },
  { icon: TrendingUp, value: "+68%", label: "Repeat purchase rate" },
] as const

function StatsBar() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15, triggerOnce: true })

  return (
    <Card
      ref={ref}
      className={`mx-auto max-w-4xl rounded-2xl sm:rounded-3xl border-0 shadow-xl shadow-slate-900/5 transition-all duration-500 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
    >
      <CardContent className="grid grid-cols-1 gap-y-6 px-4 py-6 sm:grid-cols-3 sm:gap-y-0 sm:px-10 sm:py-8">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 sm:gap-3 border-slate-100 px-2 text-center sm:border-l sm:first:border-l-0"
          >
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
            </span>
            <p className="text-xl sm:text-3xl font-bold text-foreground tracking-tight">{value}</p>
            <p className="text-xs sm:text-smtext-[#5E656E]">{label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function MomentCard({
  eyebrow,
  eyebrowClassName,
  badge,
  highlighted = false,
  title,
  description,
  children,
}: {
  eyebrow?: string
  eyebrowClassName?: string
  badge?: string
  highlighted?: boolean
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card
      className={`flex h-full flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 ${highlighted
        ? "border-2 border-blue-600 shadow-xl shadow-blue-600/10"
        : "border-slate-100 shadow-sm"
        }`}
    >
      <CardContent className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6">
        {(eyebrow || badge) && (
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold tracking-wide ${eyebrowClassName}`}>
              {eyebrow}
            </span>
            {badge ? (
              <Badge className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#FFFFFF] border-0">
                {badge}
              </Badge>
            ) : null}
          </div>
        )}

        {children}

        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#161B2C]">{title}</h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#5E656E]">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function FirstClickMock() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-indigo-50/70 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#2648A6] shadow-sm">
          <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">Artisan Coffee Blend</p>
          <p className="text-sm font-semibold text-[#2648A6]">$24.99</p>
        </div>
      </div>
      <Button className="w-full rounded-full bg-blue-800 text-[#FFFFFF] hover:bg-blue-700 active:scale-[0.98] transition-all">
        Place First Order
      </Button>
    </div>
  )
}

function DecisiveMomentMock() {
  return (
    <>
      <style>{`
        @keyframes progress-grow {
          0% { transform: translateX(-100%); background-color: #2563eb; }
          100% { transform: translateX(-10%); background-color: #10b981; }
        }
        .progress-bar-delivery {
          animation: progress-grow 8s ease-in-out infinite alternate;
          animation-delay: 0s;
        }
        .progress-bar-trust {
          animation: progress-grow 8s ease-in-out infinite alternate;
          animation-delay: -2s;
        }
      `}</style>
      <div className="flex flex-col gap-4 sm:gap-5 rounded-2xl border border-blue-100 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-blue-600 text-[#FFFFFF]">
              <Navigation className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] sm:text-xstext-[#5E656E]">Your rider</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground">4 minutes away</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[#2648A6] border-0">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
          <span className="h-px flex-1 border-t border-dashed border-blue-200" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
        </div>

        <div className="flex flex-col gap-1.5">
          {/* <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Trust level</span>
              <span className="font-semibold text-[#2648A6]">90%</span>
            </div>
            <Progress value={90} className="mt-1.5 h-2 bg-slate-100" indicatorClassName="progress-bar-trust bg-gradient-to-r from-blue-600 to-emerald-500" />
          </div> */}

          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Delivery progress</span>
              <span className="font-semibold text-[#2648A6]">90%</span>
            </div>
            <Progress value={90} className="mt-1.5 h-2 bg-slate-100" indicatorClassName="progress-bar-delivery bg-blue-600" />
          </div>
        </div>
      </div>
    </>
  )
}

function LoyaltyLoopMock() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-[#E8F8F0] p-4 sm:p-5">
      <p className="text-[13px] font-bold text-[#00B872]">The Loyalty Loop</p>

      <div className="flex flex-col gap-3 rounded-xl bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-[#00B872] text-2xl sm:text-3xl">
            📦
          </span>
          <div className="flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-1.5 rounded-full bg-[#E8F8F0] px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-[#00B872]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Delivered on time!
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] sm:text-sm font-semibold text-[#161B2C]">Order #1847</p>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-[11px] sm:text-xs text-[#5E656E]">Repeat rate</p>
          <p className="text-sm font-bold text-[#00B872]">+68%</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-[11px] sm:text-xs text-[#5E656E]">LTV Growth</p>
          <p className="text-sm font-bold text-[#00B872]">3.2x</p>
        </div>
      </div>
    </div>
  )
}

import { AOSReveal, TextReveal, GradientText } from "@/components/animation/AOSReveal"

export function SecondSale() {
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="trust-journey" className="relative isolate overflow-hidden bg-[#F8FAFC] py-16 sm:py-24 lg:py-32">
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-24 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full bg-blue-100/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <AOSReveal animation="fade-up" delay={0}>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.2] text-[#0F172A] tracking-tight">
              The second sale <br className="hidden sm:block" />
              is won <GradientText gradient="from-[#2648A6] via-[#61A6F9] to-[#2648A6]">during delivery.</GradientText>
            </h2>
          </AOSReveal>
          <AOSReveal animation="fade-up" delay={150}>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#5E656E]">
              Winning the first order takes marketing. Winning the second depends on
              what happens after checkout. Moova keeps customers informed from
              pickup to delivery, turning every order into a reason to buy again.
            </p>
          </AOSReveal>
        </div>

        {/* Stats bar */}
        <div className="mt-10 sm:mt-14">
          <StatsBar />
        </div>

        {/* Three moments */}
        <div className="mt-16 sm:mt-28 text-center">
          <TextReveal
            as="h3"
            text="Three Moments. One Trust Journey."
            delay={0}
            staggerDelay={50}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191B1F] tracking-tight"
          />
          <AOSReveal animation="fade-up" delay={120}>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm font-regular  text-[#5E656E]">
              Every first-time buyer goes through these three moments. Moova makes
              sure each one builds confidence instead of uncertainty.
            </p>
          </AOSReveal>
        </div>

        <div
          ref={cardsRef}
          className={`mt-8 sm:mt-12 grid gap-6 md:grid-cols-3 md:items-stretch transition-all duration-500 ease-out ${cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
        >
          <MomentCard
            eyebrow="01 / The First Click"
            eyebrowClassName="text-blue-700"
            title="Winning the Customer"
            description="Months of marketing paid off — a first-time buyer just placed an order. The relationship begins. What happens in the next hour determines whether they return."
          >
            <FirstClickMock />
          </MomentCard>

          <MomentCard
            eyebrow="02 / The Decisive Moment"
            eyebrowClassName="text-blue-700"
            badge="Key Moment"
            highlighted
            title="Building Trust During Delivery"
            description="Customers receive real-time SMS updates, rider tracking, and delivery progress automatically. Instead of wondering where their order is, they stay informed every step of the journey."
          >
            <DecisiveMomentMock />
          </MomentCard>

          <MomentCard
            title="Earning the Next Order"
            description="A transparent delivery experience creates confidence. Confident customers come back, recommend your business, and become loyal buyers."
          >
            <LoyaltyLoopMock />
          </MomentCard>
        </div>

        {/* CTA banner */}
        <div className="mt-14 sm:mt-20 overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#2648A6] via-[#3A67C2] to-[#61A6F9] px-5 py-10 sm:px-16 md:py-20 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold  text-[#FFFFFF]">
            Make Every Delivery Your Next Sale.
          </h3>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl  font-regular  text-sm sm:text-base text-[#FFFFFF]/85">
            Every delivery is a chance to build trust, reduce customer anxiety,
            and turn first-time buyers into loyal customers with Moova.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-white px-8 sm:px-10 text-[#2648A6] font-semibold  shadow-lg shadow-blue-950/20 hover:bg-white/90 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
            >
              Chat With Us to Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full border-white/50 bg-white/5 px-8 sm:px-10 text-[#FFFFFF] backdrop-blur-xs hover:bg-white/15 hover:border-white/80 hover:text-[#FFFFFF] active:scale-[0.98] transition-all cursor-pointer"
            >
              Watch Product Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}