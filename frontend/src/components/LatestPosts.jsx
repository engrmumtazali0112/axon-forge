// src/components/LatestPosts.jsx
// "From the blog" strip: shows the 3 newest posts, then a link to /blog.
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { POSTS, formatDate } from '../data/blogPosts'
import PostImage from './PostImage'

const MAX_POSTS = 3

export default function LatestPosts() {
  const posts = POSTS.slice(0, MAX_POSTS)

  return (
    <section className="lp-sec" aria-labelledby="lp-title">
      <style>{CSS}</style>
      <div className="container">
        <header className="lp-head">
          <div className="lp-head-text">
            <p className="lp-eyebrow">Blog</p>
            <h2 id="lp-title" className="lp-h2">Notes from the people building your product</h2>
          </div>
          <Link to="/blog" className="lp-all">
            View all posts <ArrowRight size={16} />
          </Link>
        </header>

        <div className="lp-grid">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="lp-card">
              <div className="lp-cover">
                <PostImage slug={p.slug} category={p.category} image={p.image} showTag={false} />
              </div>
              <div className="lp-body">
                <p className="lp-meta">
                  {[p.category, formatDate(p.date), p.readTime && `${p.readTime} min read`]
                    .filter(Boolean).join(' · ')}
                </p>
                <h3 className="lp-title">{p.title}</h3>
                {p.excerpt && <p className="lp-excerpt">{p.excerpt}</p>}
                <span className="lp-read">Read article <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const CSS = `
.lp-sec{padding:64px 0;background:#f2f8fd;border-top:1px solid #dbe9f5}

/* Header: stacked on mobile, text left + button right on wider screens */
.lp-head{display:flex;flex-direction:column;align-items:flex-start;gap:20px;margin-bottom:32px}
.lp-head-text{min-width:0}
.lp-eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 12px;font-family:'JetBrains Mono',monospace;font-size:.74rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1f7fb8}
.lp-eyebrow::before{content:'';width:22px;height:2px;background:#F5A623;border-radius:2px}
.lp-h2{font-family:'Syne',sans-serif;font-weight:800;color:#0b1220;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.15;letter-spacing:-.02em;margin:0;max-width:24ch;text-wrap:balance}
.lp-all{display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;padding:12px 22px;font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;white-space:nowrap;color:#1f7fb8;text-decoration:none;background:#fff;border:1.5px solid #dbe9f5;border-radius:999px;transition:all .22s}
.lp-all svg{transition:transform .22s}
.lp-all:hover{border-color:#2E9BD6;color:#2E9BD6;box-shadow:0 10px 24px rgba(46,155,214,.14)}
.lp-all:hover svg{transform:translateX(3px)}
.lp-all:focus-visible{outline:2px solid #2E9BD6;outline-offset:3px}

.lp-grid{display:grid;grid-template-columns:1fr;gap:24px}
.lp-card{display:flex;flex-direction:column;background:#fff;border:1px solid #dbe9f5;border-radius:18px;overflow:hidden;text-decoration:none;color:inherit;transition:all .25s}
.lp-card:hover{border-color:#2E9BD6;transform:translateY(-4px);box-shadow:0 18px 40px rgba(46,155,214,.14)}
.lp-card:focus-visible{outline:2px solid #2E9BD6;outline-offset:3px}
.lp-cover{position:relative;height:190px;overflow:hidden;background:#e8f4fb}
.lp-cover .pi-cover{height:100%;min-height:0}
.lp-body{display:flex;flex-direction:column;gap:10px;padding:22px 22px 24px;flex:1}
.lp-meta{margin:0;font-family:'JetBrains Mono',monospace;font-size:.72rem;line-height:1.5;color:#7b8494}
.lp-title{margin:0;font-family:'Syne',sans-serif;font-weight:700;font-size:1.15rem;line-height:1.3;color:#0b1220}
.lp-excerpt{margin:0;color:#4a5568;font-size:.92rem;line-height:1.7;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.lp-read{display:inline-flex;align-items:center;gap:6px;margin-top:4px;font-weight:700;font-size:.88rem;color:#1f7fb8}

/* Phones: button spans the width under the heading */
@media(max-width:559px){.lp-all{width:100%}}
/* Tablet: 2 columns, header becomes a row aligned to the heading's baseline edge */
@media(min-width:640px){.lp-grid{grid-template-columns:repeat(2,1fr)}.lp-body{padding:24px 26px 26px}}
@media(min-width:760px){.lp-sec{padding:80px 0}.lp-head{flex-direction:row;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:44px}}
/* Desktop: 3 columns */
@media(min-width:1001px){.lp-sec{padding:88px 0}.lp-grid{grid-template-columns:repeat(3,1fr)}}
@media(prefers-reduced-motion:reduce){.lp-card,.lp-all,.lp-all svg{transition:none}.lp-card:hover{transform:none}}
/* ── Night view ── */
[data-theme="dark"] .lp-sec{background:var(--bg-soft,#0e1424);border-top-color:var(--border,#2a3350)}
[data-theme="dark"] .lp-eyebrow,[data-theme="dark"] .lp-read{color:var(--accent,#5ab8ee)}
[data-theme="dark"] .lp-all{background:var(--surface,#121a2e);border-color:var(--border,#2a3350);color:var(--accent,#5ab8ee)}
[data-theme="dark"] .lp-all:hover{border-color:var(--accent,#5ab8ee);box-shadow:0 10px 24px rgba(0,0,0,.4)}
[data-theme="dark"] .lp-h2,[data-theme="dark"] .lp-title{color:var(--text-head,#f1f5f9)}
[data-theme="dark"] .lp-excerpt{color:var(--text-body,#b6c2d4)}
[data-theme="dark"] .lp-meta{color:var(--muted,#8a96ad)}
[data-theme="dark"] .lp-card{background:var(--surface,#121a2e);border-color:var(--border,#2a3350)}
[data-theme="dark"] .lp-card:hover{border-color:var(--accent,#5ab8ee);box-shadow:0 18px 40px rgba(0,0,0,.4)}
[data-theme="dark"] .lp-cover{background:var(--bg-muted,#1a2340)}
`
