import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Server, Layout, Database, Cloud, Smartphone, Brain, Boxes, Terminal } from 'lucide-react'
import styles from './Content.module.css'
import './Expertise.css'

/* Photos: Unsplash. Swap an id (the part after "photo-") or paste a full URL / local import.
   If a photo fails to load, the dark gradient behind it stays, so nothing looks broken. */
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

function Photo({ src, className = '' }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`xp-photo ${className}`}>
      {ok && <img src={src} alt="" loading="lazy" decoding="async" onError={() => setOk(false)} />}
    </div>
  )
}

/* Edit freely: every item links to its official site. */
const STACK = [
  { title: 'Backend', icon: Server, image: img('1461749280684-dccba630e2f6'),
    blurb: 'Fast, secure APIs and business logic that stay maintainable as the product grows.',
    items: [
      ['Python', 'https://www.python.org/'], ['Node.js', 'https://nodejs.org/'], ['Java', 'https://www.java.com/'],
      ['PHP', 'https://www.php.net/'], ['Laravel', 'https://laravel.com/'], ['.NET Core', 'https://dotnet.microsoft.com/'],
      ['Kotlin', 'https://kotlinlang.org/'], ['C++', 'https://isocpp.org/'],
    ]},
  { title: 'Frontend', icon: Layout, image: img('1498050108023-c5249f4df085'),
    blurb: 'Responsive, accessible interfaces for dashboards, portals and marketing sites.',
    items: [
      ['React', 'https://react.dev/'], ['Vue.js', 'https://vuejs.org/'], ['Next.js', 'https://nextjs.org/'],
    ]},
  { title: 'Mobile', icon: Smartphone, image: img('1512941937669-90a1b58e7e9c'),
    blurb: 'Cross-platform apps for iOS and Android, from prototype to store release.',
    items: [
      ['Flutter', 'https://flutter.dev/'], ['React Native', 'https://reactnative.dev/'], ['Kotlin', 'https://kotlinlang.org/'],
    ]},
  { title: 'Databases', icon: Database, image: img('1460925895917-afdab827c52f'),
    blurb: 'Schemas and queries designed for correctness first, then speed at scale.',
    items: [
      ['PostgreSQL', 'https://www.postgresql.org/'], ['MySQL', 'https://www.mysql.com/'], ['MongoDB', 'https://www.mongodb.com/'],
    ]},
  { title: 'Cloud & DevOps', icon: Cloud, image: img('1451187580459-43490279c0fa'),
    blurb: 'Repeatable deployments, monitoring and cost control, so releases become routine.',
    items: [
      ['AWS', 'https://aws.amazon.com/'], ['Docker', 'https://www.docker.com/'], ['Kubernetes', 'https://kubernetes.io/'],
    ]},
]

const CAPABILITIES = [
  { icon: Cloud, title: 'Cloud Capabilities', image: img('1558494949-ef010cbdcc31', 900),
    text: 'Backed by AWS, we build for high reliability and scalability. Docker and Kubernetes simplify containerisation and orchestration, so deployments stay smooth and repeatable.' },
  { icon: Brain, title: 'AI & Machine Learning for Business', image: img('1677442136019-21780ecad995', 900),
    text: 'Drive smarter operations with tailored AI. From predictive analytics to AI-driven chatbots and voice agents, we streamline processes, sharpen decisions and cut manual work.' },
  { icon: Boxes, title: 'Blockchain Development', image: img('1639762681485-074b7f938ba0', 900),
    text: 'We build decentralised, transparent and secure blockchain-based applications on leading networks and technologies.' },
]

const NEXT = [
  'Our expert follows up after reviewing your needs.',
  'If required, we sign an NDA to protect your privacy.',
  'Our pre-sales manager sends you a proposal.',
  'Then we get started on your project.',
]

export default function Expertise() {
  return (
    <main className={styles.page}>
      {/* Hero: copy on the left, photo + terminal snippet on the right */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><span aria-current="page">Expertise</span>
            </nav>

            <div className="xp-top">
              <div className="xp-top-text">
                <p className={styles.eyebrow}>Tech</p>
                <h1 className={styles.h1}>Our Core <em>Development Stack</em></h1>
                <p className={styles.lead}>
                  We use a modern, reliable tech stack to build fast, secure and scalable digital
                  solutions tailored to your needs.
                </p>
                <div className="xp-top-actions">
                  <Link to="/contact" className={styles.btnGold}>Get a Quote <ArrowRight size={16} /></Link>
                  <Link to="/portfolio" className={styles.btnBlue}>See our work</Link>
                </div>
              </div>

              <div className="xp-top-visual" aria-hidden="true">
                <Photo src={img('1555066931-4365d14bab8c', 1400)} className="xp-top-photo" />
                <span className="xp-float"><i /> Production-ready stacks</span>
                <div className="xp-term">
                  <div className="xp-term-bar"><i /><i /><i /><span><Terminal size={12} /> deploy</span></div>
                  <p><b>$</b> docker compose up --build</p>
                  <p><em>✓</em> api&nbsp;&nbsp;&nbsp;FastAPI&nbsp;&nbsp;&nbsp;<u>ready</u></p>
                  <p><em>✓</em> web&nbsp;&nbsp;&nbsp;React&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>ready</u></p>
                  <p><em>✓</em> db&nbsp;&nbsp;&nbsp;&nbsp;PostgreSQL <u>ready</u></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack: image + technologies, alternating sides */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Technologies we build with</p>
            <h2 className={styles.h2}>The right tool for every layer</h2>
          </div>

          <div className="xp-rows">
            {STACK.map(({ title, icon: Icon, image, blurb, items }, i) => (
              <div key={title} className={`xp-row ${i % 2 ? 'is-flip' : ''}`}>
                <div className="xp-media">
                  <Photo src={image} className="xp-row-photo" />
                  <span className="xp-badge"><Icon size={16} /> {title}</span>
                </div>
                <div className="xp-info">
                  <span className="xp-no">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="xp-h3">{title}</h3>
                  <p className="xp-blurb">{blurb}</p>
                  <div className="xp-techs">
                    {items.map(([name, href]) => (
                      <a key={title + name} href={href} target="_blank" rel="noreferrer" className="xp-tech">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities: photo cards */}
      <section className={`${styles.section} ${styles.soft}`}>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>What we build with it</p>
            <h2 className={styles.h2}>Capabilities</h2>
          </div>
          <div className="xp-caps">
            {CAPABILITIES.map(({ icon: Icon, title, image, text }) => (
              <article key={title} className="xp-cap">
                <div className="xp-cap-media">
                  <Photo src={image} className="xp-cap-photo" />
                  <span className="xp-cap-icon"><Icon size={22} /></span>
                </div>
                <div className="xp-cap-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>What happens next?</p>
            <h2 className={styles.h2}>From first message to kick-off</h2>
          </div>
          <ol className="xp-steps">
            {NEXT.map((t, i) => (
              <li key={t} className="xp-step">
                <span className="xp-step-no">{i + 1}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Ready to Build &amp; Scale?</h2>
              <p>Schedule a consultation or get a quote.</p>
            </div>
            <Link to="/contact" className={styles.btnGold}>Get a Quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
