import { Routes, Route } from "react-router-dom"
import { TrackingPage } from "@/features/tracking/pages/TrackingPage"
import { Landing } from "./Landing"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  )
}