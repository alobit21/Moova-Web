export const WHATSAPP_PHONE_NUMBER = "255753156659"
export const WHATSAPP_DISPLAY_PHONE = "+255 753 156 659"
export const CONTACT_EMAIL = "smartcava@moova.co.tz"

/**
 * Generates a WhatsApp click-to-chat URL for the given phone number and optional message.
 */
export function getWhatsAppLink(message?: string): string {
  const cleanNumber = WHATSAPP_PHONE_NUMBER.replace(/[^0-9]/g, "")
  if (message) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  }
  return `https://wa.me/${cleanNumber}`
}

export const WHATSAPP_LINK = getWhatsAppLink()
