import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Mail, MapPin, Clock, Loader2 } from 'lucide-react'
import { submitContact } from '../api'
import styles from './Contact.module.css'

const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Not sure yet']

const STEPS = [
  'We read every message ourselves, a person, not an autoresponder.',
  'You get a reply within 24 hours with times for a call.',
  '30-minute call: your goals, our questions, a rough shape and budget.',
  "If it's a fit, a written scope and fixed quote within a week.",
]

const EMPTY = { goal: '', name: '', email: '', company: '', phone: '', budget: '', nda: false }

export default function Contact() {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [apiError, setApiError] = useState('')

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.goal.trim())  e.goal  = 'Tell us a little about what you want to build or fix.'
    if (!form.name.trim())  e.name  = 'Name is required.'
    if (!form.email.trim()) e.email = 'Work email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending'); setApiError('')
    try {
      // Budget and NDA are appended to the message so the existing FastAPI schema keeps working.
      const extras = [
        form.budget && `Indicative budget: ${form.budget}`,
        form.nda && 'Requested an NDA before discussing details.',
      ].filter(Boolean)
      await submitContact({
        name:    form.name.trim(),
        email:   form.email.trim(),
        company: form.company.trim() || undefined,
        phone:   form.phone.trim() || undefined,
        subject: form.goal.trim().slice(0, 80) || 'New project enquiry',
        message: [form.goal.trim(), ...extras].join('\n\n'),
      })
      setStatus('done'); setForm(EMPTY)
    } catch (err) {
      setApiError(err?.response?.data?.detail || err?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.layout}>

          {/* ── Left: intro + what happens next + contact details ── */}
          <section className={styles.info}>
            <p className={styles.eyebrow}>Start here</p>
            <h1 className={styles.h1}>Tell us what you&apos;re building.</h1>
            <p className={styles.lead}>
              One form, one call, and you&apos;ll know what it takes and what it costs. No sales
              sequence, no pitch deck, no obligation to continue.
            </p>

            <ol className={styles.steps}>
              {STEPS.map((t, i) => (
                <li key={t}><span className={styles.stepNo}>{i + 1}</span><span>{t}</span></li>
              ))}
            </ol>

            <div className={styles.divider} />

            <ul className={styles.details}>
              <li>
                <span className={styles.dIcon}><Mail size={16} /></span>
                <div>
                  <p className={styles.dLabel}>Email</p>
                  <a href="mailto:engrmumtazali01@gmail.com" className={styles.dValue}>engrmumtazali01@gmail.com</a>
                </div>
              </li>
              <li>
                <span className={styles.dIcon}><MapPin size={16} /></span>
                <div>
                  <p className={styles.dLabel}>Office</p>
                  <p className={styles.dValue}>Lahore, Pakistan · Remote worldwide</p>
                </div>
              </li>
              <li>
                <span className={styles.dIcon}><Clock size={16} /></span>
                <div>
                  <p className={styles.dLabel}>Reply time</p>
                  <p className={styles.dValue}>Within 24 hours</p>
                </div>
              </li>
            </ul>
          </section>

          {/* ── Right: form card ── */}
          <section className={styles.card} aria-labelledby="form-title">
            {status === 'done' ? (
              <div className={styles.success} role="status">
                <span className={styles.successIcon}><Check size={30} /></span>
                <h2 className={styles.formTitle}>Message received</h2>
                <p className={styles.sub}>
                  Thanks for reaching out. We&apos;ll read it properly and reply within 24 hours
                  with times for a call.
                </p>
                <div className={styles.successBtns}>
                  <button type="button" className={styles.btnGhost} onClick={() => setStatus('idle')}>Send another</button>
                  <Link to="/portfolio" className={styles.btnGold}>See our work <ArrowRight size={16} /></Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 id="form-title" className={styles.formTitle}>Get a scope and a ballpark</h2>
                <p className={styles.sub}>Free, no obligation. Stage 01 of the process.</p>

                <div className={styles.field}>
                  <label htmlFor="goal" className={styles.label}>What are you trying to build or fix? *</label>
                  <textarea id="goal" rows={4} className={`${styles.input} ${errors.goal ? styles.invalid : ''}`}
                    placeholder="e.g. We run scheduling for 40 field engineers out of spreadsheets and want it as a proper web app with a mobile view."
                    value={form.goal} onChange={(e) => set('goal', e.target.value)} aria-invalid={!!errors.goal} />
                  {errors.goal && <p className={styles.err} role="alert">{errors.goal}</p>}
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Name *</label>
                    <input id="name" type="text" autoComplete="name" className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
                      placeholder="Jane Okafor" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
                    {errors.name && <p className={styles.err} role="alert">{errors.name}</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Work email *</label>
                    <input id="email" type="email" autoComplete="email" className={`${styles.input} ${errors.email ? styles.invalid : ''}`}
                      placeholder="jane@company.com" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
                    {errors.email && <p className={styles.err} role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>Company <span className={styles.opt}>(optional)</span></label>
                    <input id="company" type="text" autoComplete="organization" className={styles.input}
                      placeholder="Acme Ltd" value={form.company} onChange={(e) => set('company', e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>Phone or WhatsApp <span className={styles.opt}>(optional)</span></label>
                    <input id="phone" type="tel" autoComplete="tel" className={styles.input}
                      placeholder="+1 555 000 1234" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </div>
                </div>

                <fieldset className={styles.budget}>
                  <legend className={styles.label}>Indicative budget</legend>
                  <p className={styles.hint}>Optional, it helps us scope realistically.</p>
                  <div className={styles.chips}>
                    {BUDGETS.map((b) => (
                      <button key={b} type="button" aria-pressed={form.budget === b}
                        className={`${styles.chip} ${form.budget === b ? styles.chipOn : ''}`}
                        onClick={() => set('budget', form.budget === b ? '' : b)}>{b}</button>
                    ))}
                  </div>
                </fieldset>

                <label className={styles.check}>
                  <input type="checkbox" checked={form.nda} onChange={(e) => set('nda', e.target.checked)} />
                  <span>Send me an NDA before we discuss anything.</span>
                </label>

                {status === 'error' && <p className={styles.errBox} role="alert">{apiError}</p>}

                <div className={styles.actions}>
                  <button type="submit" className={styles.btnGold} disabled={status === 'sending'}>
                    {status === 'sending'
                      ? <><Loader2 size={16} className={styles.spin} /> Sending…</>
                      : <>Send and book a call <ArrowRight size={16} /></>}
                  </button>
                  <span className={styles.reply}><Check size={15} /> We reply within 24 hours.</span>
                </div>

                <p className={styles.fine}>
                  By sending this you agree to our privacy policy. We never share your details or
                  add you to a mailing list.
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
