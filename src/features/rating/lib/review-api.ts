import { apiHttpBaseUrl } from "@/lib/api-base"

/** One approved review on the page ("Others who shopped here"). */
export interface PublicReview {
  id: string
  reviewer: string
  initials: string
  score: number
  review: string
  product: string
  date: string
  verified: boolean
  helpful: number
}

export interface ShopCardData {
  name: string
  logo_url: string | null
  category: string
  verified: boolean
  rating: number | null
  review_count: number
  sales: number
  trust_score: number | null
}

/** What the server says about this purchase (GET /api/v1/sales/feedback/:code/). */
export interface ReviewPageData {
  kind: "sale"
  shop: ShopCardData
  reviews: PublicReview[]
  receipt: string
  customer_first_name: string
  item: string
  sold_at: string
  rated: boolean
  can_rate: boolean
  problem: string | null
}

const pageUrl = (code: string) => `${apiHttpBaseUrl()}/api/v1/sales/feedback/${encodeURIComponent(code)}/`

export async function loadReviewPage(code: string): Promise<ReviewPageData> {
  const res = await fetch(pageUrl(code))
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || "This review link is invalid.")
  return data as ReviewPageData
}

/** The first error message in an API error body, whatever its shape. */
export function firstError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null
  const d = data as Record<string, unknown>
  if (typeof d.detail === "string") return d.detail
  if (typeof d.message === "string" && d.message !== "Validation failed.") return d.message
  const inner = (d.details ?? d) as Record<string, unknown>
  for (const v of Object.values(inner)) {
    const first = Array.isArray(v) ? v[0] : v
    if (typeof first === "string") return first
  }
  return null
}

/** Send the review. A 409 (already rated, e.g. from another tab) counts as done. */
export async function submitReview(code: string, body: { score: number; review: string; allow_sharing: boolean }): Promise<void> {
  const res = await fetch(pageUrl(code), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  if (res.ok || res.status === 409) return
  const data = await res.json().catch(() => ({}))
  throw new Error(firstError(data) || "Your review wasn't saved. Please try again.")
}

const VOTER_KEY = "moova_review_voter"
const VOTED_KEY = "moova_review_voted"

/** A random id kept in this browser, so one browser counts once per review. */
function voterId(): string {
  try {
    let id = localStorage.getItem(VOTER_KEY)
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/-/g, "").slice(0, 32)
      localStorage.setItem(VOTER_KEY, id)
    }
    return id
  } catch {
    return `session${Math.random().toString(36).slice(2, 12)}`
  }
}

export function votedIds(): Set<string> {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(VOTED_KEY) || "[]"))
  } catch {
    return new Set()
  }
}

function rememberVote(id: string) {
  try {
    localStorage.setItem(VOTED_KEY, JSON.stringify([...votedIds(), id]))
  } catch {
    /* private mode: the vote still counts on the server */
  }
}

/** "Helpful" on a review: the new count. */
export async function voteHelpful(reviewId: string): Promise<number> {
  const res = await fetch(`${apiHttpBaseUrl()}/api/v1/reviews/${encodeURIComponent(reviewId)}/helpful/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ voter: voterId() }),
  })
  if (!res.ok) throw new Error("Couldn't save that. Please try again.")
  const data = (await res.json()) as { helpful: number }
  rememberVote(reviewId)
  return data.helpful
}

/** "Nov 12, 2023" */
export const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

/** "Today at 2:34 PM" or "Nov 12, 2023" */
export function when(iso: string): string {
  const d = new Date(iso)
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  return d.toDateString() === new Date().toDateString() ? `Today at ${time}` : shortDate(iso)
}
