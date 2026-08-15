import { Button } from "@/components/ui/button"
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
    <div className="flex h-[200px] w-[280px] shrink-0 flex-col rounded-2xl bg-[#2F5392] p-5 font-instrument">
      <div className="text-xl">{icon}</div>
      <h3 className="mt-3 text-[12px] font-bold text-white">{title}</h3>
      <p className="mt-2 text-[12px] leading-relaxed text-white/70">{body}</p>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative bg-[#1c3b7a]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-32 lg:grid-cols-2 lg:items-center lg:px-12 lg:pt-40">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 backdrop-blur-sm">
            <div className="flex -space-x-3">
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-blue-300" />
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-amber-300" />
              <span className="h-8 w-8 rounded-full border-2 border-white/40 bg-rose-300" />
            </div>
            <p className="text-sm text-white">
              <span className="font-semibold">Trust by 500+ brands</span>{" "}
              <span className="text-white/70">globally</span>
            </p>
          </div>

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
              size="lg"
              className="rounded-full bg-[#5DD586] px-8 text-brand-foreground hover:bg-brand/90"
            >
              Start Delivering Smarter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/60 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
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

      {/* Notification cards marquee, peeking below the hero's bottom edge */}
      <div className="edge-fade absolute inset-x-0 bottom-0 z-10 translate-y-1/2 overflow-hidden">
        <div className="flex w-max animate-marquee gap-6">
          {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
            <HeroNotificationCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}