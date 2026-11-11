import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const LABELS = ["", "Very bad", "Bad", "Okay", "Good", "Excellent"]

/** Five stars to look at (size in px). */
export function StarsDisplay({ score, size = 16 }: { score: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${score} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} style={{ width: size, height: size }} className={n <= score ? "fill-amber-500 text-amber-500" : "text-amber-300"} aria-hidden />
      ))}
    </span>
  )
}

/** Five stars to tap. Highlights as the pointer moves; announces the choice to screen readers. */
export function StarsInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 sm:gap-2" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}, ${LABELS[n]}`}
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
      <p className="text-sm text-[#5E656E]" aria-live="polite">
        {value ? LABELS[value] : "Tap a star to rate"}
      </p>
    </div>
  )
}
