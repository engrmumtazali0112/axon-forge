// src/components/WorkSections.jsx
// How we work · Why Axon Forge · Technology · Ways to work with us
// Self-contained (styles in the CSS string at the bottom). Edit the data arrays to change copy.
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, Clock, Users, ShieldCheck, KeyRound, Layers, BookOpen, Handshake,
} from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────── */
const STAGES = [
  { n: '01', title: 'Discovery call',          when: 'Day 0 · free', text: '30 minutes on your problem, your users and your budget. You leave with an honest view of scope, whether or not you hire us.' },
  { n: '02', title: 'Scope & fixed estimate',  when: 'Week 1',       text: 'A feature list, architecture outline and delivery plan with a fixed price and timeline. NDA first if you prefer.' },
  { n: '03', title: 'Design & prototype',      when: 'Weeks 1–3',    text: 'A clickable Figma prototype you can put in front of real users. You sign off on screens, not documents.' },
  { n: '04', title: 'Build in two-week sprints', when: 'Weeks 3+',   text: 'A dedicated project manager, a demo every second Friday and a staging link that is always up to date.' },
  { n: '05', title: 'Launch & support',        when: 'Ongoing',      text: 'Deployment, monitoring, store submissions and handover docs. Then we stay on for fixes and new features.' },
]

const COMMITMENTS = [
  { icon: Users,       title: 'Senior engineers only',      text: 'The people on your demo call are the people writing your code.' },
  { icon: ShieldCheck, title: 'Fixed scope, fixed price',   text: 'A written estimate before work starts. It only changes if you sign off.' },
  { icon: KeyRound,    title: 'You own everything',         text: 'Code, repositories, cloud accounts and designs are yours from the first commit.' },
  { icon: Layers,      title: 'One team, every discipline', text: 'Product, design, engineering, QA and DevOps under one roof. No juggling vendors.' },
  { icon: BookOpen,    title: 'Built to be handed over',    text: "Documented, readable code your own team can take over whenever you're ready." },
  { icon: Handshake,   title: 'We stay after launch',       text: "Most of our clients are in year two or three with us. We don't disappear after go-live." },
]

