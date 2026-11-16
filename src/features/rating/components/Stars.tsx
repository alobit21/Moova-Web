import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReviewPrefs, type Key } from "../lib/prefs"

const LABELS: Key[] = ["s1", "s1", "s2", "s3", "s4", "s5"]

/** Five stars to look at (size in px). */
export function StarsDisplay({ score, size = 16, outline = false }: { score: number; size?: number; outline?: boolean }) {
  const { t } = useReviewPrefs()
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={t("starsAria", { n: score })}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} style={{ width: size, height: size }} className={n <= score ? (outline ? "fill-amber-100 text-amber-500" : "fill-amber-500 text-amber-500") : "text-amber-300"}
          strokeWidth={outline ? 1.75 : 2} aria-hidden />
      ))}
    </span>
  )
}

/** Five stars to tap. Highlights as the pointer moves; announces the choice to screen readers. */
export function StarsInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const { t } = useReviewPrefs()
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 sm:gap-2" role="radiogroup" aria-label={t("yourRating")} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={t("starAria", { n, label: t(LABELS[n]) })}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B8A5A]"
          >
            <Star className={cn("size-9 transition-colors sm:size-10", n <= shown ? "fill-amber-500 text-amber-500" : "text-slate-300")} aria-hidden />
          </button>
        ))}
      </div>
      <p className="rv-muted text-sm" aria-live="polite">
        {value ? t(LABELS[value]) : t("tapStar")}
      </p>
    </div>
  )
}
