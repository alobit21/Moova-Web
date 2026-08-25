import { Navigation, Headphones, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { TrackingResult } from "@/features/tracking/types/tracking.types"

const ACTIONS = [
  { icon: Navigation, label: "Direction" },
  { icon: Headphones, label: "Support" },
  { icon: PhoneCall, label: "Call Driver" },
] as const

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-2.5">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}

export function TrackingResultPanel({ result }: { result: TrackingResult }) {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-5 sm:p-7">
      <div className="space-y-3.5">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="secondary" className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Parcel on the way
          </Badge>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            COD · Cash on delivery
          </span>
        </div>

        {/* ETA & Status */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Arriving in {result.etaMinutes} min
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {result.timestamp} · {result.city}
          </p>
        </div>

        <Separator className="bg-slate-100" />

        {/* Created By */}
        <InfoRow label="Delivery created by">
          <p className="font-bold text-slate-900 text-sm sm:text-base">{result.createdBy}</p>
        </InfoRow>

        <Separator className="bg-slate-100" />

        {/* Route */}
        <div className="py-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Route</p>
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <div className="my-1 w-0.5 flex-1 min-h-[30px] bg-slate-200 border-dashed border-l border-slate-300" />
              <span className="h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="font-bold text-slate-900 text-sm">{result.pickup.address}</p>
                <p className="text-xs text-slate-500 font-medium">{result.pickup.meta}</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{result.dropoff.address}</p>
                <p className="text-xs text-slate-500 font-medium">{result.dropoff.meta}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        {/* Driver */}
        <InfoRow label="Driver">
          <p className="font-bold text-slate-900 text-sm sm:text-base">{result.driverName}</p>
          <p className="text-xs text-slate-500 font-medium">
            {result.vehicle} · {result.plate}
          </p>
        </InfoRow>

        <p className="text-[11px] text-slate-400 font-medium pt-1">
          {result.requestedByLine}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
        {ACTIONS.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            className="flex h-auto flex-col items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs text-slate-700">
              <Icon className="h-4 w-4" />
            </span>
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}