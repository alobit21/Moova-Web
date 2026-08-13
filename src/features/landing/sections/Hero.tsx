import { Button } from "@/components/ui/button"
import heroBg from "@/assets/hero-bg.png"
import phoneMockup from "@/assets/phone-mockup.png"

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#1c3b7a]">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-32 lg:grid-cols-2 lg:items-center lg:px-12 lg:pt-40">
        {/* Left column */}
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
              className="rounded-full bg-emerald-500 px-8 text-white hover:bg-emerald-400"
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

        {/* Right column — phone mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <img
            src={phoneMockup}
            alt="Moova app showing shop performance and current deliveries"
            className="w-full max-w-md drop-shadow-2xl lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  )
}