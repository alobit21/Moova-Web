import { ShieldCheck, Star, Store, Users } from "lucide-react"
import type { ShopCardData } from "../lib/review-api"

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("")

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-[#F8F6F1] px-2 py-3 text-center">
      <span className="flex items-center gap-1.5 text-base font-bold text-foreground">
        {icon}
        {value}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wide text-[#5E656E]">{label}</span>
    </div>
  )
}

/** Who the shop is and how it is doing, from Moova's own records. A stat the shop has no data for is left out. */
export function ShopCard({ shop }: { shop: ShopCardData }) {
  return (
    <section className="rounded-3xl border border-[#EAE6DE] bg-white p-5 sm:p-6" aria-label="About the shop">
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
            {shop.verified && <span className="rounded-md bg-[#FCE9E4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#C85F45]">Verified vendor</span>}
          </div>
          {shop.category && <p className="text-[15px] text-[#5E656E]">{shop.category}</p>}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat icon={<Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />} value={shop.rating ? shop.rating.toFixed(1) : "–"} label="Rating" />
        <Stat icon={<ShieldCheck className="size-4 text-[#1B8A5A]" aria-hidden />} value={shop.trust_score != null ? `${shop.trust_score}/100` : "–"} label="Trust score" />
        <Stat icon={<Users className="size-4 text-[#C85F45]" aria-hidden />} value={shop.sales.toLocaleString("en-US")} label="Sales" />
      </div>
    </section>
  )
}

/** The "Verified Commerce" note under the review. */
export function VerifiedNote() {
  return (
    <aside className="rounded-3xl border border-[#F1C6BB] bg-[#FDF1EE] p-5 sm:p-6">
      <p className="flex items-center gap-2 font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#E7F5EE]">
          <ShieldCheck className="size-4 text-[#1B8A5A]" aria-hidden />
        </span>
        <span>
          <span className="text-[#1B8A5A]">moova</span> · Verified Commerce
        </span>
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-[#5E656E]">
        Your review is checked by Moova and permanently attached to your purchase. It helps honest sellers thrive with verified buyers across Africa.
      </p>
    </aside>
  )
}
