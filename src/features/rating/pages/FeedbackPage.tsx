import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { SEO } from "@/components/seo/SEO"
import { apiHttpBaseUrl } from "@/lib/api-base"
import { Message, RatingCard, firstError, type Part } from "./RatePage"

/** What the server says about this purchase (GET /api/v1/sales/feedback/:code/). */
interface SaleInfo {
  shop: { name: string }
  item: string
  sold_at: string
  rated: boolean
  can_rate: boolean
  problem: string | null
}

const EMPTY: Part = { score: 0, reasons: [], review: "" }

/** A customer rates a purchase from the link in the shop's thank-you message. */
export function FeedbackPage() {
  const { code = "" } = useParams()
  const url = `${apiHttpBaseUrl()}/api/v1/sales/feedback/${encodeURIComponent(code)}/`
  const [info, setInfo] = useState<SaleInfo | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [part, setPart] = useState<Part>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.detail || "This feedback link is invalid.")
        setInfo(data as SaleInfo)
      })
      .catch((e: Error) => setLoadError(e.message || "We couldn't open this link. Check your connection and try again."))
  }, [url])

  async function submit() {
    if (!part.score || submitting) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: part.score, review: part.review }),
      })
      // 409: already rated, e.g. from another tab, so the thank-you is still right
      if (!res.ok && res.status !== 409) {
        const data = await res.json().catch(() => ({}))
        throw new Error(firstError(data) || "Your feedback wasn't saved. Please try again.")
      }
      setSubmitted(true)
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Your feedback wasn't saved. Please try again.")
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
        <span className="sr-only">Loading your purchase</span>
      </div>
    )
  } else if (submitted || info.rated) {
    content = (
      <Message
        icon
        title="Thank you for your feedback"
        text={`Your rating helps ${info.shop.name} and other customers. Ratings can't be changed after they are submitted.`}
      />
    )
  } else if (!info.can_rate) {
    content = <Message title="Rating is closed for this purchase" text={info.problem || "This purchase can no longer be rated."} />
  } else {
    content = (
      <div className="space-y-6">
        <RatingCard title={`How was your purchase from ${info.shop.name}?`} part={part} onChange={setPart} reasons={[]} />
        {submitError && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={!part.score || submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2648A6] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1c3b7a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {submitting ? "Sending…" : "Submit rating"}
        </button>
        <p className="text-center text-xs text-[#5E656E]">Ratings can't be changed after they are submitted.</p>
      </div>
    )
  }

  return (
    <>
      <SEO title="Moova | Rate your purchase" description="Tell the shop how your purchase went." />
      <main className="mx-auto w-full max-w-xl px-4 pb-16 pt-24 sm:pt-28 lg:pt-32">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Rate your purchase</h1>
        {info && (
          <p className="mt-2 text-sm text-[#5E656E]">
            {info.item} · {new Date(info.sold_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
        <div className="mt-8">{content}</div>
      </main>
    </>
  )
}
