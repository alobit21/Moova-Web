import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import slide1 from "@/assets/delivery-journey/slide-1.png"
import slide2 from "@/assets/delivery-journey/slide-2.png"
import slide3 from "@/assets/delivery-journey/slide-3.png"
import slide4 from "@/assets/delivery-journey/slide-4.png"
import slide5 from "@/assets/delivery-journey/slide-5.png"

const SLIDES = [slide1, slide2, slide3, slide4, slide5]

export function DeliveryJourney() {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <Carousel
          opts={{ loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {SLIDES.map((src, i) => (
              <CarouselItem key={i}>
                <img
                  src={src}
                  alt={`Delivery journey step ${i + 1}`}
                  className="w-full rounded-2xl object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}