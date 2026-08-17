import { CheckCircle2 } from "lucide-react"
import brandedExperienceWoman from "@/assets/tracking/branded-experience-woman.png"
import brandedExperiencePhone from "@/assets/tracking/branded-experience-phone.png"

const BENEFITS = [
  "Live updates on driver location and progress",
  "Predictable delivery timing for customers",
  "Fewer 'where is my order?' calls",
]

export function BrandedExperience() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative flex justify-center lg:justify-start">
            <img
              src={brandedExperienceWoman}
              alt="Customer with shopping bags"
              className="w-full max-w-md"
            />
            <img
              src={brandedExperiencePhone}
              alt="Tracking phone mockup"
              className="absolute left-full top-1/2 w-44 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="max-w-xl lg:pl-8">
            <h2 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              20% faster delivery with a branded experience
            </h2>
            <p className="mt-4 text-2xl font-bold text-foreground">
              Real-time delivery tracking
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Give customers full visibility into their order with a live
              tracking link shared via SMS. They&apos;ll always know exactly
              when to expect delivery.
            </p>

            <ul className="mt-8 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-base font-medium text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
