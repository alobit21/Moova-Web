import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const TRACKING_NUMBER_PATTERN = /^M\d+$/i

export function ParcelSearchForm({ onSearch }: { onSearch: (trackingNumber: string) => void }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = value.replace(/\s+/g, "")

    if (!TRACKING_NUMBER_PATTERN.test(normalized)) {
      setError("Enter a valid tracking number starting with 'M' followed by digits.")
      return
    }

    setError(null)
    onSearch(normalized)
  }
 

return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-3">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="M 123 4567 890"
        aria-label="Parcel tracking number"
        aria-invalid={Boolean(error)}
        className="h-14 rounded-xl border-tracking/60 bg-tracking/5 px-5 text-base focus-visible:border-tracking focus-visible:ring-tracking/40"
      />
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-14 rounded-xl bg-tracking text-base font-semibold text-tracking-foreground hover:bg-tracking/90"
      >
        Search
      </Button>
    </form>
  )
}