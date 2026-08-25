import { TrackingResultPanel } from "@/features/tracking/components/TrackingResultPanel"
import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingMap } from "./TrackingMapPlaceholder"

export function TrackingResult({ result }: { result: TrackingResultType }) {
  return (
    <div className="relative isolate flex flex-col md:grid md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Map: Top on mobile, right column on desktop */}
      <div className="order-first md:order-last relative h-[320px] sm:h-[400px] md:h-full w-full min-h-[300px] md:min-h-[550px] bg-slate-100">
        <TrackingMap
          pickup={result.pickup.coordinates}
          dropoff={result.dropoff.coordinates}
          pickupLabel={result.pickup.address}
          dropoffLabel={result.dropoff.address}
        />
      </div>

      {/* Details Panel: Bottom on mobile, left column on desktop */}
      <div className="order-last md:order-first w-full bg-white border-t md:border-t-0 md:border-r border-slate-100">
        <TrackingResultPanel result={result} />
      </div>
    </div>
  )
}