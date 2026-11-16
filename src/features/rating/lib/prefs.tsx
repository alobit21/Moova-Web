import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

/** The words of the customer review page, in English and Swahili. {name} is filled in by t(). */
const en = {
  pageTitle: "Moova | Review your purchase",
  pageDescription: "Tell the shop how your purchase went.",
  tagline: "Independent Commerce Network",
  receipt: "Receipt {receipt} · Purchased {when}",
  today: "Today at {time}",
  loading: "Loading your purchase",
  linkCantBeUsed: "This link can't be used",
  linkInvalid: "This review link is invalid.",
  linkExpired: "This link has expired.",
  cantRateAnyMore: "This purchase can no longer be rated.",
  openFailed: "We couldn't open this link. Check your connection and try again.",
  goToSite: "Go to moova.co.tz",
  closedTitle: "Reviews are closed for this purchase",
  closedText: "This purchase can no longer be reviewed.",
  confirmed: "Purchase confirmed",
  thankYou: "Thank you",
  intro: "Your experience with {shop} is complete. Tell us how it went to help other customers shop with confidence.",
  yourPurchase: "Your purchase",
  recordedBy: "Your purchase was recorded by {shop}. Share your feedback to help others find good shops safely.",
  aboutShop: "About the shop",
  verifiedVendor: "Verified vendor",
  statRating: "Rating",
  statTrust: "Trust score",
  statSales: "Sales",
  others: "Others who shopped here",
  othersText: "Real experiences from verified Moova buyers.",
  beFirst: "Be the first to review {shop}.",
  formTitle: "How was your shopping experience?",
  formText: "Your honest review helps future buyers shop with confidence.",
  commentLabel: "Share more about your experience",
  optional: "(optional)",
  commentPlaceholder: "Tell others about the product quality, how the seller communicated, and what the delivery was like…",
  send: "Send my review",
  sharing: "The shop may share my review (for example on Instagram), with my first name only.",
  verifiedBefore: "Your review will carry the ",
  verifiedBold: "Verified Purchase",
  verifiedAfter: " badge from Moova. All reviews are checked for fairness before they are shown.",
  sendFailed: "Your review wasn't saved. Please try again.",
  noteTitle: "Verified Commerce",
  noteText: "Your review is checked by Moova and permanently attached to your purchase. It helps honest sellers thrive with verified buyers across Africa.",
  doneBadge: "Rating & review received",
  doneTitle: "Thank you for sharing your experience!",
  doneText: "We appreciate you taking the time to rate {shop}. Your feedback helps them improve and helps other customers shop with confidence.",
  submitted: "Submitted for review",
  submittedText: "Moova checks every review before it is shown. Yours carries the Verified Purchase badge once it is approved.",
  thanksFor: "Thank you for choosing {shop}.",
  footer: "© {year} Moova. Powered by Moova.",
  tapStar: "Tap a star to rate",
  yourRating: "Your rating",
  starsAria: "{n} out of 5 stars",
  starAria: "{n} star(s), {label}",
  s1: "Very bad",
  s2: "Bad",
  s3: "Okay",
  s4: "Good",
  s5: "Excellent",
  verifiedShort: "Verified",
  verifiedPurchase: "Verified Purchase",
  wrote: "{name} wrote: ",
  noComment: "Rated without a comment.",
  helpful: "Helpful ({n})",
  voteFailed: "Couldn't save that. Please try again.",
  language: "Language",
  toDark: "Switch to dark mode",
  toLight: "Switch to light mode",
}

export type Key = keyof typeof en

