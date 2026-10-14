// src/components/FeaturedCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './FeaturedCard.css'

const FeaturedCard = ({ project }) => {
  if (!project) return null

  // Accept every field name we've seen in this project's data
  const imgSrc      = project.cover || project.img || project.imgsrc || project.image || project.imageUrl || ''
  const description = project.excerpt || project.description || project.text || ''
  const techList    = project.stack || project.tech || []
  const liveHref    = project.live || project.liveUrl || null
  const caseStudyHref = project.slug ? `/work/${project.slug}` : null

  const hasCaseStudy = Boolean(caseStudyHref)
  const hasLive = Boolean(liveHref)

  return (
    <article className="fc-card">
      <div className="fc-image">
        <span className="fc-badge">⭐ Flagship Project</span>
        {imgSrc && <img src={imgSrc} alt={project.title} loading="lazy" />}
      </div>

      <div className="fc-body">
        <div className="fc-meta">
          <span className="fc-category">
            {project.industry || project.category || ''}
          </span>
          {project.year && (
            <>
              <span className="fc-dot">·</span>
              <span className="fc-year">{project.year}</span>
            </>
          )}
          {project.duration && (
            <>
              <span className="fc-dot">·</span>
              <span className="fc-duration">{project.duration}</span>
            </>
          )}
        </div>

        <h2 className="fc-title">{project.title}</h2>
        {description && <p className="fc-desc">{description}</p>}

        {techList.length > 0 && (
          <div className="fc-stack">
            {techList.map((t) => (
              <span key={t} className="fc-pill">{t}</span>
            ))}
          </div>
        )}

        <div className="fc-actions">
          {hasCaseStudy && (
            <Link to={caseStudyHref} className="fc-btn-primary">
              Read the case study <ArrowRight size={16} />
            </Link>
          )}
          {hasLive && (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="fc-btn-ghost"
            >
              Live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default FeaturedCard