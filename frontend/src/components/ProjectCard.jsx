import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import './ProjectCard.css'

const MAX_PILLS = 4

export default function ProjectCard({ project }) {
  const stack = project.stack || []
  const visiblePills = stack.slice(0, MAX_PILLS)
  const extraCount = stack.length - MAX_PILLS
  const isExternal = /^https?:\/\//.test(project.live || '')
  const href = project.live || `/work/${project.slug}`

  return (
    <article className="pc-card">
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="pc-image"
        aria-label={project.title}
      >
        {project.cover ? (
          <img src={project.cover} alt={project.title} loading="lazy" />
        ) : (
          <span className="pc-image-fallback">{project.title.charAt(0)}</span>
        )}
      </a>

      <div className="pc-body">
        <div className="pc-meta">
          <span className="pc-industry">{project.industry}</span>
          {project.year && <><span className="pc-dot">·</span><span>{project.year}</span></>}
          {project.duration && <><span className="pc-dot">·</span><span>{project.duration}</span></>}
        </div>

        <h3 className="pc-title">{project.title}</h3>
        <p className="pc-desc">{project.excerpt}</p>

        {stack.length > 0 && (
          <div className="pc-stack">
            {visiblePills.map((t) => <span key={t} className="pc-pill">{t}</span>)}
            {extraCount > 0 && <span className="pc-pill pc-pill-more">+{extraCount} more</span>}
          </div>
        )}

        <div className="pc-actions">
          <Link to={`/work/${project.slug}`} className="pc-cta">
            Read case study <ArrowUpRight size={14} />
          </Link>
          {isExternal && (
            <a href={project.live} target="_blank" rel="noreferrer" className="pc-cta-ghost">
              Live site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
