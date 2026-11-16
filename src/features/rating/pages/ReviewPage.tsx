import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Heart, Loader2, Send, ShieldCheck, Gift } from "lucide-react"
import { SEO } from "@/components/seo/SEO"
import { StarsInput } from "../components/Stars"
import { ReviewCard } from "../components/ReviewCard"
import { ShopCard, VerifiedNote } from "../components/ShopCard"
import { PrefsBar } from "../components/PrefsBar"
import { loadReviewPage, submitReview, when, type ReviewPageData } from "../lib/review-api"
import { ReviewPrefsProvider, serverText, useReviewPrefs } from "../lib/prefs"

const MAX = 500

/** Public review page, opened from the shop's thank-you link (/r/:code). One column on phones and tablets, two on desktop.
 *  The customer can read it in English or Kiswahili and in light or dark; the choice is remembered on the phone. */
export function ReviewPage() {
  return (
    <ReviewPrefsProvider>
      <ReviewPageContent />
    </ReviewPrefsProvider>
  )
}

function ReviewPageContent() {
  const { t, lang } = useReviewPrefs()
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
      .catch((e: Error) => setLoadError(e.message || ""))
  }, [code])

  async function send() {
    if (!score || sending) return
    setSending(true)
    setSendError(null)
    try {
      await submitReview(code, { score, review: text.trim(), allow_sharing: allowSharing })
      setDone(true)
    } catch (e) {
      setSendError(e instanceof Error && e.message ? serverText(lang, e.message) : t("sendFailed"))
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SEO title={t("pageTitle")} description={t("pageDescription")} />
      {/* A private link: keep it out of search results */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-8 lg:px-12">
        <Header page={page} />
        {loadError ? (
          <Notice title={t("linkCantBeUsed")} text={loadError ? serverText(lang, loadError) : t("openFailed")} />
        ) : !page ? (
          <div className="flex justify-center py-24" role="status" aria-live="polite">
            <Loader2 className="size-8 animate-spin text-[#1B8A5A]" aria-hidden />
            <span className="sr-only">{t("loading")}</span>
          </div>
        ) : done || page.rated ? (
          <Submitted page={page} />
        ) : !page.can_rate ? (
          <Notice title={t("closedTitle")} text={page.problem ? serverText(lang, page.problem) : t("closedText")} />
        ) : (
          <main className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-10">
            <section className="lg:col-start-1 lg:row-start-1">
              <p className="rv-coral inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
                <Heart className="size-4 fill-[#E8836B] text-[#E8836B]" aria-hidden />
                {t("confirmed")}
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t("thankYou")}{page.customer_first_name && <>, <em className="font-normal text-[#D9735A]">{page.customer_first_name}</em></>}.
              </h1>
              <p className="rv-muted mt-4 max-w-xl text-lg leading-relaxed">{t("intro", { shop: page.shop.name })}</p>
            </section>

            <section className="rv-card flex items-center gap-4 rounded-3xl border p-5 sm:gap-5 sm:p-6 lg:col-start-2 lg:row-start-1" aria-label={t("yourPurchase")}>
              {page.shop.logo_url ? (
                <img src={page.shop.logo_url} alt="" className="size-20 shrink-0 rounded-2xl object-cover sm:size-24" />
              ) : (
                <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F7D9B8] to-[#E9A98F] sm:size-24" aria-hidden>
                  <Gift className="size-9 text-white" />
                </span>
              )}
              <div className="min-w-0">
                <h2 className="text-xl font-bold">{page.item}</h2>
                <p className="rv-muted mt-1 text-[15px] leading-relaxed">{t("recordedBy", { shop: page.shop.name })}</p>
              </div>
            </section>

            <div className="lg:col-start-1 lg:row-start-2">
              <ShopCard shop={page.shop} />
            </div>

            <section className="lg:col-start-2 lg:row-span-2 lg:row-start-2" aria-labelledby="others">
              <h2 id="others" className="text-2xl font-bold">
                {t("others")}
              </h2>
              <p className="rv-muted mt-1 text-[15px]">{t("othersText")}</p>
              <div className="mt-4 space-y-3">
                {page.reviews.length ? (
                  page.reviews.map((r) => <ReviewCard key={r.id} review={r} />)
                ) : (
                  <p className="rv-card rv-dashed rv-muted rounded-2xl border border-dashed p-6 text-center">{t("beFirst", { shop: page.shop.name })}</p>
                )}
              </div>
            </section>

            <section className="rv-card rounded-3xl border p-5 shadow-sm sm:p-8 lg:col-span-2 lg:row-start-4" aria-labelledby="form">
              <h2 id="form" className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                {t("formTitle")}
              </h2>
              <p className="rv-muted mt-2 text-center">{t("formText")}</p>
              <div className="mt-6">
                <StarsInput value={score} onChange={setScore} />
              </div>
              <label htmlFor="comment" className="mt-8 block font-medium">
                {t("commentLabel")} <span className="rv-muted font-normal">{t("optional")}</span>
              </label>
              <div className="relative mt-2">
                <textarea
                  id="comment"
                  value={text}
                  maxLength={MAX}
                  rows={4}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t("commentPlaceholder")}
                  className="rv-field w-full resize-none rounded-2xl border p-4 pr-16 text-[15px] leading-relaxed text-foreground outline-none placeholder:text-[#8B919A] focus:border-[#1B8A5A] focus:ring-2 focus:ring-[#1B8A5A]/20"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!score || sending}
                  aria-label={t("send")}
                  className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-[#1B8A5A] text-white transition-colors hover:bg-[#157049] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
                </button>
              </div>
              <p className="rv-faint mt-1 text-right text-xs" aria-live="off">
                {text.length}/{MAX}
              </p>
              <label className="rv-muted mt-3 flex items-start gap-3 text-sm">
                <input type="checkbox" checked={allowSharing} onChange={(e) => setAllowSharing(e.target.checked)} className="mt-0.5 size-4 accent-[#1B8A5A]" />
                <span>{t("sharing")}</span>
              </label>
              {sendError && (
                <p role="alert" className="rv-error mt-4 rounded-xl px-4 py-3 text-sm">
                  {sendError}
                </p>
              )}
              <p className="rv-muted mt-5 flex items-center gap-2 text-sm">
                <ShieldCheck className="rv-faint size-4 shrink-0" aria-hidden />
                <span>
                  {t("verifiedBefore")}<strong className="text-foreground">{t("verifiedBold")}</strong>{t("verifiedAfter")}
                </span>
              </p>
            </section>

            <div className="lg:col-start-1 lg:row-start-3 lg:self-start">
              <VerifiedNote />
            </div>
          </main>
        )}
        <footer className="rv-line rv-muted mt-16 border-t pt-6 text-center text-sm">{t("footer", { year: new Date().getFullYear() })}</footer>
      </div>
    </>
  )
}

