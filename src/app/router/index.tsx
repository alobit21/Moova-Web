import { Routes, Route } from "react-router-dom"
import { TrackingPage } from "@/features/tracking/pages/TrackingPage"
import { Landing } from "./Landing"
import { NotFoundPage } from "@/features/misc/pages/NotFoundPage"
import { RatePage } from "@/features/rating/pages/RatePage"
import { FeedbackPage } from "@/features/rating/pages/FeedbackPage"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/track" element={<TrackingPage />} />
      <Route path="/track/:orderNumber" element={<TrackingPage />} />
      <Route path="/tracking/:orderNumber" element={<TrackingPage />} />
      <Route path="/rate/:token" element={<RatePage />} />
      <Route path="/feedback/:code" element={<FeedbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
