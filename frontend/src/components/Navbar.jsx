import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import PortfolioMegaMenu from './PortfolioMegaMenu'
import ServicesMegaMenu from './ServicesMegaMenu'
import styles from './Navbar.module.css'
import logo from '../assets/logo.jpg'

const NAV_LINKS = [
  { to: '/services',     label: 'Services'     },
  { to: '/portfolio',    label: 'Portfolio'    },
  { to: '/expertise',    label: 'Expertise'    },
  { to: '/about',        label: 'About Us'     },
  { to: '/blog',         label: 'Blog'         },
  { to: '/testimonials', label: 'Testimonials' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const servicesActive = pathname.startsWith('/services')
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
        <Link to="/" className={styles.logo} aria-label="Axon Forge home" onClick={() => setOpen(false)}>
          <img src={logo} alt="Axon Forge" className={styles.logoImg} />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              {to === '/portfolio' ? (
                <PortfolioMegaMenu
                  className={`${styles.link} ${portfolioActive ? styles.active : ''}`}
                />
              ) : to === '/services' ? (
                <ServicesMegaMenu
                  className={`${styles.link} ${servicesActive ? styles.active : ''}`}
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

        <div className={styles.themeSlot}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

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
          ) : to === '/services' ? (
            <ServicesMegaMenu
              key={to}
              mobile
              className={`${styles.mobileLink} ${servicesActive ? styles.mobileLinkActive : ''}`}
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
