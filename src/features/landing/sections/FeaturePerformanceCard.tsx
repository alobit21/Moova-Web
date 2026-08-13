import { Card, CardContent } from "@/components/ui/card"
import performancePhone from "@/assets/features/performance-bg.png"
import dollarIcon from "@/assets/features/icon-dollar.png"

export function FeaturePerformanceCard() {
  return (
    <Card className="h-full overflow-hidden rounded-3xl border-0 bg-white p-0 shadow-none">
      <CardContent className="flex h-full flex-col p-8 pb-0 sm:p-10 sm:pb-0">
        <div className="flex h-14 w-14 items-center justify-center   sm:h-16 sm:w-16">
          <img src={dollarIcon} alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-blue-900 sm:text-3xl">
          Measure Delivery Performance
        </h3>

        <div className="mt-6 flex flex-1 items-end justify-end">
          <img
            src={performancePhone}
            alt="Moova app shop profile screen showing order stats and rating"
            className="w-[85%] max-w-[340px] translate-x-6 translate-y-4"
          />
        </div>
      </CardContent>
    </Card>
  )
}