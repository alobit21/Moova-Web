import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { BadgeCheck, CircleCheck, Star, Loader2, MapPin, MessageCircle, ShieldCheck, ShoppingBag, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { StarsDisplay } from "@/features/rating/components/Stars"
import { ReviewCard } from "@/features/rating/components/ReviewCard"
import type { PublicReview } from "@/features/rating/lib/review-api"
import { BrandIcon } from "../components/BrandIcons"
import { loadTreelink, type Sort, type TreelinkData } from "../lib/treelink-api"

const GREEN = "#0F7B55"
/** What the page says instead of a number when a shop does not have enough records yet. */
const NEW_RATING = "New"
const NEW_ON_TIME = "Building"
const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("")

/** The public trust page a shop puts in its bio (/shop/:slug/treelink). Everything about how the shop is doing is read from
 *  Moova's records by the server: the shop cannot edit it. */
export function TreelinkPage() {
  const { slug = "" } = useParams()
  const [data, setData] = useState<TreelinkData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>("recent")
  const [reviews, setReviews] = useState<PublicReview[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [loadingReviews, setLoadingReviews] = useState(false)

  useEffect(() => {
    loadTreelink(slug)
      .then((d) => {
        setData(d)
        setReviews(d.reviews.results)
        setHasMore(d.reviews.has_more)
      })
      .catch((e: Error) => setError(e.message))
  }, [slug])

  const changeSort = useCallback(
    async (next: Sort) => {
      if (next === sort || loadingReviews) return
      setSort(next)
      setLoadingReviews(true)
      try {
        const d = await loadTreelink(slug, next, 1)
        setReviews(d.reviews.results)
        setHasMore(d.reviews.has_more)
        setPage(1)
      } finally {
        setLoadingReviews(false)
      }
    },
    [slug, sort, loadingReviews],
  )

  async function more() {
    setLoadingReviews(true)
    try {
      const d = await loadTreelink(slug, sort, page + 1)
      setReviews((r) => [...r, ...d.reviews.results])
      setHasMore(d.reviews.has_more)
      setPage(page + 1)
    } finally {
      setLoadingReviews(false)
    }
  }

  if (error) return <NotFound message={error} />
  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F4EF]" role="status" aria-live="polite">
        <Loader2 className="size-8 animate-spin" style={{ color: GREEN }} aria-hidden />
        <span className="sr-only">Loading</span>
      </div>
    )

  const shop = data.merchant_profile
  const title = `${shop.name} | Verified reviews on Moova`
  const hasActions = !!data.chat_url || !!data.shop_now_url

  return (
    <div className="min-h-screen bg-[#F6F4EF] pb-36 text-foreground md:pb-0">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`${shop.name} on Moova: verified customer reviews, delivery record and buyer protection.`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`See ${shop.name}'s verified reviews and delivery record before you buy.`} />
        {data.hero_image_url && <meta property="og:image" content={data.hero_image_url} />}
        <link rel="canonical" href={shop.url} />
      </Helmet>

      {/* Tablet and desktop: the shop and its two actions stay at the top */}
      <header className="sticky top-0 z-30 hidden border-b border-[#E7E2D8] bg-white/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3 lg:px-12">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar shop={shop} size="size-10 rounded-xl" />
            <span className="truncate text-xl font-bold lg:text-2xl">{shop.name}</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {data.chat_url && (
              <a href={data.chat_url} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors hover:bg-[#E8F3EC]" style={{ borderColor: GREEN, color: GREEN }}>
                <span className="lg:hidden">Chat</span>
                <span className="hidden lg:inline">Chat Seller</span>
              </a>
            )}
            {data.shop_now_url && (
              <a href={data.shop_now_url} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: GREEN }}>
                Shop Now
              </a>
            )}
          </div>
        </div>
      </header>

      <div
        className="h-48 bg-cover bg-center md:h-72 lg:h-[400px]"
        style={{ backgroundImage: data.hero_image_url ? `url(${data.hero_image_url})` : `linear-gradient(135deg, ${GREEN}, #0A5A3F 60%, #D9A441)` }}
        role="img"
        aria-label={`${shop.name} banner`}
      />

      <main className="mx-auto -mt-14 flex max-w-[1280px] flex-col gap-4 px-4 md:mt-8 md:px-6 lg:grid lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start lg:gap-x-8 lg:px-12">
        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-5">
        {/* The shop: who it is and how it is doing */}
        <section className="order-1 min-w-0 rounded-3xl border border-[#E7E2D8] bg-white p-4 shadow-sm sm:p-6 lg:order-none" aria-label="About the shop">
          <div className="flex items-center gap-4">
            <Avatar shop={shop} size="size-14 rounded-full sm:size-20" />
            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-[22px] font-bold sm:text-2xl">
                <span className="truncate">{shop.name}</span>
                {shop.verified && <BadgeCheck className="size-[18px] shrink-0 opacity-60" style={{ color: GREEN }} aria-label="Verified by Moova" />}
              </h1>
              {(shop.tagline || shop.category) && <p className="text-sm text-[#5E656E]">{shop.tagline || shop.category}</p>}
            </div>
          </div>
          {(data.stats.active_this_week || data.stats.deliveries_badge) && (
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-medium" style={{ color: GREEN }}>
              {data.stats.active_this_week && (
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: GREEN }} aria-hidden />
                  Active this week
                </span>
              )}
              {data.stats.active_this_week && data.stats.deliveries_badge && <span className="h-4 w-px bg-[#D8D2C6]" aria-hidden />}
              {data.stats.deliveries_badge && <span>{data.stats.deliveries_badge} deliveries</span>}
            </p>
          )}
          <dl className="mt-4 grid grid-cols-3 divide-x divide-[#ECE8DF] border-t border-[#ECE8DF] pt-4">
            <Stat value={data.stats.deliveries > 0 ? data.stats.deliveries.toLocaleString("en-US") : data.stats.sales.toLocaleString("en-US")} label={data.stats.deliveries > 0 ? "Deliveries" : "Sales"} />
            <Stat value={data.stats.rating != null ? data.stats.rating.toFixed(1) : NEW_RATING} soft={data.stats.rating == null} label="Shop rating" />
            <Stat value={data.stats.on_time_pct != null ? `${data.stats.on_time_pct}%` : NEW_ON_TIME} soft={data.stats.on_time_pct == null} label="On-time" />
          </dl>
        </section>

        {data.social_links.length > 0 && (
          <section className="order-4 rounded-3xl border border-[#E7E2D8] bg-white p-4 shadow-sm sm:p-6 md:order-5 lg:order-none" aria-labelledby="links">
            <h2 id="links" className="text-base font-bold">
              Shop Links
            </h2>
            <ul className={cn("mt-4 grid gap-3", data.social_links.length > 2 ? "grid-cols-4" : "grid-cols-2")}>
              {data.social_links.map((l) => (
                <li key={l.kind}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl py-1 text-[11px] text-[#5E656E] hover:text-foreground">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#E7E2D8] bg-[#F6F4EF] shadow-sm">
                      <BrandIcon kind={l.kind} />
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        </div>

        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-5">
        <aside className="order-5 flex items-start gap-3 rounded-2xl border bg-[#E8F3EC] p-4 sm:p-5 md:order-2 lg:order-none" style={{ borderColor: GREEN, color: GREEN }}>
          <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-[13px] leading-relaxed">
            <strong>Independently verified by Moova.</strong> Every data point on this page is automatically generated from real Moova records, not entered or edited by the seller.
          </p>
        </aside>

        <section className="order-2 min-w-0 rounded-3xl border border-[#E7E2D8] bg-white p-4 shadow-sm sm:p-6 md:order-3 lg:order-none" aria-labelledby="reviews">
          <h2 id="reviews" className="text-xs font-extrabold uppercase tracking-wide" style={{ color: GREEN }}>
            Verified customer reviews
          </h2>

          <RatingBlock data={data} />

          <div className="mt-5 grid grid-cols-2 gap-3" role="group" aria-label="Sort reviews">
            {(["recent", "top"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => changeSort(s)}
                aria-pressed={sort === s}
                className={cn("rounded-full border px-4 py-2.5 text-sm transition-colors", sort === s ? "border-[#0F7B55] bg-[#E8F3EC] font-bold" : "border-[#E0DACE] bg-white font-medium text-[#3A4048] hover:bg-slate-50")}
                style={sort === s ? { color: GREEN } : undefined}
              >
                {s === "recent" ? "Most Recent" : "Top Rated"}
              </button>
            ))}
          </div>

          <div className={cn("mt-4 grid gap-3 lg:grid-cols-2", loadingReviews && "opacity-60")} aria-busy={loadingReviews}>
            {reviews.length ? (
              reviews.map((r) => <ReviewCard key={r.id} review={r} compact />)
            ) : (
              <p className="rounded-2xl border border-dashed border-[#D8D2C6] p-6 text-center text-[#5E656E] lg:col-span-2">No reviews yet. Be the first customer!</p>
            )}
          </div>
          {hasMore && (
            <button type="button" onClick={more} disabled={loadingReviews} className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-[#E0DACE] px-6 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60">
              {loadingReviews && <Loader2 className="size-4 animate-spin" aria-hidden />}
              Show more reviews
            </button>
          )}
        </section>

        {data.top_products.length > 0 && (
          <section className="order-3 md:order-4 lg:order-none" aria-labelledby="products">
            <h2 id="products" className="text-xs font-extrabold uppercase tracking-wide" style={{ color: GREEN }}>
              Most trusted products
            </h2>
            <p className="mt-1 text-sm text-[#5E656E]">Customers keep ordering these through Moova</p>
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {data.top_products.map((p) => (
                <li key={p.product} className="overflow-hidden rounded-2xl border border-[#E7E2D8] bg-white">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="aspect-square w-full object-cover" />
                  ) : (
                    <span className="flex aspect-square w-full items-center justify-center bg-[#E8F3EC]" style={{ color: GREEN }} aria-hidden>
                      <ShoppingBag className="size-8" />
                    </span>
                  )}
                  <div className="p-2.5">
                    <p className="truncate text-xs font-semibold">{p.product}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold" style={{ color: GREEN }}>
                      <CircleCheck className="size-3.5 shrink-0" aria-hidden />
                      {p.delivered > 0 ? `${p.delivered.toLocaleString("en-US")} delivered` : `${p.sold.toLocaleString("en-US")} sold`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.delivery_coverage.length > 0 && (
          <section className="order-3 md:order-4 lg:order-none" aria-labelledby="coverage">
            <h2 id="coverage" className="text-xs font-extrabold uppercase tracking-wide" style={{ color: GREEN }}>
              Delivery coverage
            </h2>
            <p className="mt-1 text-sm text-[#5E656E]">Areas where this shop regularly fulfils orders</p>
            <ul className="mt-3 space-y-3 rounded-2xl border border-[#E7E2D8] bg-white p-4">
              {data.delivery_coverage.map((c) => (
                <li key={c.area}>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 shrink-0" style={{ color: GREEN }} aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-semibold">{c.area}</span>
                    <span className="font-bold" style={{ color: GREEN }}>
                      {c.percent}%
                    </span>
                  </div>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[#EAF0F4]">
                    <span className="block h-full rounded-full" style={{ width: `${c.percent}%`, background: GREEN }} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        </div>
      </main>

      <footer className="mt-12 hidden border-t border-[#E7E2D8] bg-white py-8 text-center text-sm text-[#5E656E] md:block">
        <p className="flex items-center justify-center gap-2 font-semibold text-foreground">
          <ShieldCheck className="size-4" aria-hidden /> Protected by Moova Buyer Guarantee
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {shop.name}. Powered by Moova.
        </p>
      </footer>

      {/* Phones: the two actions stay in reach while scrolling */}
      {hasActions && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7E2D8] bg-white/95 px-4 pb-4 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-md gap-3">
            {data.chat_url && (
              <a href={data.chat_url} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold text-white shadow-md" style={{ background: GREEN }}>
                <MessageCircle className="size-5" aria-hidden /> Chat Seller
              </a>
            )}
            {data.shop_now_url && (
              <a href={data.shop_now_url} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold text-white shadow-md" style={{ background: GREEN }}>
                <ShoppingBag className="size-5" aria-hidden /> Shop Now
              </a>
            )}
          </div>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#5E656E]">
            <ShieldCheck className="size-3.5" aria-hidden /> Protected by Moova Buyer Guarantee
          </p>
        </div>
      )}
    </div>
  )
}

function Avatar({ shop, size }: { shop: TreelinkData["merchant_profile"]; size: string }) {
  return shop.logo_url ? (
    <img src={shop.logo_url} alt="" className={cn("shrink-0 object-cover", size)} />
  ) : (
    <span className={cn("flex shrink-0 items-center justify-center font-bold text-white", size)} style={{ background: GREEN }} aria-hidden>
      {initials(shop.name) || <Store className="size-5" />}
    </span>
  )
}

function Stat({ value, label, soft = false }: { value: string; label: string; soft?: boolean }) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <dd className={soft ? "pt-1 text-base font-semibold sm:pt-2 sm:text-xl" : "text-xl font-semibold text-[#3A4048] sm:text-3xl sm:font-bold"} style={soft ? { color: GREEN } : undefined}>
        {value}
      </dd>
      <dt className="text-xs text-[#5E656E] sm:text-sm">{label}</dt>
    </div>
  )
}

/** The big average and the 5-to-1 star split. Before the minimum number of reviews there is no average, and the page says why. */
function RatingBlock({ data }: { data: TreelinkData }) {
  const { rating } = data
  if (rating.total === 0) return null
  return (
    <div className="mt-4 grid grid-cols-[112px_1fr] items-center gap-4 sm:grid-cols-[180px_1fr] sm:gap-6">
      <div className="text-center">
        {rating.average != null ? (
          <>
            <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">{rating.average.toFixed(1)}</p>
            <div className="mt-2 flex justify-center">
              <StarsDisplay score={Math.round(rating.average)} size={14} outline />
            </div>
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F3EC] px-3 py-1.5 text-sm font-bold" style={{ color: GREEN }}>
            <Star className="size-4 fill-current" aria-hidden /> {NEW_RATING}
          </span>
        )}
        <p className="mt-1 text-xs text-[#5E656E]">
          {rating.total.toLocaleString("en-US")} {rating.average == null ? "verified " : ""}
          {rating.total === 1 ? "review" : "reviews"}
        </p>
      </div>
      <ul className="space-y-1.5" aria-label="Rating split">
        {(["5", "4", "3", "2", "1"] as const).map((n) => (
          <li key={n} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-right font-semibold">{n}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#ECE8DF]">
              <span className="block h-full rounded-full" style={{ width: `${rating.distribution[n]}%`, background: n === "5" ? GREEN : n === "4" ? "#F59E0B" : "#E5B84A" }} />
            </span>
            <span className="w-10 text-right text-[#5E656E]">{rating.distribution[n]}%</span>
          </li>
        ))}
      </ul>
      {rating.average == null && <p className="col-span-2 text-center text-xs text-[#5E656E]">Shop rating starts at {rating.minimum} verified reviews</p>}
    </div>
  )
}

function NotFound({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F4EF] px-4">
      <div className="max-w-md rounded-3xl border border-[#E7E2D8] bg-white p-8 text-center">
        <h1 className="text-xl font-semibold">Page not found</h1>
        <p className="mt-2 text-[#5E656E]">{message}</p>
        <Link to="/" className="mt-6 inline-block text-sm font-medium hover:underline" style={{ color: GREEN }}>
          Go to moova.co.tz
        </Link>
      </div>
    </main>
  )
}
