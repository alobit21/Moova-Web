import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Package,
  PackagePlus,
  UserCheck,
  Truck,
  Heart,
  ShoppingCart,
  CheckCircle2,
  User,
  MapPinned,
  PackageCheck,
  Star,
  Phone,
  MessageCircle,
  Navigation,
  ShieldCheck,
  ThumbsUp,
  Camera,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const STEP_INTERVAL_MS = 5000

type StepDef = {
  icon: LucideIcon
  title: string
  description: string
  isPlaceholder?: boolean
  panel: React.ReactNode
}

function OrderInboxPanel() {
  const orders = [
    { initials: "AK", name: "Amara Kimsey", items: "1x Artisan Ceramic Mug, 2x Woven R...", status: "Ready to Ship", statusClass: "bg-emerald-100 text-emerald-500" },
    { initials: "NO", name: "Ngozi Okeke", items: "1x Seashore Bedding Set (Queen)", status: "New Order", statusClass: "bg-amber-100 text-amber-700", highlight: true },
    { initials: "DL", name: "Daniel Lawson", items: "2x Twins Espresso Cups", status: "Pending", statusClass: "bg-slate-100 text-slate-600" },
  ]
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Receive Customer Order</h3>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wide text-muted-foreground">Order Inbox</span>
          <span className="font-semibold text-emerald-500">3 New Alerts</span>
        </div>
        <div className="mt-4 flex flex-col divide-y divide-border">
          {orders.map((o) => (
            <div
              key={o.name}
              className={`flex items-center gap-3 py-3 ${o.highlight ? "rounded-lg border border-amber-300 bg-amber-50 px-3" : ""}`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-slate-900">
                {o.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{o.name}</p>
                <p className="truncate text-xs text-muted-foreground">{o.items}</p>
              </div>
              <Badge
                variant="secondary"
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold border-0 ${o.statusClass}`}
              >
                {o.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CreateDeliveryPanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Create Delivery</h3>
          <Badge variant="secondary" className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 border-0">
            DRAFT
          </Badge>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Pickup Location</p>
            <Input readOnly value="67A Lugard Road, Ikoyi" className="mt-1" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Drop-off Address</p>
            <Input readOnly value="11 Ibile Close, Ogunyanya" className="mt-1" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Package Specifications</p>
              <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-emerald-100 px-3 py-2 text-sm">
              <span className="font-medium text-foreground">media.png</span>
              <span className="text-muted-foreground">84.8 KB</span>
            </div>
          </div>
          <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
            Create &amp; Assign Rider
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TrackDeliveryPanel() {
  return (
    <Card className="w-full max-w-md overflow-hidden border-0 shadow-xl">
      <CardContent className="p-0">
        <div className="relative h-56 bg-teal-100">
          <svg viewBox="0 0 300 220" className="h-full w-full">
            <path
              d="M40 30 C 60 80, 120 60, 140 120 S 220 160, 250 190"
              fill="none"
              stroke="#0F172A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="40" cy="30" r="6" fill="#0F172A" />
          </svg>
          <div className="absolute left-[44%] top-[48%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <Truck className="h-4 w-4 text-slate-900" />
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
            <Package className="h-4 w-4 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Order #28492</p>
            <p className="text-sm font-bold text-foreground">Tracking Active</p>
            <Progress value={66} className="mt-1.5 h-1.5 w-full bg-muted" indicatorClassName="bg-emerald-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AssignRiderPanel() {
  const riders = [
    { name: "Salvatory Yonah", rating: 4.8, trips: 940, vehicle: "Honda CB 125", selected: true },
    { name: "Grace Mwakalinga", rating: 4.9, trips: 1120, vehicle: "TVS Star" },
    { name: "Ibrahim Suleiman", rating: 4.7, trips: 615, vehicle: "Bajaj Boxer" },
  ]
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Assign a Trusted Rider</h3>
        <p className="mt-1 text-xs text-muted-foreground">3 riders available nearby</p>
        <div className="mt-4 flex flex-col gap-2">
          {riders.map((r) => (
            <div
              key={r.name}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                r.selected ? "border-emerald-500 bg-emerald-100" : "border-border"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{r.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {r.rating} &middot; {r.trips} trips &middot; {r.vehicle}
                </p>
              </div>
              {r.selected ? (
                <Badge className="shrink-0 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white border-0">
                  Assigned
                </Badge>
              ) : (
                <Badge variant="outline" className="shrink-0 rounded-full border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  Select
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function BuildTrustPanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Build Customer Trust</h3>
        <div className="mt-4 rounded-xl bg-slate-900 p-5 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-semibold">Branded Tracking Page</span>
          </div>
          <p className="mt-2 text-xs text-white/70">moova.co.tz/track/MOV-20260414-WGDF</p>
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-xs font-semibold text-white/90">4.9 average rating</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border p-3">
          <ThumbsUp className="h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">92% of customers</span> order again
            after their first delivery.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ReceiveConfirmationPanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-500" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-foreground">Order Confirmed!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Order #MOV-20260414-WGDF has been received
        </p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Item</span>
            <span className="font-semibold text-foreground">Artisan Coffee Blend</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold text-foreground">$24.99</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Est. Delivery</span>
            <span className="font-semibold text-foreground">Today, 2:30 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReceiveConfidencePanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <PackageCheck className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-foreground">Delivered Successfully</h3>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500 bg-emerald-100 p-3">
          <Camera className="h-8 w-8 shrink-0 text-emerald-500" />
          <div>
            <p className="text-sm font-semibold text-foreground">Photo proof attached</p>
            <p className="text-xs text-muted-foreground">Delivered to your doorstep, 2:41 PM</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground">Rate your delivery</p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductOrderPanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Place Your Order</h3>
        <div className="mt-4 rounded-xl bg-teal-100 p-4">
          <p className="text-xs font-semibold text-teal-500">01 / The First Click</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Artisan Coffee Blend</p>
              <p className="text-sm font-semibold text-slate-900">$24.99</p>
            </div>
          </div>
          <Button className="mt-4 w-full bg-emerald-500 text-white hover:bg-emerald-600">Place First Order</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function RiderProfilePanel() {
  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Live Assignment Details</h3>
        <div className="mt-4 rounded-xl bg-teal-100 p-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
            <User className="h-7 w-7" />
          </div>
          <p className="mt-3 text-sm font-bold text-foreground">Emeka Obi</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4.9 (1,240 trips)
          </p>
          <p className="text-xs text-muted-foreground">Honda CB 150 &middot; ABJ-234-KY</p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-emerald-500">
              <Phone className="h-3.5 w-3.5" /> Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1 gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" /> Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LiveTrackingPanel() {
  return (
    <Card className="w-full max-w-md overflow-hidden border-0 shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground">Track in Real Time</h3>
        <div className="relative mt-4 h-48 rounded-xl bg-teal-100">
          <svg viewBox="0 0 300 190" className="h-full w-full">
            <path
              d="M40 20 C 60 70, 110 50, 130 110 S 200 140, 240 170"
              fill="none"
              stroke="#0F172A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="40" cy="20" r="6" fill="#0F172A" />
          </svg>
          <div className="absolute left-[38%] top-[52%] flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
            <Navigation className="h-4 w-4 text-slate-900" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-100 px-3 py-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-semibold text-emerald-500">Delivery safely</span>
        </div>
      </CardContent>
    </Card>
  )
}

const SHOP_STEPS: StepDef[] = [
  {
    icon: Package,
    title: "Receive Customer Order",
    description:
      "New orders arrive instantly in your Moova dashboard whether from your website, Instagram, WhatsApp, or marketplace. Every order is automatically logged with customer details, items, and delivery address ready to go.",
    panel: <OrderInboxPanel />,
  },
  {
    icon: PackagePlus,
    title: "Create Delivery",
    description:
      "Build a delivery in seconds. Fill in pickup and drop-off details, attach package info, and let Moova handle the rest — from rider assignment to real-time tracking, all automated.",
    panel: <CreateDeliveryPanel />,
  },
  {
    icon: UserCheck,
    title: "Assign a Trusted Rider",
    description:
      "Moova matches your delivery with a verified, highly-rated rider nearby — or use your own in-house rider if you prefer. Every rider is tracked and accountable from pickup to drop-off.",
    isPlaceholder: true,
    panel: <AssignRiderPanel/>,
  },
  {
    icon: Truck,
    title: "Track Every Delivery",
    description:
      "Monitor every delivery in real-time from your dashboard. See live GPS tracking, estimated arrival times, and delivery status updates — all in one centralized view so nothing slips through the cracks.",
    panel: <TrackDeliveryPanel />,
  },
  {
    icon: Heart,
    title: "Build Customer Trust",
    description:
      "Every completed delivery strengthens the relationship. Branded tracking pages and automatic status updates turn a one-time buyer into a customer who trusts you enough to order again.",
    isPlaceholder: true,
    panel: <BuildTrustPanel />,
  },
]

const BUYER_STEPS: StepDef[] = [
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    description:
      "Shop your favourite merchants using Moova-connected stores. Browse products, select delivery options, and checkout seamlessly — your order is confirmed and ready to ship in seconds.",
    panel: <ProductOrderPanel />,
  },
  {
    icon: CheckCircle2,
    title: "Receive Instant Confirmation",
    description:
      "The moment your order is placed, you'll get an instant confirmation with your order number and expected delivery window — no waiting around wondering if it went through.",
    isPlaceholder: true,
    panel: <ReceiveConfirmationPanel/>,
  },
  {
    icon: User,
    title: "Know Your Assigned Rider",
    description:
      "See exactly who's delivering your order before they arrive. Get your rider's name, photo, rating, and vehicle details, with one-tap call or message if you need to reach them.",
    panel: <RiderProfilePanel />,
  },
  {
    icon: MapPinned,
    title: "Track in Real Time",
    description:
      "Follow your delivery live on a real-time map. Watch your rider move from pickup to your doorstep with GPS tracking, milestone updates, and accurate ETA — so you always know exactly when to expect your package.",
    panel: <LiveTrackingPanel />,
  },
  {
    icon: PackageCheck,
    title: "Receive with Confidence",
    description:
      "Get notified the moment your order arrives, with delivery confirmation and photo proof when needed. No more wondering — you know exactly when your package is safely in your hands.",
    isPlaceholder: true,
    panel: <ReceiveConfidencePanel/>,
  },
]

export function DeliveryJourney() {
  const [tab, setTab] = useState<"shop" | "buyer">("shop")
  const [activeStep, setActiveStep] = useState(0)

  const steps = tab === "shop" ? SHOP_STEPS : BUYER_STEPS

  useEffect(() => {
    setActiveStep(0)
  }, [tab])

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, STEP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [tab, activeStep, steps.length])

  return (
    <section id="how-it-works" className="bg-[#F8FAFC] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground font-instrument">
            The complete delivery journey{" "}
            <span className="italic text-brand">managed end-to-end</span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg font-normal leading-relaxed text-muted-foreground font-instrument">
            Moova handles everything from the moment an order is placed to the second it arrives
            at the door — so merchants can focus on selling, and customers always know exactly
            where their order is.
          </p>
        </div>

        <Tabs value={tab} onValueChange={(val) => setTab(val as "shop" | "buyer")} className="mx-auto mt-8 sm:mt-10 w-fit">
          <TabsList className="h-auto rounded-full bg-slate-100 p-1 sm:p-1.5 gap-0">
            <TabsTrigger
              value="shop"
              className="rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors data-[state=active]:bg-teal-500 data-[state=active]:text-white data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground border-0"
            >
              Online Shop
            </TabsTrigger>
            <TabsTrigger
              value="buyer"
              className="rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors data-[state=active]:bg-teal-500 data-[state=active]:text-white data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground border-0"
            >
              Online Buyer
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-10 sm:mt-16 grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col">
            {steps.map((step, index) => {
              const isActive = index === activeStep
              const Icon = step.icon
              return (
                <div key={step.title} className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
                        isActive
                          ? "border-emerald-500 bg-emerald-100 text-emerald-500"
                          : index < activeStep
                            ? "border-emerald-500 bg-emerald-100 text-emerald-500"
                            : "border-border bg-white text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                    {index < steps.length - 1 && (
                      <div className="mt-1 h-full min-h-6 w-px flex-1 bg-border" />
                    )}
                  </div>

                  <button
                    onClick={() => setActiveStep(index)}
                    className={`mb-4 sm:mb-6 flex-1 rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                      isActive ? "border-emerald-500 bg-emerald-100/70 shadow-sm" : "border-transparent"
                    }`}
                  >
                    <p
                      className={`text-[11px] sm:text-xs font-bold uppercase tracking-wide ${
                        isActive ? "text-emerald-600" : "text-transparent"
                      }`}
                    >
                      Step {String(index + 1).padStart(2, "0")} &middot; Active
                    </p>
                    <h3 className="mt-0.5 sm:mt-1 text-base sm:text-lg font-bold text-foreground">{step.title}</h3>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="min-h-0 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div key={`${tab}-${activeStep}`} className="w-full max-w-md animate-fade-slide-in">
              {steps[activeStep].panel}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}