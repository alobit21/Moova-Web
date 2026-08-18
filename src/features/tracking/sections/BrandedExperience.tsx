import { Check } from "lucide-react"
import brandedExperienceMockup from "@/assets/tracking/branded-experience.jpeg"

const BENEFITS = [
  "Live updates on driver location and progress",
  "Predictable delivery timing for customers",
  'Fewer "where is my order?" calls',
]

export function BrandedExperience() {
  return (
    <section className="bg-wwhite  py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top: centered headline */}
        <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold leading-tight text-instrument sm:text-5xl">
          20% faster delivery with a branded experience
        </h2>

        {/* Below: two columns */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={brandedExperienceMockup}
              alt="Customer checking her delivery status on the Moova tracking screen"
              className="w-full max-w-md rounded-2xl "
            />
          </div>

          {/* Right: text */}
          <div className="max-w-xl">
            <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Real-time delivery tracking
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Give customers full visibility into their order with a live
              tracking link shared via SMS. They&apos;ll always know exactly
              when to expect delivery.
            </p>

            <ul className="mt-8 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                  </span>
                  <span className="text-base font-medium text-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}