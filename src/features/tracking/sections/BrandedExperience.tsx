import { MapPin, Star, MessageCircle, Mail } from "lucide-react"
import brandedExperienceMockup from "@/assets/tracking/branded-experience.jpeg"
import { AOSReveal, TextReveal, GradientText } from "@/components/animation/AOSReveal"

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
              text="Delight customers with"
              delay={0}
              staggerDelay={50}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight"
            />
            <div className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              <GradientText gradient="from-[#1F3B89] via-[#0D9488] to-[#1F3B89]">
                real-time tracking
              </GradientText>
            </div>
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
            className="flex items-center justify-center rounded-[32px] bg-slate-50/70 p-4 sm:p-8"
          >
            <img
              src={brandedExperienceMockup}
              alt="Delight customers with real-time tracking mockup"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto object-contain rounded-2xl shadow-xs"
            />
          </AOSReveal>
        </div>
      </div>
    </section>
  )
}

function benefitFormatter(text: string) {
  return text
}