import { Routes, Route } from "react-router-dom"
import { TrackingPage } from "@/features/tracking/pages/TrackingPage"
import { Landing } from "./Landing"
import { NotFoundPage } from "@/features/misc/pages/NotFoundPage"
import { RatePage } from "@/features/rating/pages/RatePage"
import { ReviewPage } from "@/features/rating/pages/ReviewPage"
import { TreelinkPage } from "@/features/treelink/pages/TreelinkPage"

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
      {/* Moova Treelink: the shop's public trust page for its bio. /s/:slug also takes a shop id (links shared earlier) */}
      <Route path="/shop/:slug/treelink" element={<TreelinkPage />} />
      <Route path="/s/:slug" element={<TreelinkPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
