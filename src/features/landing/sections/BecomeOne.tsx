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

export function BecomeOne() {
  return (
    <section id="customers" className="relative overflow-hidden bg-[#F5F9FF] py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
  <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
  <span className="block text-[#191B1F]">
    Become One of Those Seeking to Turn First-Time
  </span>

  <span className="block font-[Instrument_Sans] italic text-[#1F3B89]">
    Buyers Into Loyal Customers
  </span>
</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Join hundreds of merchants already building lasting customer
          relationships through optimized lifecycle marketing.
        </p>
      </div>

      <div className="relative mx-auto mt-16 aspect-square w-full max-w-[560px]">
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
    </section>
  )
}