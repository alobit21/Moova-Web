import { Link } from "react-router-dom"
import { SEO } from "@/components/seo/SEO"

export function NotFoundPage() {
  return (
    <>
      <SEO title="Moova | Page Not Found" description="The page you are looking for does not exist." />
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl sm:text-7xl font-bold text-[#2648A6] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          We couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-full bg-[#2648A6] hover:bg-[#1c3b7a] px-8 py-3 text-sm font-medium text-white transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </>
  )
}
