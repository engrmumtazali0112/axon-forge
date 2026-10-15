// src/components/LatestPosts.jsx
// "From the blog" strip: shows the 3 newest posts, then a link to /blog.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import * as api from '../api'
import PostCover from './PostCover'

/* The blog page already loads posts from ../api. This section looks for the same fetcher.
   If your function has a different name, add it to this list (or import it directly). */
const fetchPosts = api.getPosts || api.getBlogPosts || api.getBlogs || api.getBlog || null

const MAX_POSTS = 3

const toList = (res) => {
  const d = res?.data ?? res
  const list = d?.posts || d?.blogs || d?.items || d?.results || d
  return Array.isArray(list) ? list : []
}

const formatDate = (v) => {
  if (!v) return ''
  const d = new Date(v)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LatestPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(Boolean(fetchPosts))

  useEffect(() => {
    if (!fetchPosts) return
    let alive = true
    Promise.resolve(fetchPosts())
      .then((r) => alive && setPosts(toList(r).slice(0, MAX_POSTS)))
      .catch(() => {})
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [])

  return (
    <section className="lp-sec" aria-labelledby="lp-title">
      <style>{CSS}</style>
      <div className="container">
        <div className="lp-head">
          <div>
            <p className="lp-eyebrow">Blog</p>
            <h2 id="lp-title" className="lp-h2">Notes from the people building your product</h2>
          </div>
          <Link to="/blog" className="lp-all">View all posts <ArrowRight size={16} /></Link>
        </div>

        {loading ? (
          <div className="lp-loading"><div className="lp-spinner" /></div>
        ) : posts.length === 0 ? (
          <p className="lp-empty">
            Our latest articles live on the <Link to="/blog">blog</Link>.
          </p>
        ) : (
          <div className="lp-grid">
            {posts.map((p, i) => {
              const slug = p.slug || String(p.id ?? i)
              const img = p.cover || p.image || p.cover_image || p.thumbnail
              return (
                <Link key={slug} to={`/blog/${slug}`} className="lp-card">
                  <div className="lp-cover">
                    {img
                      ? <img src={img} alt="" loading="lazy" />
                      : <PostCover slug={slug} category={p.category || 'Journal'} />}
                  </div>
                  <div className="lp-body">
                    <p className="lp-meta">
                      {[p.category, formatDate(p.date || p.published_at || p.created_at), p.read_time || p.readTime]
                        .filter(Boolean).join(' · ')}
                    </p>
                    <h3 className="lp-title">{p.title}</h3>
                    {(p.excerpt || p.summary) && <p className="lp-excerpt">{p.excerpt || p.summary}</p>}
                    <span className="lp-read">Read article <ArrowUpRight size={15} /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

const CSS = `
.lp-sec{padding:88px 0;background:#f2f8fd;border-top:1px solid #dbe9f5}
.lp-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:40px}
.lp-eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 12px;font-family:'JetBrains Mono',monospace;font-size:.74rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1f7fb8}
.lp-eyebrow::before{content:'';width:22px;height:2px;background:#F5A623;border-radius:2px}
.lp-h2{font-family:'Syne',sans-serif;font-weight:800;color:#0b1220;font-size:clamp(1.7rem,3vw,2.4rem);line-height:1.15;letter-spacing:-.02em;margin:0;max-width:24ch}
.lp-all{display:inline-flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:#1f7fb8;text-decoration:none}
.lp-all:hover{text-decoration:underline;text-underline-offset:4px}
.lp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.lp-card{display:flex;flex-direction:column;background:#fff;border:1px solid #dbe9f5;border-radius:18px;overflow:hidden;text-decoration:none;color:inherit;transition:all .25s}
.lp-card:hover{border-color:#2E9BD6;transform:translateY(-4px);box-shadow:0 18px 40px rgba(46,155,214,.14)}
.lp-card:focus-visible{outline:2px solid #2E9BD6;outline-offset:3px}
.lp-cover{position:relative;height:190px;overflow:hidden;background:#e8f4fb}
.lp-cover img{width:100%;height:100%;object-fit:cover;display:block}
.lp-body{display:flex;flex-direction:column;gap:10px;padding:24px 26px 26px;flex:1}
.lp-meta{margin:0;font-family:'JetBrains Mono',monospace;font-size:.72rem;color:#7b8494}
.lp-title{margin:0;font-family:'Syne',sans-serif;font-weight:700;font-size:1.15rem;line-height:1.3;color:#0b1220}
.lp-excerpt{margin:0;color:#4a5568;font-size:.92rem;line-height:1.7;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.lp-read{display:inline-flex;align-items:center;gap:6px;margin-top:4px;font-weight:700;font-size:.88rem;color:#1f7fb8}
.lp-loading{display:flex;justify-content:center;padding:60px 0}
.lp-spinner{width:36px;height:36px;border:3px solid #dbe9f5;border-top-color:#F5A623;border-radius:50%;animation:lp-spin .8s linear infinite}
@keyframes lp-spin{to{transform:rotate(360deg)}}
.lp-empty{color:#4a5568;margin:0}.lp-empty a{color:#1f7fb8;font-weight:700}
@media(max-width:1000px){.lp-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.lp-sec{padding:64px 0}.lp-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.lp-card{transition:none}.lp-spinner{animation:none}}
/* ── Night view ── */
[data-theme="dark"] .lp-sec{background:var(--bg-soft,#0e1424);border-top-color:var(--border,#2a3350)}
[data-theme="dark"] .lp-eyebrow,[data-theme="dark"] .lp-all,[data-theme="dark"] .lp-read,[data-theme="dark"] .lp-empty a{color:var(--accent,#5ab8ee)}
[data-theme="dark"] .lp-h2,[data-theme="dark"] .lp-title{color:var(--text-head,#f1f5f9)}
[data-theme="dark"] .lp-excerpt,[data-theme="dark"] .lp-empty{color:var(--text-body,#b6c2d4)}
[data-theme="dark"] .lp-meta{color:var(--muted,#8a96ad)}
[data-theme="dark"] .lp-card{background:var(--surface,#121a2e);border-color:var(--border,#2a3350)}
[data-theme="dark"] .lp-card:hover{border-color:var(--accent,#5ab8ee);box-shadow:0 18px 40px rgba(0,0,0,.4)}
[data-theme="dark"] .lp-cover{background:var(--bg-muted,#1a2340)}
[data-theme="dark"] .lp-spinner{border-color:var(--border,#2a3350);border-top-color:#F5A623}
`