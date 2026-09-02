import React, { useEffect, useState, useRef } from "react"
import loaderIcon from "@/assets/Loader/loader.png"
import { cn } from "@/lib/utils"

export interface LoaderProps {
  /** Controls loader visibility with smooth transition */
  show?: boolean
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl"
  /** Display as full-screen fixed overlay */
  fullScreen?: boolean
  /** Display as container absolute overlay */
  overlay?: boolean
  /** Primary text message */
  text?: React.ReactNode
  /** Secondary subtitle message */
  subtext?: React.ReactNode
  /** Additional container classes */
  className?: string
  /** Minimum display duration in ms to prevent flickering (default: 450ms) */
  minDuration?: number
}

interface LoaderIconProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoaderIcon({ size = "md", className }: LoaderIconProps) {
  const sizeMap = {
    sm: { container: "w-10 h-10", icon: "w-6 h-6", stroke: 3.5 },
    md: { container: "w-20 h-20", icon: "w-12 h-12", stroke: 4 },
    lg: { container: "w-28 h-28", icon: "w-16 h-16", stroke: 4 },
    xl: { container: "w-36 h-36", icon: "w-22 h-22", stroke: 4.5 },
  }

  const currentSize = sizeMap[size] || sizeMap.md

  return (
    <div className={cn("relative flex items-center justify-center select-none shrink-0", currentSize.container, className)}>
      {/* Outer ambient glow background */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" />

      {/* Outer subtle concentric guide circle */}
      <div className="absolute inset-0 rounded-full border border-emerald-400/25" />

      {/* SVG Animated Spinning Outer Arc */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin"
        style={{ animationDuration: "1.1s" }}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Track circle */}
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="#10B981"
          strokeOpacity="0.18"
          strokeWidth={currentSize.stroke}
        />
        {/* Sweeping arc */}
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="#10B981"
          strokeWidth={currentSize.stroke}
          strokeDasharray="75 190"
          strokeLinecap="round"
        />
      </svg>

      {/* Center green icon */}
      <div className="relative z-10 flex items-center justify-center rounded-full drop-shadow-sm transition-transform duration-300 hover:scale-105">
        <img
          src={loaderIcon}
          alt="Moova loading icon"
          className={cn("object-contain rounded-full", currentSize.icon)}
        />
      </div>
    </div>
  )
}

export function Loader({
  show = true,
  size = "md",
  fullScreen = false,
  overlay = false,
  text = "Be Trusted from the first click",
  subtext = "Turn every first delivery into a reason for customers to come back.",
  className,
  minDuration = 450,
}: LoaderProps) {
  const [render, setRender] = useState(show)
  const [fadeIn, setFadeIn] = useState(false)
  const mountTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let fadeTimer: ReturnType<typeof setTimeout>

    if (show) {
      mountTimeRef.current = Date.now()
      setRender(true)
      // Small frame offset for CSS transition to trigger smoothly
      fadeTimer = setTimeout(() => {
        setFadeIn(true)
      }, 30)
    } else {
      setFadeIn(false)
      const elapsed = Date.now() - mountTimeRef.current
      const remaining = Math.max(0, minDuration - elapsed)

      timer = setTimeout(() => {
        setRender(false)
      }, remaining + 300)
    }

    return () => {
      clearTimeout(timer)
      clearTimeout(fadeTimer)
    }
  }, [show, minDuration])

  if (!render) return null

  const containerClasses = cn(
    "flex flex-col items-center justify-center text-center transition-all duration-300 ease-out",
    fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
    fullScreen && "fixed inset-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-6",
    overlay && "absolute inset-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6",
    !fullScreen && !overlay && "py-8 px-4",
    className
  )

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {/* Animated Loader Icon */}
      <LoaderIcon size={size} />

      {/* Main Text Heading */}
      {text && (
        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight max-w-md">
          {text}
        </h3>
      )}

      {/* Subtext Paragraph */}
      {subtext && (
        <p className="mt-3 text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  )
}
