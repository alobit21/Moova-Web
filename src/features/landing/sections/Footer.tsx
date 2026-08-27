import { Button } from "@/components/ui/button"
import footerBg from "@/assets/footer-bg.png"
import { AOSReveal } from "@/components/animation/AOSReveal"

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  )
}

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
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
] as const

const linkButtonClass =
  "h-auto justify-start p-0 text-sm sm:text-base font-normal text-white/70 no-underline hover:text-white hover:no-underline"

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#1c3b7a]">
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        {/* Brand */}
        <AOSReveal animation="fade-up" delay={0}>
          <Button
            variant="link"
            className="h-auto p-0 no-underline hover:no-underline"
            render={
              <a href="#home" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg font-bold text-[#1c3b7a]">
                  M
                </span>
                <span className="text-xl font-bold text-white">Moova</span>
              </a>
            }
          />
          <p className="mt-3 sm:mt-4 max-w-[20ch] text-sm text-white/70">
            Delivering businesses forward.
          </p>
        </AOSReveal>

        {/* Quick links */}
        <AOSReveal animation="fade-up" delay={100}>
          <h3 className="text-sm font-bold text-white">Quick Links</h3>
          <ul className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Button
                  variant="link"
                  className={linkButtonClass}
                  render={<a href={link.href}>{link.label}</a>}
                />
              </li>
            ))}
          </ul>
        </AOSReveal>

        {/* Contact */}
        <AOSReveal animation="fade-up" delay={200}>
          <h3 className="text-sm font-bold text-white">Contact</h3>
          <div className="mt-4 sm:mt-5 flex flex-col gap-3.5 sm:gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-wide text-white/90">EMAIL</p>
              <Button
                variant="link"
                className={linkButtonClass}
                render={<a href="mailto:smartcava@moova.co.tz">smartcava@moova.co.tz</a>}
              />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-wide text-white/90">PHONE</p>
              <Button
                variant="link"
                className={linkButtonClass}
                render={<a href="tel:+255222123456">+255 (0) 22 212 3456</a>}
              />
            </div>
          </div>
        </AOSReveal>

        {/* Social */}
        <AOSReveal animation="fade-up" delay={300}>
          <h3 className="text-sm font-bold text-white">Follow Us</h3>
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
    </footer>
  )
}
