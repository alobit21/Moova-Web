import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AOSReveal, TextReveal } from "@/components/animation/AOSReveal"

const FAQ_ITEMS = [
  {
    value: "what-is-moova",
    question: "What is Moova?",
    answer:
      "Moova is a delivery platform that helps online businesses manage and deliver orders to their customers. We connect businesses with drivers and provide tools to make deliveries easier to manage, track, and coordinate.",
  },
  {
    value: "track-orders",
    question: "Can my customers track their orders?",
    answer:
      "Yes. Your customers can receive updates on their delivery and follow the progress of their order, helping them know what is happening from pickup to delivery.",
  },
  {
    value: "own-driver",
    question: "Can I use my own driver?",
    answer:
      "Yes. You can invite your own driver to Moova and manage your deliveries through the platform. This allows you to continue working with drivers you already know and trust while benefiting from Moova's delivery management and tracking features.",
  },
  {
    value: "customer-app",
    question: "Do my customers need to have the Moova app?",
    answer:
      "No. Your customers don't need to download the Moova app to receive their orders or get delivery updates. We make it simple for your customers to stay informed throughout the delivery process.",
  },
  {
    value: "more-than-one-order",
    question: "What if I have more than one order?",
    answer:
      "Moova helps you manage multiple orders in one place. You can create and monitor several deliveries, check their status, and keep track of your orders without having to manage each delivery separately.",
  },
  {
    value: "order-damaged-or-lost",
    question: "What happens if a customer's order is damaged or lost?",
    answer:
      "If an order is damaged, lost, or there is another issue during delivery, please contact Moova as soon as possible. Our team will review the delivery details and help determine the appropriate next steps based on the circumstances and Moova's applicable policies.",
  },
] as const

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 text-center">
        <TextReveal
          as="h2"
          text="Frequently Asked Questions"
          delay={0}
          staggerDelay={60}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-instrument text-[#1F3B89] tracking-tight"
        />

        <Accordion defaultValue={["what-is-moova"]} className="mt-10 sm:mt-14 gap-3 sm:gap-4 text-left">
          {FAQ_ITEMS.map((item, index) => (
            <AOSReveal key={item.value} animation="fade-up" delay={index * 70}>
              <AccordionItem
                value={item.value}
                className="rounded-2xl border border-border bg-white px-4 sm:px-6 not-last:border-b-0"
              >
                <AccordionTrigger className="py-4 sm:py-5 text-sm sm:text-lg font-semibold text-foreground hover:no-underline text-left cursor-pointer">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-smtext-[#5E656E] leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AOSReveal>
          ))}
        </Accordion>
      </div>
    </section>
  )
}