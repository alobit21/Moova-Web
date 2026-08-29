import {
  ShoppingBag,
  Package,
  PackageCheck,
  Motorbike,
  PackageSearch,
  MessageCircle,
  UserCheck,
  MapPin,
  Gift,
  ArrowRight,
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
    icon: ShoppingBag,
  },
  {
    num: "02",
    title: "Get a Quote",
    desc: "Enter pickup, customer, and package details to instantly view localized, competitive delivery rates.",
    icon: Package,
  },
  {
    num: "03",
    title: "Confirm Request",
    desc: "Review the automatically calculated logistics data and securely confirm the delivery request.",
    icon: PackageCheck,
  },
  {
    num: "04",
    title: "Trusted Rider",
    desc: "Moova algorithms instantly match and dispatch the most suitable nearby rider and vehicle type.",
    icon: Motorbike,
  },
  {
    num: "05",
    title: "Track to Door",
    desc: "Track the rider in absolute real-time from pickup directly to the customer's doorstep with proof of delivery.",
    icon: PackageSearch,
  },
]

const BUYER_STEPS = [
  {
    num: "01",
    title: "Receive Info",
    desc: "Get your detailed delivery credentials and instant, exact estimated times of arrival.",
    icon: Package,
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
              className="text-3xl font-bold text-[#0F172A] tracking-tight sm:text-4xl lg:text-5xl"
            />
            <AOSReveal animation="fade-up" delay={150}>
              <p className="mx-auto mt-4 max-w-2xl text-base  text-[#5E656E] sm:text-lg">
                Moova keeps customers informed from order to doorstep, turning every
                delivery into a transparent experience that builds confidence, trust,
                and repeat business.
              </p>
            </AOSReveal>
          </div>

          <div className="mt-16 sm:mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider text-[#2648A6]">
                For Online Shop
              </h3>
              <div className="h-px flex-1  text-[#E2E8F0]"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {SHOP_STEPS.map((step, i) => (
                <AOSReveal key={step.num} animation="fade-up" delay={i * 100}>
                  <div className="flex flex-col h-full rounded-2xl border border-gray-100 bg-[#FFFFFF] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl sm:text-3xl font-bold font-sans text-[#2648A6]">
                        {step.num}
                      </span>
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#EBF0FF]">
                        <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#2648A6]" />
                      </div>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-sans text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm  text-[#5E656E] leading-relaxed">
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
      <div className="hidden sm:block bg-[#ACBDEC] py-6 sm:py-8 mb-[40px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base text-[#FFFFFF] font-bold">Delivered</span>
            </div>
            <ArrowRight className="h-4 w-4 hidden sm:block opacity-60" />
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base text-[#FFFFFF] font-bold">Customer Feedback</span>
            </div>
            <ArrowRight className="h-4 w-4 hidden sm:block opacity-60" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base text-[#FFFFFF] font-bold">Stronger Trust</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part: Online Buyer */}
      <div className="bg-gradient-to-b from-[#1E3C72] to-[#2A5298] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
              For Online Buyer
            </h3>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BUYER_STEPS.map((step, i) => (
              <AOSReveal key={step.num} animation="fade-up" delay={i * 100}>
                <div className="flex flex-col h-full rounded-2xl bg-[#2F5392] p-5 sm:p-6 shadow-sm border border-white/5 hover:bg-[#345b9f] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-[#EAEEFA]">
                      {step.num}
                    </span>
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#1c3b7a]/40">
                      <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#22D3EE]" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base   font-sans  font-bold text-[#F8FAFC] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-regular font-sans">
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