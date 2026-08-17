import { Header } from "@/components/layout/Header"
 import { AppRoutes } from "@/app/router"
import { Footer } from "@/features/landing/sections/Footer"

function App() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App