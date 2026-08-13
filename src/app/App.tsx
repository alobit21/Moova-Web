import { Header } from "@/components/layout/Header"
import { BecomeOne } from "@/features/landing/sections/BecomeOne"
import { DeliverySpeaks } from "@/features/landing/sections/DeliverySpeaks"
import { EverythingYouNeed } from "@/features/landing/sections/EverythingYouNeed"
import { FAQ } from "@/features/landing/sections/FAQ"
import { Footer } from "@/features/landing/sections/Footer"
import { Hero } from "@/features/landing/sections/Hero"
import { SecondSale } from "@/features/landing/sections/SecondSale"


function App() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Hero />
      <SecondSale />
      <BecomeOne />
      <EverythingYouNeed />


      <DeliverySpeaks />
      <FAQ />

      <Footer/>

    </div>
  )
}

export default App