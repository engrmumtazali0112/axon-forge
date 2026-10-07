import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, HeartHandshake, Lightbulb, Layers, Users, LifeBuoy, Route,
  Handshake, Code2, ShieldCheck, Shuffle, Eye, Scale, Globe2, MapPin,
  Image as ImageIcon, Send, Check,
} from 'lucide-react'
import { getTeam } from '../api'
import styles from './About.module.css'

const BLUE = '#2E9BD6'
const GOLD = '#F5A623'

/* ── Newsletter endpoint: change the path if your FastAPI route differs ── */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const NEWSLETTER_URL = `${API_BASE}/api/newsletter/subscribe`

/* ── Content (edit freely) ── */
const AT_A_GLANCE = [
  { value: '50+', label: 'Projects delivered' },
  { value: '40+', label: 'Happy clients' },
  { value: '$20', label: 'Starting hourly rate' },
  { value: '24h', label: 'Reply time' },
]

/* Put your photos in /public/about/ using these file names */
const PHOTOS = [
  { src: '/about/team-discussion.jpg',    label: 'Team discussion' },
  { src: '/about/team-collaboration.jpg', label: 'Team collaboration' },
  { src: '/about/yes-we-can.jpg',         label: 'Yes we can' },
  { src: '/about/workspace.jpg',          label: 'Workspace overview' },
]

const STORY = [
  { title: 'Who we are',         text: 'A team driven by integrity, creativity and innovation. Our mission is to raise standards and empower our clients.' },
  { title: 'What we do',         text: 'We design and deliver smart, innovative solutions. Each project is crafted to exceed expectations and inspire growth.' },
  { title: 'How we help',        text: 'By focusing on quality and client needs, we create lasting partnerships. Our goal is to support success at every step.' },
  { title: 'Create success story', text: 'Together, we turn ideas into achievements that matter. Every milestone becomes part of a bigger success story.' },
]

const VALUES = [
  { icon: HeartHandshake, title: 'Customer gratification', text: 'We are committed to helping our customers lead their markets with our strategic solutions.' },
  { icon: Lightbulb,      title: 'Relentless innovation',  text: 'Persistent innovation keeps us ahead of the changing economy and technology.' },
  { icon: Layers,         title: 'Seamless service',       text: 'Our collaborative team promises a seamless service to our customers, through all odds.' },
  { icon: Users,          title: 'Team building',          text: 'We serve customers better by building a more co-operative workspace for our people.' },
  { icon: LifeBuoy,       title: 'Immediate assistance',   text: 'Customer loyalty depends on fast help when something fails. We abide by it.' },
  { icon: Route,          title: 'Simplified strategies',  text: 'Our approach to your business hurdles is simple and relevant.' },
]

const ETHICS = [
  { icon: Handshake,   title: 'Long-term partnership', text: 'We build relationships that outlast a single project.' },
  { icon: Code2,       title: 'Full-stack development', text: 'From front end to back end, we handle every aspect and build complete, end-to-end solutions.' },
  { icon: ShieldCheck, title: 'Proven expertise',       text: 'React, FastAPI, Django, AWS and applied AI, used in production.' },
  { icon: Shuffle,     title: 'Flexibility',            text: 'No matter the challenge, we stay agile and adapt to your needs, goals and processes.' },
  { icon: Eye,         title: 'Transparency',           text: 'Open communication, so you are always aware of your project\'s status.' },
  { icon: Scale,       title: 'Quality standards',      text: 'Secure, tested, maintainable code that follows industry best practice.' },
]

const VISION_TAGS = ['Vision', 'Growth', 'Geography', 'Innovation', 'Impact']

/* Regions you serve: edit to match reality */
const REGIONS = ['United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Singapore', 'Australia']

/* Experts section. Shown if the Strapi team-members API is empty or unavailable.
   Add people here, or (better) add them in Strapi: name, role, bio, skills (JSON array), avatar. */
