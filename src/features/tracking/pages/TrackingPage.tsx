import { useState, useEffect, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom"
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
  createdBy: "",
  pickup: { label: "pickup", address: "Loading...", meta: "Pickup address", coordinates: DEFAULT_COORDS },
  dropoff: { label: "dropoff", address: "Loading...", meta: "Drop-off address", coordinates: [-6.745, 39.284] },
  driverName: "Not assigned",
  vehicle: "-",
  plate: "-",
  paymentMethod: "Cash on delivery",
  requestedByLine: "-",
}

interface RawDriverData {
  full_name?: string
  name?: string
  username?: string
  first_name?: string
  phone_number?: string
  phone?: string
  vehicle?: string
  license_plate?: string
  plate_number?: string
  plate?: string
  rating?: number
  latitude?: number
  longitude?: number
}

function parseDriver(data: any): {
  name: string
  phone?: string
  vehicle?: string
  plate?: string
  rating?: number
  location?: [number, number]
} | null {
  if (!data) return null
  const d: RawDriverData | null =
    data.assigned_driver ||
    data.driver ||
    data.driver_info ||
    (data.assigned_driver_name
      ? {
          full_name: data.assigned_driver_name,
          phone_number: data.assigned_driver_phone,
        }
      : null)

  if (!d) return null

  const name = d.full_name || d.name || d.username || d.first_name || ""
  const phone = d.phone_number || d.phone
  const plate = d.license_plate || d.plate_number || d.plate
  const vehicle = d.vehicle
  const rating = typeof d.rating === "number" ? d.rating : undefined
  const location: [number, number] | undefined =
    d.latitude != null && d.longitude != null
      ? [Number(d.latitude), Number(d.longitude)]
      : data.driver_latitude != null && data.driver_longitude != null
        ? [Number(data.driver_latitude), Number(data.driver_longitude)]
        : undefined

  if (!name && !phone && !plate) return null

  return { name: name || "Assigned Driver", phone, vehicle, plate, rating, location }
}

function parseEtaMinutes(data: any): number | undefined {
  if (data?.remaining_time && typeof data.remaining_time === "string") {
    const match = data.remaining_time.match(/(\d+)\s*min/i)
    if (match) return parseInt(match[1], 10)
    const hourMatch = data.remaining_time.match(/(\d+)\s*hour/i)
    if (hourMatch) return parseInt(hourMatch[1], 10) * 60
  }
  const estTime = data?.pricing?.estimated_delivery_time || data?.estimated_delivery_time
  if (estTime) {
    const diff = (new Date(estTime).getTime() - Date.now()) / 60000
    if (diff > 0) return Math.round(diff)
  }
  return undefined
}

function parseShopName(data: any): string | undefined {
  if (!data) return undefined

  const rawValues = [
    data.created_by,
    data.business_name,
    data.shop_name,
    data.merchant_name,
    data.store_name,
    data.shop,
    data.merchant,
    data.sme,
    data.created_by_sme,
  ]

  for (const item of rawValues) {
    if (!item) continue
    if (typeof item === "string") {
      const trimmed = item.trim()
      if (trimmed && !/^moova\s*merchant$/i.test(trimmed) && !/^merchant$/i.test(trimmed)) {
        return trimmed
      }
    } else if (typeof item === "object") {
      const nested =
        item.business_name ||
        item.shop_name ||
        item.name ||
        item.full_name ||
        item.sme_profile?.business_name ||
        item.username
      if (typeof nested === "string" && nested.trim() && !/^moova\s*merchant$/i.test(nested.trim())) {
        return nested.trim()
      }
    }
  }

  // If pickup_address is a named location/shop (not a plus-code or street number)
  if (data.pickup_address && typeof data.pickup_address === "string") {
    const firstPart = data.pickup_address.split(",")[0].trim()
    if (firstPart && !/^[A-Z0-9]{4}\+[A-Z0-9]{2,}/i.test(firstPart) && !/^\d+\s+/i.test(firstPart)) {
      return firstPart
    }
  }

  return undefined
}

