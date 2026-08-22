 import { Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NAV_LINKS = [
  { label: "Home", href: "/", isRoute: true },
  { label: "How It Works", href: "/#how-it-works", isRoute: false },
  { label: "Tracking", href: "/tracking", isRoute: true },
  { label: "Pricing", href: "/#pricing", isRoute: false },
  { label: "FAQ", href: "/#faq", isRoute: false },
  { label: "Contact", href: "/#contact", isRoute: false },
] as const

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 transition-colors duration-200",
        isHome
          ? "absolute bg-transparent text-white"
          : "sticky bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs text-slate-900"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white shadow-md shadow-blue-500/30 transition-transform group-hover:scale-105">
            M
          </span>
          <span
            className={cn(
              "text-xl font-bold tracking-tight",
              isHome ? "text-white" : "text-slate-900"
            )}
          >
            Moova
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href === "/tracking" && pathname === "/tracking")

            const linkClass = cn(
              "text-sm transition-colors duration-150",
              isHome
                ? isActive
                  ? "font-bold text-white"
                  : "font-medium text-white/80 hover:text-white"
                : isActive
                  ? "font-bold text-blue-600"
                  : "font-medium text-slate-600 hover:text-blue-600"
            )

            return link.isRoute ? (
              <Link key={link.label} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="hidden items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/35 active:scale-95 sm:inline-flex"
          >
            Get Started
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden",
                    isHome
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-52 p-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/tracking" && pathname === "/tracking")

                return (
                  <DropdownMenuItem
                    key={link.label}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-2 text-sm",
                      isActive ? "bg-blue-50 font-bold text-blue-600" : "font-medium text-slate-700"
                    )}
                    render={
                      link.isRoute ? (
                        <Link to={link.href}>{link.label}</Link>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )
                    }
                  />
                )
              })}
              <DropdownMenuItem
                className="mt-2"
                render={
                  <a
                    href="#get-started"
                    className="flex w-full items-center justify-center rounded-full bg-blue-600 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Get Started
                  </a>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}