// src/components/ServicesCatalog.jsx  — "Our Services" category cards with Show More
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code2, TrendingUp, Palette, ChevronRight, ChevronDown } from 'lucide-react'
import { PAGE_CATEGORIES } from '../data/serviceCatalog'
import styles from './ServicesCatalog.module.css'

const ICONS = { development: Code2, marketing: TrendingUp, design: Palette }
const VISIBLE = 4

export default function ServicesCatalog() {
  const [expanded, setExpanded] = useState({})
  const { hash } = useLocation()

  /* Deep links from the mega menu: /services#web-development
     → expand the right card if needed, then scroll to the item */
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const cat = PAGE_CATEGORIES.find((c) => c.items.some((i) => i.id === id))
    if (!cat) return
    setExpanded((e) => ({ ...e, [cat.key]: true }))
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add(styles.flash)
      setTimeout(() => el.classList.remove(styles.flash), 1600)
    }, 80)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <section className={styles.section} id="our-services">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.label}>What we offer</div>
          <h2 className={styles.title}>Our Services</h2>
          <p>We offer comprehensive solutions to help your business grow and succeed in the digital landscape.</p>
        </div>

        <div className={styles.grid}>
          {PAGE_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.key]
            const isOpen = !!expanded[cat.key]
            const shown = isOpen ? cat.items : cat.items.slice(0, VISIBLE)
            const hidden = cat.items.length - VISIBLE
            return (
              <article key={cat.key} className={styles.col} style={{ '--c': cat.color }}>
                <header className={styles.colHead}>
                  <span className={styles.count}>{cat.items.length} services</span>
                  <span className={styles.colIcon}><Icon size={24} /></span>
                  <h3>{cat.pageTitle}</h3>
                  <p>{cat.blurb}</p>
                </header>

                <div className={styles.items}>
                  {shown.map((s) => (
                    <div key={s.id} id={s.id} className={styles.item}>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                      <Link to="/contact" className={styles.more}>
                        Learn more <ChevronRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>

                {hidden > 0 && (
                  <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setExpanded((e) => ({ ...e, [cat.key]: !isOpen }))}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Show less' : `Show more (${hidden} more)`}
                    <ChevronDown size={16} className={isOpen ? styles.flip : ''} />
                  </button>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
