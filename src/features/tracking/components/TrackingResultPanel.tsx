import { useState } from "react"
import { Copy, Check, Headphones, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TrackingResult } from "@/features/tracking/types/tracking.types"

export function TrackingResultPanel({ result }: { result: TrackingResult }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const isDriverAssigned =
    Boolean(result.driverName) &&
    result.driverName !== "Not assigned" &&
    result.driverName !== "-"

  const vehiclePlateInfo = [...new Set([result.vehicle, result.plate])]
    .filter(Boolean)
    .filter((v) => v !== "-")
    .join(" · ")

  return (
    <div className="flex flex-col justify-between bg-white p-4 sm:p-6 ">
      <div className="space-y-4">
        {/* Top Header Badge & COD info */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border-0"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Arriving in {result.etaMinutes ?? 0}min
          </Badge>
          <span className="text-xs font-bold text-slate-800">
            {result.paymentMethod || "COD - Cash on delivery"}
          </span>
        </div>

        {/* Route & Driver details split layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {/* Left Column: Route timeline */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              <div className="my-1 w-0.5 flex-1 min-h-[36px] bg-slate-200" />
              <span className="h-3 w-3 rounded-full bg-[#2648A6] ring-2 ring-indigo-100" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  {result.pickup.address}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {result.pickup.meta}
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  {result.dropoff.address}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {result.dropoff.meta}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Driver & Shop information */}
          <div className="flex flex-col justify-between gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Driver
              </p>
              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                {result.driverName || "Not assigned"}
              </p>
              {isDriverAssigned ? (
                <p className="text-[11px] text-slate-500 font-medium">
                  {vehiclePlateInfo || (result.rating ? `Rating: ${result.rating}★` : "Assigned")}
                </p>
              ) : (
                <p className="text-[11px] text-amber-600 font-medium">
                  Awaiting driver assignment
                </p>
              )}
            </div>

            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Ordered by shop
              </p>
              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                {result.createdBy && !/^moova\s*merchant$/i.test(result.createdBy) ? result.createdBy : "Moova Merchant"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-5 pt-3 grid grid-cols-3 gap-2 border-t border-slate-100">
        <Button
          type="button"
          onClick={handleCopy}
          variant="ghost"
          className="flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-100/80 px-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-0 cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-emerald-600" />
              <span className="truncate text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">Copy ride</span>
            </>
          )}
        </Button>

        <a
          href="tel:0753156659"
          className="flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-100/80 px-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-0 cursor-pointer text-decoration-none"
        >
          <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="truncate">Support</span>
        </a>

        {isDriverAssigned && result.driverPhone ? (
          <a
            href={`tel:${result.driverPhone}`}
            className="flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors border-0 cursor-pointer text-decoration-none"
          >
            <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Call Driver</span>
          </a>
        ) : (
          <a
            href={result.shopPhone ? `tel:${result.shopPhone}` : "tel:0753156659"}
            className="flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-100/80 px-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-0 cursor-pointer text-decoration-none"
          >
            <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Call Shop</span>
          </a>
        )}
      </div>
    </div>
  )
}
