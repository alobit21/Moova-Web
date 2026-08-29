import { FeatureShowcaseCard } from "./FeatureShowcaseCard"
import { FeatureGrowthCard } from "./FeatureGrowthCard"
import { FeatureExperienceCard } from "./FeatureExperienceCard"
import { FeatureAlwaysOnCard } from "./FeatureAlwaysOnCard"
import { FeaturePerformanceCard } from "./FeaturePerformanceCard"
import { FeatureRepeatCustomerCard } from "./FeatureRepeatCustomerCard"
import { AOSReveal, TextReveal, GradientText } from "@/components/animation/AOSReveal"

export function BuiltForGrowingBusinesses() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <TextReveal
            as="h2"
            text="Built For Growing Online Businesses"
            delay={0}
            staggerDelay={50}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-instrumental text-[#2648A6] tracking-tight"
          />
          <AOSReveal animation="fade-up" delay={150}>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#5E656E] font-regular font-instrumental">
              From creating delivery orders and assigning riders to tracking
              performance and keeping customers informed,{" "}
              <GradientText gradient="from-blue-900 via-blue-600 to-blue-900" className="font-semibold">
                Moova
              </GradientText>{" "}
              gives your business every tool needed to deliver with confidence.
            </p>
          </AOSReveal>
        </div>

        {/* Bento grid */}
        <div className="mt-10 sm:mt-14 flex flex-col gap-4 sm:gap-6">
          {/* Row 1 — AOS zoom-in */}
          <AOSReveal animation="zoom-in" delay={100}>
            <FeatureShowcaseCard />
          </AOSReveal>

          {/* Row 2 — two columns with AOS fade-right and fade-left */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <AOSReveal animation="fade-right" delay={150}>
              <FeatureGrowthCard />
            </AOSReveal>
            <AOSReveal animation="fade-left" delay={250}>
              <FeatureExperienceCard />
            </AOSReveal>
          </div>

          {/* Row 3 — three columns with staggered AOS fade-up */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            <AOSReveal animation="fade-up" delay={100}>
              <FeatureAlwaysOnCard />
            </AOSReveal>
            <AOSReveal animation="fade-up" delay={200}>
              <FeaturePerformanceCard />
            </AOSReveal>
            <AOSReveal animation="fade-up" delay={300}>
              <FeatureRepeatCustomerCard />
            </AOSReveal>
          </div>
        </div>
      </div>
    </section>
  )
}