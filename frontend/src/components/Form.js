import React, { useState } from "react";
import axios from "axios";

// ── Backend endpoint ──────────────────────────────────────────────────────────
const API_URL = "http://127.0.0.1:8000/api/contact";
// ─────────────────────────────────────────────────────────────────────────────

const BLUE = '#5BB8E8'
const GOLD = '#F5A623'

const SERVICES = [
  "SaaS Development", "Web Development", "AI & ML Solutions",
  "Mobile Development", "Cloud & DevOps", "UI/UX Design",
  "Computer Vision", "LLM Fine-tuning", "RAG Systems", "Other",
];

/* ── Axon Forge LogoMark (matching Navbar) ── */
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

const Form = () => {
  const [fields, setFields] = useState({
    name: "", email: "", phone: "", company: "", service: "", subject: "", message: "",
  });
  const [errors,        setErrors]        = useState({});
  const [status,        setStatus]        = useState("idle"); // idle | loading | success | error
  const [focused,       setFocused]       = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const set = (key) => (e) => {
    setFields((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim())    e.name    = "Full name is required";
    if (!fields.email.trim())   e.email   = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(fields.email)) e.email = "Enter a valid email";
    if (!fields.subject.trim()) e.subject = "Subject is required";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    setSubmittedName(fields.name);

    try {
      await axios.post(API_URL, {
        name:    fields.name,
        email:   fields.email,
        phone:   fields.phone   || "N/A",
        company: fields.company || "N/A",
        service: fields.service || "N/A",
        subject: fields.subject,
        message: fields.message,
      });

      setStatus("success");
      setFields({ name: "", email: "", phone: "", company: "", service: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact error:", err);
      setStatus("error");
    }
  };

  /* ════════════════════════════════════════
     SUCCESS SCREEN
  ════════════════════════════════════════ */
  if (status === "success") {
    return (
      <div style={pg}>
        <div style={successCard}>

          {/* Axon Forge logo mark */}
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <LogoMark size={48} />
          </div>

          {/* Animated SVG checkmark */}
          <div style={checkRing}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30"
                stroke={GOLD} strokeWidth="2" opacity="0.2"/>
              <circle cx="32" cy="32" r="30"
                stroke={GOLD} strokeWidth="2.5"
                strokeDasharray="190" strokeDashoffset="190"
                style={{ animation: "drawRing 0.9s ease forwards" }}/>
              <polyline points="18,32 27,42 46,22"
                stroke={GOLD} strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="45" strokeDashoffset="45"
                style={{ animation: "drawTick 0.4s 0.7s ease forwards" }}/>
            </svg>
          </div>

          {/* Badge */}
          <div style={successBadge}>
            <span style={successDot}/> Message Delivered ✅
          </div>

          <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
            Thank You, <span style={{ color: GOLD }}>{submittedName}</span>! 🎉
          </h2>

          <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 18px", lineHeight: 1.7 }}>
            Your message was sent successfully and delivered to:
          </p>

          {/* Email pill */}
          <div style={emailPill}>
            <span style={emailGlow}/> ✉️ &nbsp;engrmumtazali01@gmail.com
          </div>

          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: "18px 0 32px" }}>
            I typically respond within{" "}
            <strong style={{ color: GOLD }}>2–4 hours</strong>{" "}
            on business days.
          </p>

          <button style={resetBtn}
            onMouseEnter={e => { e.currentTarget.style.background = "#e69510"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = "translateY(0)"; }}
            onClick={() => { setStatus("idle"); setSubmittedName(""); }}>
            ↩ Send Another Message
          </button>
        </div>

        <style>{cssKeyframes}</style>
      </div>
    );
  }

  /* ════════════════════════════════════════
     FORM
  ════════════════════════════════════════ */
  return (
    <div style={pg}>
      <div style={wrapper}>

        {/* ── Left info column ── */}
        <div style={infoCol}>

          {/* Axon Forge branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <LogoMark size={36} />
            <div>
              <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
                <span style={{ color: BLUE }}>AXON</span>
                {' '}
                <span style={{ color: GOLD }}>FORGE</span>
              </span>
            </div>
          </div>

          <div style={onlineBadge}>
            <span style={onlineDot}/>&nbsp;
            <span style={{ color: GOLD, fontWeight: 700, fontSize: 13 }}>Available for Projects</span>
          </div>

          <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: 0 }}>
            Let's Work<br/>Together
          </h2>

          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            Based in Pakistan · Remote worldwide.<br/>
            Drop a message — I'll reply fast.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "✉️", label: "EMAIL",    val: "engrmumtazali01@gmail.com", href: "mailto:engrmumtazali01@gmail.com" },
              { icon: "📞", label: "PHONE",    val: "+92 XXX XXXXXXX",           href: null },
              { icon: "📍", label: "LOCATION", val: "Pakistan · Remote",         href: null },
            ].map(({ icon, label, val, href }) => (
              <div key={label} style={contactCard}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2c45"}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "1px", margin: "0 0 2px" }}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600, textDecoration: "none" }}
                         onMouseEnter={e => e.currentTarget.style.color = GOLD}
                         onMouseLeave={e => e.currentTarget.style.color = "#e2e8f0"}>{val}</a>
                    : <p style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600, margin: 0 }}>{val}</p>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#0c1a2e", border: "1px solid #1e2c45", borderRadius: 13, padding: "15px 17px" }}>
            <p style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "1px", margin: "0 0 10px" }}>TECH STACK</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["Python","FastAPI","React","PyTorch","Docker","AWS"].map(t => (
                <span key={t} style={{ padding: "4px 10px", background: "#1a2a42", borderRadius: 20,
                  fontSize: 11, color: "#94a3b8", border: "1px solid #2a3a55" }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ background: `rgba(245,166,35,0.04)`, border: `1px solid rgba(245,166,35,0.15)`,
            borderRadius: 13, padding: "15px 17px" }}>
            <p style={{ fontSize: 13, color: GOLD, fontWeight: 700, margin: "0 0 5px" }}>⚡ Fast Response</p>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              Typical reply: <strong style={{ color: "#94a3b8" }}>2–4 hours</strong> on business days.
            </p>
          </div>
        </div>

        {/* ── Right form card ── */}
        <div style={formCard}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Send a Message</h3>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px" }}>
            Fields marked <span style={{ color: GOLD }}>*</span> are required.
          </p>

          {status === "error" && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#fca5a5", marginBottom: 20 }}>
              ⚠️ Failed to send. Make sure the backend is running, or email at{" "}
              <a href="mailto:engrmumtazali01@gmail.com" style={{ color: "#fca5a5" }}>engrmumtazali01@gmail.com</a>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" noValidate
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={rowSt}>
              <Fld label="Full Name" req error={errors.name}>
                <input value={fields.name} onChange={set("name")} placeholder="Mumtaz Ali"
                  onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                  style={inp(focused === "name", !!errors.name)} />
              </Fld>
              <Fld label="Email Address" req error={errors.email}>
                <input type="email" value={fields.email} onChange={set("email")} placeholder="you@gmail.com"
                  onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                  style={inp(focused === "email", !!errors.email)} />
              </Fld>
            </div>

            <div style={rowSt}>
              <Fld label="Company">
                <input value={fields.company} onChange={set("company")} placeholder="Company (optional)"
                  onFocus={() => setFocused("company")} onBlur={() => setFocused("")}
                  style={inp(focused === "company")} />
              </Fld>
              <Fld label="Phone">
                <input value={fields.phone} onChange={set("phone")} placeholder="+92 XXX XXXXXXX (optional)"
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                  style={inp(focused === "phone")} />
              </Fld>
            </div>

            <Fld label="Service Interested In">
              <select value={fields.service} onChange={set("service")}
                onFocus={() => setFocused("service")} onBlur={() => setFocused("")}
                style={{ ...inp(focused === "service"), color: fields.service ? "#fff" : "#64748b", cursor: "pointer" }}>
                <option value="">Select a service...</option>
                {SERVICES.map(s => <option key={s} value={s} style={{ background: "#0f1e35" }}>{s}</option>)}
              </select>
            </Fld>

            <Fld label="Subject" req error={errors.subject}>
              <input value={fields.subject} onChange={set("subject")} placeholder="e.g. AI-powered analytics platform"
                onFocus={() => setFocused("subject")} onBlur={() => setFocused("")}
                style={inp(focused === "subject", !!errors.subject)} />
            </Fld>

            <Fld label="Message" req error={errors.message}>
              <textarea value={fields.message} onChange={set("message")} rows={5}
                placeholder="Describe your project, timeline, and requirements..."
                onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                style={{ ...inp(focused === "message", !!errors.message), resize: "vertical", fontFamily: "inherit" }} />
            </Fld>

            <button type="submit" disabled={status === "loading"} style={submitBtnSt(status === "loading")}
              onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.background = "#e69510"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 28px rgba(245,166,35,0.4)`; }}}
              onMouseLeave={e => { if (status !== "loading") { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 18px rgba(245,166,35,0.25)`; }}}>
              {status === "loading"
                ? <span style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:18, height:18, border:"2.5px solid rgba(0,0,0,0.3)",
                      borderTopColor:"#000", borderRadius:"50%", animation:"spin 0.7s linear infinite",
                      display:"inline-block", flexShrink:0 }}/> Sending your message...
                  </span>
                : <span style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </span>
              }
            </button>

            <p style={{ fontSize: 11, color: "#334155", textAlign: "center", margin: 0 }}>
              🔒 Delivered securely to{" "}
              <span style={{ color: GOLD, fontWeight: 600 }}>engrmumtazali01@gmail.com</span>
            </p>
          </form>
        </div>
      </div>
      <style>{cssKeyframes}</style>
    </div>
  );
};

