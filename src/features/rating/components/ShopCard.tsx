import { ShieldCheck, Star, Store, Users } from "lucide-react"
import type { ShopCardData } from "../lib/review-api"
import { useReviewPrefs } from "../lib/prefs"

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("")

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rv-soft rounded-xl px-2 py-3 text-center">
      <span className="flex items-center gap-1.5 text-base font-bold text-foreground">
        {icon}
        {value}
      </span>
      <span className="rv-muted text-[11px] font-medium uppercase tracking-wide">{label}</span>
    </div>
  )
}

/** Who the shop is and how it is doing, from Moova's own records. A stat the shop has no data for is left out. */
export function ShopCard({ shop }: { shop: ShopCardData }) {
  const { t } = useReviewPrefs()
  return (
    <section className="rv-card rounded-3xl border p-5 sm:p-6" aria-label={t("aboutShop")}>
      <div className="flex items-center gap-4">
        {shop.logo_url ? (
          <img src={shop.logo_url} alt="" className="size-14 rounded-2xl object-cover" />
        ) : (
          <span className="flex size-14 items-center justify-center rounded-2xl bg-[#D9735A] text-lg font-bold text-white" aria-hidden>
            {initials(shop.name) || <Store className="size-6" />}
          </span>
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-bold text-foreground">{shop.name}</h2>
            {shop.verified && <span className="rv-coral rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">{t("verifiedVendor")}</span>}
          </div>
          {shop.category && <p className="rv-muted text-[15px]">{shop.category}</p>}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat icon={<Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />} value={shop.rating ? shop.rating.toFixed(1) : "–"} label={t("statRating")} />
        <Stat icon={<ShieldCheck className="size-4 text-[#1B8A5A]" aria-hidden />} value={shop.trust_score != null ? `${shop.trust_score}/100` : "–"} label={t("statTrust")} />
        <Stat icon={<Users className="size-4 text-[#C85F45]" aria-hidden />} value={shop.sales.toLocaleString("en-US")} label={t("statSales")} />
      </div>
    </section>
  )
}

/** The "Verified Commerce" note under the review. */
export function VerifiedNote() {
  const { t } = useReviewPrefs()
  return (
    <aside className="rv-note rounded-3xl border p-5 sm:p-6">
      <p className="flex items-center gap-2 font-semibold text-foreground">
        <span className="rv-green flex size-8 items-center justify-center rounded-full">
          <ShieldCheck className="size-4 text-[#1B8A5A]" aria-hidden />
        </span>
        <span>
          <span className="text-[#1B8A5A]">moova</span> · {t("noteTitle")}
        </span>
      </p>
      <p className="rv-muted mt-3 text-[15px] leading-relaxed">{t("noteText")}</p>
    </aside>
  )
}
