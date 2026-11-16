import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReviewPrefs, type Lang } from "../lib/prefs"

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "sw", label: "SW", name: "Kiswahili" },
]

/** The language switch (English / Kiswahili) and the light / dark button, on every state of the review page. */
export function PrefsBar() {
  const { lang, setLang, theme, toggleTheme, t } = useReviewPrefs()
  const dark = theme === "dark"
  return (
    <div className="flex items-center gap-2">
      <div role="group" aria-label={t("language")} className="rv-pill inline-flex rounded-full border p-0.5">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            title={l.name}
            aria-pressed={lang === l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              "min-h-8 rounded-full px-3 text-xs font-bold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-[#1B8A5A]",
              lang === l.code ? "bg-[#1B8A5A] text-white" : "rv-muted",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? t("toLight") : t("toDark")}
        title={dark ? t("toLight") : t("toDark")}
        className="rv-pill rv-muted inline-flex size-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-[#1B8A5A]"
      >
        {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      </button>
    </div>
  )
}
