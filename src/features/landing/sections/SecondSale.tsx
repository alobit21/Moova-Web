import type { ReactNode } from "react"
import {
  CheckCircle2,
  LineChart,
  Navigation,
  Package,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const STATS = [
  { icon: Users, value: "2,400+", label: "Businesses onboarded" },
  { icon: CheckCircle2, value: "98.7%", label: "Delivery success rate" },
  { icon: TrendingUp, value: "+68%", label: "Repeat purchase rate" },
  { icon: LineChart, value: "3.2×", label: "Average ROI" },
] as const

function StatsBar() {
  return (
    <Card className="mx-auto max-w-4xl rounded-3xl border-0 shadow-xl shadow-slate-900/5">
      <CardContent className="grid grid-cols-2 gap-y-8 px-6 py-8 sm:grid-cols-4 sm:gap-y-0 sm:px-10">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 border-slate-100 px-2 text-center sm:border-l sm:first:border-l-0"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
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
  eyebrow: string
  eyebrowClassName: string
  badge?: string
  highlighted?: boolean
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card
      className={`flex h-full flex-col gap-6 rounded-3xl p-2 ${
        highlighted
          ? "border-2 border-blue-600 shadow-xl shadow-blue-600/10"
          : "border-slate-100 shadow-sm"
      }`}
    >
      <CardContent className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold tracking-wide ${eyebrowClassName}`}>
            {eyebrow}
          </span>
          {badge ? (
            <Badge className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white border-0">
              {badge}
            </Badge>
          ) : null}
        </div>

        {children}

        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function FirstClickMock() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-indigo-50/70 p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <Package className="h-5 w-5 text-blue-700" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">Artisan Coffee Blend</p>
          <p className="text-sm font-semibold text-blue-700">$24.99</p>
        </div>
      </div>
      <Button className="w-full rounded-full bg-blue-800 text-white hover:bg-blue-700">
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
          0% { width: 0%; }
          100% { width: 90%; }
        }
        .progress-bar-delivery {
          animation: progress-grow 3.5s ease-in-out infinite alternate;
          animation-delay: -1s;
        }
        .progress-bar-trust {
          animation: progress-grow 4.5s ease-in-out infinite alternate;
          animation-delay: 0s;
        }
      `}</style>
      <div className="flex flex-col gap-5 rounded-2xl border border-blue-100 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <Navigation className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Your rider</p>
              <p className="text-sm font-semibold text-foreground">4 minutes away</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border-0">
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
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Trust level</span>
              <span className="font-semibold text-blue-700">90%</span>
            </div>
            <Progress value={90} className="mt-2 h-2 bg-slate-100" indicatorClassName="progress-bar-trust bg-gradient-to-r from-blue-600 to-emerald-500" />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Delivery progress</span>
              <span className="font-semibold text-blue-700">90%</span>
            </div>
            <Progress value={90} className="mt-2 h-2 bg-slate-100" indicatorClassName="progress-bar-delivery bg-blue-600" />
          </div>
        </div>
      </div>
    </>
  )
}

function LoyaltyLoopMock() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-emerald-50/70 p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        Delivered on time!
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <Package className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">Order #1847</p>
          <div className="mt-0.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/80 p-3">
          <p className="text-xs text-muted-foreground">Repeat rate</p>
          <p className="text-sm font-bold text-emerald-700">+68%</p>
        </div>
        <div className="rounded-xl bg-white/80 p-3">
          <p className="text-xs text-muted-foreground">LTV Growth</p>
          <p className="text-sm font-bold text-emerald-700">3.2x</p>
        </div>
      </div>
    </div>
  )
}

export function SecondSale() {
  return (
    <section id="trust-journey" className="relative isolate overflow-hidden bg-[#F8FAFC] py-24 lg:py-32">
      {/* Ambient background blobs — echoes the reference gradient transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-24 h-[420px] w-[420px] rounded-full bg-blue-100/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
         <h2 className="text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl">
  The second sale <br className="hidden sm:block" />
  is won{" "}
  <span className="bg-gradient-to-r from-[#2648A6] to-[#61A6F9] bg-clip-text text-transparent">
    during delivery.
  </span>
</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Winning the first order takes marketing. Winning the second depends on
            what happens after checkout. Moova keeps customers informed from
            pickup to delivery, turning every order into a reason to buy again.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-14">
          <StatsBar />
        </div>

        {/* Three moments */}
        <div className="mt-28 text-center">
          <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Three Moments. One Trust Journey.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every first-time buyer goes through these three moments. Moova makes
            sure each one builds confidence instead of uncertainty.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
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
            eyebrow="The Loyalty Loop"
            eyebrowClassName="text-emerald-700"
            title="Earning the Next Order"
            description="A transparent delivery experience creates confidence. Confident customers come back, recommend your business, and become loyal buyers."
          >
            <LoyaltyLoopMock />
          </MomentCard>
        </div>

        {/* CTA banner */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-linear-to-r from-[#2648A6] via-[#3A67C2] to-[#61A6F9] px-8 py-16 text-center sm:px-16 md:py-20">
          <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
            Make Every Delivery Your Next Sale.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Every delivery is a chance to build trust, reduce customer anxiety,
            and turn first-time buyers into loyal customers with Moova.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 sm:px-10 text-blue-700 shadow-lg shadow-blue-950/20 hover:bg-white/90 hover:shadow-xl transition-all"
            >
              Get started free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/50 bg-white/5 px-8 sm:px-10 text-white backdrop-blur-xs hover:bg-white/15 hover:border-white/80 hover:text-white transition-all"
            >
              Watch Product Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}