const STACK = [
  { group: 'Frontend',        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
  { group: 'Backend',         items: ['Node.js', 'NestJS', 'Express', 'Laravel', 'Python', 'REST & GraphQL'] },
  { group: 'Mobile',          items: ['Flutter', 'Dart', 'React Native', 'Swift', 'Kotlin'] },
  { group: 'Data',            items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'] },
  { group: 'AI & Automation', items: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'LangChain', 'LangGraph', 'Model Context Protocol', 'n8n', 'Hugging Face', 'Pinecone', 'Vector search'] },
  { group: 'Cloud & DevOps',  items: ['AWS', 'Azure', 'Oracle Cloud', 'Docker', 'Jenkins', 'GitHub Actions'] },
]

const PLANS = [
  {
    best: 'Best when the outcome is well defined', title: 'Fixed-scope project', price: 'From $5,000',
    text: 'Ideal for MVPs, redesigns and clearly bounded platforms.',
    points: ['Written scope & estimate', 'Fixed timeline', 'Bi-weekly demos', '30 days post-launch support'],
    cta: 'Discuss this option',
  },
  {
    best: 'Best for products that keep evolving', title: 'Dedicated product team', price: 'Monthly retainer',
    text: 'A standing squad working only on your roadmap.',
    points: ['Dedicated PM & squad', 'Flexible monthly capacity', 'Your tooling & rituals', 'Full roadmap ownership'],
    cta: 'Build my team', featured: true,
  },
  {
    best: 'Best when you have a team and a gap', title: 'Staff augmentation', price: 'Per specialist',
    text: 'Senior specialists who join your team and contribute within days.',
    points: ['Senior, pre-vetted people', 'Your process, your tools', 'Scale up or down monthly', 'No recruitment overhead'],
    cta: 'Discuss this option',
  },
]

/* ── Component ────────────────────────────────────────────── */
export default function WorkSections() {
  return (
    <>
      <style>{CSS}</style>

      {/* How we work */}
      <section className="ws-sec ws-soft" aria-labelledby="ws-process">
        <div className="container">
          <div className="ws-head ws-head-row">
            <div>
              <p className="ws-eyebrow">How we work</p>
              <h2 id="ws-process" className="ws-h2">Five stages. No surprises in any of them.</h2>
              <p className="ws-lead">The same five steps for a four-week MVP or an eighteen-month platform. You always know what comes next and what it costs.</p>
            </div>
            <Link to="/contact" className="ws-ghost">Start at stage one <ArrowRight size={16} /></Link>
          </div>

          <ol className="ws-steps">
            {STAGES.map((s) => (
              <li key={s.n} className="ws-step">
                <span className="ws-num">{s.n}</span>
                <div>
                  <h3 className="ws-h3">
                    {s.title}
                    <span className="ws-pill"><Clock size={13} /> {s.when}</span>
                  </h3>
                  <p className="ws-p">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Axon Forge */}
      <section className="ws-sec" aria-labelledby="ws-why">
        <div className="container">
          <div className="ws-head">
            <p className="ws-eyebrow">Why Axon Forge</p>
            <h2 id="ws-why" className="ws-h2">Six commitments, all of them checkable</h2>
            <p className="ws-lead">Not slogans: the terms we work under. Ask us about any of them on the first call.</p>
          </div>
          <div className="ws-cards">
            {COMMITMENTS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="ws-card">
                <span className="ws-ico"><Icon size={20} /></span>
                <h3 className="ws-h3">{title}</h3>
                <p className="ws-p">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="ws-sec ws-soft" aria-labelledby="ws-tech">
        <div className="container">
          <div className="ws-head ws-head-row">
            <div>
              <p className="ws-eyebrow">Technology</p>
              <h2 id="ws-tech" className="ws-h2">The stack we build production systems on</h2>
            </div>
            <p className="ws-lead ws-lead-side">We pick boring, well-supported technology on purpose — so your product is still maintainable by someone else in three years.</p>
          </div>
          <div className="ws-stack">
            {STACK.map((g) => (
              <div key={g.group}>
                <h3 className="ws-group">{g.group}</h3>
                <div className="ws-chips">
                  {g.items.map((t) => <span key={t} className="ws-chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="ws-sec" aria-labelledby="ws-ways">
        <div className="container">
          <div className="ws-head ws-center">
            <p className="ws-eyebrow">How to work with us</p>
            <h2 id="ws-ways" className="ws-h2">Three ways in. Pick the one that fits your stage.</h2>
            <p className="ws-lead">Most clients start with a fixed-scope build and move to a retainer once the product is live.</p>
          </div>
          <div className="ws-plans">
            {PLANS.map((p) => (
              <article key={p.title} className={`ws-plan ${p.featured ? 'is-featured' : ''}`}>
                {p.featured && <span className="ws-badge">Most chosen</span>}
                <p className="ws-best">{p.best}</p>
                <h3 className="ws-h3 ws-plan-title">{p.title}</h3>
                <p className="ws-price">{p.price}</p>
                <p className="ws-p">{p.text}</p>
                <ul className="ws-list">
                  {p.points.map((x) => <li key={x}><Check size={16} /> {x}</li>)}
                </ul>
                <Link to="/contact" className={p.featured ? 'ws-solid' : 'ws-ghost ws-block'}>
                  {p.cta} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const CSS = `
.ws-sec{padding:88px 0;background:#fff}
.ws-soft{background:linear-gradient(180deg,#f2f8fd 0%,#fff 100%);border-top:1px solid #dbe9f5}
.ws-head{margin-bottom:48px;max-width:62ch}
.ws-head-row{max-width:none;display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap}
.ws-head-row>div{max-width:62ch}
.ws-center{margin-left:auto;margin-right:auto;text-align:center}
.ws-eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 12px;font-family:'JetBrains Mono',monospace;font-size:.74rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#1f7fb8}
.ws-eyebrow::before{content:'';width:22px;height:2px;background:#F5A623;border-radius:2px}
.ws-center .ws-eyebrow{justify-content:center}
.ws-center .ws-eyebrow::after{content:'';width:22px;height:2px;background:#F5A623;border-radius:2px}
.ws-h2{font-family:'Syne',sans-serif;font-weight:800;color:#0b1220;font-size:clamp(1.8rem,3.2vw,2.6rem);line-height:1.12;letter-spacing:-.02em;margin:0 0 14px}
.ws-h3{font-family:'Syne',sans-serif;font-weight:700;color:#0b1220;font-size:1.2rem;line-height:1.25;margin:0 0 8px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.ws-lead{color:#4a5568;font-size:1.05rem;line-height:1.75;margin:0}
.ws-lead-side{max-width:44ch;font-size:.98rem}
.ws-p{color:#4a5568;font-size:.95rem;line-height:1.75;margin:0}

.ws-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 22px;border-radius:10px;border:1.5px solid #dbe9f5;background:#fff;color:#0b1220;font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;text-decoration:none;transition:all .2s}
.ws-ghost:hover{border-color:#2E9BD6;color:#1f7fb8;transform:translateY(-2px)}
.ws-solid{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 22px;border-radius:10px;background:#2E9BD6;color:#fff;font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;text-decoration:none;box-shadow:0 10px 24px rgba(46,155,214,.3);transition:all .2s}
.ws-solid:hover{background:#1f7fb8;transform:translateY(-2px)}
.ws-block{display:flex;width:100%}

/* steps */
.ws-steps{list-style:none;margin:0;padding:0;max-width:820px}
.ws-step{position:relative;display:grid;grid-template-columns:70px 1fr;gap:22px;padding-bottom:36px}
.ws-step:not(:last-child)::before{content:'';position:absolute;left:34px;top:70px;bottom:0;width:2px;background:#cfe4f4}
.ws-num{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:#fff;border:1.5px solid #bfe0f5;font-family:'Syne',sans-serif;font-weight:800;color:#1f7fb8}
.ws-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:999px;background:#fff4de;border:1px solid rgba(245,166,35,.35);color:#8a5a00;font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:600}
.ws-step .ws-p{max-width:60ch}

/* commitments */
.ws-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.ws-card{background:#fff;border:1px solid #dbe9f5;border-radius:18px;padding:30px;transition:all .25s}
.ws-card:hover{border-color:#2E9BD6;transform:translateY(-4px);box-shadow:0 18px 40px rgba(46,155,214,.14)}
.ws-ico{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:#e8f4fb;color:#1f7fb8;margin-bottom:20px}

/* stack */
.ws-stack{display:grid;grid-template-columns:repeat(3,1fr);gap:36px 40px}
.ws-group{font-family:'JetBrains Mono',monospace;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;color:#8a5a00;margin:0 0 14px}
.ws-chips{display:flex;flex-wrap:wrap;gap:10px}
.ws-chip{padding:8px 15px;border-radius:999px;background:#fff;border:1px solid #dbe9f5;color:#2f3a4c;font-size:.85rem;font-weight:600;transition:all .2s}
.ws-chip:hover{border-color:#2E9BD6;color:#1f7fb8;background:#e8f4fb}

/* plans */
.ws-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;align-items:stretch}
.ws-plan{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid #dbe9f5;border-radius:18px;padding:32px 30px}
.ws-plan.is-featured{border-color:#2E9BD6;box-shadow:0 24px 56px rgba(46,155,214,.18)}
.ws-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:6px 16px;border-radius:999px;background:#2E9BD6;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.ws-best{margin:0 0 12px;font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8a5a00}
.ws-plan-title{font-size:1.45rem;margin-bottom:6px}
.ws-price{margin:0 0 14px;font-family:'Syne',sans-serif;font-weight:700;color:#1f7fb8;font-size:1.05rem}
.ws-list{list-style:none;margin:22px 0 28px;padding:22px 0 0;border-top:1px solid #dbe9f5;display:flex;flex-direction:column;gap:12px;flex:1}
.ws-list li{display:flex;align-items:center;gap:10px;color:#2f3a4c;font-size:.92rem}
.ws-list svg{color:#2E9BD6;flex-shrink:0}

.ws-ghost:focus-visible,.ws-solid:focus-visible{outline:2px solid #2E9BD6;outline-offset:3px}

@media(max-width:1000px){
  .ws-cards,.ws-stack{grid-template-columns:repeat(2,1fr)}
  .ws-plans{grid-template-columns:1fr;max-width:520px;margin:0 auto}
}
@media(max-width:640px){
  .ws-sec{padding:64px 0}
  .ws-cards,.ws-stack{grid-template-columns:1fr}
  .ws-step{grid-template-columns:52px 1fr;gap:16px}
  .ws-num{width:52px;height:52px;font-size:.9rem}
  .ws-step:not(:last-child)::before{left:25px;top:52px}
}
@media(prefers-reduced-motion:reduce){.ws-card,.ws-chip,.ws-ghost,.ws-solid{transition:none}}
/* ── Night view ── */
[data-theme="dark"] .ws-sec{background:var(--surface,#121a2e)}
[data-theme="dark"] .ws-soft{background:var(--bg-soft,#0e1424);border-top-color:var(--border,#2a3350)}
[data-theme="dark"] .ws-eyebrow{color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-h2,[data-theme="dark"] .ws-h3{color:var(--text-head,#f1f5f9)}
[data-theme="dark"] .ws-lead,[data-theme="dark"] .ws-p,[data-theme="dark"] .ws-list li{color:var(--text-body,#b6c2d4)}
[data-theme="dark"] .ws-ghost{background:var(--surface,#121a2e);border-color:var(--border,#2a3350);color:var(--text-head,#f1f5f9)}
[data-theme="dark"] .ws-ghost:hover{border-color:var(--accent,#5ab8ee);color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-num{background:var(--surface,#121a2e);border-color:var(--border,#2a3350);color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-step:not(:last-child)::before{background:var(--border,#2a3350)}
[data-theme="dark"] .ws-pill{background:rgba(245,166,35,.12);border-color:rgba(245,166,35,.3);color:var(--gold,#F5A623)}
[data-theme="dark"] .ws-card,[data-theme="dark"] .ws-plan{background:var(--surface,#121a2e);border-color:var(--border,#2a3350)}
[data-theme="dark"] .ws-soft .ws-card{background:var(--surface,#121a2e)}
[data-theme="dark"] .ws-card:hover{border-color:var(--accent,#5ab8ee);box-shadow:0 18px 40px rgba(0,0,0,.4)}
[data-theme="dark"] .ws-plan.is-featured{border-color:#2E9BD6;box-shadow:0 24px 56px rgba(0,0,0,.5)}
[data-theme="dark"] .ws-ico{background:var(--bg-muted,#1a2340);color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-group,[data-theme="dark"] .ws-best{color:var(--gold,#F5A623)}
[data-theme="dark"] .ws-price{color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-chip{background:var(--surface,#121a2e);border-color:var(--border,#2a3350);color:var(--text-body,#b6c2d4)}
[data-theme="dark"] .ws-chip:hover{background:var(--bg-muted,#1a2340);border-color:var(--accent,#5ab8ee);color:var(--accent,#5ab8ee)}
[data-theme="dark"] .ws-list{border-top-color:var(--border,#2a3350)}
[data-theme="dark"] .ws-list svg{color:var(--accent,#5ab8ee)}
`