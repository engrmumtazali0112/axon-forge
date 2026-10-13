// frontend/src/components/ServicesHero.jsx
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './ServicesHero.css'

export default function ServicesHero() {
  return (
    <section className="sh-section">
      <div className="sh-grid" aria-hidden="true" />
      <div className="sh-glow" aria-hidden="true" />
      <div className="sh-inner">
        <span className="sh-pill"><i /> What we do</span>
        <h1 className="sh-title">
          Six services.<br />
          <span className="sh-accent">One team. No hand-offs.</span>
        </h1>
        <p className="sh-sub">
          From SaaS platforms and AI features to cloud infrastructure — everything you need
          to design, ship and scale a modern digital product, handled by the same people
          from first call to launch.
        </p>
        <div className="sh-actions">
          <Link to="/contact" className="sh-btn">
            Book a free call <ArrowRight size={16} />
          </Link>
          <a href="#services-list" className="sh-btn-ghost">See what we build</a>
        </div>
      </div>
    </section>
  )
}