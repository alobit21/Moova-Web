import becomeOneCircles from "@/assets/become-one-circles.png"

export function BecomeOne() {
  return (
    <section
      id="customers"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="text-4xl font-extrabold leading-tight text-[#1c3b7a] sm:text-5xl">
          Become One of Those Seeking to Turn First-Time Buyers Into Loyal
          Customers
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Join hundreds of merchants already building lasting customer
          relationships through optimized lifecycle marketing.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl px-6 lg:px-12">
        <img
          src={becomeOneCircles}
          alt="Circular diagram of merchant brands using Moova, including Fashion Center, Belle Nubian, Seamoss, Fashionista's, Royal Herbs, Korean Cosmetics, Lui Styles, MDIGO, and NL"
          className="mx-auto w-full max-w-2xl"
        />
      </div>
    </section>
  )
}