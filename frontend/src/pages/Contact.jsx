import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin, Twitter, Clock, DollarSign } from 'lucide-react'
import styles from './Contact.module.css'

/* ── EmailJS credentials ── */
const EMAILJS_SERVICE_ID  = '21dmbcs124'
const EMAILJS_TEMPLATE_ID = 'template_9pkkqa9'
const EMAILJS_PUBLIC_KEY  = 'gP5gF9RPdQC3gvB-c'

const SERVICES = [
  'SaaS Development', 'Web Development', 'AI & ML Solutions',
  'Mobile Development', 'Cloud & DevOps', 'UI/UX Design',
  'Computer Vision', 'LLM Fine-tuning', 'RAG Systems', 'Other',
]

const INFO_ITEMS = [
  { Icon: Mail,       label: 'Email',    value: 'engrmumtazali01@gmail.com', href: 'mailto:engrmumtazali01@gmail.com' },
  { Icon: Phone,      label: 'Phone',    value: '+92 XXX XXXXXXX',           href: 'tel:+92XXXXXXXXX' },
  { Icon: MapPin,     label: 'Location', value: 'Lahore, Pakistan · Remote', href: null },
  { Icon: Clock,      label: 'Response', value: 'Within 24 hours',           href: null },
  { Icon: DollarSign, label: 'Rate',     value: 'Starting at $20 / hr',      href: null },
]

const SOCIALS = [
  { Icon: Linkedin, href: 'https://linkedin.com/in/nexttech-sol', label: 'LinkedIn' },
  { Icon: Github,   href: 'https://github.com/yourusername',      label: 'GitHub' },
  { Icon: Twitter,  href: '#',                                    label: 'Twitter' },
  { Icon: Mail,     href: 'mailto:engrmumtazali01@gmail.com',     label: 'Email' },
]

const FAQ = [
  { q: 'How quickly can you start?',         a: 'Usually within 1–2 business days after project scoping.' },
  { q: 'Do you offer fixed-price projects?', a: 'Yes! Both hourly and fixed-price engagements available.' },
  { q: 'What is your tech stack?',           a: 'FastAPI, React, Django, PostgreSQL, AWS, Docker, LangChain & more.' },
  { q: 'Do you sign NDAs?',                  a: 'Absolutely. We sign NDAs before any project discussion.' },
]

const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

