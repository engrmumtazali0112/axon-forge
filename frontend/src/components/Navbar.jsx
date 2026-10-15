import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import PortfolioMegaMenu from './PortfolioMegaMenu'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/services',     label: 'Services'     },
  { to: '/portfolio',    label: 'Portfolio'    },
  { to: '/expertise',    label: 'Expertise'    },
  { to: '/about',        label: 'About Us'     },
  { to: '/blog',         label: 'Blog'         },
  { to: '/testimonials', label: 'Testimonials' },
]

const BLUE = '#2E9BD6'
const GOLD = '#F5A623'

function LogoMark() {
  return (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Axon Forge icon">
      <path d="M2,26 C10,22 22,10 40,5"      stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="40" cy="5" r="2.2" fill={GOLD} />
      <path d="M2,28 C10,25 22,16 39,12"     stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="39" cy="12" r="2.2" fill={BLUE} />
      <path d="M2,29.5 C10,28 22,22 38,19"   stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="38" cy="19" r="2.2" fill={GOLD} />
    </svg>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const portfolioActive = pathname.startsWith('/portfolio') || pathname.startsWith('/work')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
          <LogoMark />
          <span className={styles.logoText}>
            <span style={{ color: BLUE }}>AXON</span>{' '}
            <span style={{ color: GOLD }}>FORGE</span>
          </span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              {to === '/portfolio' ? (
                <PortfolioMegaMenu
                  className={`${styles.link} ${portfolioActive ? styles.active : ''}`}
                />
              ) : (
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                {label}
              </NavLink>
              )}
            </li>
          ))}
        </ul>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <Link to="/contact" className={styles.cta}>
          Get a quote <ArrowRight size={14} />
        </Link>

        <button
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {NAV_LINKS.map(({ to, label }) => to === '/portfolio' ? (
            <PortfolioMegaMenu
              key={to}
              mobile
              className={`${styles.mobileLink} ${portfolioActive ? styles.mobileLinkActive : ''}`}
              onNavigate={() => setOpen(false)}
            />
          ) : (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div style={{ padding: '8px 20px 0' }}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <Link to="/contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
          Get a quote
        </Link>
      </div>
    </nav>
  )
}