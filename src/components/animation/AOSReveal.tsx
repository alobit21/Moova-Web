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
 * Official AOS (Animate On Scroll) wrapper component.
 * Attaches official data-aos attributes for the installed 'aos' library,
 * ensuring seamless performance, zero stuck elements, and perfect accessibility.
 */
export function AOSReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  as: Component = "div",
}: AOSRevealProps) {
  return (
    <Component
      data-aos={animation}
      data-aos-delay={delay || undefined}
      data-aos-duration={duration}
      data-aos-once="true"
      className={className}
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
  staggerDelay = 65,
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
                transitionDuration: "650ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
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
