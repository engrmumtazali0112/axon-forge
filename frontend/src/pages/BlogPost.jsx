import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PostImage from '../components/PostImage'
import { POSTS, formatDate } from '../data/blogPosts'
import styles from './Content.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className={styles.page}>
        <section className={styles.section}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className={styles.h2}>Article not found</h1>
            <p className={styles.sub} style={{ margin: '12px auto 24px' }}>That article may have moved or been removed.</p>
            <Link to="/blog" className={styles.btnBlue}><ArrowLeft size={16} /> Back to Blog</Link>
          </div>
        </section>
      </main>
    )
  }

  const related = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const more = related.length ? related : POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><Link to="/blog">Blog</Link><span>/</span>
              <span aria-current="page">{post.category}</span>
            </nav>
            <p className={styles.eyebrow}>{post.category}</p>
            <h1 className={styles.h1} style={{ maxWidth: '26ch', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)' }}>{post.title}</h1>
            <div className={styles.meta} style={{ marginTop: 20, marginBottom: 0 }}>
              <span>{formatDate(post.date)}</span><span>· {post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <article className={styles.article}>
            <p style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>{post.excerpt}</p>
            {post.body.map((b, i) =>
              b.h ? <h2 key={i}>{b.h}</h2>
              : b.ul ? <ul key={i}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
              : <p key={i}>{b.p}</p>)}

            <div className={styles.postCta}>
              <h3>Want this applied to your project?</h3>
              <p>Send us your goals and constraints. We will reply within 24 hours with a clear next step.</p>
              <Link to="/contact" className={styles.btnGold}>Book a Demo <ArrowRight size={16} /></Link>
            </div>
          </article>

          <div className={styles.related}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>Continue Reading</p>
              <h2 className={styles.h2}>Learn, Grow, and Stay Ahead</h2>
            </div>
            <div className={styles.grid}>
              {more.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.card}>
                  <PostImage slug={p.slug} category={p.category} image={p.image} />
                  <div className={styles.cardBody}>
                    <div className={styles.meta}><span>{formatDate(p.date)}</span></div>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <span className={styles.more}>Read More <ArrowRight size={15} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
