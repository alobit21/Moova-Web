import { Card, CardContent } from "@/components/ui/card"
import experiencePhone from "@/assets/features/phone-shop-home.png"
import gearIcon from "@/assets/features/icon-gear.png"

export function FeatureExperienceCard() {
  return (
    <Card className="h-full  overflow-hidden rounded-3xl border-0  bg-[#2648A6] p-0 shadow-none">
      <CardContent className="flex h-full flex-col p-8 pb-0 sm:p-10 sm:pb-0">
        <div className="flex items-center justify-start">
          <img src={gearIcon} alt="" className="h-12 w-12 sm:h-14 sm:w-14" />
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-[#FFFFFF] sm:text-3xl">
          Every Order Deserves a Better Experience.
        </h3>

        <p className="mt-4 max-w-md  font-regular text-base leading-relaxed text-[#EAEEFA]">
          Create delivery orders in seconds, assign trusted riders, and keep
          every package moving without the manual coordination.
        </p>

        <div className="relative mt-8 flex flex-1 items-end justify-center">
          <img
            src={experiencePhone}
            alt="Moova app home screen showing shop performance"
            className="w-[75%] max-w-[280px] sm:max-w-[320px] translate-y-4"
          />

          <Card className="absolute -right-4 sm:-right-12 top-32 sm:top-[45%] gap-3 rounded-[12px] border-0 p-0 shadow-lg bg-white/95 backdrop-blur-xs">
            <CardContent className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                <svg
                  className="h-4 w-4 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-[#5E656E]">Live Now</p>
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  Tracking Active
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}