import { MapPin, Star, MessageCircle, Mail } from "lucide-react"
import phoneMockup from "@/assets/tracking/phone-mockup.png"
import review1 from "@/assets/tracking/d1.png"
import review2 from "@/assets/tracking/d2.png"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const FEATURES = [
  { icon: MapPin, label: "Live driver tracking" },
  { icon: Star, label: "Instant feedback from customers" },
  { icon: MessageCircle, label: "Text notifications" },
  { icon: Mail, label: 'Fewer "where is my order?" calls' },
] as const

export function BrandedExperience() {
  return (
    <section className="bg-[#FAFCFF] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Headline & Feature List - AOS fade-right */}
          <AOSReveal animation="fade-right" delay={0} className="max-w-xl">
            <TextReveal
              as="h2"
              text="Delight customers with real-time tracking"
              delay={0}
              staggerDelay={50}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight"
            />
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-500 font-normal">
              Give customers full visibility into their order with a live tracking
              link shared via SMS. They&apos;ll always know exactly when to expect
              delivery.
            </p>

            <ul className="mt-8 space-y-4">
              {FEATURES.map(({ icon: Icon, label }, index) => (
                <AOSReveal key={label} animation="fade-up" delay={150 + index * 60} as="li" className="flex items-center gap-3.5">
                  <Icon className="h-5 w-5 shrink-0 text-emerald-500" strokeWidth={2} />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    {benefitFormatter(label)}
                  </span>
                </AOSReveal>
              ))}
            </ul>
          </AOSReveal>

          {/* Right Column: Mockup Image Container - AOS zoom-in */}
          <AOSReveal
            animation="zoom-in"
            delay={150}
            className="flex items-end justify-center rounded-[32px] bg-slate-50/70 pt-8 sm:pt-12 lg:pt-16 overflow-hidden min-h-[400px] lg:min-h-[500px]"
          >
            <div className="relative flex items-end justify-center w-full px-4 sm:px-8 lg:px-12 pb-0">
              {/* Center Phone */}
              <img
                src={phoneMockup}
                alt="Live tracking app"
                className="relative z-10 w-[220px] sm:w-[260px] lg:w-[300px] h-auto object-contain drop-shadow-2xl translate-y-4 sm:translate-y-6"
              />
              
              {/* Left Floating Review (d1) */}
              <img
                src={review1}
                alt="Customer review - very fast"
                className="absolute z-20 left-2 sm:left-4 lg:left-8 top-[62%] -translate-y-1/2 w-[140px] sm:w-[170px] lg:w-[210px] drop-shadow-xl hover:-translate-y-[64%] transition-transform duration-500"
              />
              
              {/* Right Floating Review (d2) */}
              <img
                src={review2}
                alt="Customer review - wonderful delivery"
                className="absolute z-20 right-2 sm:right-4 lg:right-8 top-[28%] -translate-y-1/2 w-[150px] sm:w-[180px] lg:w-[220px] drop-shadow-xl hover:-translate-y-[30%] transition-transform duration-500"
              />
            </div>
          </AOSReveal>
        </div>
      </div>
    </section>
  )
}

function benefitFormatter(text: string) {
  return text
}