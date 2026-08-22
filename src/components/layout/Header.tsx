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
  { label: "Home", href: "#home", isRoute: false },
  { label: "About", href: "#about", isRoute: false },
  { label: "Tracking", href: "/tracking", isRoute: true },
  { label: "Contact", href: "#contact", isRoute: false },
] as const

const navLinkClass = "text-sm font-medium text-white/90 transition-colors hover:text-white"

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50",
        isHome ? "absolute bg-transparent" : "sticky bg-[#1c3b7a]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white">
            M
          </span>
          <span className="text-xl font-bold text-white">Moova</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link key={link.label} to={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="hidden rounded-full bg-blue-600 px-6 hover:bg-blue-500 sm:inline-flex text-sm font-medium text-white"
          >
            Get Started
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-44">
              {NAV_LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  render={
                    link.isRoute ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )
                  }
                />
              ))}
              <DropdownMenuItem
                render={
                  <a href="#get-started" className="font-medium text-blue-600">
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