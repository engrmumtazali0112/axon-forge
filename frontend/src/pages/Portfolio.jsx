import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { PROJECTS, INDUSTRIES } from '../data/projects'
import styles from './Content.module.css'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const list = PROJECTS.filter((p) => filter === 'All' || p.industry === filter)

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><span aria-current="page">Portfolio</span>
            </nav>
            <p className={styles.eyebrow}>Our Portfolio</p>
            <h1 className={styles.h1}>Projects We&apos;ve <em>Delivered</em></h1>
            <p className={styles.lead}>
              A selection of the products we have built for startups and growing businesses:
              SaaS platforms, AI systems, mobile apps and cloud solutions.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.chips}>
              {INDUSTRIES.map((c) => (
                <button key={c} type="button" onClick={() => setFilter(c)}
                  className={`${styles.chip} ${filter === c ? styles.chipOn : ''}`}>{c}</button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <p className={styles.empty}>No projects in this category yet.</p>
          ) : (
            <div className={styles.pGrid}>
              {list.map((p, i) => (
                <article key={p.title} className={styles.project}>
                  <div className={`${styles.shot} ${i % 2 ? styles.shotGold : styles.shotBlue}`}>
                    {p.image
                      ? <img src={p.image} alt={p.title} className={styles.shotImg} loading="lazy" />
                      : <span className={styles.shotLetter}>{p.title.charAt(0)}</span>}
                  </div>
                  <div className={styles.pBody}>
                    <p className={styles.pIndustry}>{p.industry}</p>
                    <h2 className={styles.pTitle}>{p.title}</h2>
                    <p className={styles.pDesc}>{p.description}</p>
                    {p.results?.length > 0 && (
                      <div className={styles.results}>
                        {p.results.map((r) => (
                          <div key={r.label} className={styles.res}><b>{r.value}</b><span>{r.label}</span></div>
                        ))}
                      </div>
                    )}
                    <div className={styles.tags}>{p.tech.map((t) => <span key={t} className={styles.tag}>{t}</span>)}</div>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className={styles.pLink}>
                        Visit project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Want results like these?</h2>
              <p>Tell us about your project and get a clear plan and quote within 24 hours.</p>
            </div>
            <Link to="/contact" className={styles.btnGold}>Get a Quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
