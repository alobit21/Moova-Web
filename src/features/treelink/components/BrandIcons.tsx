import type { SocialLink } from "../lib/treelink-api"

/** Small brand marks for the shop's links (the icon library has none). */
function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path fill="#25D366" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
      <path fill="#fff" d="M8.6 7.5c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.8-1.4-1.700-1.5-2-.2-.3 0-.4.1-.6l.4-.5.3-.4c.1-.2.1-.3 0-.5z" />
    </svg>
  )
}

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <defs>
        <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset=".35" stopColor="#FA7E1E" />
          <stop offset=".6" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="#D62976" />
    </svg>
  )
}

function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path fill="#25F4EE" transform="translate(-.9 .7)" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.7 5.7 0 1 0 5 5.6V9.1a7.300 7.300 0 0 0 4.300 1.400V7.400a4.300 4.300 0 0 1-3.300-1.600z" />
      <path fill="#FE2C55" transform="translate(.9 -.7)" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.7 5.7 0 1 0 5 5.6V9.1a7.300 7.300 0 0 0 4.300 1.400V7.400a4.300 4.300 0 0 1-3.300-1.600z" />
      <path fill="#000" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.7 5.7 0 1 0 5 5.6V9.1a7.300 7.300 0 0 0 4.300 1.400V7.400a4.300 4.300 0 0 1-3.300-1.600z" />
    </svg>
  )
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path fill="#fff" d="M13.500 21v-7h2.400l.4-3h-2.800V9.300c0-.8.300-1.300 1.400-1.300h1.500V5.300c-.3 0-1.100-.1-2-.1-2.100 0-3.500 1.300-3.500 3.600V11H8.700v3H11v7h2.500z" />
    </svg>
  )
}

export function BrandIcon({ kind }: { kind: SocialLink["kind"] }) {
  return { whatsapp: <WhatsApp />, instagram: <Instagram />, tiktok: <TikTok />, facebook: <Facebook /> }[kind]
}
