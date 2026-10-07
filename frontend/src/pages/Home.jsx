import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, TrendingUp, Users, Briefcase, Star, Target, BarChart3, Rocket, Wrench, Plus, X } from 'lucide-react'
import { getServices, getStats, getTestimonials } from '../api'
import styles from './Home.module.css'

const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!target) return
    const step  = Math.ceil(target / 55)
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

function LogoMark({ size = 44 }) {
  const scale = size / 44
  return (
    <svg width={44 * scale} height={30 * scale} viewBox="0 0 44 30" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-label="Axon Forge icon">
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


/* ── FAQ (edit the answers to match your real terms) ── */
const FAQS = [
  { q: 'What does Axon Forge do?',
    a: 'Axon Forge is a remote-first software agency. We build SaaS platforms, web and mobile apps, AI and machine-learning features, and cloud infrastructure for startups and growing businesses, working with clients across several continents.' },
  { q: 'How much does it cost to build a SaaS or web application?',
    a: 'Our rates start at $20/hour, and we also offer fixed-price projects. After a free discovery call we send a written scope, timeline and quote within 24 hours, so you know the cost before any work starts.' },
  { q: 'How long does a project take?',
    a: 'It depends on scope. A focused MVP is measured in weeks, a larger platform in months. We work in agile sprints with a demo every week, so you see real progress throughout rather than at the end.' },
  { q: 'Who owns the code and the intellectual property?',
    a: 'You do. Source code, repositories and credentials are handed over with documentation at launch, and we are happy to put that in writing before we start.' },
  { q: 'Do you work with startups and first-time founders?',
    a: 'Yes, most of our clients are startups. We help you decide what to build first, keep the first version small, and design the architecture so it can grow without a rebuild.' },
  { q: 'Can we sign an NDA first?',
    a: 'Of course. Tell us when you get in touch and we will sign an NDA before you share anything sensitive.' },
  { q: 'Do you offer support after launch?',
    a: 'Yes. Post-launch support is included with every project, and we can stay on for monitoring, fixes and new features as the product grows.' },
]

function FaqSection() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section">
      <style>{FAQ_CSS}</style>
      <div className="container">
        <div className="faq-grid">
          <div className="faq-left">
            <div className={styles.secLabel}>Questions</div>
            <h2 className={styles.secTitle}>The things clients ask before signing</h2>
            <p className={styles.secSub}>
              Straight answers, including the ones about money and ownership. If yours isn&apos;t here,
              ask it on the call. We&apos;d rather resolve it before a contract than after.
            </p>
            <div className="faq-callout">
              <h3>Still unsure whether it&apos;s worth building?</h3>
              <p>Bring the idea to a 30-minute call. We&apos;ll tell you honestly whether it&apos;s a short build or a long one, and if you shouldn&apos;t build it at all, we&apos;ll say that too.</p>
              <Link to="/contact" className="faq-btn">Book the call <ArrowRight size={15} /></Link>
            </div>
          </div>

          <div className="faq-list">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}>
                      <span>{f.q}</span>
                      <span className="faq-ico">{isOpen ? <X size={14} /> : <Plus size={14} />}</span>
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} className="faq-a" role="region">
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

