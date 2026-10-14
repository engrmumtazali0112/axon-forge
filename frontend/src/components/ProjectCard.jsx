// src/components/ProjectCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  // Accept every field name we've seen in this project's data
  const imgSrc      = project.cover || project.img || project.imgsrc || project.image || project.imageUrl || ''
  const description = project.excerpt || project.description || project.text || ''
  const techList    = project.stack || project.tech || []
  const category    = project.industry || project.category || ''

  const caseStudyTo = project.slug ? `/work/${project.slug}` : null
  const hasCaseStudy = Boolean(caseStudyTo)

  const Wrapper = hasCaseStudy ? Link : 'div'
  const wrapperProps = hasCaseStudy
    ? {
        to: caseStudyTo,
        className: 'pc-card pc-card-link',
        'aria-label': `Open case study: ${project.title}`,
      }
    : { className: 'pc-card pc-card-static' }

  return (
    <Wrapper {...wrapperProps}>
      <div className="pc-image">
        {imgSrc && <img src={imgSrc} alt={project.title} loading="lazy" />}
      </div>

      <div className="pc-body">
        <div className="pc-meta">
          {category && <span className="pc-category">{category}</span>}
          {project.year && (
            <>
              <span className="pc-dot">·</span>
              <span className="pc-year">{project.year}</span>
            </>
          )}
          {project.duration && (
            <>
              <span className="pc-dot">·</span>
              <span className="pc-duration">{project.duration}</span>
            </>
          )}
        </div>

        <h3 className="pc-title">{project.title}</h3>
        {description && <p className="pc-desc">{description}</p>}

        {techList.length > 0 && (
          <div className="pc-stack">
            {techList.slice(0, 4).map((t) => (
              <span key={t} className="pc-pill">{t}</span>
            ))}
            {techList.length > 4 && (
              <span className="pc-pill pc-pill-more">
                +{techList.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {hasCaseStudy && (
        <span className="pc-arrow" aria-hidden="true">→</span>
      )}
    </Wrapper>
  )
}

export default ProjectCard