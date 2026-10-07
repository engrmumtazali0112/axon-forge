import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { getTestimonials } from '../api'

/* Self-contained page: styles live in the CSS string at the bottom, so this is the only file to replace.
   You can delete the old Testimonials.module.css. */

const AUTOPLAY_MS = 6500
const INDUSTRIES = ['FinTech', 'EdTech', 'HealthTech', 'E-Commerce', 'SaaS', 'Logistics', 'AI/ML', 'Media']

const initials = (name = '') => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

export default function Testimonials() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive]   = useState(0)
  const paused = useRef(false)
  const touchX = useRef(null)

  useEffect(() => {
    getTestimonials()
      .then((r) => setItems(r.data.testimonials || []))
      .finally(() => setLoading(false))
  }, [])

  const n = items.length
  const go   = useCallback((i) => setActive(((i % n) + n) % n), [n])
  const next = useCallback(() => go(active + 1), [go, active])
  const prev = useCallback(() => go(active - 1), [go, active])

  /* Autoplay (paused on hover/focus) */
  useEffect(() => {
    if (n < 2) return
    const id = setInterval(() => { if (!paused.current) setActive((a) => (a + 1) % n) }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [n])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  /* Circular offset of card i from the active card: ..., -1, 0, 1, ... */
  const offsetOf = (i) => {
    let d = i - active
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  return (
    <main className="tm-page">
      <style>{CSS}</style>

      {/* Header */}
      <section className="tm-head">
        <div className="container">
          <nav className="tm-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span aria-current="page">Testimonials</span>
          </nav>
          <p className="tm-eyebrow">Testimonials</p>
          <h1 className="tm-h1">What Our Clients Say</h1>
          <p className="tm-sub">Discover what our clients think about our services and how we&apos;ve helped them achieve their goals.</p>
          <div className="tm-rating">
            <span className="tm-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="#F5A623" color="#F5A623" />)}</span>
            <span><strong>5.0</strong> average rating · <strong>60+</strong> happy clients</span>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="tm-stage-wrap">
        <div className="container">
          {loading ? (
            <div className="tm-loading"><div className="tm-spinner" /></div>
          ) : n === 0 ? (
            <p className="tm-empty">Client reviews are on their way. In the meantime, <Link to="/contact">get in touch</Link>.</p>
          ) : (
            <div
              className="tm-carousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials"
              tabIndex={0} onKeyDown={onKey}
              onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
              onFocus={() => (paused.current = true)} onBlur={() => (paused.current = false)}
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX }} onTouchEnd={onTouchEnd}
            >
              <div className="tm-stage">
                {items.map((t, i) => {
                  const d = offsetOf(i)
                  const vis = Math.abs(d) <= 1
                  return (
                    <article
                      key={t.id ?? i}
                      className={`tm-card ${d === 0 ? 'is-active' : ''}`}
                      style={{ '--d': d, opacity: vis ? 1 : 0, pointerEvents: vis ? 'auto' : 'none', zIndex: 10 - Math.abs(d) }}
                      aria-hidden={d !== 0}
                      aria-label={`Testimonial ${i + 1} of ${n}`}
                      onClick={() => d !== 0 && go(i)}
                    >
                      <header className="tm-src">
                        <span className="tm-logo">{initials(t.platform || t.source || t.company || 'AF')}</span>
                        <span className="tm-srcname">{t.platform || t.source || t.company || 'Client review'}</span>
                      </header>
                      <div className="tm-cardstars" aria-label={`${t.rating || 5} out of 5`}>
                        {Array.from({ length: t.rating || 5 }).map((_, k) => <Star key={k} size={18} fill="#F5A623" color="#F5A623" />)}
                      </div>
                      <p className="tm-text">{t.text}</p>
                      <footer className="tm-author">
                        <span className="tm-avatar">{(t.avatar && t.avatar.length <= 3 ? t.avatar : initials(t.name)) || '?'}</span>
                        <span>
                          <span className="tm-name">{t.name}</span>
                          <span className="tm-role">{[t.role, t.company].filter(Boolean).join(' · ')}</span>
                        </span>
                      </footer>
                    </article>
                  )
                })}
              </div>

              {n > 1 && (
                <>
                  <div className="tm-controls">
                    <button type="button" className="tm-arrow" onClick={prev} aria-label="Previous testimonial"><ArrowLeft size={20} /></button>
                    <button type="button" className="tm-arrow tm-arrow-main" onClick={next} aria-label="Next testimonial"><ArrowRight size={20} /></button>
                  </div>
                  <div className="tm-dots" role="tablist" aria-label="Choose testimonial">
                    {items.map((t, i) => (
                      <button key={t.id ?? i} type="button" role="tab" aria-selected={i === active} aria-label={`Show testimonial ${i + 1}`}
                        className={`tm-dot ${i === active ? 'on' : ''}`} onClick={() => go(i)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Industries */}
      <section className="tm-industries">
        <div className="container">
          <p className="tm-ilabel">Clients we&apos;ve worked with across industries</p>
          <div className="tm-tags">{INDUSTRIES.map((x) => <span key={x} className="tm-tag">{x}</span>)}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-ctawrap">
        <div className="container">
          <div className="tm-cta">
            <div>
              <h2>Worked With Us?</h2>
              <p>We&apos;d love to hear your feedback. Share your experience and help others make the right choice.</p>
            </div>
            <a href="https://linkedin.com/company/104945423" target="_blank" rel="noreferrer" className="tm-btn">
              Leave a Review on LinkedIn <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

const CSS = `
.tm-page{background:#fff}
.tm-head{padding:72px 0 8px;background:#fff}
.tm-crumbs{display:flex;gap:8px;font-size:.85rem;color:#7b8494;margin-bottom:26px}
.tm-crumbs a{color:#7b8494;text-decoration:none}.tm-crumbs a:hover{color:#2E9BD6}
.tm-eyebrow{font-family:'DM Sans',sans-serif;font-weight:700;font-size:1rem;color:#2E9BD6;margin:0 0 6px;letter-spacing:.02em}
.tm-h1{font-family:'Syne',sans-serif;font-weight:800;color:#0b1220;font-size:clamp(2.2rem,4.6vw,3.6rem);line-height:1.08;letter-spacing:-.025em;margin:0 0 14px}
.tm-sub{color:#4a5568;font-size:1.08rem;line-height:1.7;max-width:62ch;margin:0 0 22px}
.tm-rating{display:flex;align-items:center;gap:14px;flex-wrap:wrap;color:#4a5568;font-size:.95rem}
.tm-stars{display:flex;gap:3px}.tm-rating strong{color:#1f7fb8}

.tm-stage-wrap{padding:56px 0 72px;background:linear-gradient(180deg,#fff 0%,#f2f8fd 100%);overflow:hidden}
.tm-carousel{outline:none;position:relative}
.tm-carousel:focus-visible{outline:2px solid #2E9BD6;outline-offset:8px;border-radius:12px}
.tm-stage{position:relative;height:420px;perspective:1400px;max-width:1100px;margin:0 auto}
.tm-card{
  --w:min(460px,86vw);
  position:absolute;top:0;left:50%;width:var(--w);height:100%;
  display:flex;flex-direction:column;padding:34px 34px 28px;background:#fff;border:1px solid #dbe9f5;border-radius:24px;
  box-shadow:0 14px 40px rgba(11,18,32,.07);cursor:pointer;
  transform:translateX(calc(-50% + var(--d) * 104%)) translateZ(calc(var(--d) * var(--d) * -120px)) rotateY(calc(var(--d) * -14deg)) scale(calc(1 - var(--d) * var(--d) * .1));
  transition:transform .55s cubic-bezier(.22,.8,.3,1),opacity .4s ease,box-shadow .4s ease,border-color .3s;
}
.tm-card:not(.is-active){filter:saturate(.9);opacity:.85}
.tm-card:not(.is-active):hover{border-color:#2E9BD6}
.tm-card.is-active{cursor:default;border-color:#bfe0f5;box-shadow:0 30px 70px rgba(11,18,32,.14)}
.tm-card::before{content:'';position:absolute;top:0;left:28px;right:28px;height:3px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,#2E9BD6,#F5A623);opacity:0;transition:opacity .3s}
.tm-card.is-active::before{opacity:1}
.tm-src{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.tm-logo{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:#fff;background:linear-gradient(135deg,#2E9BD6,#1f7fb8)}
.tm-srcname{font-size:1.2rem;color:#0b1220;font-weight:500}
.tm-cardstars{display:flex;gap:4px;margin-bottom:18px}
.tm-text{flex:1;color:#2f3a4c;font-size:1.02rem;line-height:1.8;margin:0 0 20px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:7;-webkit-box-orient:vertical}
.tm-card:not(.is-active) .tm-text{-webkit-line-clamp:6;font-size:.9rem}
.tm-author{display:flex;align-items:center;gap:14px;padding-top:18px;border-top:1px solid #dbe9f5}
.tm-avatar{width:52px;height:52px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:#0b1220;background:linear-gradient(135deg,#F5A623,#ffd07a)}
.tm-name{display:block;font-weight:700;color:#0b1220;font-size:1.02rem}
.tm-role{display:block;color:#7b8494;font-size:.88rem;margin-top:2px}

.tm-controls{display:flex;align-items:center;justify-content:center;gap:22px;margin-top:40px}
.tm-arrow{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;border:1.5px solid #dbe9f5;background:#fff;color:#0b1220;cursor:pointer;transition:all .2s}
.tm-arrow:hover{border-color:#2E9BD6;color:#2E9BD6;transform:translateY(-2px)}
.tm-arrow-main{background:#2E9BD6;border-color:#2E9BD6;color:#fff;box-shadow:0 10px 24px rgba(46,155,214,.35)}
.tm-arrow-main:hover{background:#1f7fb8;border-color:#1f7fb8;color:#fff}
.tm-dots{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:32px}
.tm-dot{width:10px;height:10px;border-radius:999px;border:0;padding:0;cursor:pointer;background:#b9d6ec;transition:all .3s}
.tm-dot:hover{background:#2E9BD6}
.tm-dot.on{width:34px;background:#F5A623}

.tm-loading{display:flex;justify-content:center;padding:100px 0}
.tm-spinner{width:40px;height:40px;border:3px solid #dbe9f5;border-top-color:#F5A623;border-radius:50%;animation:tm-spin .8s linear infinite}
@keyframes tm-spin{to{transform:rotate(360deg)}}
.tm-empty{text-align:center;color:#7b8494;padding:80px 0}.tm-empty a{color:#2E9BD6;font-weight:600}

.tm-industries{padding:64px 0;background:#fff;border-top:1px solid #dbe9f5;text-align:center}
.tm-ilabel{font-family:'JetBrains Mono',monospace;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;color:#7b8494;margin:0 0 24px}
.tm-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
.tm-tag{font-family:'JetBrains Mono',monospace;font-size:.78rem;padding:8px 20px;border-radius:999px;background:#fff;border:1px solid #dbe9f5;color:#4a5568;transition:all .2s}
.tm-tag:hover{border-color:#2E9BD6;color:#1f7fb8;background:#e8f4fb}

.tm-ctawrap{padding:0 0 96px;background:#fff}
.tm-cta{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;padding:52px 48px;border-radius:24px;color:#fff;background:linear-gradient(120deg,#123a5c 0%,#1f7fb8 100%)}
.tm-cta::after{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(245,166,35,.45),transparent 70%)}
.tm-cta h2{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.5rem,2.6vw,2.1rem);margin:0 0 8px;position:relative;z-index:1}
.tm-cta p{color:#d7ebf8;margin:0;max-width:52ch;position:relative;z-index:1}
.tm-btn{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:10px;text-decoration:none;font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;color:#0b1220;background:#F5A623;transition:all .22s}
.tm-btn:hover{background:#ffb93d;transform:translateY(-2px);box-shadow:0 12px 28px rgba(245,166,35,.4)}

@media(max-width:900px){
  .tm-stage{height:440px}
  .tm-card:not(.is-active){opacity:0!important;pointer-events:none!important}
}
@media(max-width:600px){.tm-cta{padding:34px 24px}.tm-stage{height:460px}}
@media(prefers-reduced-motion:reduce){.tm-card{transition:none}.tm-spinner{animation:none}}
`