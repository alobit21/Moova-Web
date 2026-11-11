import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Heart, Loader2, Send, ShieldCheck, Gift } from "lucide-react"
import { SEO } from "@/components/seo/SEO"
import { StarsInput } from "../components/Stars"
import { ReviewCard } from "../components/ReviewCard"
import { ShopCard, VerifiedNote } from "../components/ShopCard"
import { loadReviewPage, submitReview, when, type ReviewPageData } from "../lib/review-api"

const MAX = 500

/** Public review page, opened from the shop's thank-you link (/r/:code). One column on phones and tablets, two on desktop. */
export function ReviewPage() {
  const { code = "" } = useParams()
  const [page, setPage] = useState<ReviewPageData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [text, setText] = useState("")
  const [allowSharing, setAllowSharing] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    loadReviewPage(code)
      .then(setPage)
      .catch((e: Error) => setLoadError(e.message || "We couldn't open this link. Check your connection and try again."))
  }, [code])

  async function send() {
    if (!score || sending) return
    setSending(true)
    setSendError(null)
    try {
      await submitReview(code, { score, review: text.trim(), allow_sharing: allowSharing })
      setDone(true)
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Your review wasn't saved. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-foreground">
      <SEO title="Moova | Review your purchase" description="Tell the shop how your purchase went." />
      {/* A private link: keep it out of search results */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-8 lg:px-12">
        <Header page={page} />
        {loadError ? (
          <Notice title="This link can't be used" text={loadError} />
        ) : !page ? (
          <div className="flex justify-center py-24" role="status" aria-live="polite">
            <Loader2 className="size-8 animate-spin text-[#1B8A5A]" aria-hidden />
            <span className="sr-only">Loading your purchase</span>
          </div>
        ) : done || page.rated ? (
          <Submitted page={page} />
        ) : !page.can_rate ? (
          <Notice title="Reviews are closed for this purchase" text={page.problem || "This purchase can no longer be reviewed."} />
        ) : (
          <main className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-10">
            <section className="lg:col-start-1 lg:row-start-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#FCE9E4] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#C85F45]">
                <Heart className="size-4 fill-[#E8836B] text-[#E8836B]" aria-hidden />
                Purchase confirmed
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Thank you{page.customer_first_name && <>, <em className="font-normal text-[#D9735A]">{page.customer_first_name}</em></>}.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#5E656E]">
                Your experience with {page.shop.name} is complete. Tell us how it went to help other customers shop with confidence.
              </p>
            </section>

            <section className="flex items-center gap-4 rounded-3xl border border-[#EAE6DE] bg-white p-5 sm:gap-5 sm:p-6 lg:col-start-2 lg:row-start-1" aria-label="Your purchase">
              {page.shop.logo_url ? (
                <img src={page.shop.logo_url} alt="" className="size-20 shrink-0 rounded-2xl object-cover sm:size-24" />
              ) : (
                <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F7D9B8] to-[#E9A98F] sm:size-24" aria-hidden>
                  <Gift className="size-9 text-white" />
                </span>
              )}
              <div className="min-w-0">
                <h2 className="text-xl font-bold">{page.item}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-[#5E656E]">Your purchase was recorded by {page.shop.name}. Share your feedback to help others find good shops safely.</p>
              </div>
            </section>

            <div className="lg:col-start-1 lg:row-start-2">
              <ShopCard shop={page.shop} />
            </div>

            <section className="lg:col-start-2 lg:row-span-2 lg:row-start-2" aria-labelledby="others">
              <h2 id="others" className="text-2xl font-bold">
                Others who shopped here
              </h2>
              <p className="mt-1 text-[15px] text-[#5E656E]">Real experiences from verified Moova buyers.</p>
              <div className="mt-4 space-y-3">
                {page.reviews.length ? (
                  page.reviews.map((r) => <ReviewCard key={r.id} review={r} />)
                ) : (
                  <p className="rounded-2xl border border-dashed border-[#D8D2C6] bg-white/60 p-6 text-center text-[#5E656E]">Be the first to review {page.shop.name}.</p>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-[#EAE6DE] bg-white p-5 shadow-sm sm:p-8 lg:col-span-2 lg:row-start-4" aria-labelledby="form">
              <h2 id="form" className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                How was your shopping experience?
              </h2>
              <p className="mt-2 text-center text-[#5E656E]">Your honest review helps future buyers shop with confidence.</p>
              <div className="mt-6">
                <StarsInput value={score} onChange={setScore} />
              </div>
              <label htmlFor="comment" className="mt-8 block font-medium">
                Share more about your experience <span className="font-normal text-[#5E656E]">(optional)</span>
              </label>
              <div className="relative mt-2">
                <textarea
                  id="comment"
                  value={text}
                  maxLength={MAX}
                  rows={4}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell others about the product quality, how the seller communicated, and what the delivery was like…"
                  className="w-full resize-none rounded-2xl border border-[#E3E8F5] bg-[#F4F7FD] p-4 pr-16 text-[15px] leading-relaxed outline-none placeholder:text-[#8B919A] focus:border-[#1B8A5A] focus:ring-2 focus:ring-[#1B8A5A]/20"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!score || sending}
                  aria-label="Send my review"
                  className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-[#1B8A5A] text-white transition-colors hover:bg-[#157049] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
                </button>
              </div>
              <p className="mt-1 text-right text-xs text-[#8B919A]" aria-live="off">
                {text.length}/{MAX}
              </p>
              <label className="mt-3 flex items-start gap-3 text-sm text-[#5E656E]">
                <input type="checkbox" checked={allowSharing} onChange={(e) => setAllowSharing(e.target.checked)} className="mt-0.5 size-4 accent-[#1B8A5A]" />
                <span>The shop may share my review (for example on Instagram), with my first name only.</span>
              </label>
              {sendError && (
                <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {sendError}
                </p>
              )}
              <p className="mt-5 flex items-center gap-2 text-sm text-[#5E656E]">
                <ShieldCheck className="size-4 shrink-0 text-[#8B919A]" aria-hidden />
                <span>
                  Your review will carry the <strong className="text-foreground">Verified Purchase</strong> badge from Moova. All reviews are checked for fairness before they are shown.
                </span>
              </p>
            </section>

            <div className="lg:col-start-1 lg:row-start-3 lg:self-start">
              <VerifiedNote />
            </div>
          </main>
        )}
        <footer className="mt-16 border-t border-[#EAE6DE] pt-6 text-center text-sm text-[#5E656E]">© {new Date().getFullYear()} Moova. Powered by Moova.</footer>
      </div>
    </div>
  )
}

function Header({ page }: { page: ReviewPageData | null }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <Link to="/" className="flex items-baseline gap-3" aria-label="Moova home">
        <span className="text-3xl font-extrabold tracking-tight text-[#1B7F3B]">moova</span>
        <span className="hidden border-l border-[#D8D2C6] pl-3 text-[15px] text-[#5E656E] sm:inline">Independent Commerce Network</span>
      </Link>
      {page && (
        <p className="inline-flex items-center gap-2 rounded-full border border-[#E3DED3] bg-white px-4 py-2 text-sm text-[#5E656E]">
          <span className="size-2 rounded-full bg-[#1B8A5A]" aria-hidden />
          Receipt {page.receipt} · Purchased {when(page.sold_at)}
        </p>
      )}
    </header>
  )
}

/** After the review is sent (or when the link was already used): what happens next, truthfully. */
function Submitted({ page }: { page: ReviewPageData }) {
  return (
    <main className="mx-auto mt-10 max-w-xl text-center">
      <p className="mx-auto inline-block rounded-full bg-[#E4F3E9] px-5 py-2 text-sm font-semibold text-[#1B6B45]">Rating &amp; review received</p>
      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Thank you for sharing your experience!</h1>
      <p className="mt-4 text-lg leading-relaxed text-[#5E656E]">
        We appreciate you taking the time to rate {page.shop.name}. Your feedback helps them improve and helps other customers shop with confidence.
      </p>
      <section className="mt-8 rounded-3xl border border-[#EAE6DE] bg-white p-6 text-left" aria-label="Your purchase">
        <p className="text-sm text-[#5E656E]">Your purchase</p>
        <p className="mt-1 text-2xl font-bold">{page.item}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-[#5E656E]">
          <span className="size-2 rounded-full bg-[#1B8A5A]" aria-hidden />
          Receipt {page.receipt} · Purchased {when(page.sold_at)}
        </p>
      </section>
      <p className="mt-8 flex items-start gap-3 text-left">
        <ShieldCheck className="mt-0.5 size-6 shrink-0 text-[#1B8A5A]" aria-hidden />
        <span>
          <strong className="block text-lg">Submitted for review</strong>
          <span className="text-[#5E656E]">Moova checks every review before it is shown. Yours carries the Verified Purchase badge once it is approved.</span>
        </span>
      </p>
      <p className="mt-10 text-[#5E656E]">Thank you for choosing {page.shop.name}.</p>
    </main>
  )
}

function Notice({ title, text }: { title: string; text: string }) {
  return (
    <main className="mx-auto mt-16 max-w-md rounded-3xl border border-[#EAE6DE] bg-white p-8 text-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-[#5E656E]">{text}</p>
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-[#1B8A5A] hover:underline">
        Go to moova.co.tz
      </Link>
    </main>
  )
}
