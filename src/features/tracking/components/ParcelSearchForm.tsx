import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const TRACKING_NUMBER_PATTERN = /^M[\w-]+$/i

export function ParcelSearchForm({ onSearch }: { onSearch: (trackingNumber: string) => void }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = value.replace(/\s+/g, "")

    if (!TRACKING_NUMBER_PATTERN.test(normalized)) {
      setError("Enter a valid tracking number starting with 'M'.")
      return
    }

    setError(null)
    onSearch(normalized)
  }


  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-row items-start gap-2.5 sm:gap-3">
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="M 123 4567 890"
          aria-label="Parcel tracking number"
          aria-invalid={Boolean(error)}
          className="h-12 sm:h-14 rounded-xl border-slate-200 bg-slate-50/80 px-4 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:bg-white focus-visible:border-blue-600 focus-visible:ring-blue-500/20"
        />
        {error ? (
          <p role="alert" className="mt-1 text-xs text-destructive font-medium">
            {error}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="h-12 sm:h-14 px-5 sm:px-8 rounded-xl bg-[#2648A6] hover:bg-[#1f3b89] active:scale-[0.98] text-sm sm:text-base font-semibold text-[#FFFFFF] shadow-md shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
      >
        Search
      </Button>
    </form>
  )
}