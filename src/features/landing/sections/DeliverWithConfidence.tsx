import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ctaBackground from "@/assets/cta/cta-background.png"

export function DeliverWithConfidence() {
  return (
    <section
      className="relative bg-cover bg-center py-16 sm:py-24"
      style={{ backgroundImage: `url(${ctaBackground})` }}
    >
      {/* Dark overlay for extra contrast on small mobile screens */}
      <div className="absolute inset-0 bg-slate-950/40 lg:bg-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
            Ready to Deliver With Confidence?
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/80">
            Join the growing community of online businesses using Moova to
            manage deliveries, keep customers informed, and build trust with
            every order. From rider assignment to real-time tracking and
            delivery analytics, everything you need is in one place.
          </p>

          <Button
            size="lg"
            className="mt-8 sm:mt-10 w-full sm:w-auto rounded-full bg-[#5DD586] px-8 sm:px-10 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-950/20 hover:bg-[#4ed079] transition-all gap-2 cursor-pointer"
          >
            Start Delivering Better
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}