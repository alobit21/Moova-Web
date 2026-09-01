import brandLogo from "@/assets/logo/logo.png"
import { Button } from "@/components/ui/button"
import footerBg from "@/assets/footer-bg.png"
import { AOSReveal } from "@/components/animation/AOSReveal"
import { Link, useLocation } from "react-router-dom"


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.56V9h3.554v11.452Z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/moova_hq?igsi=YjF3ZGltbHVmNnZz", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/moova-hq/", icon: LinkedinIcon },
] as const

const linkButtonClass =
  "h-auto justify-start p-0 text-sm sm:text-base font-normal text-[#FFFFFF]/70 no-underline hover:text-[#FFFFFF] hover:no-underline"

export function Footer() {
  const { pathname, hash } = useLocation()

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

  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-[#1c3b7a]">
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        {/* Brand */}
        <AOSReveal animation="fade-up" delay={0} className="flex flex-col items-start">
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 sm:gap-4 group"
          >
            <div className="flex items-center justify-center shrink-0">
              <img
                src={brandLogo}
                alt="Moova Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-lg transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Moova</span>
            </div>
          </Link>
          <p className="mt-4 sm:mt-5 max-w-[34ch] text-sm leading-relaxed text-[#FFFFFF]/70">
            An app that helps online sellers manage deliveries and give their customers a stress-free delivery experience with real-time tracking.
          </p>
        </AOSReveal>

        {/* Quick links */}
        <AOSReveal animation="fade-up" delay={100}>
          <h3 className="text-sm font-bold text-[#FFFFFF]">Quick Links</h3>
          <ul className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Button
                  variant="link"
                  className={linkButtonClass}
                  render={
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  }
                />
              </li>
            ))}
          </ul>
        </AOSReveal>

        {/* Contact */}
        <AOSReveal animation="fade-up" delay={200}>
          <h3 className="text-sm font-bold text-[#FFFFFF]">Contact</h3>
          <div className="mt-4 sm:mt-5 flex flex-col gap-3.5 sm:gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-wide text-[#FFFFFF]/90">EMAIL</p>
              <Button
                variant="link"
                className={linkButtonClass}
                render={<a href="mailto:smartcava@moova.co.tz">smartcava@moova.co.tz</a>}
              />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-wide text-[#FFFFFF]/90">PHONE</p>
              <Button
                variant="link"
                className={linkButtonClass}
                render={<a href="tel:+255753156659">+255 753 156 659</a>}
              />
            </div>
          </div>
        </AOSReveal>

        {/* Social */}
        <AOSReveal animation="fade-up" delay={300}>
          <h3 className="text-sm font-bold text-[#FFFFFF]">Follow Us</h3>
          <ul className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Button
                  variant="link"
                  className={linkButtonClass}
                  render={
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  }
                />
              </li>
            ))}
          </ul>
        </AOSReveal>
      </div>

      {/* Bottom Section */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="border-t border-white/10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#FFFFFF]/60 text-center md:text-left">
            © {new Date().getFullYear()} Moova. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#FFFFFF]/60">
            <Link
              to="/#privacy"
              onClick={(e) => handleNavClick(e, "/#privacy")}
              className="hover:text-[#FFFFFF] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/#terms"
              onClick={(e) => handleNavClick(e, "/#terms")}
              className="hover:text-[#FFFFFF] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
