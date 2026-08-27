import { useEffect, useRef, useState, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Lightweight, performance-first IntersectionObserver hook.
 * Uses native browser IntersectionObserver without external libraries.
 * Gracefully falls back to visible if IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", triggerOnce = true } = options
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    // Fallback for environments without IntersectionObserver
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true)
      return
    }

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

/**
 * Lightweight hook to track whether a continuous animation section is currently visible in the viewport.
 * Used to pause marquee JS/CSS loops when scrolled out of view to conserve GPU & battery power.
 */
export function useSectionVisibility<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  boolean
] {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return [ref, isVisible]
}