/* ── Axon Forge logo mark (matching Navbar) ── */
function LogoMark({ size = 36 }) {
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

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  /* Load EmailJS once */
  useEffect(() => {
    if (!window.emailjs) {
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
      s.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY)
      document.head.appendChild(s)
    } else {
      window.emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name:    data.name,
        email:   data.email,
        phone:   data.phone   || 'N/A',
        company: data.company || 'N/A',
        service: data.service || 'N/A',
        subject: data.subject,
        message: data.message,
      })
      toast.success("Message sent! I'll reply within 24 hours ✅")
      setDone(true)
      reset()
    } catch {
      toast.error('Send failed — please email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroLine} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Get In Touch
          </div>
          <h1 className={styles.heroTitle}>
            Let's Build Something{' '}
            <span className={styles.gold}>Amazing</span>
          </h1>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className={styles.layout}>

          {/* ── Left info ── */}
          <div className={styles.infoCol}>

            <div className={styles.availBadge}>
              <span className={styles.availDot} />
              Available for New Projects
            </div>

            <div className={styles.infoCards}>
              {INFO_ITEMS.map(({ Icon, label, value, href }) => (
                <div key={label} className={styles.infoCard}>
                  <div className={styles.infoIcon}><Icon size={16} /></div>
                  <div>
                    <div className={styles.infoLabel}>{label}</div>
                    {href
                      ? <a href={href} className={`${styles.infoValue} ${styles.gold}`}>{value}</a>
                      : <div className={styles.infoValue}>{value}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.socials}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                   className={styles.socialBtn} aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className={styles.offersBox}>
              <div className={styles.offersTitle}>What You Get</div>
              {['Free consultation call', 'Fixed-price projects available',
                'Clean, documented code', 'On-time delivery guaranteed',
                'Post-launch support included', 'NDA available on request'].map(item => (
                <div key={item} className={styles.offerItem}>
                  <span className={styles.offerCheck}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right form ── */}
          <div className={styles.formWrap}>

            {/* Form header with Axon Forge logo */}
            <div className={styles.formHead}>
              <LogoMark size={36} />
              <div>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSubtitle}>
                  Fields marked <span className={styles.gold}>*</span> are required
                </p>
              </div>
            </div>

            {done ? (
              /* ── Success state ── */
              <div className={styles.successBox}>
                <div className={styles.successRing}>
                  <Check size={32} color="#F5A623" strokeWidth={2.5} />
                </div>
                <div className={styles.successBadge}>
                  <span className={styles.availDot} /> Message Delivered ✅
                </div>
                <h3 className={styles.successTitle}>Thank You! 🎉</h3>
                <p className={styles.successDesc}>
                  Sent to{' '}
                  <a href="mailto:engrmumtazali01@gmail.com" className={styles.gold}>
                    engrmumtazali01@gmail.com
                  </a>
                  . I'll respond within <strong className={styles.gold}>24 hours</strong>.
                </p>
                <button className={styles.resetBtn} onClick={() => setDone(false)}>
                  ↩ Send Another Message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name <span className={styles.gold}>*</span></label>
                    <input {...register('name', { required: 'Name is required' })}
                      placeholder="Mumtaz Ali"
                      className={`${styles.input} ${errors.name ? styles.inputErr : ''}`}/>
                    {errors.name && <span className={styles.err}>⚠ {errors.name.message}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address <span className={styles.gold}>*</span></label>
                    <input type="email"
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                      placeholder="you@company.com"
                      className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}/>
                    {errors.email && <span className={styles.err}>⚠ {errors.email.message}</span>}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Company</label>
                    <input {...register('company')} placeholder="Your Company (optional)" className={styles.input}/>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <input {...register('phone')} placeholder="+92 XXX XXXXXXX" className={styles.input}/>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Service Interested In</label>
                  <select {...register('service')} className={`${styles.input} ${styles.select}`}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Subject <span className={styles.gold}>*</span></label>
                  <input {...register('subject', { required: 'Subject is required' })}
                    placeholder="e.g. AI-powered analytics platform"
                    className={`${styles.input} ${errors.subject ? styles.inputErr : ''}`}/>
                  {errors.subject && <span className={styles.err}>⚠ {errors.subject.message}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message <span className={styles.gold}>*</span></label>
                  <textarea {...register('message', { required: 'Message is required' })}
                    rows={5}
                    placeholder="Describe your project, timeline, and requirements..."
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputErr : ''}`}/>
                  {errors.message && <span className={styles.err}>⚠ {errors.message.message}</span>}
                </div>

                <button type="submit" disabled={loading} className={styles.submitBtn}>
                  {loading
                    ? <><span className={styles.spinner} /> Sending...</>
                    : <><Send size={15} /> Send Message</>}
                </button>

                <p className={styles.formNote}>
                  🔒 Securely sent to{' '}
                  <span className={styles.gold}>engrmumtazali01@gmail.com</span>
                  {' '}· Reply within 24 hours ⚡
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHead}>
            <div className={styles.secLabel}>Common Questions</div>
            <h2 className={styles.faqTitle}>Frequently Asked</h2>
          </div>
          <div className={styles.faqGrid}>
            {FAQ.map(({ q, a }) => (
              <div key={q} className={styles.faqCard}>
                <h4 className={styles.faqQ}>{q}</h4>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow     { 0%,100%{box-shadow:0 0 8px #F5A623} 50%{box-shadow:0 0 18px #F5A623} }
      `}</style>
    </main>
  )
}