import { TrackingResultPanel } from "@/features/tracking/components/TrackingResultPanel"
 import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingMap } from "./TrackingMapPlaceholder"


export function TrackingResult({ result }: { result: TrackingResultType }) {
  return (
    <div className="relative z-0 isolate grid w-full overflow-hidden rounded-l-2xl border border-r-0 border-slate-200 shadow-sm min-h-[580px] lg:h-[650px] lg:grid-cols-[380px_1fr]">
      <TrackingResultPanel result={result} />
      <div className="relative z-0 isolate h-[400px] w-full lg:h-full">
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