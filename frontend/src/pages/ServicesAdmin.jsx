import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Upload, CheckCircle, AlertCircle, Loader2, ImageIcon, Package } from 'lucide-react'

const API = 'http://localhost:8000'

const INITIAL_FORM = {
  title:       '',
  description: '',
  is_active:   true,
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ toasts, remove }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.type === 'success' ? '#0d2a0d' : '#2a0d0d',
          border: `1px solid ${t.type === 'success' ? '#1a6b1a' : '#6b1a1a'}`,
          color: t.type === 'success' ? '#4ade80' : '#f87171',
          padding: '12px 18px', borderRadius: 10, fontSize: '0.875rem',
          fontFamily: "'JetBrains Mono', monospace",
          animation: 'slideIn 0.3s ease',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          minWidth: 280,
        }}>
          {t.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {t.message}
          <button onClick={() => remove(t.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

/* ── Image Picker ────────────────────────────────────────── */
function ImagePicker({ onChange }) {
  const ref = useRef()
  const [preview, setPreview] = useState(null)
  const [drag, setDrag]       = useState(false)

  const pick = (file) => {
    if (!file) return
    onChange(file)
    setPreview(URL.createObjectURL(file))
  }

  const onDrop = (e) => {
    e.preventDefault(); setDrag(false)
    pick(e.dataTransfer.files[0])
  }

  return (
    <div
      onClick={() => ref.current.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${drag ? '#F5A623' : 'rgba(245,166,35,0.25)'}`,
        borderRadius: 14, padding: 24, textAlign: 'center', cursor: 'pointer',
        background: drag ? 'rgba(245,166,35,0.05)' : '#0d0d0d',
        transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
      }}
    >
      <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }} onChange={e => pick(e.target.files[0])} />

      {preview ? (
        <div style={{ position: 'relative' }}>
          <img src={preview} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <span style={{ color: '#F5A623', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>Click to change</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px 0' }}>
          <Upload size={28} color="rgba(245,166,35,0.4)" style={{ marginBottom: 10 }} />
          <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>
            Drop image here or <span style={{ color: '#F5A623' }}>click to browse</span>
          </p>
          <p style={{ margin: '6px 0 0', color: '#333', fontSize: '0.75rem' }}>JPEG · PNG · WebP · max 5 MB</p>
        </div>
      )}
    </div>
  )
}

/* ── Toggle ──────────────────────────────────────────────── */
function Toggle({ value, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 42, height: 24, borderRadius: 12,
          background: value ? '#F5A623' : '#222',
          border: `1px solid ${value ? '#F5A623' : 'rgba(255,255,255,0.1)'}`,
          position: 'relative', transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: value ? 20 : 3,
          width: 16, height: 16, borderRadius: '50%',
          background: value ? '#000' : '#555',
          transition: 'left 0.2s',
        }} />
      </div>
      <span style={{ color: value ? '#e0e0e0' : '#555', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </label>
  )
}

/* ── Main Component ──────────────────────────────────────── */
export default function ServicesAdmin() {
  const [services, setServices] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [modal,    setModal]    = useState(false)   // 'create' | 'edit'
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(INITIAL_FORM)
  const [image,    setImage]    = useState(null)
  const [toasts,   setToasts]   = useState([])
  const [confirm,  setConfirm]  = useState(null)

  /* ── Toasts ── */
  const toast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000)
  }
  const removeToast = id => setToasts(p => p.filter(t => t.id !== id))

  /* ── Fetch ── */
  const fetchServices = async () => {
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/services?active_only=false`)
      const d = await r.json()
      setServices(d.services || [])
    } catch {
      toast('Could not connect to backend', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  /* ── Modal helpers ── */
  const openCreate = () => {
    setForm(INITIAL_FORM); setImage(null); setEditing(null); setModal('create')
  }
  const openEdit = (s) => {
    setForm({ title: s.title, description: s.description, is_active: s.is_active })
    setImage(null); setEditing(s); setModal('edit')
  }
  const closeModal = () => { setModal(false); setEditing(null) }

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      toast('Title and description are required', 'error'); return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title',       form.title.trim())
      fd.append('description', form.description.trim())
      fd.append('is_active',   form.is_active)
      if (image) fd.append('image', image)

      const url    = modal === 'create' ? `${API}/api/services` : `${API}/api/services/${editing.id}`
      const method = modal === 'create' ? 'POST' : 'PUT'

      const r = await fetch(url, { method, body: fd })
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        throw new Error(err.detail || 'Request failed')
      }
      toast(modal === 'create' ? '✅ Service created!' : '✅ Service updated!')
      closeModal(); fetchServices()
    } catch (err) {
      toast(err.message || 'Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  /* ── Delete ── */
  const handleDelete = async (id) => {
    setDeleting(id); setConfirm(null)
    try {
      const r = await fetch(`${API}/api/services/${id}`, { method: 'DELETE' })
      if (!r.ok) throw new Error('Delete failed')
      toast('🗑️ Service deleted')
      setServices(p => p.filter(s => s.id !== id))
    } catch {
      toast('Could not delete service', 'error')
    } finally {
      setDeleting(null)
    }
  }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  /* ── Shared styles ── */
  const inputStyle = {
    width: '100%', background: '#0d0d0d', border: '1px solid rgba(245,166,35,0.2)',
    borderRadius: 10, padding: '11px 14px', color: '#e0e0e0',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle = {
    display: 'block', marginBottom: 6, color: '#888',
    fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase',
    fontFamily: "'JetBrains Mono', monospace",
  }
  const fieldStyle = { marginBottom: 20 }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#e0e0e0', fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, textarea:focus { border-color: rgba(245,166,35,0.6) !important; }
        input::placeholder, textarea::placeholder { color: #333; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #F5A623; border-radius: 3px; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        .svc-card:hover  { border-color: rgba(245,166,35,0.25) !important; transform: translateY(-3px); }
        .action-btn:hover { background: rgba(245,166,35,0.12) !important; }
        .del-btn:hover    { background: rgba(239,68,68,0.12) !important; color: #ef4444 !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid rgba(245,166,35,0.1)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={18} color="#F5A623" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>Services Manager</h1>
            <p style={{ color: '#444', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>Next Tech Solutions · Admin</p>
          </div>
        </div>
        <button
          onClick={openCreate}
          onMouseEnter={e => { e.currentTarget.style.background = '#FFD07A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.transform = 'translateY(0)' }}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F5A623', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.875rem', transition: 'all 0.2s' }}
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'Total',    value: services.length },
            { label: 'Active',   value: services.filter(s => s.is_active).length },
            { label: 'Inactive', value: services.filter(s => !s.is_active).length },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 24px', minWidth: 120 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#F5A623', lineHeight: 1 }}>{value}</div>
              <div style={{ color: '#555', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <Loader2 size={32} color="#F5A623" style={{ animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#333' }}>
            <Package size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem' }}>No services yet</p>
            <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Click <strong style={{ color: '#F5A623' }}>Add Service</strong> to create your first one</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {services.map((s, i) => (
              <div key={s.id} className="svc-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.25s', animation: `fadeUp 0.4s ${i * 0.06}s ease both` }}>

                {/* Image */}
                <div style={{ height: 160, background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
                  {s.photo_url ? (
                    <img src={`${API}${s.photo_url}`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <ImageIcon size={28} color="rgba(245,166,35,0.15)" />
                      <span style={{ color: '#2a2a2a', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace" }}>No image</span>
                    </div>
                  )}
                  {/* Active badge */}
                  <span style={{
                    position: 'absolute', top: 10, right: 10,
                    background: s.is_active ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)',
                    border: `1px solid ${s.is_active ? 'rgba(74,222,128,0.35)' : 'rgba(239,68,68,0.35)'}`,
                    color: s.is_active ? '#4ade80' : '#ef4444',
                    padding: '3px 9px', borderRadius: 6, fontSize: '0.7rem',
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  }}>
                    {s.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '18px 20px 16px' }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {s.description}
                  </p>
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 14 }}>
                    <button className="action-btn" onClick={() => openEdit(s)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)', color: '#F5A623', padding: '8px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }}>
                      <Pencil size={13} /> Edit
                    </button>
                    <button className="del-btn" onClick={() => setConfirm(s.id)} disabled={deleting === s.id} style={{ width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#777', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }}>
                      {deleting === s.id ? <Loader2 size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Trash2 size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Delete Confirm ── */}
      {confirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 16, padding: 32, maxWidth: 380, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, background: 'rgba(239,68,68,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trash2 size={22} color="#ef4444" />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>Delete this service?</h3>
            <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: 24 }}>This will permanently remove the service and its image. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirm(null)} style={{ flex: 1, padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#aaa', cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.875rem' }}>Cancel</button>
              <button onClick={() => handleDelete(confirm)} style={{ flex: 1, padding: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.875rem' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
          <div style={{ background: '#111', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 20, width: '100%', maxWidth: 560, animation: 'fadeUp 0.3s ease', maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px', borderBottom: '1px solid rgba(245,166,35,0.1)' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                {modal === 'create' ? '✦ Add New Service' : '✦ Edit Service'}
              </h2>
              <button onClick={closeModal} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}>
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '28px' }}>

              {/* Title */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Title <span style={{ color: '#F5A623' }}>*</span></label>
                <input
                  style={inputStyle}
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="e.g. AI & ML Solutions"
                  required
                />
              </div>

              {/* Description */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Description <span style={{ color: '#F5A623' }}>*</span></label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe this service in a few sentences…"
                  required
                />
              </div>

              {/* Image */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Service Image <span style={{ color: '#444' }}>(optional)</span></label>
                <ImagePicker onChange={setImage} />
                {modal === 'edit' && editing?.photo_url && !image && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    <ImageIcon size={12} />
                    Current image kept unless you upload a new one
                  </div>
                )}
              </div>

              {/* Active toggle */}
              <div style={{ marginBottom: 28 }}>
                <Toggle
                  value={form.is_active}
                  onChange={v => set('is_active', v)}
                  label="Active (visible on website)"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                style={{
                  width: '100%', padding: '13px',
                  background: saving ? 'rgba(245,166,35,0.4)' : '#F5A623',
                  border: 'none', borderRadius: 10,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                  color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s',
                }}
              >
                {saving
                  ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Saving…</>
                  : modal === 'create'
                    ? <><Plus size={16} /> Create Service</>
                    : <><CheckCircle size={16} /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast toasts={toasts} remove={removeToast} />
    </div>
  )
}