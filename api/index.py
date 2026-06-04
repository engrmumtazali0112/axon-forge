"""
api/index.py  —  Next Tech Solutions / Axon Forge API
Serverless-compatible: no MySQL, no persistent disk.
- Contact form  →  sends Gmail via SMTP
- Services      →  static data (or swap in Supabase/PlanetScale later)
- Team, Testimonials, Stats  →  static
"""

import os, smtplib
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mangum import Mangum

# ── Config ────────────────────────────────────────────────────────────────────
SMTP_HOST     = os.getenv("SMTP_HOST",     "smtp.gmail.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM    = os.getenv("EMAIL_FROM",    SMTP_USERNAME)
EMAIL_TO      = os.getenv("EMAIL_TO",      SMTP_USERNAME)

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,https://axonforge.vercel.app"
).split(",")

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Next Tech Solutions API",
    version="2.0.0",
    description="Contact + Services + Team API for Next Tech Solutions",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Static Data ───────────────────────────────────────────────────────────────
SERVICES = [
    {"id": 1, "title": "SaaS Development",    "icon": "🚀", "short_description": "Full-cycle platforms with auth, billing & dashboards", "price_range": "$20/hr", "is_featured": True,  "color_theme": "gold",  "features": ["Authentication & RBAC", "Stripe billing", "Admin dashboards", "REST / GraphQL APIs", "CI/CD pipelines"]},
    {"id": 2, "title": "AI & ML Solutions",   "icon": "🤖", "short_description": "LLM integration, RAG systems, fine-tuning & pipelines",  "price_range": "$20/hr", "is_featured": True,  "color_theme": "gold",  "features": ["OpenAI / Claude integration", "RAG pipelines", "LLM fine-tuning", "Vector databases", "AI agents"]},
    {"id": 3, "title": "Web Development",     "icon": "🌐", "short_description": "Responsive React / Next.js apps with pixel-perfect UI",  "price_range": "$20/hr", "is_featured": True,  "color_theme": "gold",  "features": ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO optimization"]},
    {"id": 4, "title": "Mobile Apps",         "icon": "📱", "short_description": "Cross-platform React Native & Expo applications",         "price_range": "$20/hr", "is_featured": False, "color_theme": "gold",  "features": ["React Native", "Expo", "Push notifications", "Offline support", "App Store deployment"]},
    {"id": 5, "title": "Cloud & DevOps",      "icon": "☁️",  "short_description": "AWS / GCP infrastructure, Docker, CI/CD pipelines",       "price_range": "$20/hr", "is_featured": False, "color_theme": "gold",  "features": ["AWS & GCP", "Docker & Kubernetes", "GitHub Actions", "Monitoring & alerts", "Cost optimization"]},
    {"id": 6, "title": "Computer Vision",     "icon": "👁️",  "short_description": "Object detection, image classification & OCR systems",    "price_range": "$20/hr", "is_featured": False, "color_theme": "gold",  "features": ["Object detection", "Image classification", "OCR & document parsing", "Real-time video analysis", "Custom model training"]},
    {"id": 7, "title": "LLM Fine-tuning",     "icon": "🧠", "short_description": "Custom model training on domain-specific data",            "price_range": "Custom", "is_featured": False, "color_theme": "gold",  "features": ["Dataset preparation", "LoRA / QLoRA fine-tuning", "Model evaluation", "Deployment & inference", "Ongoing optimization"]},
    {"id": 8, "title": "Database Design",     "icon": "🗄️",  "short_description": "Scalable schemas, optimization & migrations",              "price_range": "$20/hr", "is_featured": False, "color_theme": "gold",  "features": ["Schema design", "Query optimization", "Migrations", "Replication & backups", "PostgreSQL / MySQL / MongoDB"]},
]

TEAM = [
    {"id": 1, "avatar": "MA", "name": "Mumtaz Ali",      "role": "Founder & Full-Stack Engineer", "bio": "Django & FastAPI expert with 5+ years building scalable SaaS platforms.", "skills": ["Python", "FastAPI", "Django", "React", "AWS", "PostgreSQL", "LangChain"], "linkedin": "https://linkedin.com/in/nexttech-sol", "github": "https://github.com/engrmumtazali0112"},
    {"id": 2, "avatar": "AI", "name": "AI Engineer",     "role": "Machine Learning Engineer",     "bio": "Specialized in LLM fine-tuning, RAG pipelines, and computer vision.",      "skills": ["OpenAI", "LangChain", "TensorFlow", "HuggingFace", "Pinecone", "Python"], "linkedin": "https://linkedin.com/in/nexttech-sol", "github": "https://github.com/engrmumtazali0112"},
    {"id": 3, "avatar": "FE", "name": "Frontend Lead",   "role": "React & UI/UX Engineer",        "bio": "Crafting pixel-perfect interfaces with React and Next.js.",                 "skills": ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"], "linkedin": "https://linkedin.com/in/nexttech-sol", "github": "https://github.com/engrmumtazali0112"},
    {"id": 4, "avatar": "DO", "name": "DevOps Engineer", "role": "Cloud & Infrastructure Lead",   "bio": "AWS-certified, focused on Docker, Kubernetes, and zero-downtime deploys.",   "skills": ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"], "linkedin": "https://linkedin.com/in/nexttech-sol", "github": "https://github.com/engrmumtazali0112"},
]

TESTIMONIALS = [
    {"id": 1, "avatar": "JD", "name": "James Davis",   "role": "CTO",             "company": "TechFlow Inc.",        "rating": 5, "text": "Next Tech automated our data pipeline. ROI was visible in week one."},
    {"id": 2, "avatar": "SK", "name": "Sarah Kim",     "role": "Founder",         "company": "LaunchPad SaaS",       "rating": 5, "text": "Built our SaaS MVP in 6 weeks — clean code, great architecture. We raised our seed round after."},
    {"id": 3, "avatar": "RM", "name": "Raza Malik",    "role": "Product Manager", "company": "FinEdge Solutions",    "rating": 5, "text": "The AI chatbot handles 80% of our queries. Incredible quality and on-time delivery."},
    {"id": 4, "avatar": "AL", "name": "Amanda Lee",    "role": "CEO",             "company": "EduTech Global",       "rating": 5, "text": "Scaled from 100 to 10,000 users without a single outage. Truly 10/10."},
    {"id": 5, "avatar": "TH", "name": "Thomas Hughes", "role": "Eng. Lead",       "company": "ShipFast Logistics",   "rating": 5, "text": "React Native app has a 4.9 App Store rating. We keep working with them."},
    {"id": 6, "avatar": "FO", "name": "Fatima Omar",   "role": "Co-Founder",      "company": "MedAI Labs",           "rating": 5, "text": "World-class LLM fine-tuning. They understood our compliance requirements perfectly."},
]

STATS = {"projects_completed": 85, "happy_clients": 60, "years_experience": 5, "technologies": 30}

# ── Schemas ───────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name:    str
    email:   str
    phone:   Optional[str] = ""
    company: Optional[str] = ""
    service: Optional[str] = ""
    subject: Optional[str] = ""
    message: str

class NewsletterForm(BaseModel):
    email: str
    name:  Optional[str] = ""

# ── Email helper ──────────────────────────────────────────────────────────────
def send_email(subject: str, html: str, plain: str) -> bool:
    if not SMTP_PASSWORD:
        print("⚠️  SMTP_PASSWORD not set — email skipped.")
        return False
    try:
        from email.mime.multipart import MIMEMultipart
        from email.mime.text      import MIMEText
        msg            = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = f"Next Tech Solutions <{EMAIL_FROM}>"
        msg["To"]      = EMAIL_TO
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(html,  "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as srv:
            srv.ehlo(); srv.starttls()
            srv.login(SMTP_USERNAME, SMTP_PASSWORD)
            srv.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())
        print(f"✅ Email sent to {EMAIL_TO}")
        return True
    except Exception as e:
        print(f"❌ Email error: {e}")
        return False

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Next Tech Solutions API v2", "status": "running", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy", "version": "2.0.0"}

@app.get("/api/services")
def list_services():
    return {"services": SERVICES}

@app.get("/api/services/{service_id}")
def get_service(service_id: int):
    s = next((x for x in SERVICES if x["id"] == service_id), None)
    if not s:
        from fastapi import HTTPException
        raise HTTPException(404, "Service not found")
    return s

@app.get("/api/team")
def get_team():
    return {"team": TEAM}

@app.get("/api/testimonials")
def get_testimonials():
    return {"testimonials": TESTIMONIALS}

@app.get("/api/stats")
def get_stats():
    return STATS

@app.post("/api/contact")
def submit_contact(form: ContactForm):
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0c0c0c;color:#e0e0e0;border-radius:12px;overflow:hidden;">
      <div style="background:#F5A623;padding:24px 32px;">
        <h2 style="margin:0;color:#000;">📬 New Contact Form Submission</h2>
        <p style="margin:4px 0 0;color:#111;font-size:0.85rem;">Next Tech Solutions</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#888;width:130px;">Name</td><td style="color:#fff;font-weight:600;">{form.name}</td></tr>
          <tr><td style="padding:10px 0;color:#888;">Email</td><td><a href="mailto:{form.email}" style="color:#F5A623;">{form.email}</a></td></tr>
          {"<tr><td style='padding:10px 0;color:#888;'>Phone</td><td style='color:#fff;'>"       + form.phone   + "</td></tr>" if form.phone   else ""}
          {"<tr><td style='padding:10px 0;color:#888;'>Company</td><td style='color:#fff;'>"    + form.company + "</td></tr>" if form.company else ""}
          {"<tr><td style='padding:10px 0;color:#888;'>Service</td><td style='color:#F5A623;'>" + form.service + "</td></tr>" if form.service else ""}
          <tr><td style="padding:10px 0;color:#888;">Subject</td><td style="color:#fff;">{form.subject or "—"}</td></tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:#1a1a1a;border-left:3px solid #F5A623;border-radius:8px;">
          <p style="margin:0 0 8px;color:#888;font-size:0.8rem;text-transform:uppercase;">Message</p>
          <p style="margin:0;color:#ddd;line-height:1.7;white-space:pre-wrap;">{form.message}</p>
        </div>
        <div style="margin-top:28px;text-align:center;">
          <a href="mailto:{form.email}" style="background:#F5A623;color:#000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;">Reply to {form.name} →</a>
        </div>
      </div>
      <div style="padding:16px;background:#080808;text-align:center;color:#444;font-size:0.75rem;">Next Tech Solutions · Lahore, Pakistan</div>
    </div>"""

    plain = f"Name: {form.name}\nEmail: {form.email}\nPhone: {form.phone or '—'}\nCompany: {form.company or '—'}\nService: {form.service or '—'}\nSubject: {form.subject or '—'}\n\nMessage:\n{form.message}"

    send_email(
        f"[Next Tech] New message from {form.name} — {form.subject or 'Contact Form'}",
        html, plain
    )
    return {"success": True, "message": f"Thanks {form.name}! We'll get back to you within 24 hours."}

@app.post("/api/newsletter/subscribe")
def newsletter_subscribe(form: NewsletterForm):
    print(f"📧 Newsletter subscription: {form.email}")
    return {"success": True, "message": f"Welcome! {form.email} subscribed successfully."}

# ── Vercel handler ────────────────────────────────────────────────────────────
handler = Mangum(app, lifespan="off")