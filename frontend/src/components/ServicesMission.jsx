// frontend/src/components/ServicesMission.jsx
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Cloud, Smartphone, Globe, BarChart3 } from 'lucide-react'
import './ServicesMission.css'

const POINTS = [
  'Built with growth in mind',
  'Supported beyond launch',
  'Optimised using real performance data',
]

const NODES = [
  { label: 'AI',          Icon: Brain,      x: 24, y: 28 },
  { label: 'Cloud',       Icon: Cloud,      x: 66, y: 12 },
  { label: 'Data & BI',   Icon: BarChart3,  x: 86, y: 44 },
  { label: 'Web Apps',    Icon: Globe,      x: 68, y: 82 },
  { label: 'Mobile',      Icon: Smartphone, x: 26, y: 72 },
]

export default function ServicesMission() {
  return (
    <section className="sm-section">
      <div className="sm-wrap">
        <div className="sm-text">
          <p className="sm-eyebrow">Our approach</p>
          <h2 className="sm-title">
            Why our services work<br />
            <span>better together</span>
          </h2>

          <p className="sm-lead">
            Most products fail after launch — not because of bad code, but because of
            missing visibility, adoption, or a plan to grow. Building every layer with
            one team means your product is:
          </p>

          <ul className="sm-list">
            {POINTS.map((p) => <li key={p}><i /> {p}</li>)}
          </ul>

          <p className="sm-lead">
            So you work with one partner instead of managing five disconnected vendors.
          </p>

          <Link to="/contact" className="sm-btn">
            Start a project <ArrowRight size={16} />
          </Link>
        </div>

        <div className="sm-orbit" aria-hidden="true">
          <span className="sm-ring r1" />
          <span className="sm-ring r2" />
          <span className="sm-ring r3" />
          <div className="sm-core">Vision</div>
          {NODES.map(({ label, Icon, x, y }, i) => (
            <div
              key={label}
              className="sm-node"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * -1.1}s` }}
            >
              <span className="sm-dot"><Icon size={22} /></span>
              <b>{label}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}