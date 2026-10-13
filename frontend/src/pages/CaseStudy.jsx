import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import caseStudies from '../data/caseStudies'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)
  const data = caseStudies[slug]

  if (!project || !data) {
    return (
      <main className="cs-page">
        <div className="container cs-not-found">
          <h1>Project not found</h1>
          <Link to="/portfolio" className="cs-back"><ArrowLeft size={16} /> Back to portfolio</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cs-page">
      <div className="container">

        <Link to="/portfolio" className="cs-back">
          <ArrowLeft size={15} /> Back to portfolio
        </Link>

        {/* ── HERO ── */}
        <header className="cs-hero">
          <div className="cs-hero-left">
            <div className="cs-pills">
              <span className="cs-pill cs-pill-accent">{data.category}</span>
              {data.year && <span className="cs-pill">{data.year}</span>}
              {data.duration && <span className="cs-pill">{data.duration}</span>}
            </div>

            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-tagline">{project.excerpt}</p>

            <div className="cs-stack">
              {project.stack.map((t) => <span key={t} className="cs-stack-pill">{t}</span>)}
            </div>

            <div className="cs-actions">
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="cs-btn">
                  Visit live site <ExternalLink size={15} />
                </a>
              ) : (
                <Link to="/contact" className="cs-btn">
                  Talk to us <ArrowRight size={15} />
                </Link>
              )}
              {project.source && (
                <a href={project.source} target="_blank" rel="noreferrer" className="cs-btn-ghost">
                  Source code <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          <div className="cs-hero-right">
            <div className="cs-hero-frame">
              <img src={data.hero} alt={project.title} />
            </div>
          </div>
        </header>

        {/* ── OVERVIEW ── */}
        <section className="cs-section">
          <span className="cs-eyebrow">Section 01 — Overview</span>
          <h2 className="cs-section-title">What it is</h2>
          <p className="cs-lead">{data.overviewText}</p>
          {data.overviewImg && (
            <img className="cs-wide" src={data.overviewImg} alt={`${project.title} overview`} loading="lazy" />
          )}
        </section>

        {/* ── FLOW ── */}
        <section className="cs-section">
          <span className="cs-eyebrow">Section 02 — Flow</span>
          <h2 className="cs-section-title">How it works</h2>
          <ol className="cs-flow">
            {data.flow.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>

        {/* ── MODULES ── */}
        <section className="cs-section">
          <span className="cs-eyebrow">Section 03 — Modules</span>
          <h2 className="cs-section-title">Pages and modules</h2>

          {data.modules.map((m, i) => (
            <article key={m.name} className={`cs-module ${i % 2 ? 'flip' : ''} ${m.img ? '' : 'no-img'}`}>
              <div className="cs-module-text">
                <span className="cs-module-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </div>
              {m.img && (
                <div className="cs-module-img">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
              )}
            </article>
          ))}
        </section>

        {/* ── CTA ── */}
        <section className="cs-cta">
          <h2>Want to build something like this?</h2>
          <p>Tell us about your project — we reply within 24 hours.</p>
          <Link to="/contact" className="cs-btn">Get in touch</Link>
        </section>

      </div>
    </main>
  )
}
