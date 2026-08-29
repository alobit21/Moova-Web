import { BecomeOne } from "@/features/landing/sections/BecomeOne"
import { BuiltForGrowingBusinesses } from "@/features/landing/sections/BuiltForGrowingBusinesses"
import { DeliverWithConfidence } from "@/features/landing/sections/DeliverWithConfidence"
import { DeliverySpeaks } from "@/features/landing/sections/DeliverySpeaks"
import { EverythingYouNeed } from "@/features/landing/sections/EverythingYouNeed"
import { FAQ } from "@/features/landing/sections/FAQ"
import { Hero } from "@/features/landing/sections/Hero"
import { SecondSale } from "@/features/landing/sections/SecondSale"
import { Testimonials } from "@/features/landing/sections/Testimonials"
import { TrackingSpeaks } from "@/features/tracking/sections/TrackingSpeaks"

export function Landing() {
  return (
    <>
      <Hero />
      <SecondSale />
      {/* <DeliveryJourney /> */}
      <DeliverySpeaks />
      <BecomeOne />
      <EverythingYouNeed />
      <BuiltForGrowingBusinesses />
      <TrackingSpeaks />
      <Testimonials />
      <DeliverWithConfidence />
      <FAQ />
    </>
  )
}