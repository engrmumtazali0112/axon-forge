import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ServicesSection from '../components/ServicesSection'
import styles from './Services.module.css'

export default function Services() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroLine} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowDot} />
              What We Offer
            </div>
            <h1 className={styles.heroTitle}>
              Full-Stack Services,<br />
              <span className={styles.gold}>Intelligent Solutions</span>
            </h1>
            <p className={styles.heroDesc}>
              From database architecture to mobile apps, we cover the entire
              technology stack. Starting at $20/hr with flexible engagement models.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.metaBadge}>✅ Remote Available</span>
              <span className={styles.metaBadge}>💰 From $20/hr</span>
              <span className={styles.metaBadge}>⚡ 24hr Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services (sticky stacked cards) ── */}
      <ServicesSection />

      {/* ── Process ── */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.secLabel}>How We Work</div>
            <h2 className={styles.secTitle}>Our Development Process</h2>
            <p>A battle-tested workflow built for speed, quality, and full transparency.</p>
          </div>
          <div className={styles.processGrid}>
            {[
              { step: '01', title: 'Discovery Call',      desc: 'We deep-dive into your requirements, goals, and technical constraints in a free 1-hour consultation.' },
              { step: '02', title: 'Proposal & Planning', desc: 'You receive a detailed proposal with scope, timeline, milestones, and transparent pricing.' },
              { step: '03', title: 'Design & Develop',    desc: 'Agile sprints with weekly demos. Real progress every week with continuous feedback.' },
              { step: '04', title: 'Test & Deploy',       desc: 'Comprehensive testing, security review, and smooth deployment to your preferred cloud.' },
              { step: '05', title: 'Support & Scale',     desc: 'Post-launch support, monitoring, and continuous improvements as your product grows.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className={styles.processCard}>
                <div className={styles.processStep}>{step}</div>
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <span className={styles.ctaBracketL}>{'{'}</span>
            <span className={styles.ctaBracketR}>{'}'}</span>
            <h2 className={styles.ctaTitle}>Not Sure What You Need?</h2>
            <p className={styles.ctaDesc}>
              Book a free consultation and we'll help you figure out the best path forward for your project.
            </p>
            <Link to="/contact" className={styles.btnGold}>
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}