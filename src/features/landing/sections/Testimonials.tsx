import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import womanPortrait from "@/assets/become-one/avatars/woman-portrait.png"
import fashionistas from "@/assets/become-one/avatars/fashionistas.png"
import seamoss from "@/assets/become-one/avatars/seamoss.png"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const TESTIMONIALS = [
  {
    quote:
      "With Moova, I don’t have to stop what I’m doing to manage deliveries. Their drivers come straight to my shop, giving me more time to focus on my business.",
    name: "Tuliza Ngozi",
    role: "Owner",
    avatar: womanPortrait,
    featured: false,
    delay: 0,
  },
  {
    quote:
      "Moova makes delivery simple and transparent. My customers know exactly what’s happening with their orders at every step, and that gives them confidence.",
    name: "Rona Shop",
    role: "Owner",
    avatar: fashionistas,
    featured: true,
    delay: 120,
  },
  {
    quote:
      "I can finally manage 20+ deliveries a day without losing my mind. Best logistics investment I've made.",
    name: "SeaMoss From Zanzibar",
    role: "Owner",
    avatar: seamoss,
    featured: false,
    delay: 240,
  },
] as const

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-[#00C853] p-0.5 rounded-[2px]">
          <Star className="h-2.5 w-2.5 fill-white text-white" />
        </div>
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
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B89] tracking-tight"
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
                className={`transition-all duration-300 rounded-2xl ${
                  t.featured
                    ? "border-0 bg-[#2648A6] py-8 sm:py-10 shadow-xl lg:scale-105 text-white"
                    : "bg-white py-8 sm:py-10 shadow-sm border-slate-100"
                }`}
              >
                <CardContent className="px-5 sm:px-8">
                  <Quote className="h-7 w-7 sm:h-8 sm:w-8 text-[#5DD586]" strokeWidth={2.5} />

                  <p
                    className={`mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed ${
                      t.featured ? "text-white" : "text-slate-800"
                    }`}
                  >
                    "{t.quote}"
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center gap-3">
                    <Avatar className="h-11 w-11 sm:h-12 sm:w-12">
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <StarRating />
                      <p
                        className={`text-xs sm:text-sm font-semibold mt-0.5 ${
                          t.featured ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {t.role}
                      </p>
                      <p
                        className={`text-xs sm:text-sm ${
                          t.featured ? "text-white/80" : "text-slate-600"
                        }`}
                      >
                        {t.name}
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