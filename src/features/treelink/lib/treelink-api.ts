import { apiHttpBaseUrl } from "@/lib/api-base"
import type { PublicReview } from "@/features/rating/lib/review-api"

export interface SocialLink {
  kind: "whatsapp" | "instagram" | "tiktok" | "facebook"
  label: string
  url: string
}

/** GET /api/v1/shops/:slug/treelink/ : read only, computed by Moova from its own records. */
export interface TreelinkData {
  merchant_profile: { name: string; slug: string; logo_url: string | null; category: string; tagline: string; verified: boolean; url: string }
  hero_image_url: string | null
  stats: {
    deliveries: number
    sales: number
    on_time_pct: number | null
    rating: number | null
    review_count: number
    deliveries_badge: string | null
    active_this_week: boolean
  }
  rating: { average: number | null; total: number; distribution: Record<"1" | "2" | "3" | "4" | "5", number>; minimum: number }
  reviews: { results: PublicReview[]; count: number; page: number; has_more: boolean; sort: "recent" | "top" }
  social_links: SocialLink[]
  chat_url: string | null
  shop_now_url: string | null
  top_products: { product: string; items: number; delivered: number; sold: number; image_url: string | null }[]
  delivery_coverage: { area: string; percent: number }[]
  buyer_guarantee: boolean
}

export type Sort = "recent" | "top"

export async function loadTreelink(slug: string, sort: Sort = "recent", page = 1): Promise<TreelinkData> {
  const res = await fetch(`${apiHttpBaseUrl()}/api/v1/shops/${encodeURIComponent(slug)}/treelink/?sort=${sort}&page=${page}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(res.status === 404 ? "This page does not exist." : data.detail || "We couldn't load this page. Please try again.")
  return data as TreelinkData
}
