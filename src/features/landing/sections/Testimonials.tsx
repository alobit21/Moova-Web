import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import manOne from "@/assets/testimonies/testimonial-man-1.png"
import manTwo from "@/assets/testimonies/testimonial-man-2.png"
import manThree from "@/assets/testimonies/testimonial-man-3.png"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const TESTIMONIALS = [
  {
    quote:
      "Moova transformed my customer relationships. No more calls asking for delivery status. Trust is through the roof.",
    name: "Mike Torello",
    role: "CEO of Initech",
    avatar: manOne,
    featured: false,
    delay: 0,
  },
  {
    quote:
      "The branded tracking page is a game-changer. My customers feel like they are buying from a global brand.",
    name: "Richards Hawkins",
    role: "Marketing Manager of Upnow",
    avatar: manTwo,
    featured: true,
    delay: 120,
  },
  {
    quote:
      "I can finally manage 20+ deliveries a day without losing my mind. Best logistics investment I've made.",
    name: "Thomas Magnum",
    role: "Barellon NSW",
    avatar: manThree,
    featured: false,
    delay: 240,
  },
] as const

function StarRating() {
  return (
    <div className="flex w-fit items-center gap-0.5 rounded px-1.5 py-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-[#5DD586] text-[#FFFFFF]" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center">
        <TextReveal
          as="h2"
          text="29K+ Happy Customers in Tanzania"
          delay={0}
          staggerDelay={60}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold  text-[#1F3B89] tracking-tight"
        />
        <AOSReveal animation="fade-up" delay={150}>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-[#1F3B89]">
            400+ Deliveries Completed • 150+ Online Businesses
          </p>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base font-regular text-[#5E656E]">
            Real Deliveries. Real Results. Real Stories.
          </p>
        </AOSReveal>

        <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-center text-left">
          {TESTIMONIALS.map((t) => (
            <AOSReveal
              key={t.name}
              animation={t.featured ? "zoom-in" : "fade-up"}
              delay={t.delay}
            >
              <Card
                className={`transition-all duration-300 ${t.featured
                    ? "border-0 bg-blue-900 py-8 sm:py-10 shadow-xl lg:scale-105"
                    : "bg-white py-8 sm:py-10 shadow-sm"
                  }`}
              >
                <CardContent className="px-5 sm:px-8">
                  <Quote className="h-7 w-7 sm:h-8 sm:w-8 text-[#5DD586]" strokeWidth={2.5} />

                  <p
                    className={`mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed ${t.featured ? "text-[#FFFFFF]" : "text-foreground"
                      }`}
                  >
                    "{t.quote}"
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center gap-3">
                    <Avatar className="h-11 w-11 sm:h-13 sm:w-13">
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <StarRating />
                      <p
                        className={`mt-1 text-sm sm:text-base font-semibold ${t.featured ? "text-[#FFFFFF]" : "text-foreground"
                          }`}
                      >
                        {t.name}
                      </p>
                      <p
                        className={`text-xs sm:text-sm ${t.featured ? "text-[#FFFFFF]/70" : "text-muted-foreground"
                          }`}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AOSReveal>
          ))}
        </div>
      </div>
    </section>
  )
}