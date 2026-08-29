import { Button } from "@/components/ui/button"
import ctaBackground from "@/assets/cta/cta-background.png"
import phoneFront from "@/assets/cta/iMockup - iPhone 15.png"
import phoneBack from "@/assets/cta/iMockup - iPhone.png"

export function DeliverWithConfidence() {
  return (
    <section
      className="relative bg-cover bg-center pt-16 sm:pt-24 lg:pt-32 font-instrument z-10 overflow-hidden"
      style={{ backgroundImage: `url(${ctaBackground})` }}
    >
      {/* Dark overlay for extra contrast if needed */}
      <div className="absolute inset-0 bg-[#1c3b7a]/40 mix-blend-multiply" />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          
          {/* Text Column */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start pb-16 lg:pb-28">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
              Ready to Deliver With Confidence?
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/90">
              Join the growing community of online businesses using Moova to
              manage deliveries, keep customers informed, and build trust with
              every order. From rider assignment to real-time tracking and
              delivery analytics, everything you need is in one place.
            </p>

            <Button
              size="lg"
              className="mt-8 sm:mt-10 w-full sm:w-auto rounded-full bg-[#00C853] px-10 text-base font-bold text-white shadow-lg shadow-emerald-950/20 hover:bg-[#00A844] active:scale-[0.98] transition-all cursor-pointer border-0"
            >
              Start Delivering Better
            </Button>
          </div>

          {/* Phones Column */}
          <div className="flex justify-center lg:justify-end items-end mt-8 lg:mt-0 pb-6 lg:pb-10">
            {/* White Phone (Left, Lower, Front) */}
            <img 
              src={phoneBack} 
              alt="Shop performance" 
              className="relative z-20 w-[180px] sm:w-[220px] lg:w-[280px] xl:w-[320px] object-contain drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-2 duration-500 delay-75 origin-bottom"
            />
            {/* Dark Phone (Right, Higher, Back) */}
            <img 
              src={phoneFront} 
              alt="Delivery orders" 
              className="relative z-10 w-[180px] sm:w-[220px] lg:w-[280px] xl:w-[320px] object-contain drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] -ml-20 sm:-ml-24 lg:-ml-28 xl:-ml-32 mb-12 sm:mb-16 lg:mb-24 transition-transform hover:-translate-y-2 duration-500 origin-bottom"
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}