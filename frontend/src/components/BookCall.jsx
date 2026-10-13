import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import './BookCall.css'

const CALENDLY = 'https://calendly.com/engrmumtazali01/30min'

export default function BookCall({
  variant = 'primary',
  label = 'Book a Free 30-min Call',
  subtext = 'Prefer to talk? Book a free 30-minute Google Meet consultation.',
  showDivider = false,
}) {
  return (
    <div className="bc-wrap">
      {showDivider && (
        <div className="bc-divider">
          <span>OR</span>
        </div>
      )}

      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className={`bc-btn bc-btn-${variant}`}
      >
        <Calendar size={18} />
        {label}
        <ArrowRight size={18} />
      </a>

      {subtext && <p className="bc-sub">{subtext}</p>}
    </div>
  )
}
