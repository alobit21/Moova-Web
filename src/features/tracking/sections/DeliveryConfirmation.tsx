import { CheckCircle2 } from "lucide-react"
import deliveryPhoneMockup from "@/assets/tracking/delivery-confirmation-phone.png"

const BENEFITS = [
  "Instant confirmation at the time of delivery",
  "Reduced disputes and order-related issues",
  "Build stronger trust and transparency",
]

export function DeliveryConfirmation() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Delivery confirmation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Reassure customers the moment their order is delivered with clear
              confirmation via text or email. This helps reduce uncertainty and
              creates a more reliable customer experience.
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

          <div className="flex justify-center lg:justify-end">
            <img
              src={deliveryPhoneMockup}
              alt="Delivery confirmation phone mockup"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
