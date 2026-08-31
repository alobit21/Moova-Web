import { useState, useEffect, useCallback } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const HEADER_OFFSET = 75

export function ScrollControls() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  const checkScrollState = useCallback(() => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    )

    // Top check: within top 50px
    setIsAtTop(scrollY <= 50)

    // Bottom check: within 50px of bottom
    setIsAtBottom(scrollY + viewportHeight >= fullHeight - 50)
  }, [])

  useEffect(() => {
    checkScrollState()
    window.addEventListener("scroll", checkScrollState, { passive: true })
    window.addEventListener("resize", checkScrollState, { passive: true })
    return () => {
      window.removeEventListener("scroll", checkScrollState)
      window.removeEventListener("resize", checkScrollState)
    }
  }, [checkScrollState])

  const getSectionTops = (): number[] => {
    const sections = Array.from(document.querySelectorAll("section, footer"))
    const tops = sections
      .map((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top + window.scrollY - HEADER_OFFSET
      })
      .filter((top) => !isNaN(top))
      .sort((a, b) => a - b)

    // Remove duplicates or very close section tops (within 20px)
    return tops.filter((top, index, self) => {
      return index === 0 || Math.abs(top - self[index - 1]) > 20
    })
  }

  const scrollUp = () => {
    const currentY = window.scrollY
    const sectionTops = getSectionTops()

    // Find previous section top that is significantly above current scroll position
    const prevSection = sectionTops
      .slice()
      .reverse()
      .find((top) => top < currentY - 30)

    if (prevSection !== undefined && prevSection > 20) {
      window.scrollTo({ top: Math.max(0, prevSection), behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const scrollDown = () => {
    const currentY = window.scrollY
    const sectionTops = getSectionTops()

    // Find next section top that is significantly below current scroll position
    const nextSection = sectionTops.find((top) => top > currentY + 30)

    if (nextSection !== undefined) {
      window.scrollTo({ top: nextSection, behavior: "smooth" })
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <aside
      aria-label="Fast scroll controls"
      className="fixed right-4 bottom-6 sm:right-6 sm:bottom-8 z-40 flex flex-col gap-2.5 items-center pointer-events-none"
    >
      {/* Up Button */}
      <button
        type="button"
        onClick={scrollUp}
        aria-label="Scroll to previous section"
        title="Scroll to previous section"
        tabIndex={isAtTop ? -1 : 0}
        className={cn(
          "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#1c3b7a]/90 text-white backdrop-blur-md border border-white/20 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:bg-[#2648A6] hover:scale-110 hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 group cursor-pointer",
          isAtTop
            ? "opacity-0 scale-75 translate-y-3 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        )}
      >
        <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-y-0.5" />
      </button>

      {/* Down Button */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll to next section"
        title="Scroll to next section"
        tabIndex={isAtBottom ? -1 : 0}
        className={cn(
          "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#1c3b7a]/90 text-white backdrop-blur-md border border-white/20 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:bg-[#2648A6] hover:scale-110 hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 group cursor-pointer",
          isAtBottom
            ? "opacity-0 scale-75 -translate-y-3 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        )}
      >
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-y-0.5" />
      </button>
    </aside>
  )
}
