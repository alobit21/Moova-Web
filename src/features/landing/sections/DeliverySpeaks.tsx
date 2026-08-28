import {
  ArrowRight,
  ClipboardList,
  Calculator,
  CheckSquare,
  Truck,
  MapPin,
  Mail,
  MessageCircle,
  UserCheck,
  Gift,
  PackageCheck,
  ThumbsUp,
  ShieldCheck,
} from "lucide-react"
import { useSectionVisibility } from "@/hooks/useInView"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const SHOP_STEPS = [
  {
    num: "01",
    title: "Receive Order",
    desc: "Receive and manage orders automatically from your integrated online selling channels.",
    icon: ClipboardList,
  },
  {
    num: "02",
    title: "Get a Quote",
    desc: "Enter pickup, customer, and package details to instantly view localized, competitive delivery rates.",
    icon: Calculator,
  },
  {
    num: "03",
    title: "Confirm Request",
    desc: "Review the automatically calculated logistics data and securely confirm the delivery request.",
    icon: CheckSquare,
  },
  {
    num: "04",
    title: "Trusted Rider",
    desc: "Moova algorithms instantly match and dispatch the most suitable nearby rider and vehicle type.",
    icon: Truck,
  },
  {
    num: "05",
    title: "Track to Door",
    desc: "Track the rider in absolute real-time from pickup directly to the customer's doorstep with proof of delivery.",
    icon: MapPin,
  },
]

const BUYER_STEPS = [
  {
    num: "01",
    title: "Receive Info",
    desc: "Get your detailed delivery credentials and instant, exact estimated times of arrival.",
    icon: Mail,
  },
  {
    num: "02",
    title: "Stay Informed",
    desc: "Receive automatic SMS/Email status milestones without needing to manually ping the seller.",
    icon: MessageCircle,
  },
  {
    num: "03",
    title: "Know Your Rider",
    desc: "Access verified rider profiles, dynamic contact information, and specific vehicle tracking details.",
    icon: UserCheck,
  },
  {
    num: "04",
    title: "Real-Time Tracking",
    desc: "Watch your courier advance node-by-node on a live digital map from the sorting hub to your door.",
    icon: MapPin,
  },
  {
    num: "05",
    title: "Receive Confidently",
    desc: "Confirm reception with an integrated digital signatures system and direct safe-drop notifications.",
    icon: Gift,
  },
]

export function DeliverySpeaks() {
  const [sectionRef] = useSectionVisibility<HTMLElement>()

  return (
    <section ref={sectionRef} className="relative w-full font-instrument">
      {/* Top Part: Online Shop */}
      <div className="bg-[#FFFFFF] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <TextReveal
              as="h2"
              text="Every Delivery Builds Customer Trust"
              delay={0}
              staggerDelay={50}
              className="text-3xl font-extrabold text-[#111827] tracking-tight sm:text-4xl lg:text-5xl"
            />
            <AOSReveal animation="fade-up" delay={150}>
              <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
                Moova keeps customers informed from order to doorstep, turning every
                delivery into a transparent experience that builds confidence, trust,
                and repeat business.
              </p>
            </AOSReveal>
          </div>

          <div className="mt-16 sm:mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1c3b7a]">
                For Online Shop
              </h3>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {SHOP_STEPS.map((step, i) => (
                <AOSReveal key={step.num} animation="fade-up" delay={i * 100}>
                  <div className="flex flex-col h-full rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl sm:text-3xl font-bold text-[#1E56FD]">
                        {step.num}
                      </span>
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#EBF0FF]">
                        <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E56FD]" />
                      </div>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </AOSReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Belt */}
      <div className="hidden sm:block bg-[#ACBDEC] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold">Delivered</span>
            </div>
            <ArrowRight className="h-4 w-4 hidden sm:block opacity-60" />
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold">Customer Feedback</span>
            </div>
            <ArrowRight className="h-4 w-4 hidden sm:block opacity-60" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold">Stronger Trust</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part: Online Buyer */}
      <div className="bg-gradient-to-b from-[#1E3C72] to-[#2A5298] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
              For Online Buyer
            </h3>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BUYER_STEPS.map((step, i) => (
              <AOSReveal key={step.num} animation="fade-up" delay={i * 100}>
                <div className="flex flex-col h-full rounded-2xl bg-[#2F5392] p-5 sm:p-6 shadow-sm border border-white/5 hover:bg-[#345b9f] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {step.num}
                    </span>
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#1c3b7a]/40">
                      <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#22D3EE]" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </AOSReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}