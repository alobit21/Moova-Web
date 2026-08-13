import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tracking", href: "#tracking" },
  { label: "Contact Us", href: "#contact" },
] as const

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white">
            M
          </span>
          <span className="text-xl font-bold text-white">Moova</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden rounded-full bg-blue-600 px-6 hover:bg-blue-500 sm:inline-flex"
          >
            <a href="#get-started">Get Started</a>
          </Button>

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
                  render={<a href={link.href}>{link.label}</a>}
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