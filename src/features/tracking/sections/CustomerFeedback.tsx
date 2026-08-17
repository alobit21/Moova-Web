import { CheckCircle2 } from "lucide-react"
import customerFeedbackMockup from "@/assets/tracking/customer-feedback-mockup.png"

const BENEFITS = [
  "Automatic SMS notifications about order progress",
  "Gather ratings and comments immediately after delivery",
  "Strengthen the customer relationship with real-time communication",
]

export function CustomerFeedback() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <img
              src={customerFeedbackMockup}
              alt="Customer feedback mockup"
              className="w-full max-w-lg"
            />
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Customer feedback &amp; notifications
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Engage with customers during and after delivery with instant
              feedback requests and timely updates on their order status.
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
