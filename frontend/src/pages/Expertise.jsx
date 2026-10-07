import { Link } from 'react-router-dom'
import { ArrowRight, Server, Layout, Database, Cloud, Smartphone, Brain, Boxes, ShieldCheck } from 'lucide-react'
import styles from './Content.module.css'

/* Edit freely: every item links to its official site. */
const STACK = [
  { title: 'Backend', icon: Server, items: [
    ['Python', 'https://www.python.org/'], ['Node.js', 'https://nodejs.org/'], ['Java', 'https://www.java.com/'],
    ['PHP', 'https://www.php.net/'], ['Laravel', 'https://laravel.com/'], ['.NET Core', 'https://dotnet.microsoft.com/'],
    ['Kotlin', 'https://kotlinlang.org/'], ['C++', 'https://isocpp.org/'],
  ]},
  { title: 'Frontend', icon: Layout, items: [
    ['React', 'https://react.dev/'], ['Vue.js', 'https://vuejs.org/'], ['Next.js', 'https://nextjs.org/'],
  ]},
  { title: 'Mobile', icon: Smartphone, items: [
    ['Flutter', 'https://flutter.dev/'], ['React Native', 'https://reactnative.dev/'], ['Kotlin', 'https://kotlinlang.org/'],
  ]},
  { title: 'Databases', icon: Database, items: [
    ['PostgreSQL', 'https://www.postgresql.org/'], ['MySQL', 'https://www.mysql.com/'], ['MongoDB', 'https://www.mongodb.com/'],
  ]},
  { title: 'Cloud & DevOps', icon: Cloud, items: [
    ['AWS', 'https://aws.amazon.com/'], ['Docker', 'https://www.docker.com/'], ['Kubernetes', 'https://kubernetes.io/'],
  ]},
]

const CAPABILITIES = [
  { icon: Cloud, title: 'Cloud Capabilities',
    text: 'Backed by AWS, we build for high reliability and scalability. Docker and Kubernetes simplify containerisation and orchestration, so deployments stay smooth and repeatable.' },
  { icon: Brain, title: 'AI & Machine Learning for Business',
    text: 'Drive smarter operations with tailored AI. From predictive analytics to AI-driven chatbots and voice agents, we streamline processes, sharpen decisions and cut manual work.' },
  { icon: Boxes, title: 'Blockchain Development',
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
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><span aria-current="page">Expertise</span>
            </nav>
            <p className={styles.eyebrow}>Tech</p>
            <h1 className={styles.h1}>Our Core <em>Development Stack</em></h1>
            <p className={styles.lead}>
              We use a modern, reliable tech stack to build fast, secure and scalable digital
              solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          {STACK.map(({ title, icon: Icon, items }) => (
            <div key={title} className={styles.stackGroup}>
              <h2 className={styles.groupTitle}><span className={styles.groupIcon}><Icon size={18} /></span>{title}</h2>
              <div className={styles.techGrid}>
                {items.map(([name, href]) => (
                  <a key={title + name} href={href} target="_blank" rel="noreferrer" className={styles.tech}>
                    <span className={styles.techDot} />{name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.soft}`}>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>What we build with it</p>
            <h2 className={styles.h2}>Capabilities</h2>
          </div>
          <div className={styles.cap}>
            {CAPABILITIES.map(({ icon: Icon, title, text }) => (
              <article key={title} className={styles.capCard}>
                <span className={styles.capIcon}><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>What happens next?</p>
            <h2 className={styles.h2}>From first message to kick-off</h2>
          </div>
          <div className={styles.cap} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {NEXT.map((t, i) => (
              <article key={t} className={styles.capCard}>
                <span className={styles.capIcon} style={{ fontFamily: 'Syne', fontWeight: 800 }}>{i + 1}</span>
                <p>{t}</p>
              </article>
            ))}
          </div>
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
