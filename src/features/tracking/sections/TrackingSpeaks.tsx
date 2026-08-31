import { Gem, MapPin, Bell, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSectionVisibility } from "@/hooks/useInView"
import { DELIVERY_NOTIFICATIONS } from "@/features/landing/data/notifications"

const BADGES = [
  { icon: Gem, label: "Live updates on orders", className: "text-purple-600" },
  { icon: MapPin, label: "Highly rated riders", className: "text-emerald-600" },
  { icon: Bell, label: "24/7 support for customers and vendors", className: "text-rose-500" },
  { icon: Zap, label: "Quick and easy onboarding", className: "text-amber-500" },
] as const



function NotificationCard({
  icon,
  title,
  body,
}: {
  icon: string
  title: string
  body: string
}) {
  return (
    <Card className="w-[240px] sm:w-[300px] bg-[#FFFFFF] border-0 ring-0 shadow-none p-0">
      <CardContent className="p-5 sm:p-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2">
          <img src={icon} alt="" className="w-full h-full object-contain" />
        </div>
        <h3 className="mt-2.5 text-sm sm:text-base font-bold text-[#2648A6]">{title}</h3>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed font-regular  text-[#5E656E]">{body}</p>
      </CardContent>
    </Card>
  )
}

function BadgePill({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Gem
  label: string
  className: string
}) {
  return (
    <Badge variant="outline" className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2.5 sm:py-3 border-0 ring-0 shadow-none font-normal">
      <Icon className={`h-4 w-4 ${className}`} strokeWidth={2.5} />
      <span className="whitespace-nowrap text-xs sm:text-sm   font-bold text-[#2648A6]">
        {label}
      </span>
    </Badge>
  )
}

export function TrackingSpeaks() {
  const [sectionRef, isVisible] = useSectionVisibility<HTMLElement>()

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F5F9FF] py-14 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight text-[#1F3B89] sm:text-4xl lg:text-5xl tracking-tight">
          Every Delivery Speaks for Your Business
        </h2>
        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-regular  text-[#5E656E]">
          Moova automatically sends delivery updates from order creation to
          successful delivery.
        </p>
      </div>

      <div className="edge-fade relative mt-10 sm:mt-16 overflow-hidden">
        <div className={`flex w-max animate-marquee ${isVisible ? "" : "animation-paused"}`}>
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
              <NotificationCard key={`a-${i}`} {...item} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
              <NotificationCard key={`b-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-6 sm:mt-8 overflow-hidden">
        <div className={`flex w-max animate-marquee-reverse ${isVisible ? "" : "animation-paused"}`}>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {[...BADGES, ...BADGES, ...BADGES, ...BADGES].map((badge, i) => (
              <BadgePill key={`a-${i}`} {...badge} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {[...BADGES, ...BADGES, ...BADGES, ...BADGES].map((badge, i) => (
              <BadgePill key={`b-${i}`} {...badge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
