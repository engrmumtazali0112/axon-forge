// src/components/ExpertiseSection.jsx
// Home page "Expertise" block: six capability areas with the tech behind each.
import { Link } from 'react-router-dom'
import { ArrowRight, Server, Layout, Smartphone, Brain, Database, Cloud } from 'lucide-react'
import './ExpertiseSection.css'

const AREAS = [
  {
    Icon: Server,
    title: 'Backend & APIs',
    desc: 'Fast, well-documented APIs and business logic that stay maintainable as the product grows.',
    tech: ['Python', 'FastAPI', 'Django', 'Node.js'],
  },
  {
    Icon: Layout,
    title: 'Web Frontends',
    desc: 'Responsive, accessible interfaces for SaaS dashboards, customer portals and marketing sites.',
    tech: ['React', 'Next.js', 'Vue.js'],
  },
  {
    Icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'One codebase for iOS and Android, from the first prototype to the store release.',
    tech: ['Flutter', 'React Native'],
  },
  {
    Icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'LLM features, RAG assistants and automation agents, shipped as working products.',
    tech: ['OpenAI', 'LangChain', 'PyTorch'],
  },
  {
    Icon: Database,
    title: 'Data & Databases',
    desc: 'Schemas, pipelines and caching designed for correctness first, then speed at scale.',
    tech: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    Icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'Repeatable deployments, monitoring and cost control, so releases become routine.',
    tech: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
]

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="exp-sec" aria-labelledby="exp-title">
      <div className="container">
        <div className="exp-head">
          <div className="exp-head-text">
            <p className="exp-eyebrow">Expertise</p>
            <h2 id="exp-title" className="exp-title">
              Every layer of the product, <span className="exp-gold">one team</span>
            </h2>
            <p className="exp-sub">
              From the API to the app store, we cover the full stack, so nothing gets lost
              between vendors.
            </p>
          </div>
          <Link to="/expertise" className="exp-link">
            Full tech stack <ArrowRight size={16} />
          </Link>
        </div>

        <div className="exp-grid">
          {AREAS.map(({ Icon, title, desc, tech }, i) => (
            <article key={title} className="exp-item">
              <span className="exp-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="exp-icon"><Icon size={20} /></span>
              <h3 className="exp-name">{title}</h3>
              <p className="exp-desc">{desc}</p>
              <ul className="exp-tags" aria-label={`${title} technologies`}>
                {tech.map((t) => <li key={t} className="exp-tag">{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