function Header({ page }: { page: ReviewPageData | null }) {
  const { t, lang } = useReviewPrefs()
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <Link to="/" className="flex items-baseline gap-3" aria-label="Moova home">
        <span className="text-3xl font-extrabold tracking-tight text-[#1B7F3B]">moova</span>
        <span className="rv-dashed rv-muted hidden border-l pl-3 text-[15px] md:inline">{t("tagline")}</span>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-3">
        {page && (
          <p className="rv-pill rv-muted inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <span className="size-2 rounded-full bg-[#1B8A5A]" aria-hidden />
            {t("receipt", { receipt: page.receipt, when: when(page.sold_at, lang, t) })}
          </p>
        )}
        <PrefsBar />
      </div>
    </header>
  )
}

/** After the review is sent (or when the link was already used): what happens next, truthfully. */
function Submitted({ page }: { page: ReviewPageData }) {
  const { t, lang } = useReviewPrefs()
  return (
    <main className="mx-auto mt-10 max-w-xl text-center">
      <p className="rv-green mx-auto inline-block rounded-full px-5 py-2 text-sm font-semibold">{t("doneBadge")}</p>
      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{t("doneTitle")}</h1>
      <p className="rv-muted mt-4 text-lg leading-relaxed">{t("doneText", { shop: page.shop.name })}</p>
      <section className="rv-card mt-8 rounded-3xl border p-6 text-left" aria-label={t("yourPurchase")}>
        <p className="rv-muted text-sm">{t("yourPurchase")}</p>
        <p className="mt-1 text-2xl font-bold">{page.item}</p>
        <p className="rv-muted mt-3 flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-[#1B8A5A]" aria-hidden />
          {t("receipt", { receipt: page.receipt, when: when(page.sold_at, lang, t) })}
        </p>
      </section>
      <p className="mt-8 flex items-start gap-3 text-left">
        <ShieldCheck className="mt-0.5 size-6 shrink-0 text-[#1B8A5A]" aria-hidden />
        <span>
          <strong className="block text-lg">{t("submitted")}</strong>
          <span className="rv-muted">{t("submittedText")}</span>
        </span>
      </p>
      <p className="rv-muted mt-10">{t("thanksFor", { shop: page.shop.name })}</p>
    </main>
  )
}

function Notice({ title, text }: { title: string; text: string }) {
  const { t } = useReviewPrefs()
  return (
    <main className="rv-card mx-auto mt-16 max-w-md rounded-3xl border p-8 text-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="rv-muted mt-2">{text}</p>
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-[#1B8A5A] hover:underline">
        {t("goToSite")}
      </Link>
    </main>
  )
}
