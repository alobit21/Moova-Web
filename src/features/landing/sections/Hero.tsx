import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import heroBg from "@/assets/hero-bg.png"
import phoneMockup from "@/assets/phone-mockup.png"
import { DELIVERY_NOTIFICATIONS } from "../data/notifications"

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
    <Card className="flex h-[160px] w-[265px] shrink-0 rounded-2xl border border-white/10 bg-[#254685]/80 p-0 font-instrument shadow-none backdrop-blur-xs">
      <CardContent className="flex flex-col p-4 sm:p-5">
        <div className="text-xl">{icon}</div>
        <h3 className="mt-2.5 text-xs font-bold text-white sm:text-[13px]">{title}</h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/70 line-clamp-3">{body}</p>
      </CardContent>
    </Card>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#1c3b7a] pb-12 pt-32 lg:pb-16 lg:pt-40">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <div className="max-w-xl">
          <Badge variant="secondary" className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 backdrop-blur-sm border-0 font-normal">
            <div className="flex -space-x-3">
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-blue-300" />
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-amber-300" />
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-rose-300" />
            </div>
            <p className="text-sm text-white">
              <span className="font-semibold">Trust by 150+ brands</span>
            </p>
          </Badge>

          <h1 className="text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Every Delivery Builds Customer Trust.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Winning a customer's first order is hard. Keeping their trust is
            even harder. Moova helps online businesses manage deliveries with
            real-time visibility that turns first-time buyers into loyal
            customers.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              className="h-12 sm:h-14 rounded-full bg-[#5DD586] px-8 sm:px-10 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-950/20 hover:bg-[#4ed079] transition-all"
            >
              Start Delivering Smarter
            </Button>
            <Button
              variant="outline"
              className="h-12 sm:h-14 rounded-full border-white/50 bg-white/5 px-8 sm:px-10 text-base font-semibold text-white backdrop-blur-xs hover:bg-white/15 hover:border-white/80 hover:text-white transition-all"
            >
              Watch Product Demo
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <img
            src={phoneMockup}
            alt="Moova app showing shop performance and current deliveries"
            className="w-full max-w-md drop-shadow-2xl lg:max-w-lg"
          />
        </div>
      </div>

      {/* Marquee cards inside hero section */}
      <div className="relative z-10 mt-14 overflow-hidden edge-fade lg:mt-20">
        <div className="flex w-max animate-marquee gap-5">
          {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
            <HeroNotificationCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}