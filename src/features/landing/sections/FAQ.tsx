import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// NOTE: only "What is Moova?" copy came from the design.
// The rest are placeholder answers — swap in real copy before shipping.
const FAQ_ITEMS = [
  {
    value: "what-is-moova",
    question: "What is Moova?",
    answer:
      "Moova is a last-mile delivery management platform designed for online sellers to manage, track, and optimize their delivery process while providing a transparent experience to their customers.",
  },
  {
    value: "track-deliveries",
    question: "Can customers track deliveries?",
    answer:
      "Yes — every delivery includes a live tracking link customers can open in their browser, no app required, so they can follow their order from pickup to drop-off.",
  },
  {
    value: "own-riders",
    question: "Can I use my own riders?",
    answer:
      "Yes. You can onboard your own riders onto Moova, use our network of delivery partners, or mix both depending on the order.",
  },
  {
    value: "customer-app",
    question: "Do customers need an app?",
    answer:
      "No. Customers track deliveries through a link sent via SMS or WhatsApp — no download or account required.",
  },
  {
    value: "multiple-deliveries",
    question: "Can I manage multiple deliveries?",
    answer:
      "Yes. The Moova dashboard lets you create, assign, and monitor multiple deliveries at once, with full visibility into every order's status.",
  },
] as const

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold font-instrument text-[#1F3B89] tracking-tight">
          Frequently Asked Questions
        </h2>

        <Accordion defaultValue={["what-is-moova"]} className="mt-10 sm:mt-14 gap-3 sm:gap-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="rounded-2xl border border-border bg-white px-4 sm:px-6 not-last:border-b-0"
            >
              <AccordionTrigger className="py-4 sm:py-5 text-sm sm:text-lg font-semibold text-foreground hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}