export function TrackingPage() {
  const { orderNumber: paramOrderNumber } = useParams<{ orderNumber?: string }>()
  const [searchParams] = useSearchParams()
  const initialOrder = paramOrderNumber || searchParams.get("orderNumber") || ""

  const [result, setResult] = useState<TrackingResultType | null>(null)
  const [searchNumber, setSearchNumber] = useState<string>(initialOrder)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (initialOrder) {
      setSearchNumber(initialOrder)
      connectToTracking(initialOrder)
    }

    return () => {
      if (wsRef.current) wsRef.current.close()
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [initialOrder])

  // Smooth focus scroll to map container on result update
  useEffect(() => {
    if (result && resultRef.current) {
      const timer = setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [result !== null])

  function applyTrackingPayload(data: any) {
    const pickupLat = data.pickup_latitude ?? DEFAULT_COORDS[0]
    const pickupLng = data.pickup_longitude ?? DEFAULT_COORDS[1]
    const deliveryLat = data.delivery_latitude ?? -6.745
    const deliveryLng = data.delivery_longitude ?? 39.284

    const driverInfo = parseDriver(data)
    const eta = parseEtaMinutes(data)

    setResult((prev) => {
      const base = prev || MOCK_RESULT
      return {
        ...base,
        status: data.status || base.status,
        driverName: driverInfo ? driverInfo.name : "Not assigned",
        driverPhone: driverInfo?.phone ?? prev?.driverPhone,
        vehicle: driverInfo?.vehicle ?? prev?.vehicle,
        plate: driverInfo?.plate ?? prev?.plate,
        rating: driverInfo?.rating ?? prev?.rating,
        driverLocation: driverInfo?.location ?? prev?.driverLocation,
        createdBy: parseShopName(data) || prev?.createdBy || base.createdBy || "",
        shopPhone: data.shop_phone ?? prev?.shopPhone,
        etaMinutes: eta !== undefined ? eta : base.etaMinutes,
        pickup: {
          ...base.pickup,
          address: data.pickup_address || base.pickup.address,
          coordinates: [pickupLat, pickupLng],
        },
        dropoff: {
          ...base.dropoff,
          address: data.delivery_address || base.dropoff.address,
          coordinates: [deliveryLat, deliveryLng],
        },
      }
    })
  }

  function connectToTracking(trackingNumber: string) {
    if (wsRef.current) {
      wsRef.current.close()
    }
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    setIsSearching(true)
    setSearchError(null)

    // Safety timeout: stop loader if neither REST nor WS returns within 8s
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false)
      setResult((prev) => {
        if (!prev || prev.status === "Connecting...") {
          setSearchError("Search timed out. Please verify your tracking number and try again.")
          return null
        }
        return prev
      })
    }, 8000)

    const envWsUrl = import.meta.env.VITE_WS_API_URL
    let wsBaseUrl = ""

    if (envWsUrl) {
      wsBaseUrl = envWsUrl.endsWith("/") ? envWsUrl.slice(0, -1) : envWsUrl
    } else if (
      window.location.hostname.endsWith(".trycloudflare.com") ||
      window.location.hostname.endsWith(".loca.lt") ||
      window.location.hostname.endsWith(".ngrok-free.dev") ||
      window.location.hostname.endsWith(".ngrok.io")
    ) {
      wsBaseUrl = `wss://${window.location.hostname}`
    } else if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      wsBaseUrl = `ws://${window.location.hostname}:8000`
    } else if (window.location.hostname.includes("canary")) {
      wsBaseUrl = `wss://canary-api.moova.co.tz`
    } else {
      wsBaseUrl = `wss://api.moova.co.tz`
    }

    // 1. FAST REST API INITIAL LOAD: Fetch data immediately for instant map display
    let httpBaseUrl = wsBaseUrl.replace(/^ws:/i, "http:").replace(/^wss:/i, "https:")
    if (httpBaseUrl.endsWith("/")) httpBaseUrl = httpBaseUrl.slice(0, -1)

    fetch(`${httpBaseUrl}/api/v1/orders/track/${encodeURIComponent(trackingNumber)}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found via API")
        return res.json()
      })
      .then((data) => {
        if (data && data.order_number) {
          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
          setIsSearching(false)
          setSearchError(null)
          applyTrackingPayload(data)
        }
      })
      .catch((err) => {
        console.warn("REST tracking load:", err.message)
      })

    // 2. LIVE WEBSOCKET CONNECTION: Real-time driver location and status updates
    const wsUrl = `${wsBaseUrl}/ws/track/${trackingNumber}/`
    console.log("Connecting to WebSocket:", wsUrl)
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("Connected to tracking server")
      ws.send(JSON.stringify({ type: "get_status" }))
      setResult((prev) => prev || { ...MOCK_RESULT, status: "Connected - waiting for data..." })
    }

    ws.onmessage = (event) => {
      let msg: any
      try {
        msg = JSON.parse(event.data)
      } catch {
        return
      }
      console.log("WebSocket message:", msg)

      if (msg.type === "initial_status" || msg.type === "status_update") {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        setIsSearching(false)
        applyTrackingPayload(msg.data)
      } else if (msg.type === "driver_assignment") {
        const driverInfo = parseDriver(msg.data)
        if (driverInfo) {
          setResult((prev) => {
            if (!prev) return null
            return {
              ...prev,
              driverName: driverInfo.name,
              driverPhone: driverInfo.phone ?? prev.driverPhone,
              vehicle: driverInfo.vehicle ?? prev.vehicle,
              plate: driverInfo.plate ?? prev.plate,
              rating: driverInfo.rating ?? prev.rating,
              driverLocation: driverInfo.location ?? prev.driverLocation,
            }
          })
        }
      } else if (msg.type === "order_update") {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        setIsSearching(false)

        if (msg.data?.update_type === "driver_location") {
          setResult((prev) => {
            if (!prev) return null
            return {
              ...prev,
              timestamp: new Date(msg.data.timestamp || Date.now()).toLocaleTimeString(),
              driverLocation: [msg.data.latitude, msg.data.longitude],
            }
          })
        } else {
          const driverInfo = parseDriver(msg.data)
          const eta = parseEtaMinutes(msg.data)
          setResult((prev) => {
            if (!prev) return null
            return {
              ...prev,
              status: msg.data.new_status || msg.data.status || prev.status,
              driverName: driverInfo ? driverInfo.name : prev.driverName,
              driverPhone: driverInfo?.phone ?? prev.driverPhone,
              vehicle: driverInfo?.vehicle ?? prev.vehicle,
              plate: driverInfo?.plate ?? prev.plate,
              rating: driverInfo?.rating ?? prev.rating,
              driverLocation: driverInfo?.location ?? prev.driverLocation,
              createdBy: parseShopName(msg.data) || prev.createdBy,
              etaMinutes: eta !== undefined ? eta : prev.etaMinutes,
            }
          })
        }
      } else if (msg.type === "location_update") {
        if (msg.data?.latitude != null && msg.data?.longitude != null) {
          setResult((prev) => {
            if (!prev) return null
            return {
              ...prev,
              driverLocation: [Number(msg.data.latitude), Number(msg.data.longitude)],
            }
          })
        }
      }
    }

    ws.onerror = (error) => {
      console.warn("WebSocket error:", error)
      // Only set error if REST hasn't populated result
      setResult((prev) => {
        if (!prev) {
          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
          setIsSearching(false)
          setSearchError("Failed to fetch live tracking data. Please verify your tracking ID or try again.")
          return null
        }
        return prev
      })
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
