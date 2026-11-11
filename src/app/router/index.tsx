import { Routes, Route } from "react-router-dom"
import { TrackingPage } from "@/features/tracking/pages/TrackingPage"
import { Landing } from "./Landing"
import { NotFoundPage } from "@/features/misc/pages/NotFoundPage"
import { RatePage } from "@/features/rating/pages/RatePage"
import { ReviewPage } from "@/features/rating/pages/ReviewPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/track" element={<TrackingPage />} />
      <Route path="/track/:orderNumber" element={<TrackingPage />} />
      <Route path="/tracking/:orderNumber" element={<TrackingPage />} />
      <Route path="/rate/:token" element={<RatePage />} />
      {/* The short link in the thank-you message; /feedback/:code keeps the links already sent working */}
      <Route path="/r/:code" element={<ReviewPage />} />
      <Route path="/feedback/:code" element={<ReviewPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
