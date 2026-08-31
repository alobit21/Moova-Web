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

const DEFAULT_COORDS: [number, number] = [-6.7924, 39.2083] // Dar es Salaam center fallback

const MOCK_RESULT: TrackingResultType = {
  status: "Connecting...",
  etaMinutes: 0,
  timestamp: new Date().toLocaleString(),
  city: "Dar-es-salaam",
  createdBy: "Moova Merchant",
  pickup: { label: "pickup", address: "Loading...", meta: "Pickup address", coordinates: DEFAULT_COORDS },
  dropoff: { label: "dropoff", address: "Loading...", meta: "Drop-off address", coordinates: [-6.81, 39.28] },
  driverName: "-",
  vehicle: "-",
  plate: "-",
  paymentMethod: "Cash on delivery",
  requestedByLine: "-",
}

export function TrackingPage() {
  const [result, setResult] = useState<TrackingResultType | null>(null)
  const [searchNumber, setSearchNumber] = useState<string>("")
  const wsRef = useRef<WebSocket | null>(null)

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
    }
  }, [])

  function connectToTracking(trackingNumber: string) {
    if (wsRef.current) {
      wsRef.current.close()
    }

    // Try to get WebSocket URL from environment variable, fallback to automatic detection
    const envWsUrl = import.meta.env.VITE_WS_API_URL
    let wsBaseUrl = ""
    
    if (envWsUrl) {
      wsBaseUrl = envWsUrl.endsWith('/') ? envWsUrl.slice(0, -1) : envWsUrl
    } else {
      wsBaseUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `ws://${window.location.hostname}:8000`
        : `wss://moova-api.codemash.co.tz`
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
        setResult((prev) => {
          const base = prev || MOCK_RESULT
          return {
            ...base,
            status: msg.data.status,
            driverName: msg.data.driver ? msg.data.driver.username : "Not assigned",
            pickup: { ...base.pickup, address: msg.data.pickup_address || base.pickup.address },
            dropoff: { ...base.dropoff, address: msg.data.delivery_address || base.dropoff.address },
          }
        })
      } else if (msg.type === "order_update" && msg.data.update_type === "driver_location") {
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
      setResult((prev) => prev ? { ...prev, status: "Connection Error" } : null)
    }
  }

  function handleSearch(trackingNumber: string) {
    setSearchNumber(trackingNumber)
    connectToTracking(trackingNumber)
    // Update URL without reloading page
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
      <main>
        <section className="relative overflow-x-hidden bg-white pb-20 pt-24 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl w-full">
                <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl tracking-tight">
                  Parcel tracking
                </h1>
                <p className="mt-3 text-sm sm:text-basetext-[#5E656E]">
                  Enter the parcel tracking number starts with the letter &apos;M&apos;
                  followed by digits.
                </p>

                <ParcelSearchForm onSearch={handleSearch} />
              </div>

              <div className="flex justify-center md:justify-end shrink-0">
                <img
                  src={trackingIllustration}
                  alt="Parcel tracking illustration"
                  className="w-44 sm:w-56 lg:w-64 h-auto object-contain"
                />
              </div>
            </div>

            {result ? (
              <div className="mt-10 sm:mt-14 w-full">
                <TrackingResult result={result} />
              </div>
            ) : null}
          </div>

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