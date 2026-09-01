import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import { Header } from "@/components/layout/Header"
import { AppRoutes } from "@/app/router"
import { Footer } from "@/features/landing/sections/Footer"
import { ScrollControls } from "@/components/layout/ScrollControls"

function App() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    })
    AOS.refresh()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="relative min-h-screen">
      <Header />
      <AppRoutes />
      <Footer />
      <ScrollControls />
    </div>
  )
}

export default App