import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ctaBackground from "@/assets/cta/cta-background.png"

export function DeliverWithConfidence() {
  return (
    <section
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${ctaBackground})` }}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Ready to Deliver With Confidence?
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Join the growing community of online businesses using Moova to
            manage deliveries, keep customers informed, and build trust with
            every order. From rider assignment to real-time tracking and
            delivery analytics, everything you need is in one place.
          </p>

          <Button
            size="lg"
            className="mt-10 rounded-full bg-[#5DD586] px-8 sm:px-10 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-950/20 hover:bg-[#4ed079] transition-all gap-2"
          >
            Start Delivering Better
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}