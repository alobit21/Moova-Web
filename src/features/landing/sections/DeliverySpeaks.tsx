import { Bell, Gem, MapPin, Zap } from "lucide-react"
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
    <div className="w-[300px] shrink-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 text-base font-bold text-[#1c3b7a]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
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
    <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
      <Icon className={`h-4 w-4 ${className}`} strokeWidth={2.5} />
      <span className="whitespace-nowrap text-sm font-semibold text-[#1c3b7a]">
        {label}
      </span>
    </div>
  )
}

export function DeliverySpeaks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 to-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="text-4xl font-extrabold leading-tight text-[#1c3b7a] sm:text-5xl">
          Every Delivery Speaks for Your Business
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Customers never have to ask, "Where is my order?" Moova
          automatically sends delivery updates from order creation to
          successful delivery.
        </p>
      </div>

      {/* Notification cards marquee */}
      <div className="edge-fade relative mt-16 overflow-hidden">
        <div className="flex w-max animate-marquee gap-6">
          {[...DELIVERY_NOTIFICATIONS, ...DELIVERY_NOTIFICATIONS].map((item, i) => (
            <NotificationCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Badge pills marquee */}
      <div className="edge-fade relative mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee-reverse gap-4">
          {[...BADGES, ...BADGES, ...BADGES].map((badge, i) => (
            <BadgePill key={i} {...badge} />
          ))}
        </div>
      </div>
    </section>
  )
}