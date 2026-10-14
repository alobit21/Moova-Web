/**
 * Where the Moova API lives for this copy of the website:
 * VITE_WS_API_URL if set, tunnels and localhost for development, canary for staging, otherwise production.
 */
export function apiWsBaseUrl(): string {
  const envWsUrl = import.meta.env.VITE_WS_API_URL
  if (envWsUrl) return envWsUrl.endsWith("/") ? envWsUrl.slice(0, -1) : envWsUrl

  const host = window.location.hostname
  if ([".trycloudflare.com", ".loca.lt", ".ngrok-free.dev", ".ngrok.io"].some((s) => host.endsWith(s))) {
    return `wss://${host}`
  }
  if (host === "localhost" || host === "127.0.0.1") return `ws://${host}:8000`
  if (host.includes("canary")) return "wss://canary-api.moova.co.tz"
  return "wss://api.moova.co.tz"
}

export function apiHttpBaseUrl(): string {
  return apiWsBaseUrl().replace(/^ws:/i, "http:").replace(/^wss:/i, "https:")
}
