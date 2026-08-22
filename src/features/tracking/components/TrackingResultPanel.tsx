import { Link2, Headphones, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { TrackingResult } from "@/features/tracking/types/tracking.types"

const ACTIONS = [
  { icon: Link2, label: "Copy ride" },
  { icon: Headphones, label: "Support" },
  { icon: XCircle, label: "Call Shop" },
] as const

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-1">{children}</div>
      <Separator className="mt-4 bg-slate-100" />
    </div>
  )
}

export function TrackingResultPanel({ result }: { result: TrackingResult }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-6 py-6">
      <Badge variant="secondary" className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border-0">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        Arriving · {result.etaMinutes} min
      </Badge>

      <p className="mt-3 text-lg font-bold text-foreground">{result.timestamp}</p>
      <p className="text-sm text-muted-foreground">{result.city}</p>

      <InfoRow label="Delivery create by:">
        <p className="font-semibold text-foreground">{result.createdBy}</p>
      </InfoRow>

      <InfoRow label="Route">
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <Separator orientation="vertical" className="my-1 h-8 w-px bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div>
              <p className="font-semibold text-foreground">{result.pickup.address}</p>
              <p className="text-sm text-muted-foreground">{result.pickup.meta}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{result.dropoff.address}</p>
              <p className="text-sm text-muted-foreground">{result.dropoff.meta}</p>
            </div>
          </div>
        </div>
      </InfoRow>

      <InfoRow label="Driver">
        <p className="font-semibold text-foreground">{result.driverName}</p>
        <p className="text-sm text-muted-foreground">
          {result.vehicle} · {result.plate}
        </p>
      </InfoRow>

      <InfoRow label="Payment method">
        <p className="font-semibold text-foreground">{result.paymentMethod}</p>
      </InfoRow>

      <p className="pt-4 text-xs text-muted-foreground">{result.requestedByLine}</p>

      <Separator className="mt-6 bg-slate-100" />

      <div className="grid grid-cols-3 gap-2 pt-6">
        {ACTIONS.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            className="flex h-auto flex-col gap-2 rounded-xl py-3 text-xs font-normal text-foreground hover:bg-slate-50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <Icon className="h-5 w-5" />
            </span>
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}