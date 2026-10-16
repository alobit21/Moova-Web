import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CheckCircle2, Loader2, Star } from "lucide-react"
import { SEO } from "@/components/seo/SEO"
import { apiHttpBaseUrl } from "@/lib/api-base"
import { cn } from "@/lib/utils"

/** What the server says about this rating link (GET /api/v1/ratings/customer/). */
interface RatingInfo {
  order_number: string
  can_rate: boolean
  problem: string | null
  driver: { name: string; rated: boolean } | null
  shop: { name: string; rated: boolean } | null
  reasons: { driver: string[]; shop: string[] }
}

export interface Part {
  score: number
  reasons: string[]
  review: string
}

const REASON_LABELS: Record<string, string> = {
  late: "Late",
  rude: "Rude",
  parcel_damaged: "Parcel damaged",
  did_not_call: "Didn't call before arriving",
  parcel_not_ready: "Parcel wasn't ready",
  wrong_item: "Wrong item",
  other: "Something else",
}

const SCORE_LABELS = ["", "Very bad", "Bad", "Okay", "Good", "Excellent"]
const EMPTY: Part = { score: 0, reasons: [], review: "" }

/** A low rating needs at least one reason, as the server requires. */
const needsReason = (p: Part) => p.score > 0 && p.score < 4 && p.reasons.length === 0

export function RatePage() {
  const { token = "" } = useParams()
  const [info, setInfo] = useState<RatingInfo | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [driver, setDriver] = useState<Part>(EMPTY)
  const [shop, setShop] = useState<Part>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(`${apiHttpBaseUrl()}/api/v1/ratings/customer/?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.detail || "This rating link is invalid or has expired.")
        setInfo(data as RatingInfo)
      })
      .catch((e: Error) => setLoadError(e.message || "We couldn't open this rating link. Check your connection and try again."))
  }, [token])

  const rateDriver = !!info?.driver && !info.driver.rated
  const rateShop = !!info?.shop && !info.shop.rated
  const chosen = (rateDriver && driver.score > 0) || (rateShop && shop.score > 0)
  const blocked = (rateDriver && needsReason(driver)) || (rateShop && needsReason(shop))

  async function submit() {
    if (!chosen || blocked || submitting) return
    setSubmitting(true)
    setSubmitError(null)
    const body: Record<string, unknown> = { token }
    if (rateDriver && driver.score) body.driver = driver
    if (rateShop && shop.score) body.shop = shop
    try {
      const res = await fetch(`${apiHttpBaseUrl()}/api/v1/ratings/customer/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(firstError(data) || "Your rating wasn't saved. Please try again.")
      }
      setSubmitted(true)
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Your rating wasn't saved. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  let content
  if (loadError) {
    content = <Message title="This link can't be used" text={loadError} />
  } else if (!info) {
    content = (
      <div className="flex justify-center py-16" role="status" aria-live="polite">
        <Loader2 className="size-8 animate-spin text-[#2648A6]" aria-hidden />
        <span className="sr-only">Loading your delivery</span>
      </div>
    )
  } else if (submitted || (!rateDriver && !rateShop)) {
    content = (
      <Message
        icon
        title="Thank you for rating your delivery"
        text="Your feedback helps us and the shop improve. Ratings can't be changed after they are submitted."
      />
    )
  } else if (!info.can_rate) {
    content = <Message title="Rating is closed for this delivery" text={info.problem || "This delivery can no longer be rated."} />
  } else {
    content = (
      <div className="space-y-6">
        {rateDriver && (
          <RatingCard
            title={`How was your driver, ${info.driver!.name}?`}
            part={driver}
            onChange={setDriver}
            reasons={info.reasons.driver}
          />
        )}
        {rateShop && (
          <RatingCard
            title={`How was the delivery from ${info.shop!.name}?`}
            part={shop}
            onChange={setShop}
            reasons={info.reasons.shop}
          />
        )}
        {submitError && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={!chosen || blocked || submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2648A6] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1c3b7a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {submitting ? "Sending…" : "Submit rating"}
        </button>
        <p className="text-center text-xs text-[#5E656E]">
          {blocked ? "Choose what went wrong for ratings below 4 stars." : "Ratings can't be changed after they are submitted."}
        </p>
      </div>
    )
  }

  return (
    <>
      <SEO title="Moova | Rate your delivery" description="Tell us how your Moova delivery went." />
      <main className="mx-auto w-full max-w-xl px-4 pb-16 pt-24 sm:pt-28 lg:pt-32">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Rate your delivery</h1>
        {info && <p className="mt-2 text-sm text-[#5E656E]">Order {info.order_number}</p>}
        <div className="mt-8">{content}</div>
      </main>
    </>
  )
}

export function RatingCard({ title, part, onChange, reasons }: {
  title: string
  part: Part
  onChange: (p: Part) => void
  reasons: string[]
}) {
  const low = part.score > 0 && part.score < 4
  const toggle = (r: string) =>
    onChange({ ...part, reasons: part.reasons.includes(r) ? part.reasons.filter((x) => x !== r) : [...part.reasons, r] })

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <div className="mt-4 flex items-center gap-1" role="radiogroup" aria-label="Stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={part.score === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}, ${SCORE_LABELS[n]}`}
            onClick={() => onChange({ ...part, score: n, reasons: n >= 4 ? [] : part.reasons })}
            className="rounded-lg p-1.5 focus-visible:outline-2 focus-visible:outline-[#2648A6]"
          >
            <Star
              className={cn("size-9 transition-colors", n <= part.score ? "fill-amber-400 text-amber-400" : "text-slate-300")}
              aria-hidden
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-[#5E656E]">{SCORE_LABELS[part.score]}</span>
      </div>

      {low && reasons.length > 0 && (
        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-foreground">What went wrong?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {reasons.map((r) => {
              const on = part.reasons.includes(r)
              return (
                <button
                  key={r}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(r)}
                  className={cn(
                    "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                    on ? "border-[#2648A6] bg-[#2648A6] text-white" : "border-slate-300 bg-white text-foreground hover:border-[#2648A6]",
                  )}
                >
                  {REASON_LABELS[r] ?? r}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      {part.score > 0 && (
        <label className="mt-5 block">
          <span className="text-sm font-medium text-foreground">Comment (optional)</span>
          <textarea
            value={part.review}
            onChange={(e) => onChange({ ...part, review: e.target.value })}
            rows={3}
            maxLength={500}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2648A6]"
          />
        </label>
      )}
    </section>
  )
}

export function Message({ title, text, icon }: { title: string; text: string; icon?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      {icon && <CheckCircle2 className="mx-auto mb-4 size-12 text-emerald-500" aria-hidden />}
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#5E656E]">{text}</p>
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-[#2648A6] hover:underline">
        Go to moova.co.tz
      </Link>
    </div>
  )
}

/** The first readable message in a DRF error response. */
export function firstError(data: unknown): string | null {
  if (typeof data === "string") return data
  if (Array.isArray(data)) return firstError(data[0])
  if (data && typeof data === "object") {
    for (const value of Object.values(data)) {
      const msg = firstError(value)
      if (msg) return msg
    }
  }
  return null
}
