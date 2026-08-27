import { useEffect, useRef } from "react"
import fashionCenter from "@/assets/become-one/avatars/fashion-center.png"
import royalHerbs from "@/assets/become-one/avatars/royal-herbs.png"
import mdigo from "@/assets/become-one/avatars/mdigo.png"
import nl from "@/assets/become-one/avatars/nl.png"
import womanPortrait from "@/assets/become-one/avatars/woman-portrait.png"
import belleNubian from "@/assets/become-one/avatars/belle-nubian.png"
import seamoss from "@/assets/become-one/avatars/seamoss.png"
import fashionistas from "@/assets/become-one/avatars/fashionistas.png"
import luiStyles from "@/assets/become-one/avatars/lui-styles.png"
import koreanCosmetics from "@/assets/become-one/avatars/korean-cosmetics.png"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const OUTER_ORBIT_AVATARS = [
  { src: fashionCenter, alt: "Fashion Center" },
  { src: royalHerbs, alt: "Royal Herbs" },
  { src: mdigo, alt: "MDIGO Store" },
  { src: nl, alt: "NL" },
  { src: womanPortrait, alt: "Merchant using Moova" },
  { src: belleNubian, alt: "Belle Nubian" },
] as const

const INNER_ORBIT_AVATARS = [
  { src: seamoss, alt: "Seamoss" },
  { src: fashionistas, alt: "Fashionista's" },
  { src: luiStyles, alt: "Lui Styles" },
  { src: koreanCosmetics, alt: "Korean Cosmetics" },
] as const

const OUTER_RADIUS = 270
const INNER_RADIUS = 170
const AVATAR_SIZE = 64

function OrbitRing({
  radius,
  dashArray,
  strokeWidth = 1.5,
}: {
  radius: number
  dashArray: string
  strokeWidth?: number
}) {
  const size = radius * 2
  return (
    <svg
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        fill="none"
        stroke="#93C5FD"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArray}
      />
    </svg>
  )
}

function OrbitAvatar({
  src,
  alt,
  angle,
  radius,
  size,
  counterAnimation = "animate-orbit-reverse",
}: {
  src: string
  alt: string
  angle: number
  radius: number
  size: number
  counterAnimation?: "animate-orbit" | "animate-orbit-reverse"
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="h-0 w-0" style={{ transform: `translateY(-${radius}px)` }}>
        <div className="h-0 w-0" style={{ transform: `rotate(${-angle}deg)` }}>
          <div
            className={`${counterAnimation} -translate-x-1/2 -translate-y-1/2`}
            style={{ width: size, height: size }}
          >
            <Avatar className="h-full w-full rounded-full shadow-lg ring-4 ring-white">
              <AvatarImage src={src} alt={alt} className="object-cover" />
              <AvatarFallback>{alt.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileDockMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  const ALL_AVATARS = [...OUTER_ORBIT_AVATARS, ...INNER_ORBIT_AVATARS]
  const DISPLAY_AVATARS = [...ALL_AVATARS, ...ALL_AVATARS, ...ALL_AVATARS, ...ALL_AVATARS]

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let lastTime = performance.now()
    const speed = 36 // pixels per second

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      offsetRef.current += speed * delta

      const avatarElements = track.querySelectorAll<HTMLElement>(".dock-avatar")
      const singleSetWidth = (track.scrollWidth || 1) / 4

      if (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`

      const containerRect = container.getBoundingClientRect()
      const centerX = containerRect.left + containerRect.width / 2
      const maxDist = 110

      avatarElements.forEach((el) => {
        const elRect = el.getBoundingClientRect()
        const elCenter = elRect.left + elRect.width / 2
        const dist = Math.abs(elCenter - centerX)

        if (dist < maxDist) {
          const factor = Math.cos((dist / maxDist) * (Math.PI / 2))
          const scale = 1 + 0.5 * factor
          const zIndex = Math.round(scale * 10)
          el.style.transform = `scale(${scale})`
          el.style.zIndex = `${zIndex}`
          el.style.filter = `brightness(${1 + 0.15 * factor})`
        } else {
          el.style.transform = "scale(1)"
          el.style.zIndex = "1"
          el.style.filter = "brightness(1)"
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative my-6 w-full overflow-hidden py-10 edge-fade md:hidden"
    >
      <div ref={trackRef} className="flex w-max items-center gap-4 px-4 will-change-transform">
        {DISPLAY_AVATARS.map((avatar, index) => (
          <div
            key={`${avatar.alt}-${index}`}
            className="dock-avatar relative flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-75 ease-out"
          >
            <Avatar className="h-full w-full rounded-full shadow-lg ring-2 ring-white/90">
              <AvatarImage src={avatar.src} alt={avatar.alt} className="object-cover" />
              <AvatarFallback>{avatar.alt.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BecomeOne() {
  return (
    <section id="customers" className="relative overflow-hidden bg-[#F5F9FF] py-14 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center lg:px-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#191B1F]">
          Become One of Those Seeking to Turn Buyers{" "}
          <span className="font-[Instrument_Sans] italic text-[#1F3B89] inline-block">
            Into Loyal Customers
          </span>
        </h2>
        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
          Join hundreds of merchants already building lasting customer
          relationships through optimized logistics.
        </p>
      </div>

      {/* Mobile macOS Dock Magnification Marquee */}
      <MobileDockMarquee />

      {/* Desktop Orbit Ring Visualization */}
      <div className="relative mx-auto mt-4 sm:mt-8 hidden md:flex justify-center items-center overflow-hidden py-4 sm:py-8 h-[500px] md:h-[600px]">
        <div className="relative aspect-square w-[560px] shrink-0 scale-[0.85] md:scale-100 origin-center transition-transform">
          {/* Outer ring: sparse dashes with visible gaps */}
          <OrbitRing radius={OUTER_RADIUS} dashArray="6 16" strokeWidth={1.5} />

          {/* Inner ring: dense, clearly visible dots */}
          <OrbitRing radius={INNER_RADIUS} dashArray="1 6" strokeWidth={2.5} />

          <div className="absolute inset-0 animate-orbit">
            {OUTER_ORBIT_AVATARS.map((avatar, i) => (
              <OrbitAvatar
                key={avatar.alt}
                {...avatar}
                angle={i * (360 / OUTER_ORBIT_AVATARS.length)}
                radius={OUTER_RADIUS}
                size={AVATAR_SIZE}
              />
            ))}
          </div>

          <div className="absolute inset-0 animate-orbit-reverse">
            {INNER_ORBIT_AVATARS.map((avatar, i) => (
              <OrbitAvatar
                key={avatar.alt}
                {...avatar}
                angle={i * (360 / INNER_ORBIT_AVATARS.length) + 45}
                radius={INNER_RADIUS}
                size={AVATAR_SIZE}
                counterAnimation="animate-orbit"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}