import { Card, CardContent } from "@/components/ui/card"
import showcaseBg from "@/assets/features/showcase-bg.png"
import globeIcon from "@/assets/features/icon-globe.png"

export function FeatureShowcaseCard() {
  return (
    <Card
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-indigo-50 bg-cover bg-center p-0 shadow-none"
      style={{ backgroundImage: `url(${showcaseBg})` }}
    >
      {/* Background tint overlay for legibility on mobile */}
      <div className="absolute inset-0 bg-indigo-50/85 md:bg-transparent" />
      <CardContent className="relative z-10 flex min-h-[200px] sm:min-h-[340px] flex-col items-start justify-center gap-3 sm:gap-4 p-5 sm:p-10 md:p-12 md:pl-[52%]">
        <img src={globeIcon} alt="" className="h-10 w-10 sm:h-14 sm:w-14" />
        <h3 className="max-w-md text-xl sm:text-3xl md:text-4xl font-bold leading-tight text-blue-900">
          Every Delivery Is A Chance To Win Your Customer Again.
        </h3>
      </CardContent>
    </Card>
  )
}