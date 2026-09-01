import { useState, useEffect } from "react"
import { Maximize2, X, MapPin, Navigation, Clock } from "lucide-react"
import brandLogo from "@/assets/logo/logo.png"
import { TrackingResultPanel } from "@/features/tracking/components/TrackingResultPanel"
import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingMap } from "./TrackingMapPlaceholder"
import { Badge } from "@/components/ui/badge"

export function TrackingResult({ result }: { result: TrackingResultType }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

  return (
    <>
      {/* Standard In-Page Tracking View (Map covers 75% height) */}
      <div className="relative isolate flex flex-col md:grid md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl min-h-[75vh]">
        {/* Map Section */}
        <div className="order-first md:order-last relative h-[65vh] sm:h-[72vh] md:h-full w-full min-h-[440px] md:min-h-[640px] bg-slate-100">
          {/* Full Screen Modal Trigger Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 z-[400] flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 text-xs font-bold text-slate-800 hover:bg-blue-600 hover:text-white active:scale-95 transition-all cursor-pointer group"
          >
            <Maximize2 className="h-4 w-4 text-blue-600 group-hover:text-white transition-colors" />
            <span>Full Screen Map</span>
          </button>

          <TrackingMap
            pickup={result.pickup.coordinates}
            dropoff={result.dropoff.coordinates}
            pickupLabel={result.pickup.address}
            dropoffLabel={result.dropoff.address}
            driverLocation={result.driverLocation}
          />
        </div>

        {/* Details Panel */}
        <div className="order-last md:order-first w-full bg-white md:border-r border-slate-100 z-10 shadow-2xl md:shadow-none relative rounded-t-3xl md:rounded-none -mt-6 md:mt-0">
          <div className="md:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1" />
          <TrackingResultPanel result={result} />
        </div>
      </div>

      {/* FULL SCREEN MAP MODAL OVERLAY (Covers entire browser window) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] h-screen w-screen bg-slate-900 flex flex-col overflow-hidden animate-in fade-in duration-200">
          {/* Top Modal Navigation Bar with Real Moova Logo */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 text-white shrink-0 z-10">
            <div className="flex items-center gap-3">
              <img
                src={brandLogo}
                alt="Moova Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0"
              />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Moova <span className="font-medium text-slate-400">|</span> Live Map
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-0 text-[10px]">
                    Live
                  </Badge>
                </h2>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Pickup: <span className="text-slate-200 font-medium">{result.pickup.address}</span> → Dropoff: <span className="text-slate-200 font-medium">{result.dropoff.address}</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer active:scale-95"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Close Map</span>
            </button>
          </div>

          {/* Full Window Map Body */}
          <div className="relative flex-1 w-full h-full bg-slate-950">
            <TrackingMap
              pickup={result.pickup.coordinates}
              dropoff={result.dropoff.coordinates}
              pickupLabel={result.pickup.address}
              dropoffLabel={result.dropoff.address}
              driverLocation={result.driverLocation}
            />

            {/* Floating Bottom Card overlay inside Fullscreen Modal */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[500] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Arriving in {result.etaMinutes} mins
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  {result.paymentMethod}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate font-semibold">{result.pickup.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Navigation className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="truncate font-semibold">{result.dropoff.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}