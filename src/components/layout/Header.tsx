import { useState, useEffect } from "react"
import brandLogo from "@/assets/logo/logo.png"
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
import { WHATSAPP_LINK } from "@/api"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#how-it-works" },
  { label: "Tracking", href: "/tracking" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const

export function Header() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/" || href === "/#home") {
      if (pathname === "/" && (!hash || hash === "#home")) {
        e.preventDefault()

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    } else if (href.startsWith("/#")) {
      const targetHash = href.substring(1)

      if (pathname === "/" && hash === targetHash) {
        e.preventDefault()

        const id = targetHash.replace("#", "")
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    }
  }

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && (!hash || hash === "#home")
    }

    if (href.startsWith("/#")) {
      const linkHash = href.substring(1)

      return pathname === "/" && hash === linkHash
    }

    return pathname === href
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full",
        "transition-all duration-300",
        isHome
          ? isScrolled
            ? "bg-[#1c3b7a]/90 backdrop-blur-md border-b border-white/10 shadow-lg text-white"
            : "bg-transparent text-white border-b border-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-900"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-7xl",
          "flex items-center justify-between",
          "px-4 sm:px-6 lg:px-8 xl:px-12",
          "transition-all duration-300",
          isScrolled
            ? "py-3"
            : "py-4 sm:py-5"
        )}
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <img
            src={brandLogo}
            alt="Moova Logo"
            className="
              h-8 w-8
              sm:h-10 sm:w-10
              lg:h-11 lg:w-11
              shrink-0
              object-contain
            "
          />

          <span
            className={cn(
              "truncate font-bold tracking-tight",
              "text-lg sm:text-xl lg:text-2xl",
              isHome ? "text-white" : "text-slate-900"
            )}
          >
            Moova
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.href)

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "whitespace-nowrap text-sm transition-colors duration-150",
                  isHome
                    ? isActive
                      ? "font-bold text-white"
                      : "font-medium text-white/80 hover:text-white"
                    : isActive
                      ? "font-bold text-blue-600"
                      : "font-medium text-slate-600 hover:text-blue-600"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* DESKTOP CTA */}
          <Button
            variant="ghost"
            className="
              hidden sm:flex
              h-9 sm:h-10 lg:h-11
              rounded-full
              bg-gradient-to-r
              from-[#2648A6] to-[#3B82F6]
              px-4 sm:px-5 lg:px-6
              text-xs sm:text-sm
              font-semibold
              text-white
              shadow-md shadow-blue-500/25
              transition-all
              hover:opacity-95
              hover:text-white
              hover:shadow-lg
              active:scale-95
              border-0
            "
            render={
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            }
          />

          {/* MOBILE MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden",
                    "h-9 w-9 sm:h-10 sm:w-10",
                    "shrink-0",
                    "rounded-full",
                    isHome
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="z-50 w-[calc(100vw-2rem)] max-w-64 p-2"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.href)

                return (
                  <DropdownMenuItem
                    key={link.label}
                    className={cn(
                      "cursor-pointer rounded-lg",
                      "px-3 py-2.5",
                      "text-sm font-medium",
                      isActive
                        ? "bg-blue-50 font-bold text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                    render={
                      <Link
                        to={link.href}
                        onClick={(e) =>
                          handleNavClick(e, link.href)
                        }
                      >
                        {link.label}
                      </Link>
                    }
                  />
                )
              })}

              {/* MOBILE CTA */}
              <DropdownMenuItem className="mt-2 p-0">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex h-10 w-full
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-[#2648A6] to-[#3B82F6]
                    text-sm font-semibold text-white
                    shadow-sm
                    hover:opacity-95
                  "
                >
                  Get Started
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}