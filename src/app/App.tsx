import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Header } from "@/components/layout/Header"
import { AppRoutes } from "@/app/router"
import { Footer } from "@/features/landing/sections/Footer"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    })
  }, [])

  return (
    <div className="relative min-h-screen">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App