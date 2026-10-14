// src/pages/Portfolio.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import ProjectCard from '../components/ProjectCard'
import FeaturedCard from '../components/FeaturedCard'
import useScrollReveal from '../hooks/useScrollReveal'
import { PROJECTS, INDUSTRIES } from '../data/projects'

import styles from './Content.module.css'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')

  /* Featured flagship card (True Blue Bio) shows above the grid */
  const featured = useMemo(() => PROJECTS.find((p) => p.featured), [])
  const rest = useMemo(() => PROJECTS.filter((p) => !p.featured), [])

  /* Apply filter to non-featured projects only */
  const filtered = useMemo(() => {
    if (filter === 'all') return rest
    return rest.filter((p) => p.categories?.includes(filter))
  }, [rest, filter])

  /* Counts for filter chips */
  const counts = useMemo(() => {
    const base = { all: PROJECTS.length }
    PROJECTS.forEach((p) => {
      (p.categories || []).forEach((c) => {
        base[c] = (base[c] || 0) + 1
      })
    })
    return base
  }, [])

  /* Scroll-reveal hook for the card grid */
  const gridRef = useScrollReveal()

  return (
    <main className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Portfolio</span>
            </nav>
            <p className={styles.eyebrow}>Our work</p>
            <h1 className={styles.h1}>
              Projects We&apos;ve <em>Shipped</em>
            </h1>
            <p className={styles.lead}>
              Real products in production — SaaS platforms, e-commerce,
              university systems, AI tools and mobile apps. Each one has a
              full case study.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured flagship card ───────────────────────────── */}
      {featured && (
        <section className={styles.section}>
          <div className="container">
            <FeaturedCard project={featured} />
          </div>
        </section>
      )}

      {/* ── Filter chips + project grid ──────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.toolbar}>
            <div
              className={styles.chips}
              role="tablist"
              aria-label="Filter projects"
            >
              {INDUSTRIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  className={`${styles.chip} ${
                    filter === c.id ? styles.chipOn : ''
                  }`}
                  onClick={() => setFilter(c.id)}
                >
                  {c.label}
                  {counts[c.id] != null && (
                    <span style={{ opacity: 0.6, marginLeft: 6 }}>
                      {counts[c.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>No projects in this category yet.</p>
          ) : (
            <div
              ref={gridRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              {filtered.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Want results like these?</h2>
              <p>Tell us about your project — we reply within 24 hours.</p>
            </div>
            <Link to="/contact" className={styles.btnGold}>
              Get a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}