const FAQ_CSS = `
.faq-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start}
.faq-left{position:sticky;top:110px}
.faq-callout{margin-top:32px;padding:28px;border-radius:18px;background:#fff4de;border:1px solid rgba(245,166,35,.35)}
.faq-callout h3{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:#0b1220;margin:0 0 8px}
.faq-callout p{font-size:.92rem;line-height:1.7;color:#4a5568;margin:0 0 20px}
.faq-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 22px;border-radius:10px;text-decoration:none;
  font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;color:#fff;background:#2E9BD6;transition:all .22s}
.faq-btn:hover{background:#1f7fb8;transform:translateY(-2px);box-shadow:0 12px 26px rgba(46,155,214,.35)}
.faq-list{border-top:1px solid #dbe9f5}
.faq-item{border-bottom:1px solid #dbe9f5}
.faq-item h3{margin:0}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:26px 0;background:none;border:0;cursor:pointer;
  text-align:left;font-family:'Syne',sans-serif;font-weight:700;font-size:1.08rem;color:#0b1220;transition:color .2s}
.faq-q:hover,.is-open .faq-q{color:#1f7fb8}
.faq-ico{flex-shrink:0;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid #dbe9f5;background:#fff;color:#0b1220;transition:all .2s}
.is-open .faq-ico{background:#2E9BD6;border-color:#2E9BD6;color:#fff}
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.is-open .faq-a{grid-template-rows:1fr}
.faq-a>div{overflow:hidden}
.faq-a p{margin:0;padding:0 54px 26px 0;font-size:.98rem;line-height:1.8;color:#4a5568}
.faq-q:focus-visible{outline:2px solid #2E9BD6;outline-offset:3px;border-radius:6px}
@media(max-width:900px){.faq-grid{grid-template-columns:1fr;gap:40px}.faq-left{position:static}.faq-a p{padding-right:0}}
@media(prefers-reduced-motion:reduce){.faq-a{transition:none}}
`

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
      {stats && stats.projects_completed && (
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <TrendingUp size={22} className={styles.statIcon} />
                <div className={styles.statNum}><AnimatedCounter target={stats.projects_completed} suffix="+" /></div>
                <div className={styles.statLabel}>Projects Completed</div>
              </div>
              <div className={styles.statItem}>
                <Users size={22} className={styles.statIcon} />
                <div className={styles.statNum}><AnimatedCounter target={stats.happy_clients} suffix="+" /></div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={styles.statItem}>
                <Briefcase size={22} className={styles.statIcon} />
                <div className={styles.statNum}><AnimatedCounter target={stats.years_experience} suffix="+" /></div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
              <div className={styles.statItem}>
                <Code2 size={22} className={styles.statIcon} />
                <div className={styles.statNum}><AnimatedCounter target={stats.technologies} suffix="+" /></div>
                <div className={styles.statLabel}>Technologies</div>
              </div>
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
                    <img src={s.photo_url} alt={s.title} className={styles.srvImg} />
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
                      <div>
                        <div className={styles.pStepTitle}>{title}</div>
                        <div className={styles.pStepDesc}>{desc}</div>
                      </div>
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
              <p className={styles.secSub} style={{ marginBottom: '32px' }}>
                Every project is treated like our own startup. Quality, performance, and real business value — every time.
              </p>
              <div className={styles.whyChecks}>
                {['Clean, documented, maintainable code — always',
                  'On-time delivery with full transparent communication',
                  'AI-first problem solving for maximum efficiency',
                  'Scalable architecture designed from day one',
                  'Remote & worldwide — available in your timezone'].map(text => (
                  <div key={text} className={styles.wcItem}>
                    <div className={styles.wcCheck}>✓</div>
                    <div className={styles.wcText}>{text}</div>
                  </div>
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
                  {['Free initial consultation', 'Fixed-price projects available',
                    'Flexible engagement models', 'Money-back guarantee on milestones',
                    '24/7 communication & support'].map(item => (
                    <div key={item} className={styles.priceItem}>
                      <span className={styles.piCheck}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className={styles.btnGold} style={{ width: '100%', justifyContent: 'center' }}>
                  Get Free Estimate →
                </Link>
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
              <div>
                <div className={styles.secLabel}>Client Feedback</div>
                <h2 className={styles.secTitle}>What Our Clients Say</h2>
              </div>
              <Link to="/testimonials" className={styles.btnGhost}>All Reviews →</Link>
            </div>
            <div className={styles.testiGrid}>
              {testimonials.map(t => (
                <div key={t.id} className={styles.tc}>
                  <div className={styles.tcStars}>
                    {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}
                  </div>
                  <p className={styles.tcText}>"{t.text}"</p>
                  <div className={styles.tcAuthor}>
                    <div className={styles.tcAv}>{t.avatar || t.name?.slice(0,2).toUpperCase()}</div>
                    <div>
                      <div className={styles.tcName}>{t.name}</div>
                      <div className={styles.tcRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── CTA ── */}
      <section className={styles.ctaSec}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <span className={styles.ctaBracketL}>{'{'}</span>
            <span className={styles.ctaBracketR}>{'}'}</span>
            <div className={styles.ctaEyebrow}>
              <span className={styles.eyebrowDot} /> Free Consultation Available
            </div>
            <h2 className={styles.ctaTitle}>Ready to <em>Automate</em> &<br />Grow Your Business?</h2>
            <p className={styles.ctaSub}>
              Let's discuss your project. Free consultation, clear timeline, transparent pricing — no commitment required.
            </p>
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