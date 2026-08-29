import { useState } from "react"
import trackingIllustration from "@/assets/tracking/tracking-illustration.png"
import { ParcelSearchForm } from "@/features/tracking/components/ParcelSearchForm"
import type { TrackingResult as TrackingResultType } from "@/features/tracking/types/tracking.types"
import { TrackingResult } from "@/features/tracking/components/TrackingResult"
import { TrackingSpeaks } from "@/features/tracking/sections/TrackingSpeaks"
import { DeliveryConfirmation } from "@/features/tracking/sections/DeliveryConfirmation"
import { CustomerFeedback } from "@/features/tracking/sections/CustomerFeedback"
import { BrandedExperience } from "@/features/tracking/sections/BrandedExperience"
import { FAQ } from "@/features/landing/sections/FAQ"

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
  const [result, setResult] = useState<TrackingResultType | null>(MOCK_RESULT)

  function handleSearch(trackingNumber: string) {
    // TODO: replace with a real API call once the tracking endpoint exists.
    console.log("Searching for parcel:", trackingNumber)
    setResult(MOCK_RESULT)
  }

  return (
    <section className="relative overflow-x-hidden bg-white pb-20 pt-10 sm:pt-14 lg:pt-20">
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
  )
}