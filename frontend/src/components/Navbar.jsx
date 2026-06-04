import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/',             label: 'Home'         },
  { to: '/about',        label: 'About'        },
  { to: '/services',     label: 'Services'     },
  { to: '/team',         label: 'Team'         },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact',      label: 'Contact'      },
]

/* ── Brand colours from the logo ── */
const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

function LogoMark() {
  /*
   * Three arcing lines that mirror the logo icon:
   *   top    → gold  (highest arc)
   *   middle → blue  (mid arc)
   *   bottom → gold  (lowest arc)
   * Each line ends in a small filled circle (terminal dot).
   */
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

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* ── Logo ── */}
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark}>
            <LogoMark />
          </span>
          <span className={styles.logoName}>
            <span className={styles.logoMain}>
              {/* "AXON" in blue, "FORGE" in gold — matching the logo type */}
              <span style={{ color: BLUE }}>AXON</span>
              {' '}
              <em style={{ color: GOLD, fontStyle: 'normal' }}>FORGE</em>
            </span>
            <span className={styles.logoSub} />
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {label}
                <span className={styles.underline} />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── CTA button — gold accent to match logo ── */}
        <Link to="/contact" className={styles.cta}>
          Get a Quote <ArrowRight size={14} />
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
              onClick={() => setOpen(false)}
              style={{ '--i': i }}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <Link
          to="/contact"
          className={styles.mobileCta}
          onClick={() => setOpen(false)}
        >
          Get a Quote →
        </Link>
      </div>
    </nav>
  )
}