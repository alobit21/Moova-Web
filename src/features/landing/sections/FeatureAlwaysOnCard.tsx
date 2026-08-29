import { Card, CardContent } from "@/components/ui/card"

export function FeatureAlwaysOnCard() {
  return (
    <Card className="h-full overflow-hidden rounded-3xl border-0 bg-blue-900 p-0 shadow-none">
      <CardContent className="flex h-full flex-col justify-center p-8 sm:p-10">
        <h3 className="text-2xl font-bold leading-tight text-[#FFFFFF] sm:text-3xl">
          Your Delivery
          <br />
          Business Never
          <br />
          Stops.
        </h3>

        <p className="mt-6 max-w-sm text-base leading-relaxed text-[#FFFFFF]/70">
          Whether you're in your shop, at home, or on the move, we keeps
          your delivery operation in your pocket.
        </p>
      </CardContent>
    </Card>
  )
}