/* ── Field wrapper ── */
const Fld = ({ label, req, error, children }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5, flex:1 }}>
    <label style={{ fontSize:12, color:"#94a3b8", fontWeight:700, letterSpacing:"0.3px" }}>
      {label} {req && <span style={{ color: '#F5A623' }}>*</span>}
    </label>
    {children}
    {error && <span style={{ fontSize:11, color:"#f87171" }}>⚠ {error}</span>}
  </div>
);

/* ── Styles ── */
const inp = (focused, hasError) => ({
  width:"100%", padding:"12px 14px",
  background:"#080f1d",
  border:`1.5px solid ${hasError ? "#ef4444" : focused ? "#F5A623" : "#1a2d47"}`,
  borderRadius:11, color:"#fff", fontSize:14, outline:"none",
  transition:"border-color 0.18s, box-shadow 0.18s",
  boxShadow: focused ? `0 0 0 3px ${hasError ? "rgba(239,68,68,0.1)" : "rgba(245,166,35,0.12)"}` : "none",
});

const pg           = { minHeight:"60vh", background:"linear-gradient(155deg,#060e1a 0%,#0a1628 55%,#060e1a 100%)", padding:"60px 20px 84px", display:"flex", alignItems:"flex-start", justifyContent:"center" };
const wrapper      = { maxWidth:1060, width:"100%", display:"grid", gridTemplateColumns:"320px 1fr", gap:26, animation:"fadeUp 0.55s ease both" };
const infoCol      = { display:"flex", flexDirection:"column", gap:18 };
const rowSt        = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 };
const formCard     = { background:"#0c1a2e", border:"1px solid #1a2d47", borderRadius:22, padding:"32px 34px", boxShadow:"0 24px 56px rgba(0,0,0,0.5)", animation:"fadeUp 0.55s 0.12s ease both" };
const contactCard  = { display:"flex", alignItems:"center", gap:13, background:"#0c1a2e", border:"1px solid #1e2c45", borderRadius:12, padding:"12px 15px", transition:"border-color 0.2s" };
const onlineBadge  = { display:"flex", alignItems:"center", gap:8, background:"rgba(245,166,35,0.06)", border:"1px solid rgba(245,166,35,0.2)", borderRadius:30, padding:"7px 15px", width:"fit-content" };
const onlineDot    = { width:9, height:9, borderRadius:"50%", background:"#F5A623", boxShadow:"0 0 10px rgba(245,166,35,0.7)", animation:"blink 2s ease-in-out infinite" };
const submitBtnSt  = (l) => ({ background:"#F5A623", border:"none", color:"#000", padding:"14px 22px", borderRadius:30, fontSize:15, fontWeight:700, cursor:l?"not-allowed":"pointer", transition:"all 0.2s", width:"100%", boxShadow:"0 6px 18px rgba(245,166,35,0.25)", opacity:l?0.75:1, display:"flex", alignItems:"center", justifyContent:"center" });

