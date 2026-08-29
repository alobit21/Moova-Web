import { CheckCircle2 } from "lucide-react"
import customerFeedbackMockup from "@/assets/tracking/customer-feedback-mockup.png"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const BENEFITS = [
  "Automatic SMS notifications about order progress",
  "Gather ratings and comments immediately after delivery",
  "Strengthen the customer relationship with real-time communication",
]

export function CustomerFeedback() {
  return (
    <section className="bg-slate-50/60 py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <AOSReveal animation="fade-right" delay={0} className="flex justify-center order-first">
            <img
              src={customerFeedbackMockup}
              alt="Customer feedback mockup"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
            />
          </AOSReveal>

          <AOSReveal animation="fade-left" delay={100} className="max-w-xl order-last">
            <TextReveal
              as="h2"
              text="Customer feedback & notifications"
              delay={0}
              staggerDelay={50}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground tracking-tight"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[#5E656E]">
              Gather ratings and comments immediately after delivery to strengthen
              relationships with real-time customer data.
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
        </div>
      </div>
    </section>
  )
}
