import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { contactAPI } from '../utils/api'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

const SERVICES_OPTIONS = [
  'SaaS Development',
  'Web Development',
  'AI & ML Solutions',
  'Mobile Development',
  'Cloud & DevOps',
  'UI/UX Design',
  'Other',
]

const INFO_CARDS = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'hello@technova.dev',
    href: 'mailto:hello@technova.dev',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'San Francisco, CA / Remote',
    href: null,
  },
]

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await contactAPI.send(data)
      toast.success(res.message || 'Message sent!')
      setSubmitted(true)
      reset()
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-mono text-sm mb-3 tracking-widest uppercase">
            Get In Touch
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: '"Clash Display", sans-serif' }}
          >
            Let's <span className="gradient-text">Work Together</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {INFO_CARDS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Response Time */}
            <div className="glass rounded-2xl p-5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Available Now</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                We typically respond within 2–4 hours on business days.
                For urgent projects, mention it in your message.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-4xl mb-2">
                  ✅
                </div>
                <h3 className="text-white text-2xl font-bold">Message Received!</h3>
                <p className="text-slate-400 max-w-sm">
                  Thank you for reaching out. We'll review your project and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-sm mt-2"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Doe"
                      className="form-input"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Email Address *</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                      })}
                      placeholder="john@company.com"
                      className="form-input"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Company</label>
                    <input
                      {...register('company')}
                      placeholder="Your Company"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Phone</label>
                    <input
                      {...register('phone')}
                      placeholder="+1 (555) 000-0000"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Service Interested In</label>
                  <select {...register('service')} className="form-input">
                    <option value="">Select a service...</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-slate-900">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Subject *</label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    placeholder="Project description in one line"
                    className="form-input"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Message *</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    placeholder="Tell us about your project, timeline, and budget..."
                    className="form-input resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <FiSend size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
