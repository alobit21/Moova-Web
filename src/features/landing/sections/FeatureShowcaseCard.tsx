import { Card, CardContent } from "@/components/ui/card"
import showcaseBg from "@/assets/features/showcase-bg.png"
import globeIcon from "@/assets/features/icon-globe.png"

export function FeatureShowcaseCard() {
  return (
    <Card
      className="overflow-hidden rounded-3xl border-0 bg-indigo-50 bg-cover bg-left bg-no-repeat p-0 shadow-none"
      style={{ backgroundImage: `url(${showcaseBg})` }}
    >
      <CardContent className="flex min-h-[300px] flex-col items-start justify-center gap-5 p-8 sm:min-h-[360px] sm:p-10 md:items-start md:p-12 md:pl-[52%]">
        <img src={globeIcon} alt="" className="h-12 w-12 sm:h-14 sm:w-14" />
        <h3 className="max-w-md text-2xl font-bold leading-tight text-blue-900 sm:text-3xl md:text-4xl">
          Every Delivery Is A Chance To Win Your Customer Again.
        </h3>
      </CardContent>
    </Card>
  )
}