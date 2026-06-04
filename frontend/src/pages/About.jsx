import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Rocket, Code2, Brain, Globe, Shield } from 'lucide-react'
import styles from './About.module.css'

const VALUES = [
  { icon: Code2,  title: 'Code Excellence',       desc: 'Clean, documented, tested code is non-negotiable. We write code we\'re proud to put our name on.'   },
  { icon: Brain,  title: 'AI-First Thinking',      desc: 'We approach every problem with an AI-first mindset, automating what can be automated.'              },
  { icon: Heart,  title: 'Client Partnership',     desc: 'Your success is our success. We don\'t just deliver code — we invest in your outcomes.'             },
  { icon: Globe,  title: 'Remote-Native',          desc: 'Born remote, we\'ve mastered async collaboration across timezones with zero friction.'              },
  { icon: Rocket, title: 'Ship Fast, Scale Later', desc: 'MVPs in weeks, not months. We know when to optimize and when to iterate.'                          },
  { icon: Shield, title: 'Security by Default',    desc: 'Security isn\'t an afterthought. Authentication, authorization, and data safety are built-in.'      },
]

const MILESTONES = [
  { year: '2019', title: 'Founded',          desc: 'Axon Forge started as a freelance Django consultancy.' },
  { year: '2020', title: 'First SaaS',       desc: 'Built and launched our first full SaaS product for a US-based startup.' },
  { year: '2021', title: 'Team Expansion',   desc: 'Grew to a 4-person team with specialized frontend and DevOps expertise.' },
  { year: '2022', title: 'AI Integration',   desc: 'Added AI/ML services as LLMs became mainstream tools for businesses.' },
  { year: '2023', title: '50+ Projects',     desc: 'Crossed 50 successful project deliveries with 100% client satisfaction.' },
  { year: '2024', title: 'LinkedIn Growth',  desc: 'Grew LinkedIn page to 700+ followers, building a community around our work.' },
]

export default function About() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <span className="label">Our Story</span>
          <h1 className="section-title" style={{ maxWidth: '700px', marginBottom: '24px' }}>
            We're a Team of Engineers Who Actually Care
          </h1>
          <p className={styles.heroDesc}>
            Founded in 2019, Axon Forge is a remote-first software development agency
            specializing in intelligent full-stack solutions. We bridge the gap between cutting-edge
            AI technology and real-world business needs.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section">
        <div className="container">
          <div className={styles.mvGrid}>
            <div className="card">
              <div className={styles.mvIcon}><Target size={28} /></div>
              <h3 className={styles.mvTitle}>Our Mission</h3>
              <p className={styles.mvDesc}>
                To empower businesses of all sizes with intelligent, scalable software that drives
                real results — delivered on time, within budget, and built to last.
              </p>
            </div>
            <div className="card">
              <div className={styles.mvIcon}><Eye size={28} /></div>
              <h3 className={styles.mvTitle}>Our Vision</h3>
              <p className={styles.mvDesc}>
                To be the go-to development partner for startups and SMEs globally, known for
                technical excellence, AI-first thinking, and genuine client partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <span className="label">The Journey</span>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>From Freelancer to Full Team</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                It started with a single Django project. A freelance gig that turned into a long-term
                partnership, which opened doors to more ambitious projects that required a team.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                As AI tools matured, we evolved. We integrated machine learning capabilities, expanded
                into cloud-native architectures, and built a team of specialists who each bring deep
                expertise to every engagement.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '36px' }}>
                Today, with 85+ projects delivered and 60+ happy clients across 4 continents, we remain
                committed to the principle that got us here: build software you'd be proud to use yourself.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/team" className="btn btn-primary">Meet the Team <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn btn-outline">Work With Us</Link>
              </div>
            </div>
            <div className={styles.timeline}>
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={styles.timelineItem}>
                  <div className={styles.timelineLeft}>
                    <div className={styles.timelineYear}>{m.year}</div>
                    {i < MILESTONES.length - 1 && <div className={styles.timelineLine} />}
                  </div>
                  <div className={styles.timelineContent}>
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card">
                <div className={styles.valueIcon}><Icon size={22} /></div>
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className={`section ${styles.techSection}`}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label">Our Toolkit</span>
            <h2 className="section-title">Technologies We Master</h2>
          </div>
          <div className={styles.techCats}>
            {[
              { cat: 'Backend',         techs: ['Django', 'FastAPI', 'Python', 'Node.js', 'GraphQL'] },
              { cat: 'Frontend',        techs: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Vite'] },
              { cat: 'Database',        techs: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'SQLite'] },
              { cat: 'Cloud & DevOps',  techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions'] },
              { cat: 'AI & ML',         techs: ['OpenAI', 'LangChain', 'TensorFlow', 'HuggingFace', 'Pinecone'] },
              { cat: 'Mobile',          techs: ['React Native', 'Expo', 'iOS', 'Android', 'FCM'] },
            ].map(({ cat, techs }) => (
              <div key={cat} className={styles.techCat}>
                <h4 className={styles.techCatTitle}>{cat}</h4>
                <div className={styles.techTags}>
                  {techs.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}