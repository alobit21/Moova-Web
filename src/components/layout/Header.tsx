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
  // { label: "Pricing", href: "/#pricing" },
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
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/" || href === "/#home") {
      if (pathname === "/" && (!hash || hash === "#home")) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else if (href.startsWith("/#")) {
      const targetHash = href.substring(1)
      if (pathname === "/" && hash === targetHash) {
        e.preventDefault()
        const id = targetHash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isHome
          ? isScrolled
            ? "bg-[#1c3b7a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10 text-[#FFFFFF]"
            : "bg-transparent text-[#FFFFFF] border-b border-transparent"
          : isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md text-slate-900"
            : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs text-slate-900"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-12",
          isScrolled ? "py-3.5" : "py-5"
        )}
      >
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-3 sm:gap-4 group"
        >
          <img
            src={brandLogo}
            alt="Moova Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform group-hover:scale-105"
          />
          <span
            className={cn(
              "text-2xl sm:text-3xl font-bold tracking-tight",
              isHome ? "text-[#FFFFFF]" : "text-slate-900"
            )}
          >
            Moova
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.href)

            const linkClass = cn(
              "text-sm transition-colors duration-150",
              isHome
                ? isActive
                  ? "font-bold text-[#FFFFFF]"
                  : "font-medium text-[#FFFFFF]/80 hover:text-[#FFFFFF]"
                : isActive
                  ? "font-bold text-blue-600"
                  : "font-medium text-slate-600 hover:text-blue-600"
            )

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={linkClass}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            className="h-9 sm:h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2648A6] to-[#3B82F6] px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-[#FFFFFF] shadow-md shadow-blue-500/25 transition-all duration-200 hover:opacity-95 hover:text-[#FFFFFF] hover:shadow-lg hover:shadow-blue-500/35 active:scale-95 flex border-0"
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

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden h-9 w-9",
                    isHome
                      ? "text-[#FFFFFF] hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 p-2 z-50">
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.href)

                return (
                  <DropdownMenuItem
                    key={link.label}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "bg-blue-50 font-bold text-blue-600" : "text-slate-700 hover:bg-slate-50"
                    )}
                    render={
                      <Link
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {link.label}
                      </Link>
                    }
                  />
                )
              })}
              <DropdownMenuItem
                className="mt-2 p-0"
                render={
                  <Button
                    variant="ghost"
                    className="flex w-full h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#2648A6] to-[#3B82F6] py-2 text-center text-sm font-semibold text-[#FFFFFF] shadow-sm hover:opacity-95 hover:text-[#FFFFFF] border-0"
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
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}