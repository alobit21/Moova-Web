import { useState, useEffect, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoaderIcon } from "@/components/ui/loader"

const TRACKING_NUMBER_PATTERN = /^M[\w-]+$/i

interface ParcelSearchFormProps {
  onSearch: (trackingNumber: string) => void
  initialValue?: string
  isLoading?: boolean
}

export function ParcelSearchForm({ onSearch, initialValue = "", isLoading = false }: ParcelSearchFormProps) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isLoading) return

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
          disabled={isLoading}
          aria-label="Parcel tracking number"
          aria-invalid={Boolean(error)}
          className="h-12 sm:h-14 rounded-xl border-slate-200 bg-slate-50/80 px-4 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:bg-white focus-visible:border-blue-600 focus-visible:ring-blue-500/20 disabled:opacity-75"
        />
        {error ? (
          <p role="alert" className="mt-1 text-xs text-destructive font-medium">
            {error}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 sm:h-14 px-5 sm:px-8 rounded-xl bg-[#2648A6] hover:bg-[#1f3b89] active:scale-[0.98] text-sm sm:text-base font-semibold text-[#FFFFFF] shadow-md shadow-blue-500/20 transition-all shrink-0 cursor-pointer disabled:opacity-85 flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <LoaderIcon size="sm" />
            <span>Searching...</span>
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  )
}