// src/components/ServicesMore.jsx
// Sections that follow the process block: Better Together → Stats → Global Delivery
// → Free Quote banner  (Testimonials follow, rendered by the Services page)
import { Link } from 'react-router-dom'
import { Brain, Cloud, Smartphone, Globe, TrendingUp, MapPin, ArrowUpRight } from 'lucide-react'
import { STATS, MARKETS } from '../data/serviceCatalog'
import styles from './ServicesMore.module.css'

const ORBIT = [
  { label: 'AI',                Icon: Brain,      angle: -90 },
  { label: 'Cloud',             Icon: Cloud,      angle: -20 },
  { label: 'Digital Marketing', Icon: TrendingUp, angle:  50 },
  { label: 'Web Apps',          Icon: Globe,      angle: 120 },
  { label: 'Mobile Apps',       Icon: Smartphone, angle: 190 },
]

export default function ServicesMore() {
  return (
    <>
      {/* ── Better together ── */}
      <section className={styles.together}>
        <div className={`container ${styles.togetherGrid}`}>
          <div>
            <div className={styles.label}>Our mission</div>
            <h2 className={styles.h2}>Why our services work better together</h2>
            <p className={styles.lead}>
              Most products fail after launch because of a lack of visibility, adoption, or a growth
              strategy. Our integrated approach makes sure your product is:
            </p>
            <ul className={styles.ticks}>
              <li>Built with growth in mind</li>
              <li>Supported beyond launch</li>
              <li>Optimized using real performance data</li>
            </ul>
            <p className={styles.lead}>
              That means one partner instead of several disconnected teams.
            </p>
            <Link to="/contact" className={styles.btn}>Get started <ArrowUpRight size={16} /></Link>
          </div>

          <div className={styles.orbit} aria-hidden="true">
            <span className={styles.ring1} /><span className={styles.ring2} />
            <div className={styles.core}>Vision</div>
            {ORBIT.map(({ label, Icon, angle }) => {
              const r = (angle * Math.PI) / 180
              return (
                <div
                  key={label}
                  className={styles.node}
                  style={{ left: `${50 + 40 * Math.cos(r)}%`, top: `${50 + 40 * Math.sin(r)}%` }}
                >
                  <span className={styles.nodeIcon}><Icon size={22} /></span>
                  <span className={styles.nodeLabel}>{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Global delivery ── */}
      <section className={styles.global}>
        <div className="container">
          <div className={styles.label}>Global delivery</div>
          <h2 className={styles.h2}>We build software for clients worldwide</h2>
          <p className={`${styles.lead} ${styles.wide}`}>
            From startups to enterprises, we partner with teams across North America, Europe, the Middle
            East, Asia-Pacific and beyond — delivered remotely, with clear communication and on-time releases.
          </p>

          <div className={styles.markets}>
            {MARKETS.map((m) => (
              <article key={m.city} className={styles.market}>
                <div className={styles.marketTop}>
                  <span className={styles.pill}><MapPin size={13} /> {m.country}</span>
                  <small>{m.region}</small>
                </div>
                <h3>{m.city}</h3>
                <p>{m.text}</p>
                <ul>{m.services.map((s) => <li key={s}>{s}</li>)}</ul>
              </article>
            ))}
          </div>

          <div className={styles.quote}>
            <p>
              <strong>Based somewhere else? That's most of our clients.</strong> Tell us where you're based
              and what you want to build — we'll send a tailored quote within 24 hours.
            </p>
            <Link to="/contact" className={styles.btn}>Get a free quote <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

    </>
  )
}