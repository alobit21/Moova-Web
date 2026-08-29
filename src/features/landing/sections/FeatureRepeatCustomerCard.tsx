import { Card, CardContent } from "@/components/ui/card"

export function FeatureRepeatCustomerCard() {
  return (
    <Card className="h-full overflow-hidden rounded-3xl border-0 bg-emerald-400 p-0 shadow-none">
      <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center sm:p-10">
        <h3 className="max-w-xs text-2xl font-bold leading-tight text-[#FFFFFF]">
          Turn Every Delivery Into Your Next Repeat Customer.
        </h3>
      </CardContent>
    </Card>
  )
}