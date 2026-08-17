import { TrackingResultPanel } from "@/features/tracking/components/TrackingResultPanel"
 import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingMap } from "./TrackingMapPlaceholder"


export function TrackingResult({ result }: { result: TrackingResultType }) {
  return (
    <div className="mt-12 grid overflow-hidden rounded-2xl border border-slate-200 shadow-sm lg:grid-cols-[380px_1fr]">
      <TrackingResultPanel result={result} />
        <div className="h-72 lg:h-auto">
        <TrackingMap
          pickup={result.pickup.coordinates}
          dropoff={result.dropoff.coordinates}
          pickupLabel={result.pickup.address}
          dropoffLabel={result.dropoff.address}
        />
      </div>
    </div>
  )
}