const sw: Record<Key, string> = {
  pageTitle: "Moova | Toa maoni kuhusu ununuzi wako",
  pageDescription: "Liambie duka jinsi ununuzi wako ulivyokuwa.",
  tagline: "Mtandao wa Biashara Huru",
  receipt: "Risiti {receipt} · Ulinunua {when}",
  today: "Leo saa {time}",
  loading: "Inapakia ununuzi wako",
  linkCantBeUsed: "Kiungo hiki hakiwezi kutumika",
  linkInvalid: "Kiungo hiki cha maoni si sahihi.",
  linkExpired: "Kiungo hiki kimeisha muda.",
  cantRateAnyMore: "Ununuzi huu hauwezi tena kukadiriwa.",
  openFailed: "Hatukuweza kufungua kiungo hiki. Angalia mtandao wako kisha ujaribu tena.",
  goToSite: "Nenda moova.co.tz",
  closedTitle: "Maoni yamefungwa kwa ununuzi huu",
  closedText: "Ununuzi huu hauwezi tena kutolewa maoni.",
  confirmed: "Ununuzi umethibitishwa",
  thankYou: "Asante",
  intro: "Ununuzi wako kutoka {shop} umekamilika. Tuambie ulivyokuwa ili kuwasaidia wateja wengine kununua kwa uhakika.",
  yourPurchase: "Ununuzi wako",
  recordedBy: "Ununuzi wako umerekodiwa na {shop}. Toa maoni yako ili kuwasaidia wengine kupata maduka mazuri kwa usalama.",
  aboutShop: "Kuhusu duka",
  verifiedVendor: "Muuzaji aliyethibitishwa",
  statRating: "Ukadiriaji",
  statTrust: "Alama ya uaminifu",
  statSales: "Mauzo",
  others: "Wengine walionunua hapa",
  othersText: "Uzoefu halisi wa wanunuzi waliothibitishwa wa Moova.",
  beFirst: "Kuwa wa kwanza kutoa maoni kuhusu {shop}.",
  formTitle: "Ulionaje uzoefu wako wa ununuzi?",
  formText: "Maoni yako ya kweli yanawasaidia wanunuzi wajao kununua kwa uhakika.",
  commentLabel: "Tuambie zaidi kuhusu uzoefu wako",
  optional: "(si lazima)",
  commentPlaceholder: "Waambie wengine kuhusu ubora wa bidhaa, jinsi muuzaji alivyowasiliana, na jinsi usafirishaji ulivyokuwa…",
  send: "Tuma maoni yangu",
  sharing: "Duka linaweza kushiriki maoni yangu (kwa mfano Instagram), kwa jina langu la kwanza tu.",
  verifiedBefore: "Maoni yako yatakuwa na alama ya ",
  verifiedBold: "Ununuzi Uliothibitishwa",
  verifiedAfter: " kutoka Moova. Maoni yote hukaguliwa kwa haki kabla ya kuonyeshwa.",
  sendFailed: "Maoni yako hayajahifadhiwa. Tafadhali jaribu tena.",
  noteTitle: "Biashara Iliyothibitishwa",
  noteText: "Maoni yako hukaguliwa na Moova na kuambatishwa kabisa kwenye ununuzi wako. Yanasaidia wauzaji waaminifu kustawi na wanunuzi waliothibitishwa kote Afrika.",
  doneBadge: "Tathmini na maoni yamepokelewa",
  doneTitle: "Asante kwa kushiriki uzoefu wako!",
  doneText: "Tunashukuru kwa kuchukua muda kuikadiria {shop}. Maoni yako yanawasaidia kuboresha na yanawasaidia wateja wengine kununua kwa uhakika.",
  submitted: "Yamewasilishwa kwa ukaguzi",
  submittedText: "Moova hukagua kila maoni kabla ya kuonyeshwa. Yako yatapata alama ya Ununuzi Uliothibitishwa yakishaidhinishwa.",
  thanksFor: "Asante kwa kuchagua {shop}.",
  footer: "© {year} Moova. Inaendeshwa na Moova.",
  tapStar: "Gusa nyota kukadiria",
  yourRating: "Ukadiriaji wako",
  starsAria: "Nyota {n} kati ya 5",
  starAria: "Nyota {n}, {label}",
  s1: "Mbaya sana",
  s2: "Mbaya",
  s3: "Sawa",
  s4: "Nzuri",
  s5: "Bora kabisa",
  verifiedShort: "Imethibitishwa",
  verifiedPurchase: "Ununuzi Uliothibitishwa",
  wrote: "{name} aliandika: ",
  noComment: "Amekadiria bila maoni.",
  helpful: "Imesaidia ({n})",
  voteFailed: "Haikuweza kuhifadhiwa. Tafadhali jaribu tena.",
  language: "Lugha",
  toDark: "Badili kuwa hali ya giza",
  toLight: "Badili kuwa hali ya mwanga",
}

export type Lang = "en" | "sw"
export type Theme = "light" | "dark"
export type T = (key: Key, vars?: Record<string, string | number>) => string

const messages = { en, sw }

export function makeT(lang: Lang): T {
  return (key, vars) => (vars ? Object.entries(vars).reduce((text, [k, v]) => text.replaceAll(`{${k}}`, String(v)), messages[lang][key]) : messages[lang][key])
}

/** The server's own English texts (a link that is invalid or expired ...) in the visitor's language; any other text is shown as it is. */
const SERVER_TEXT: Record<string, Key> = {
  "This feedback link is invalid.": "linkInvalid",
  "This review link is invalid.": "linkInvalid",
  "This link has expired.": "linkExpired",
  "This purchase can no longer be rated.": "cantRateAnyMore",
}
export const serverText = (lang: Lang, text: string) => (SERVER_TEXT[text] ? messages[lang][SERVER_TEXT[text]] : text)

export const dateLocale = (lang: Lang) => (lang === "sw" ? "sw-TZ" : "en-US")

const LANG_KEY = "moova_review_lang"
const THEME_KEY = "moova_review_theme"

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null // private mode: the choice just isn't remembered
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* not remembered */
  }
}

/** The saved choice, else the phone's: Swahili for a Swahili phone, dark when the phone is in dark mode. */
function firstLang(): Lang {
  const saved = read(LANG_KEY)
  if (saved === "en" || saved === "sw") return saved
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("sw") ? "sw" : "en"
}

function firstTheme(): Theme {
  const saved = read(THEME_KEY)
  if (saved === "light" || saved === "dark") return saved
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

interface Prefs {
  lang: Lang
  setLang: (l: Lang) => void
  theme: Theme
  toggleTheme: () => void
  t: T
}

/** Outside the review page (the Treelink page shows the same review cards) everything stays English and light. */
const Ctx = createContext<Prefs>({ lang: "en", setLang: () => {}, theme: "light", toggleTheme: () => {}, t: makeT("en") })

export const useReviewPrefs = () => useContext(Ctx)

/** Wraps the review page: holds the language and theme, and is the element the theme's colours hang on. */
export function ReviewPrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(firstLang)
  const [theme, setTheme] = useState<Theme>(firstTheme)
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    write(LANG_KEY, l)
  }, [])
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark"
      write(THEME_KEY, next)
      return next
    })
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const value = useMemo(() => ({ lang, setLang, theme, toggleTheme, t: makeT(lang) }), [lang, setLang, theme, toggleTheme])
  return (
    <Ctx.Provider value={value}>
      <div className="review-page rv-page min-h-screen text-foreground" data-theme={theme}>
        {children}
      </div>
    </Ctx.Provider>
  )
}
