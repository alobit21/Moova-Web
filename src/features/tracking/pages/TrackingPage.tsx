import { useState, useEffect, useRef } from "react"
import trackingIllustration from "@/assets/tracking/tracking-illustration.png"
import { ParcelSearchForm } from "@/features/tracking/components/ParcelSearchForm"
import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingResult } from "@/features/tracking/components/TrackingResult"
import { TrackingSpeaks } from "@/features/tracking/sections/TrackingSpeaks"
import { DeliveryConfirmation } from "@/features/tracking/sections/DeliveryConfirmation"
import { CustomerFeedback } from "@/features/tracking/sections/CustomerFeedback"
import { BrandedExperience } from "@/features/tracking/sections/BrandedExperience"
import { FAQ } from "@/features/landing/sections/FAQ"
import { SEO } from "@/components/seo/SEO"
import { Loader } from "@/components/ui/loader"

const DEFAULT_COORDS: [number, number] = [-6.7712, 39.239] // Dar es Salaam fallback

const MOCK_RESULT: TrackingResultType = {
  status: "Connecting...",
  etaMinutes: 0,
  timestamp: new Date().toLocaleString(),
  city: "Dar-es-salaam",
  createdBy: "Moova Merchant",
  pickup: { label: "pickup", address: "Loading...", meta: "Pickup address", coordinates: DEFAULT_COORDS },
  dropoff: { label: "dropoff", address: "Loading...", meta: "Drop-off address", coordinates: [-6.745, 39.284] },
  driverName: "-",
  vehicle: "-",
  plate: "-",
  paymentMethod: "Cash on delivery",
  requestedByLine: "-",
}

