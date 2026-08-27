import React from "react"
import { useInView } from "@/hooks/useInView"

export type AOSAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "flip-up"

interface AOSRevealProps {
  children: React.ReactNode
  animation?: AOSAnimation
  delay?: number // milliseconds
  duration?: number // milliseconds
  className?: string
  threshold?: number
  as?: React.ElementType
}

/**
 * AOS (Animate On Scroll) reveal component.
 * Integrates with the 'aos' library via data-aos attributes while maintaining 
 * hardware-accelerated CSS transitions for maximum scroll responsiveness.
 */
export function AOSReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 450,
  className = "",
  threshold = 0.1,
  as: Component = "div",
}: AOSRevealProps) {
  const [ref, isInView] = useInView<HTMLElement>({ threshold, triggerOnce: true })

  const getInitialStyle = (): string => {
    switch (animation) {
      case "fade-up":
        return "translate-y-6 opacity-0"
      case "fade-down":
        return "-translate-y-6 opacity-0"
      case "fade-left":
        return "translate-x-6 opacity-0"
      case "fade-right":
        return "-translate-x-6 opacity-0"
      case "zoom-in":
        return "scale-95 opacity-0"
      case "flip-up":
        return "[transform:perspective(600px)_rotateX(15deg)_translateY(15px)] opacity-0"
      default:
        return "translate-y-6 opacity-0"
    }
  }

  const getActiveStyle = (): string => {
    return "translate-y-0 translate-x-0 scale-100 [transform:perspective(600px)_rotateX(0deg)_translateY(0px)] opacity-100"
  }

  return (
    <Component
      ref={ref as React.Ref<any>}
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-once="true"
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`will-change-transform ${isInView ? getActiveStyle() : getInitialStyle()} ${className}`}
    >
      {children}
    </Component>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  staggerDelay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
}

/**
 * Performance-first staggered text/word entrance animation component.
 * Animates text word-by-word with hardware acceleration as it enters view.
 */
export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  staggerDelay = 50,
  as: Component = "h2",
}: TextRevealProps) {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1, triggerOnce: true })
  const words = text.split(" ")

  return (
    <Component ref={ref as React.Ref<any>} className={`inline-block ${className}`}>
      {words.map((word, index) => {
        const itemDelay = delay + index * staggerDelay
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1 pr-[0.25em]">
            <span
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "450ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${itemDelay}ms`,
              }}
              className={`inline-block will-change-transform ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              } ${wordClassName}`}
            >
              {word}
            </span>
          </span>
        )
      })}
    </Component>
  )
}

/**
 * Animated gradient text component with smooth CSS shimmer.
 */
export function GradientText({
  children,
  className = "",
  gradient = "from-[#2648A6] via-[#4F83F5] to-[#2648A6]",
}: {
  children: React.ReactNode
  className?: string
  gradient?: string
}) {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-text-shimmer ${className}`}
    >
      {children}
    </span>
  )
}