// Success
const successCard  = { maxWidth:500, width:"100%", margin:"40px auto", background:"#0c1a2e", border:"1px solid #1a2d47", borderRadius:26, padding:"52px 40px", boxShadow:"0 30px 80px rgba(0,0,0,0.6)", textAlign:"center", animation:"fadeUp 0.5s ease both" };
const checkRing    = { width:110, height:110, margin:"0 auto 26px", background:`radial-gradient(circle,rgba(245,166,35,0.12) 0%,transparent 70%)`, border:"1px solid rgba(245,166,35,0.15)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" };
const successBadge = { display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,0.1)", border:"1px solid rgba(245,166,35,0.28)", color:"#F5A623", padding:"6px 18px", borderRadius:20, fontSize:13, fontWeight:700, marginBottom:18 };
const successDot   = { width:8, height:8, borderRadius:"50%", background:"#F5A623", boxShadow:"0 0 8px rgba(245,166,35,0.9)", animation:"blink 2s infinite" };
const emailPill    = { display:"inline-flex", alignItems:"center", gap:10, background:"rgba(245,166,35,0.08)", border:"1px solid rgba(245,166,35,0.22)", borderRadius:30, padding:"10px 22px", color:"#F5A623", fontWeight:700, fontSize:14 };
const emailGlow    = { width:8, height:8, borderRadius:"50%", background:"#F5A623", boxShadow:"0 0 10px rgba(245,166,35,1)", flexShrink:0 };
const resetBtn     = { background:"#F5A623", border:"none", color:"#000", padding:"13px 32px", borderRadius:30, fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.2s", boxShadow:"0 6px 18px rgba(245,166,35,0.3)" };

const cssKeyframes = `
  @keyframes spin     { to { transform: rotate(360deg); } }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes drawRing { to { stroke-dashoffset: 0; } }
  @keyframes drawTick { to { stroke-dashoffset: 0; } }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0.3} }
  * { box-sizing: border-box; }
  @media (max-width: 860px) {
    #contact-wrap { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 540px) {
    .form-row { grid-template-columns: 1fr !important; }
  }
`;

export default Form;