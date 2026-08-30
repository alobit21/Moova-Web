import { Card, CardContent } from "@/components/ui/card"
import phoneFront from "@/assets/cta/iMockup - iPhone 15.png"
import phoneBack from "@/assets/cta/iMockup - iPhone.png"
import showcaseBg from "@/assets/features/showcase-bg.png"

export function FeatureShowcaseCard() {
  return (
    <Card className="relative w-full mx-auto xl:max-w-[1373px] md:h-[300px] lg:h-[330px] xl:h-[352px] overflow-hidden rounded-2xl sm:rounded-3xl border-0 bg-[#F2F5FB] p-0 shadow-none">
      
      {/* Desktop Background Image (Hidden on Mobile) */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${showcaseBg})` }}
      />

      <CardContent className="relative z-10 p-0 h-full flex flex-col md:block">
        
        {/* Text Container (Top on Mobile, Right on Desktop) */}
        <div className="order-1 flex flex-col justify-center px-8 pt-10 pb-4 md:pt-0 md:pb-0 md:pl-[42%] lg:pl-[40%] xl:pl-[38%] md:pr-12 lg:pr-16 xl:pr-20 text-left md:h-full">
          <h3 className="max-w-[745px] mx-auto md:mx-0 text-[26px] sm:text-3xl lg:text-[32px] xl:text-[36px] font-semibold leading-[1.2] text-[#2648A6]">
            Every Delivery Is A Chance To Win Your Customer Again.
          </h3>
        </div>

        {/* Mobile Phones (Hidden on Desktop) */}
        <div className="order-2 md:hidden flex items-end justify-center w-full mt-4 pr-4 sm:pr-8">
          {/* Black Phone (Left, Front, Smaller but nearly same height) */}
          <img
            src={phoneFront}
            alt="Delivery orders"
            className="relative z-20 w-[190px] sm:w-[230px] object-contain drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] origin-bottom"
          />
          {/* White Phone (Right, Back, Slightly Larger) */}
          <img
            src={phoneBack}
            alt="Shop performance"
            className="relative z-10 w-[200px] sm:w-[240px] object-contain drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] -ml-29 sm:-ml-37 origin-bottom translate-y-2"
          />
        </div>

      </CardContent>
    </Card>
  )
}