import { FeatureShowcaseCard } from "./FeatureShowcaseCard"
import { FeatureGrowthCard } from "./FeatureGrowthCard"
import { FeatureExperienceCard } from "./FeatureExperienceCard"
import { FeatureAlwaysOnCard } from "./FeatureAlwaysOnCard"
import { FeaturePerformanceCard } from "./FeaturePerformanceCard"
import { FeatureRepeatCustomerCard } from "./FeatureRepeatCustomerCard"

export function BuiltForGrowingBusinesses() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 tracking-tight">
            Built For Growing Online Businesses
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            From creating delivery orders and assigning riders to tracking
            performance and keeping customers informed, We gives your
            business every tool needed to deliver with confidence.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-10 sm:mt-14 flex flex-col gap-4 sm:gap-6">
          {/* Row 1 — full width */}
          <FeatureShowcaseCard />

          {/* Row 2 — two columns on md+ */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <FeatureGrowthCard />
            <FeatureExperienceCard />
          </div>

          {/* Row 3 — three columns on lg+ */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <FeatureAlwaysOnCard />
            <FeaturePerformanceCard />
            <FeatureRepeatCustomerCard />
          </div>
        </div>
      </div>
    </section>
  )
}