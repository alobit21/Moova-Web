import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import manOne from "@/assets/testimonies/testimonial-man-1.png"
import manTwo from "@/assets/testimonies/testimonial-man-2.png"
import manThree from "@/assets/testimonies/testimonial-man-3.png"

const TESTIMONIALS = [
  {
    quote:
      "Moova transformed my customer relationships. No more calls asking for delivery status. Trust is through the roof.",
    name: "Mike Torello",
    role: "CEO of Initech",
    avatar: manOne,
    featured: false,
  },
  {
    quote:
      "The branded tracking page is a game-changer. My customers feel like they are buying from a global brand.",
    name: "Richards Hawkins",
    role: "Marketing Manager of Upnow",
    avatar: manTwo,
    featured: true,
  },
  {
    quote:
      "I can finally manage 20+ deliveries a day without losing my mind. Best logistics investment I've made.",
    name: "Thomas Magnum",
    role: "Barellon NSW",
    avatar: manThree,
    featured: false,
  },
] as const

function StarRating() {
  return (
    <div className="flex w-fit items-center gap-0.5 rounded bg-brand px-1.5 py-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-white text-white" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="text-center text-4xl font-extrabold text-blue-900 sm:text-5xl">
          What Online Businesses Say
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-center">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className={
                t.featured
                  ? "border-0 bg-blue-900 py-10 shadow-xl lg:scale-105"
                  : " bg-white py-10 "
              }
            >
              <CardContent className="px-8">
                <Quote className="h-8 w-8 text-brand" strokeWidth={2.5} />

                <p
                  className={`mt-6 text-base leading-relaxed ${
                    t.featured ? "text-white" : "text-foreground"
                  }`}
                >
                  "{t.quote}"
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-[52px] w-[52px] rounded-full object-cover"
                  />
                  <div>
                    <StarRating />
                    <p
                      className={`mt-1 font-semibold ${
                        t.featured ? "text-white" : "text-foreground"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-sm ${
                        t.featured ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}