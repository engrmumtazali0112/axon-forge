import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PostImage from '../components/PostImage'
import { POSTS, CATEGORIES, formatDate } from '../data/blogPosts'
import styles from './Content.module.css'

function Meta({ post }) {
  return (
    <div className={styles.meta}>
      {post.featured && <span className={styles.badge}>Featured</span>}
      <span>{formatDate(post.date)}</span>
      <span>· {post.readTime} min read</span>
    </div>
  )
}

export default function Blog() {
  const [cat, setCat]     = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter((p) =>
      (cat === 'All' || p.category === cat) &&
      (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)))
  }, [cat, query])

  const showFeatured = cat === 'All' && !query
  const featured = showFeatured ? POSTS.find((p) => p.featured) : null
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><span aria-current="page">Blog</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <p className={styles.eyebrow}>Blog &amp; Insights</p>
                <h1 className={styles.h1}>Latest Articles &amp; <em>Tech Insights</em></h1>
              </div>
              <p className={styles.lead} style={{ maxWidth: '38ch' }}>
                Expert perspectives on software development, AI, cloud and digital strategy,
                helping you make smarter tech decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.chips} role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c}
                  className={`${styles.chip} ${cat === c ? styles.chipOn : ''}`}
                  onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <input className={styles.search} type="search" placeholder="Search articles…"
              value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search articles" />
          </div>

          {featured && (
            <Link to={`/blog/${featured.slug}`} className={styles.featured}>
              <PostImage slug={featured.slug} category={featured.category} image={featured.image} />
              <div className={styles.featuredBody}>
                <Meta post={featured} />
                <h2 className={styles.cardTitle}>{featured.title}</h2>
                <p className={styles.excerpt} style={{ flex: 'none' }}>{featured.excerpt}</p>
                <span className={styles.more}>Read More <ArrowRight size={15} /></span>
              </div>
            </Link>
          )}

          {rest.length === 0 && !featured ? (
            <p className={styles.empty}>No articles match your search.</p>
          ) : (
            <div className={styles.grid}>
              {rest.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.card}>
                  <PostImage slug={p.slug} category={p.category} image={p.image} />
                  <div className={styles.cardBody}>
                    <Meta post={p} />
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <p className={styles.excerpt}>{p.excerpt}</p>
                    <span className={styles.more}>Read More <ArrowRight size={15} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Have a project in mind?</h2>
              <p>Tell us what you need and we will reply within 24 hours.</p>
            </div>
            <Link to="/contact" className={styles.btnGold}>Get a Quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
