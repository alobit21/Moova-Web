import { useState } from "react"
import trackingIllustration from "@/assets/tracking/tracking-illustration.png"
import { ParcelSearchForm } from "@/features/tracking/components/ParcelSearchForm"
import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingResult } from "../components/TrackingResult"

// TODO: remove once the real tracking API is wired up.
const MOCK_RESULT: TrackingResultType = {
  status: "arriving",
  etaMinutes: 9,
  timestamp: "Monday, 24 Jan, 2022 · 9:24",
  city: "Dar-es-salaam",
  createdBy: "Mwanga_Shop_ Collection",
  pickup: { label: "pickup", address: "Veerenni 24, Tallinn", meta: "Pickup address · 09:30, 24 Jan", coordinates: [59.437, 24.753] },
  dropoff: { label: "dropoff", address: "Vana-Lõuna 15, Tallinn", meta: "Drop-off address", coordinates: [59.429, 24.745] },
  driverName: "Mark Pall",
  vehicle: "Volkswagen Passat, Yellow",
  plate: "152 LOP",
  paymentMethod: "Cash on delivery",
  requestedByLine: "Requested by Mwanga_Shop_ Collection · 15:40, 24 Jan, 2022",
}

export function TrackingPage() {
  const [result, setResult] = useState<TrackingResultType | null>(null)

  function handleSearch(trackingNumber: string) {
    // TODO: replace with a real API call once the tracking endpoint exists.
    console.log("Searching for parcel:", trackingNumber)
    setResult(MOCK_RESULT)
  }

  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
              Parcel tracking
            </h1>
            <p className="mt-3 text-muted-foreground">
              Enter the parcel tracking number starts with the letter 'M'
              followed by digits.
            </p>

            <ParcelSearchForm onSearch={handleSearch} />
          </div>

          <img
            src={trackingIllustration}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 hidden w-56 lg:block"
          />
        </div>

        {result ? <TrackingResult result={result} /> : null}
      </div>
    </section>
  )
}