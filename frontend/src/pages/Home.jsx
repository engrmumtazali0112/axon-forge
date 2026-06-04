import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, TrendingUp, Users, Briefcase, Star, Target, BarChart3, Rocket, Wrench } from 'lucide-react'
import { getServices, getStats, getTestimonials } from '../api'
import styles from './Home.module.css'

const API = 'http://localhost:8000'

const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const step = Math.ceil(target / 55)
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) { clearInterval(timer); return target }
        return prev + step
      })
    }, 25)
    return () => clearInterval(timer)
  }, [target])
  return <span>{count}{suffix}</span>
}

/* ── Axon Forge LogoMark (matching Navbar) ── */
function LogoMark({ size = 44 }) {
  const scale = size / 44
  return (
    <svg
      width={44 * scale}
      height={30 * scale}
      viewBox="0 0 44 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Axon Forge icon"
    >
      <path d="M2,26 C10,22 22,10 40,5" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="40" cy="5" r="2.2" fill={GOLD} />
      <path d="M2,28 C10,25 22,16 39,12" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="39" cy="12" r="2.2" fill={BLUE} />
      <path d="M2,29.5 C10,28 22,22 38,19" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="38" cy="19" r="2.2" fill={GOLD} />
    </svg>
  )
}

const TECH_ITEMS = ['FastAPI', 'React.js', 'Django', 'PostgreSQL', 'AWS', 'Docker', 'OpenAI', 'LangChain', 'React Native', 'Redis', 'Stripe', 'CI/CD']

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery Call',      desc: 'Free 30-min consultation to understand your goals and define scope.' },
  { num: '02', title: 'Proposal & Estimate', desc: 'Detailed scope, timeline, and fixed-price quote within 24 hours.' },
  { num: '03', title: 'Build & Iterate',     desc: 'Agile sprints with weekly demos — you see progress every step.' },
  { num: '04', title: 'Deploy & Support',    desc: 'Production launch with full handover, docs, and ongoing support.' },
]

const AUTO_FEATURES = [
  { Icon: Target,    title: 'Identify Bottlenecks',  desc: 'We audit your workflow to find exactly where time and money are being lost.' },
  { Icon: Wrench,    title: 'Build Smart Systems',   desc: 'Custom APIs, AI pipelines, and integrations that replace manual tasks.' },
  { Icon: BarChart3, title: 'Monitor & Optimize',    desc: 'Real-time dashboards and performance tracking — you stay in full control.' },
  { Icon: Rocket,    title: 'Scale Confidently',     desc: 'Architecture built to handle 10x growth without rebuilding from scratch.' },
]

