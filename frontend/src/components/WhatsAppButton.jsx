import { MessageCircle } from 'lucide-react'
import './WhatsAppButton.css'

const PHONE = '923370690080'
const MESSAGE = "Hi! I'd like to discuss a project with you."

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2.2} />
      <span className="wa-fab-tip">Chat on WhatsApp</span>
    </a>
  )
}
