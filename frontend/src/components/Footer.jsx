import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, MapPin, Clock, DollarSign } from 'lucide-react'
import styles from './Footer.module.css'

/* ── Same LogoMark as Navbar ─────────────────────────── */
const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

function LogoMark() {
  return (
    <svg
      width="44"
      height="30"
      viewBox="0 0 44 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Axon Forge icon"
    >
      {/* Top gold line */}
      <path
        d="M2,26 C10,22 22,10 40,5"
        stroke={GOLD}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="40" cy="5" r="2.2" fill={GOLD} />

      {/* Middle blue line */}
      <path
        d="M2,28 C10,25 22,16 39,12"
        stroke={BLUE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="39" cy="12" r="2.2" fill={BLUE} />

      {/* Bottom gold line */}
      <path
        d="M2,29.5 C10,28 22,22 38,19"
        stroke={GOLD}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="38" cy="19" r="2.2" fill={GOLD} />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.topGlow} aria-hidden />

      <div className="container">
        <div className={styles.grid}>

          {/* ── Brand ── */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <LogoMark />
              <span className={styles.logoText}>
                <span className={styles.logoMain}>
                  <span style={{ color: BLUE }}>AXON</span>
                  {' '}
                  <em style={{ color: GOLD, fontStyle: 'normal' }}>FORGE</em>
                </span>
                <span className={styles.logoSub}>Solutions</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Building intelligent, scalable full-stack solutions. From AI integrations
              to cloud-native apps — we turn your ideas into real business growth.
            </p>
            <div className={styles.socials}>
              <a href="https://linkedin.com/in/nexttech-sol" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialBtn}><Linkedin size={15} /></a>
              <a href="https://github.com/yourusername"      target="_blank" rel="noreferrer" aria-label="GitHub"   className={styles.socialBtn}><Github   size={15} /></a>
              <a href="#"                                                                      aria-label="Twitter"  className={styles.socialBtn}><Twitter  size={15} /></a>
              <a href="mailto:engrmumtazali01@gmail.com"                                       aria-label="Email"    className={styles.socialBtn}><Mail     size={15} /></a>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul>
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/team', 'Our Team'], ['/testimonials', 'Testimonials'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to}><span className={styles.arrow}>›</span>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul>
              {['Web Development', 'SaaS Solutions', 'AI / ML Integration', 'Database Design', 'Cloud & DevOps', 'Mobile Apps'].map(s => (
                <li key={s}><Link to="/services"><span className={styles.arrow}>›</span>{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Get In Touch</h4>
            <ul className={styles.contactList}>
              <li><span className={styles.contactIcon}><MapPin    size={12}/></span>Lahore, Pakistan · Remote</li>
              <li><span className={styles.contactIcon}><DollarSign size={12}/></span>Starting at $20 / hr</li>
              <li><span className={styles.contactIcon}><Clock      size={12}/></span>Response within 24 hours</li>
              <li><span className={styles.contactIcon}><Mail       size={12}/></span>
                <a href="mailto:engrmumtazali01@gmail.com" className={styles.contactEmail}>
                  engrmumtazali01@gmail.com
                </a>
              </li>
            </ul>
            <Link to="/contact" className={styles.footerCta}>Start a Project →</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Axon Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}