import instantRider from "@/assets/EverythingYouNeedtoDeliverBetter/instant-rider.png"
import realTimeTracking from "@/assets/EverythingYouNeedtoDeliverBetter/real-time.png"
import customerNotifications from "@/assets/EverythingYouNeedtoDeliverBetter/email.png"
import orderManagement from "@/assets/EverythingYouNeedtoDeliverBetter/management.png"
import deliveryStatus from "@/assets/EverythingYouNeedtoDeliverBetter/status.png"
import businessInsights from "@/assets/EverythingYouNeedtoDeliverBetter/metrics.png"
import bgImage from "@/assets/becomeOne/everything-you-need-bg.png"
import { Card, CardContent } from "@/components/ui/card"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const FEATURES = [
  {
    icon: instantRider,
    title: "Instant Rider Assignment",
    description: "Connect orders with available riders quickly and efficiently.",
  },
  {
    icon: realTimeTracking,
    title: "Real-Time Tracking",
    description: "Know exactly where deliveries are at every stage.",
  },
  {
    icon: customerNotifications,
    title: "Customer Notifications",
    description: "Keep customers informed automatically throughout the delivery journey.",
  },
  {
    icon: orderManagement,
    title: "Order Management Dashboard",
    description: "Manage deliveries from one simple interface.",
  },
  {
    icon: deliveryStatus,
    title: "Delivery Status Updates",
    description: "Track every order from pickup to successful delivery.",
  },
  {
    icon: businessInsights,
    title: "Business Insights",
    description: "Monitor delivery performance and improve operations.",
  },
] as const

export function EverythingYouNeed() {
  return (
    <section
      id="features"
      className="relative isolate overflow-hidden bg-[#1c3b7a] py-16 sm:py-24 lg:py-32"
    >
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 text-center">
        <TextReveal
          as="h2"
          text="Everything You Need to Deliver Better"
          delay={0}
          staggerDelay={50}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        />

        <div className="mt-10 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, description }, i) => (
            <AOSReveal key={title} animation="fade-up" delay={i * 80}>
              <Card
                className="mx-auto flex w-full max-w-full sm:max-w-[370px] min-h-[200px] sm:min-h-[220px] rounded-2xl border border-white/10 bg-white/10 p-0 backdrop-blur-sm shadow-none hover:bg-white/15 transition-colors text-left"
              >
                <CardContent className="flex flex-col gap-3 sm:gap-4 p-6 sm:p-8">
                  <img src={icon} alt="" aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-white/75">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AOSReveal>
          ))}
        </div>
      </div>
    </section>
  )
}