const FALLBACK_TEAM = [
  { id: 1, name: 'Mumtaz Ali', role: 'Founder & Lead Engineer', bio: 'Full-stack and AI engineer focused on scalable SaaS, cloud and automation.', skills: ['React', 'FastAPI', 'AWS', 'AI / LLMs'], avatar: 'MA' },
]

/* ── Small pieces ── */
function Arcs() {
  return (
    <svg className={styles.arcs} viewBox="0 0 44 30" fill="none" aria-hidden>
      <path d="M2,26 C10,22 22,10 40,5"    stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="40" cy="5" r="1.2" fill={GOLD} />
      <path d="M2,28 C10,25 22,16 39,12"   stroke={BLUE} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="39" cy="12" r="1.2" fill={BLUE} />
      <path d="M2,29.5 C10,28 22,22 38,19" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="38" cy="19" r="1.2" fill={GOLD} />
    </svg>
  )
}

function SectionHead({ eyebrow, title, intro, center = false }) {
  return (
    <header className={`${styles.sectionHead} ${center ? styles.center : ''}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.h2}>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  )
}

function Photo({ src, label, className }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`${styles.photo} ${className || ''}`}>
      {failed ? (
        <div className={styles.photoFallback}><ImageIcon size={28} /></div>
      ) : (
        <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
      )}
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function Newsletter() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setStatus('error'); return }
    setStatus('loading')
    try {
      const res = await fetch(NEWSLETTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('done'); setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.newsletter}>
      <div>
        <p className={styles.eyebrow}>Stay connected</p>
        <h2 className={styles.h2}>Join our newsletter</h2>
        <p className={styles.intro}>Get project updates, announcements and new articles in your inbox.</p>
      </div>
      {status === 'done' ? (
        <p className={styles.subOk}><Check size={18} /> You are subscribed. Thank you!</p>
      ) : (
        <form onSubmit={onSubmit} className={styles.subForm} noValidate>
          <label htmlFor="nl-email" className={styles.srOnly}>Email address</label>
          <input
            id="nl-email" type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
            placeholder="Enter your email" className={styles.subInput}
            aria-invalid={status === 'error'}
          />
          <button type="submit" disabled={status === 'loading'} className={styles.subBtn}>
            {status === 'loading' ? 'Subscribing…' : <>Subscribe <Send size={15} /></>}
          </button>
          {status === 'error' && (
            <p className={styles.subErr} role="alert">Enter a valid email, or try again in a moment.</p>
          )}
        </form>
      )}
    </div>
  )
}

/* ── Page ── */
export default function About() {
  const [team, setTeam] = useState(FALLBACK_TEAM)

  useEffect(() => {
    getTeam()
      .then((r) => { if (r?.data?.team?.length) setTeam(r.data.team) })
      .catch(() => {})
  }, [])

  return (
    <main className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span aria-current="page">About</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Who we are</p>
              <h1 className={styles.h1}>About Axon Forge</h1>
              <p className={styles.lead}>
                We partner with forward-thinking businesses to turn innovative ideas into
                practical digital products that drive growth and deliver measurable results.
              </p>
              <p className={styles.body} style={{ marginTop: 16, maxWidth: '58ch' }}>
                At Axon Forge we are driven by integrity, innovation and a commitment to
                excellence. Our mission is to set new standards in the industry while
                empowering clients to reach their full potential.
              </p>
              <dl className={styles.glance}>
                {AT_A_GLANCE.map(({ value, label }) => (
                  <div key={label} className={styles.glanceItem}>
                    <dd>{value}</dd>
                    <dt>{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className={styles.mosaic}>
              <Photo {...PHOTOS[0]} className={styles.m1} />
              <Photo {...PHOTOS[1]} className={styles.m2} />
              <Photo {...PHOTOS[2]} className={styles.m3} />
              <Photo {...PHOTOS[3]} className={styles.m4} />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className="container">
          <SectionHead title="How we work with you" intro="From first call to long-term support, this is the path every project follows." />
          <ol className={styles.steps}>
            {STORY.map(({ title, text }, i) => (
              <li key={title} className={styles.step}>
                <span className={styles.stepNo}>{i + 1}</span>
                <div>
                  <h3 className={styles.h3}>{title}</h3>
                  <p className={styles.body}>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core values */}
      <section className={`${styles.section} ${styles.soft}`}>
        <div className="container">
          <SectionHead eyebrow="What drives us" title="Our core values" />
          <div className={styles.grid3}>
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <article key={title} className={styles.valueCard}>
                <div className={styles.valueTop}>
                  <span className={styles.iconBox}><Icon size={20} /></span>
                  <span className={styles.valueNo}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.h3}>{title}</h3>
                <p className={styles.body}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company ethics */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.split}>
            <SectionHead eyebrow="Our principles" title="Our company ethics" intro="The standards we hold ourselves to on every engagement." />
            <ul className={styles.principles}>
              {ETHICS.map(({ icon: Icon, title, text }) => (
                <li key={title} className={styles.principle}>
                  <span className={styles.iconBoxGold}><Icon size={18} /></span>
                  <div>
                    <h3 className={styles.h4}>{title}</h3>
                    <p className={styles.body}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className={styles.vision}>
        <Arcs />
        <div className="container">
          <div className={styles.visionInner}>
            <p className={styles.eyebrowLight}>Our vision</p>
            <h2 className={styles.visionTitle}>Enterprise-grade software for startups and growing businesses everywhere.</h2>
            <p className={styles.visionText}>
              We have worked across regions and industries, developing products, services and
              experiences. It taught us that a well-defined strategy is key to bringing
              visibility, credibility and funding to any organisation. Axon Forge was founded
              to deliver enterprise-grade software to startups and businesses worldwide.
            </p>
            <ul className={styles.tags}>
              {VISION_TAGS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Global reach */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.split}>
            <SectionHead
              eyebrow="Global reach"
              title="Building for teams across every continent"
              intro="Based in Lahore, Pakistan and working remotely with founders and operators worldwide. We deliver everywhere through async-first collaboration."
            />
            <div>
              <h3 className={styles.h4}>Where we work</h3>
              <ul className={styles.regions}>
                {REGIONS.map((r) => <li key={r}><Globe2 size={15} />{r}</li>)}
              </ul>
              <p className={styles.body} style={{ marginTop: 18 }}>
                Don't see your country? We still ship there.{' '}
                <Link to="/contact" className={styles.link}>Tell us where you're based</Link>{' '}
                and we'll reply within 24 hours.
              </p>
              <div className={styles.office}>
                <span className={styles.iconBox}><MapPin size={18} /></span>
                <div>
                  <h3 className={styles.h4}>Lahore, Pakistan</h3>
                  <p className={styles.body}>Remote-first · engrmumtazali01@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className={`${styles.section} ${styles.soft}`} id="experts">
        <div className="container">
          <SectionHead eyebrow="Our people" title="Meet our experts" intro="Senior engineers and specialists who share a passion for what they do, and the people you will actually work with." />
          <div className={styles.team}>
            {team.map((m) => (
              <article key={m.id || m.name} className={styles.member}>
                {m.photo ? (
                  <img className={styles.avatarImg} src={m.photo} alt={m.name} loading="lazy" />
                ) : (
                  <span className={styles.avatar} aria-hidden>
                    {(m.avatar && m.avatar.length <= 3 ? m.avatar : m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)).toUpperCase()}
                  </span>
                )}
                <h3 className={styles.h4}>{m.name}</h3>
                <p className={styles.role}>{m.role}</p>
                {m.bio && <p className={styles.body}>{m.bio}</p>}
                {Array.isArray(m.skills) && m.skills.length > 0 && (
                  <ul className={styles.skills}>
                    {m.skills.map((k) => <li key={k}>{k}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
          <p className={styles.teamNote}>
            Want a specific skill on your project? <Link to="/contact" className={styles.link}>Tell us what you need</Link>.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.section}>
        <div className="container"><Newsletter /></div>
      </section>

      {/* CTA */}
      <section className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
              <p className={styles.body}>Tell us what you need and we will reply within 24 hours.</p>
            </div>
            <Link to="/contact" className={styles.ctaBtn}>Get a free quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}