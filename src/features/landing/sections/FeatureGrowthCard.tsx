import { Card, CardContent } from "@/components/ui/card"
import growthPhone from "@/assets/features/phone-delivery-orders-crop.png"
import growthIcon from "@/assets/features/icon-growth.png"

export function FeatureGrowthCard() {
  return (
    <Card className="h-full overflow-hidden rounded-3xl border-0 bg-[#EAEEFA] p-0 shadow-none">
      <CardContent className="flex h-full flex-col p-8 pb-0 sm:p-10 sm:pb-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5DD586] sm:h-14 sm:w-14">
          <img src={growthIcon} alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>


        <h3 className="mt-5 text-2xl font-semibold  leading-tight text-[#2648A6] sm:text-3xl">
          Stop Managing Deliveries.
          <br />
          Start Growing Your Business.
        </h3>

        <p className="mt-4 max-w-md text-base leading-relaxed font-regular  text-[#5E656E]">
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