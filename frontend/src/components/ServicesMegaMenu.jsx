// src/components/ServicesMegaMenu.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowUpRight, Palette, Code2, TrendingUp } from 'lucide-react'
import { CATEGORIES } from '../data/serviceCatalog'
import './ServicesMegaMenu.css'

const ICONS = { design: Palette, development: Code2, marketing: TrendingUp }
const CLOSE_DELAY = 160 // ms – lets the cursor travel from trigger to panel
const target = (id) => ({ pathname: '/services', hash: `#${id}` })

/**
 * Desktop: hover / click / keyboard on "Services" opens a 3-column panel.
 * Mobile : pass `mobile` for an accordion inside the slide-out menu.
 * Every item links to /services#<item-id> (the matching card on the Services page).
 */
export default function ServicesMegaMenu({ className = '', mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const wrapRef = useRef(null)
  const { pathname, hash } = useLocation()

  const openMenu = useCallback(() => { clearTimeout(timer.current); setOpen(true) }, [])
  const closeMenu = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }, [])
  const closeNow = useCallback(() => { clearTimeout(timer.current); setOpen(false) }, [])

  useEffect(() => { closeNow() }, [pathname, hash, closeNow])

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

  const handleNavigate = () => { closeNow(); onNavigate?.() }

  /* ── Mobile accordion ── */
  if (mobile) {
    return (
      <div className="smm-m">
        <button
          type="button"
          className={`smm-m-trigger ${className}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Services
          <ChevronDown size={16} className={`smm-chev ${open ? 'is-open' : ''}`} />
        </button>
        {open && (
          <div className="smm-m-body">
            {CATEGORIES.map((c) => (
              <div key={c.key} className="smm-m-group">
                <p className="smm-m-head" style={{ '--c': c.color }}>{c.menuTitle}</p>
                <ul className="smm-m-list">
                  {c.items.map((i) => (
                    <li key={i.id}>
                      <Link to={target(i.id)} onClick={handleNavigate}>{i.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link to="/services" className="smm-m-all" onClick={handleNavigate}>See all services</Link>
          </div>
        )}
      </div>
    )
  }

  /* ── Desktop mega menu ── */
  return (
    <div
      ref={wrapRef}
      className="smm"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(e) => { if (!wrapRef.current?.contains(e.relatedTarget)) closeMenu() }}
    >
      <Link
        to="/services"
        className={`smm-trigger ${className} ${open ? 'is-open' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); openMenu() } }}
      >
        Services
        <ChevronDown size={15} className={`smm-chev ${open ? 'is-open' : ''}`} />
      </Link>

      <div className={`smm-panel ${open ? 'is-open' : ''}`} role="menu" aria-hidden={!open}>
        <div className="smm-inner">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.key]
            return (
              <div key={c.key} className="smm-col" style={{ '--c': c.color }}>
                <div className="smm-col-head">
                  <span className="smm-col-icon"><Icon size={20} /></span>
                  <span className="smm-col-title">{c.menuTitle}</span>
                </div>
                <ul>
                  {c.items.map((i) => (
                    <li key={i.id}>
                      <Link
                        to={target(i.id)}
                        role="menuitem"
                        tabIndex={open ? 0 : -1}
                        className="smm-link"
                        onClick={handleNavigate}
                      >
                        {i.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="smm-foot">
          <span>Not sure what you need? We'll help you choose.</span>
          <Link to="/services" tabIndex={open ? 0 : -1} className="smm-all" onClick={handleNavigate}>
            See all services <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
