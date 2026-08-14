import { Header } from "@/components/layout/Header"
import { BecomeOne } from "@/features/landing/sections/BecomeOne"
import { BuiltForGrowingBusinesses } from "@/features/landing/sections/BuiltForGrowingBusinesses"
import { DeliverWithConfidence } from "@/features/landing/sections/DeliverWithConfidence"
import { DeliveryJourney } from "@/features/landing/sections/DeliveryJourney"
import { DeliverySpeaks } from "@/features/landing/sections/DeliverySpeaks"
import { EverythingYouNeed } from "@/features/landing/sections/EverythingYouNeed"
import { FAQ } from "@/features/landing/sections/FAQ"
import { Footer } from "@/features/landing/sections/Footer"
import { Hero } from "@/features/landing/sections/Hero"
import { SecondSale } from "@/features/landing/sections/SecondSale"
import { Testimonials } from "@/features/landing/sections/Testimonials"


function App() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Hero />
      <SecondSale />
      <DeliveryJourney />

      <BecomeOne />
      <EverythingYouNeed />
      <BuiltForGrowingBusinesses/>
      <DeliverySpeaks />
      <Testimonials />
      <DeliverWithConfidence />
      <FAQ />


      <Footer/>

    </div>
  )
}

export default App