export function TrackingPage() {
  const [result, setResult] = useState<TrackingResultType | null>(null)
  const [searchNumber, setSearchNumber] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Check if orderNumber is in URL on load
    const urlParams = new URLSearchParams(window.location.search)
    const orderNum = urlParams.get("orderNumber")
    if (orderNum) {
      setSearchNumber(orderNum)
      connectToTracking(orderNum)
    }

    return () => {
      if (wsRef.current) wsRef.current.close()
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  // Smooth focus scroll to map container on result update
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [result !== null])

  function connectToTracking(trackingNumber: string) {
    if (wsRef.current) {
      wsRef.current.close()
    }
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    setIsSearching(true)
    setSearchError(null)

    // Safety timeout: stop loader if server takes > 6s
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false)
      setResult((prev) => {
        if (!prev || prev.status === "Connecting...") {
          setSearchError("Search timed out. Please verify your tracking number and try again.")
          return null
        }
        return prev
      })
    }, 6000)

    const envWsUrl = import.meta.env.VITE_WS_API_URL
    let wsBaseUrl = ""
    
    if (envWsUrl) {
      wsBaseUrl = envWsUrl.endsWith('/') ? envWsUrl.slice(0, -1) : envWsUrl
    } else if (window.location.hostname.endsWith(".trycloudflare.com") || window.location.hostname.endsWith(".loca.lt") || window.location.hostname.endsWith(".ngrok-free.dev") || window.location.hostname.endsWith(".ngrok.io")) {
      wsBaseUrl = `wss://${window.location.hostname}`
    } else if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      wsBaseUrl = `ws://${window.location.hostname}:8000`
    } else {
      wsBaseUrl = `wss://consumption-minerals-expiration-cached.trycloudflare.com`
    }

    const wsUrl = `${wsBaseUrl}/ws/track/${trackingNumber}/`
    console.log("Connecting to WebSocket:", wsUrl)
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("Connected to tracking server")
      ws.send(JSON.stringify({ type: "get_status" }))
      setResult({ ...MOCK_RESULT, status: "Connected - waiting for data..." })
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      console.log("WebSocket message:", msg)

      if (msg.type === "initial_status") {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        setIsSearching(false)

        setResult((prev) => {
          const base = prev || MOCK_RESULT
          const pickupLat = msg.data.pickup_latitude ?? DEFAULT_COORDS[0]
          const pickupLng = msg.data.pickup_longitude ?? DEFAULT_COORDS[1]
          const deliveryLat = msg.data.delivery_latitude ?? -6.745
          const deliveryLng = msg.data.delivery_longitude ?? 39.284

          return {
            ...base,
            status: msg.data.status,
            driverName: msg.data.driver ? msg.data.driver.username : "Not assigned",
            pickup: {
              ...base.pickup,
              address: msg.data.pickup_address || base.pickup.address,
              coordinates: [pickupLat, pickupLng],
            },
            dropoff: {
              ...base.dropoff,
              address: msg.data.delivery_address || base.dropoff.address,
              coordinates: [deliveryLat, deliveryLng],
            },
          }
        })
      } else if (msg.type === "order_update" && msg.data.update_type === "driver_location") {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        setIsSearching(false)

        setResult((prev) => {
          if (!prev) return null
          return {
            ...prev,
            timestamp: new Date(msg.data.timestamp).toLocaleTimeString(),
            driverLocation: [msg.data.latitude, msg.data.longitude],
          }
        })
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
      setIsSearching(false)
      setSearchError("Failed to fetch tracking data. Please verify your tracking ID or try again.")
      setResult((prev) => prev ? { ...prev, status: "Connection Error" } : null)
    }

    ws.onclose = () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
      setIsSearching(false)
    }
  }

  function handleSearch(trackingNumber: string) {
    setSearchNumber(trackingNumber)
    connectToTracking(trackingNumber)
    const url = new URL(window.location.href)
    url.searchParams.set("orderNumber", trackingNumber)
    window.history.pushState({}, "", url)
  }

  return (
    <>
      <SEO 
        title={searchNumber ? `Moova | Track ${searchNumber}` : "Moova | Parcel Tracking"} 
        description="Track your Moova parcel delivery in real-time."
      />
      <main className="bg-slate-50 min-h-screen">
        <section className="relative overflow-x-hidden pb-16 pt-20 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            
            {/* Header & Search Bar Bar */}
            <div className={`transition-all duration-300 ${result ? "mb-6" : "mb-10"}`}>
              {!result ? (
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm mb-8">
                  <div className="max-w-xl w-full">
                    <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
                      Parcel tracking
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-slate-500">
                      Enter the parcel tracking number starting with &apos;MOV-&apos;.
                    </p>
                    <div className="mt-4">
                      <ParcelSearchForm onSearch={handleSearch} initialValue={searchNumber} isLoading={isSearching} />
                    </div>

                    {searchError && (
                      <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs sm:text-sm text-rose-700 font-medium">
                        {searchError}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center md:justify-end shrink-0">
                    <img
                      src={trackingIllustration}
                      alt="Parcel tracking illustration"
                      className="w-36 sm:w-48 lg:w-56 h-auto object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                      Live Delivery Tracking
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                      Tracking ID: <span className="font-semibold text-slate-800">{searchNumber}</span>
                    </p>
                  </div>
                  <div className="w-full sm:max-w-md">
                    <ParcelSearchForm onSearch={handleSearch} initialValue={searchNumber} isLoading={isSearching} />
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Loader when searching without prior result */}
            {isSearching && !result && (
              <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-sm mb-16 flex justify-center">
                <Loader
                  show={isSearching}
                  size="lg"
                  text={`Locating parcel ${searchNumber || '...'}`}
                  subtext="Connecting to Moova real-time delivery network..."
                />
              </div>
            )}

            {/* FIRST PRIMARY SECTION: 75% Viewport Live Map & Details */}
            {result ? (
              <div ref={resultRef} className="relative w-full mb-16 transition-all duration-500 rounded-3xl overflow-hidden">
                <Loader
                  overlay
                  show={isSearching}
                  size="lg"
                  text={`Updating status for ${searchNumber}...`}
                  subtext="Fetching live route and driver updates..."
                />
                <TrackingResult result={result} />
              </div>
            ) : null}
          </div>

          {/* ALL LANDING SECTIONS RETAINED & DISPLAYED BELOW MAP */}
          <TrackingSpeaks />
          <DeliveryConfirmation />
          <CustomerFeedback />
          <BrandedExperience />
          <FAQ />
        </section>
      </main>
    </>
  )
}