export default function Home() {
  const [services,     setServices]     = useState([])
  const [stats,        setStats]        = useState(null)
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    getServices().then(r => setServices(r.data.services.slice(0, 6)))
    getStats().then(r => setStats(r.data))
    getTestimonials().then(r => setTestimonials(r.data.testimonials.slice(0, 3)))
  }, [])

  return (
    <div>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroBottomLine} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <div className={styles.heroEyebrow}>
                <span className={styles.eyebrowDot} />
                Welcome to Axon Forge
              </div>
              <h1 className={styles.heroTitle}>Make Your Business</h1>
              <h1 className={styles.heroTitle2}><span className={styles.goldText}>Automate & Scale</span></h1>
              <p className={styles.heroDesc}>
                We build intelligent full-stack solutions — SaaS platforms, AI integrations,
                cloud applications and mobile apps that drive real business growth.
                Your vision, our execution.
              </p>
              <div className={styles.heroBtns}>
                <Link to="/contact" className={styles.btnGold}>Get a Free Quote <ArrowRight size={15} /></Link>
                <Link to="/services" className={styles.btnGhost}>Explore Services</Link>
              </div>
              <div className={styles.heroTrust}>
                <div className={styles.trustLabel}>Tech We Use</div>
                <div className={styles.trustPills}>
                  {['FastAPI', 'React', 'Django', 'AWS', 'PostgreSQL', 'Python', 'Docker'].map(t => (
                    <span key={t} className={styles.pill}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.quoteCard}>
                {/* Axon Forge logo in quote card */}
                <div style={{ marginBottom: 12 }}>
                  <LogoMark size={36} />
                </div>
                <div className={styles.quoteStars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}
                </div>
                <p className={styles.quoteText}>
                  "Axon Forge automated our entire workflow. What used to take{' '}
                  <em>3 days now runs in minutes.</em> ROI was visible in week one."
                </p>
                <div className={styles.quoteMeta}>
                  <div className={styles.quoteAvatar}>JD</div>
                  <div>
                    <div className={styles.quoteName}>James Davis</div>
                    <div className={styles.quoteRole}>CTO @ TechFlow Inc.</div>
                  </div>
                </div>
              </div>
              <div className={styles.miniCards}>
                {[
                  { num: '50+', label: 'Projects Delivered' },
                  { num: '40+', label: 'Happy Clients' },
                  { num: '$20', label: 'Starting Rate/hr' },
                  { num: '24h', label: 'Response Time' },
                ].map(({ num, label }) => (
                  <div key={label} className={styles.miniCard}>
                    <div className={styles.miniNum}>{num}</div>
                    <div className={styles.miniLabel}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <div className={styles.techBar}>
        <div className={styles.marqueeTrack}>
          {[...TECH_ITEMS, ...TECH_ITEMS].map((t, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      {stats && (
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}><TrendingUp size={22} className={styles.statIcon} /><div className={styles.statNum}><AnimatedCounter target={stats.projects_completed} suffix="+" /></div><div className={styles.statLabel}>projects_completed</div></div>
              <div className={styles.statItem}><Users size={22} className={styles.statIcon} /><div className={styles.statNum}><AnimatedCounter target={stats.happy_clients} suffix="+" /></div><div className={styles.statLabel}>happy_clients</div></div>
              <div className={styles.statItem}><Briefcase size={22} className={styles.statIcon} /><div className={styles.statNum}><AnimatedCounter target={stats.years_experience} suffix="+" /></div><div className={styles.statLabel}>years_experience</div></div>
              <div className={styles.statItem}><Code2 size={22} className={styles.statIcon} /><div className={styles.statNum}><AnimatedCounter target={stats.technologies} suffix="+" /></div><div className={styles.statLabel}>technologies</div></div>
            </div>
          </div>
        </section>
      )}

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.secLabel}>What We Do</div>
              <h2 className={styles.secTitle}>Services We Provide</h2>
              <p className={styles.secSub}>End-to-end development solutions tailored for startups and growing businesses.</p>
            </div>
            <Link to="/services" className={styles.btnGhost}>All Services →</Link>
          </div>
          <div className={styles.srvGrid}>
            {services.map((s, i) => (
              <div key={s.id} className={styles.srvCard} style={{ animationDelay: `${i * 0.08}s` }}>
                {s.photo_url ? (
                  <div className={styles.srvImgWrap}>
                    <img src={`${API}${s.photo_url}`} alt={s.title} className={styles.srvImg} />
                    <div className={styles.srvImgOverlay} />
                  </div>
                ) : (
                  <div className={styles.srvPlaceholder}>
                    <span className={styles.srvPlaceholderNum}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                )}
                <h3 className={styles.srvTitle}>{s.title}</h3>
                <p className={styles.srvDesc}>{s.description}</p>
                <Link to="/contact" className={styles.srvCta}>
                  Get Started <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Automate ── */}
      <section className={styles.automate}>
        <div className="container">
          <div className={styles.autoGrid}>
            <div>
              <div className={styles.secLabel}>How We Work</div>
              <h2 className={styles.secTitle}>Make Your Business<br /><span className={styles.goldText}>Automate & Grow</span></h2>
              <p className={styles.secSub} style={{ marginBottom: '40px' }}>
                We turn manual, time-consuming processes into intelligent automated systems that save time and cut costs.
              </p>
              <div className={styles.autoFeatures}>
                {AUTO_FEATURES.map(({ Icon, title, desc }) => (
                  <div key={title} className={styles.autoFeat}>
                    <div className={styles.autoFeatIcon}><Icon size={18} /></div>
                    <div>
                      <div className={styles.autoFeatTitle}>{title}</div>
                      <div className={styles.autoFeatDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.processCard}>
                <div className={styles.processTitle}>Our Delivery Process</div>
                <div className={styles.processSteps}>
                  {PROCESS_STEPS.map(({ num, title, desc }) => (
                    <div key={num} className={styles.pStep}>
                      <div className={styles.pNum}>{num}</div>
                      <div><div className={styles.pStepTitle}>{title}</div><div className={styles.pStepDesc}>{desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="section">
        <div className="container">
          <div className={styles.whyGrid}>
            <div>
              <div className={styles.secLabel}>Why Choose Us</div>
              <h2 className={styles.secTitle}>We Don't Just Code.<br />We Engineer Solutions.</h2>
              <p className={styles.secSub} style={{ marginBottom: '32px' }}>Every project is treated like our own startup. Quality, performance, and real business value — every time.</p>
              <div className={styles.whyChecks}>
                {['Clean, documented, maintainable code — always', 'On-time delivery with full transparent communication', 'AI-first problem solving for maximum efficiency', 'Scalable architecture designed from day one', 'Remote & worldwide — available in your timezone'].map(text => (
                  <div key={text} className={styles.wcItem}><div className={styles.wcCheck}>✓</div><div className={styles.wcText}>{text}</div></div>
                ))}
              </div>
              <div style={{ marginTop: '36px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/about" className={styles.btnGold}>About Us →</Link>
                <Link to="/contact" className={styles.btnGhost}>Hire Us</Link>
              </div>
            </div>
            <div>
              <div className={styles.priceCard}>
                <div className={styles.secLabel}>Pricing</div>
                <div className={styles.priceBig}>$20<span>/hr</span></div>
                <p className={styles.priceNote}>Starting rate · Transparent pricing · No surprises</p>
                <div className={styles.priceList}>
                  {['Free initial consultation', 'Fixed-price projects available', 'Flexible engagement models', 'Money-back guarantee on milestones', '24/7 communication & support'].map(item => (
                    <div key={item} className={styles.priceItem}><span className={styles.piCheck}>✓</span> {item}</div>
                  ))}
                </div>
                <Link to="/contact" className={styles.btnGold} style={{ width: '100%', justifyContent: 'center' }}>Get Free Estimate →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className={`section ${styles.testi}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div><div className={styles.secLabel}>Client Feedback</div><h2 className={styles.secTitle}>What Our Clients Say</h2></div>
              <Link to="/testimonials" className={styles.btnGhost}>All Reviews →</Link>
            </div>
            <div className={styles.testiGrid}>
              {testimonials.map(t => (
                <div key={t.id} className={styles.tc}>
                  <div className={styles.tcStars}>{[...Array(t.rating)].map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}</div>
                  <p className={styles.tcText}>"{t.text}"</p>
                  <div className={styles.tcAuthor}>
                    <div className={styles.tcAv}>{t.avatar}</div>
                    <div><div className={styles.tcName}>{t.name}</div><div className={styles.tcRole}>{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className={styles.ctaSec}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <span className={styles.ctaBracketL}>{'{'}</span>
            <span className={styles.ctaBracketR}>{'}'}</span>
            <div className={styles.ctaEyebrow}><span className={styles.eyebrowDot} /> Free Consultation Available</div>
            <h2 className={styles.ctaTitle}>Ready to <em>Automate</em> &<br />Grow Your Business?</h2>
            <p className={styles.ctaSub}>Let's discuss your project. Free consultation, clear timeline, transparent pricing — no commitment required.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/contact" className={styles.btnGold}>Start a Conversation →</Link>
              <Link to="/services" className={styles.btnGhost}>View Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}