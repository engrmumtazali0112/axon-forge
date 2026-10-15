// src/components/PortfolioMegaMenu.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import './PortfolioMegaMenu.css'

const MENU_COUNT = 4 // how many projects to show in the dropdown
const MENU_PROJECTS = PROJECTS.slice(0, MENU_COUNT)
const CLOSE_DELAY = 160 // ms – lets the cursor travel from the trigger to the panel

/**
 * Desktop: hover (or click / keyboard) on "Portfolio" opens a panel listing every project.
 * Mobile : pass `mobile` to render a simple accordion for the slide-out menu.
 *
 * Props
 *  - className : class applied to the trigger so it matches your other nav links
 *  - mobile    : boolean
 *  - onNavigate: optional callback (e.g. close the mobile drawer after a click)
 */
export default function PortfolioMegaMenu({ className = '', mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState(MENU_PROJECTS[0]?.slug)
  const timer = useRef(null)
  const wrapRef = useRef(null)
  const { pathname } = useLocation()

  const openMenu = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }, [])

  const closeNow = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(false)
  }, [])

  /* Close on route change */
  useEffect(() => { closeNow() }, [pathname, closeNow])

  /* Close on Escape / outside click */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeNow()
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closeNow()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open, closeNow])

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleNavigate = () => {
    closeNow()
    onNavigate?.()
  }

  /* ── Mobile accordion ─────────────────────────────────── */
  if (mobile) {
    return (
      <div className="pmm-m">
        <button
          type="button"
          className={`pmm-m-trigger ${className}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Portfolio
          <ChevronDown size={16} className={`pmm-chev ${open ? 'is-open' : ''}`} />
        </button>
        {open && (
          <ul className="pmm-m-list">
            {MENU_PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}`} onClick={handleNavigate}>
                  <span>{p.title.split(' — ')[0]}</span>
                  <small>{p.industry}</small>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/portfolio" className="pmm-m-all" onClick={handleNavigate}>
                See full portfolio
              </Link>
            </li>
          </ul>
        )}
      </div>
    )
  }

  /* ── Desktop mega menu ────────────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className="pmm"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) closeMenu()
      }}
    >
      <Link
        to="/portfolio"
        className={`pmm-trigger ${className} ${open ? 'is-open' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); openMenu() }
        }}
      >
        Portfolio
        <ChevronDown size={15} className={`pmm-chev ${open ? 'is-open' : ''}`} />
      </Link>

      <div className={`pmm-panel ${open ? 'is-open' : ''}`} role="menu" aria-hidden={!open}>
        <div className="pmm-inner">
          {/* Left: project list */}
          <aside className="pmm-list">
            <p className="pmm-heading">Featured work</p>
            <ul>
              {MENU_PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/work/${p.slug}`}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    className={`pmm-item ${activeSlug === p.slug ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveSlug(p.slug)}
                    onFocus={() => setActiveSlug(p.slug)}
                    onClick={handleNavigate}
                  >
                    <span className="pmm-item-text">
                      <strong>{p.title.split(' — ')[0]}</strong>
                      <small>{p.industry}</small>
                    </span>
                    <ArrowUpRight size={16} className="pmm-item-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/portfolio"
              className="pmm-all"
              tabIndex={open ? 0 : -1}
              onClick={handleNavigate}
            >
              See full portfolio <ArrowUpRight size={16} />
            </Link>
          </aside>

          {/* Right: visual cards */}
          <div className="pmm-grid">
            {MENU_PROJECTS.map((p) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className={`pmm-card ${activeSlug === p.slug ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveSlug(p.slug)}
                onClick={handleNavigate}
              >
                <div className="pmm-card-img">
                  <img src={p.cover} alt="" loading="lazy" />
                </div>
                <div className="pmm-card-meta">
                  <span>
                    <strong>{p.title.split(' — ')[0]}</strong>
                    <small>{p.industry}</small>
                  </span>
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}