import { useState } from "react"
import { Loader2, ShoppingBag, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { StarsDisplay } from "./Stars"
import { shortDate, voteHelpful, votedIds, type PublicReview } from "../lib/review-api"

/** One approved review: who, how many stars, what they said, which product, and a "Helpful" tap. */
export function ReviewCard({ review }: { review: PublicReview }) {
  const [helpful, setHelpful] = useState(review.helpful)
  const [voted, setVoted] = useState(() => votedIds().has(review.id))
  const [busy, setBusy] = useState(false)

  async function vote() {
    if (voted || busy) return
    setBusy(true)
    try {
      setHelpful(await voteHelpful(review.id))
      setVoted(true)
    } catch {
      /* the button stays; the visitor can try again */
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="@container rounded-2xl border border-[#EAE6DE] bg-white p-4 sm:p-5">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E7F5EE] text-sm font-semibold text-[#1B6B45]" aria-hidden>
          {review.initials}
        </span>
        <StarsDisplay score={review.score} />
        {review.verified && (
          <span className="whitespace-nowrap rounded-full bg-[#E7F5EE] px-2.5 py-0.5 text-xs font-semibold text-[#1B6B45]">
            <span aria-hidden>✓ </span>
            <span className="@sm:hidden">Verified</span>
            <span className="hidden @sm:inline">Verified Purchase</span>
            <span className="sr-only @sm:hidden"> Purchase</span>
          </span>
        )}
        <time dateTime={review.date} className="ml-auto whitespace-nowrap text-sm text-[#5E656E]">
          {shortDate(review.date)}
        </time>
      </header>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground">
        <span className="sr-only">{review.reviewer} wrote: </span>
        {review.review || <span className="text-[#5E656E]">Rated without a comment.</span>}
      </p>
      <footer className="mt-3 flex items-center justify-between gap-3 text-sm text-[#5E656E]">
        <span className="flex min-w-0 items-center gap-2">
          <ShoppingBag className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{review.product}</span>
        </span>
        <button
          type="button"
          onClick={vote}
          disabled={voted || busy}
          aria-pressed={voted}
          className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 transition-colors", voted ? "text-[#1B6B45]" : "hover:bg-slate-100")}
        >
          Helpful ({helpful})
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ThumbsUp className={cn("size-4", voted && "fill-[#1B8A5A]/20")} aria-hidden />}
        </button>
      </footer>
    </article>
  )
}
