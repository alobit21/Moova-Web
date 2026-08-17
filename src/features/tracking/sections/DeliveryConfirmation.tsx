import { CheckCircle2, MessageSquare } from "lucide-react"

function DeliveryPhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-slate-900 bg-white shadow-2xl">
        <div className="flex aspect-[9/19] flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-xs font-semibold text-muted-foreground">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
            </div>
          </div>

          <div className="flex-1 bg-slate-50 px-5 py-6">
            <div className="mx-auto w-full max-w-[260px] space-y-4">
              <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">MESSAGES</p>
                    <p className="text-[10px] text-muted-foreground">01:35 PM</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Your order was delivered!
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">Delivery details</p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-slate-900">Order delivered</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">01:35 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-slate-900">On the Way</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">01:25 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-border" />
                      <span className="text-xs text-muted-foreground">Picked up</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">01:20 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-border" />
                      <span className="text-xs text-muted-foreground">Received</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">01:10 PM</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-500 p-5 text-center text-white shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <p className="text-sm font-bold">DELIVERY CONFIRMED</p>
                <p className="mt-1 text-[10px] text-white/80">Your package has arrived safely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BENEFITS = [
  "Instant confirmation at the time of delivery",
  "Reduced disputes and order-related issues",
  "Build stronger trust and transparency",
]

export function DeliveryConfirmation() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Delivery confirmation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Reassure customers the moment their order is delivered with clear
              confirmation via text or email. This helps reduce uncertainty and
              creates a more reliable customer experience.
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

          <div className="flex justify-center lg:justify-end">
            <DeliveryPhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
