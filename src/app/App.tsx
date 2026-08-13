import { Header } from "@/components/layout/Header"
import { BecomeOne } from "@/features/landing/sections/BecomeOne"
import { EverythingYouNeed } from "@/features/landing/sections/EverythingYouNeed"
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

    </div>
  )
}

export default App