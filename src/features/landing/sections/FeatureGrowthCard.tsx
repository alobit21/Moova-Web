import { Card, CardContent } from "@/components/ui/card"
import growthPhone from "@/assets/features/phone-delivery-orders-crop.png"
import growthIcon from "@/assets/features/icon-growth.png"

export function FeatureGrowthCard() {
  return (
    <Card className="h-full overflow-hidden rounded-3xl border-0 bg-indigo-50 p-0 shadow-none">
      <CardContent className="flex h-full flex-col p-8 pb-0 sm:p-10 sm:pb-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand sm:h-16 sm:w-16">
          <img src={growthIcon} alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-blue-900 sm:text-3xl">
          Stop Managing Deliveries.
          <br />
          Start Growing Your Business.
        </h3>

        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Spend less time calling riders, following up on orders, and
          answering "Where is my order?" messages. Manage everything from
          one simple dashboard.
        </p>

        <div className="mt-8 flex flex-1 items-end justify-center">
          <img
            src={growthPhone}
            alt="Moova app delivery orders screen"
            className="w-[75%] max-w-[300px] translate-y-4 sm:max-w-[320px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}