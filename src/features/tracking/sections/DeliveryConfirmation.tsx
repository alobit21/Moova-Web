import { CheckCircle2 } from "lucide-react"
import deliveryPhoneMockup from "@/assets/tracking/delivery-confirmation-phone.png"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const BENEFITS = [
  "Instant confirmation at the time of delivery",
  "Reduced disputes and order-related issues",
  "Build stronger trust and transparency",
]

export function DeliveryConfirmation() {
  return (
    <section className="bg-white py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <AOSReveal animation="fade-right" delay={0} className="max-w-xl order-first">
            <TextReveal
              as="h2"
              text="Delivery confirmation"
              delay={0}
              staggerDelay={50}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground tracking-tight"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
              Reassure customers the moment their order is delivered with clear
              confirmation via text or email. Reduce customer friction and build trust.
            </p>

            <ul className="mt-5 sm:mt-6 space-y-3">
              {BENEFITS.map((benefit, index) => (
                <AOSReveal key={benefit} animation="fade-up" delay={150 + index * 60} as="li" className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm sm:text-base font-medium text-foreground">{benefit}</span>
                </AOSReveal>
              ))}
            </ul>
          </AOSReveal>

          <AOSReveal animation="fade-left" delay={100} className="flex justify-center order-last">
            <img
              src={deliveryPhoneMockup}
              alt="Delivery confirmation phone mockup"
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain"
            />
          </AOSReveal>
        </div>
      </div>
    </section>
  )
}
