"""
Next Tech Solutions — FastAPI Backend  (FINAL)
================================================
• POST/PUT/DELETE /api/services  — full CRUD with image upload → MySQL
• GET  /api/services             — reads from DB (falls back gracefully)
• Images saved to media/uploads/services/ and served at /media/...
• Contact form sends real Gmail email
• Team / Testimonials / Stats remain as static data
"""

import os, json, uuid, smtplib, uvicorn
from io        import BytesIO
from pathlib   import Path
from datetime  import datetime
from typing    import Optional

from dotenv import load_dotenv
load_dotenv()

from fastapi                  import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors  import CORSMiddleware
from fastapi.staticfiles      import StaticFiles
from pydantic                 import BaseModel
from slugify                  import slugify
from PIL                      import Image as PILImage

from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm             import sessionmaker, Session

# ─── Config ───────────────────────────────────────────────────────────────────

DATABASE_URL  = os.getenv("DATABASE_URL",  "mysql+pymysql://root:@localhost:3306/itservices_db")
SMTP_HOST     = os.getenv("SMTP_HOST",     "smtp.gmail.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
EMAIL_FROM    = os.getenv("EMAIL_FROM",    SMTP_USERNAME)
EMAIL_TO      = os.getenv("EMAIL_TO",      SMTP_USERNAME)

UPLOAD_DIR    = Path("media/uploads/services")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_IMG   = {"image/jpeg", "image/png", "image/webp"}
MAX_MB        = 5

# ─── Database setup ───────────────────────────────────────────────────────────

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping  = True,
    pool_size      = 10,
    max_overflow   = 20,
    pool_recycle   = 3600,
    connect_args   = {"charset": "utf8mb4"},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base         = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── ORM Model ────────────────────────────────────────────────────────────────

class ServiceModel(Base):
    __tablename__ = "services"

    id                = Column(Integer,     primary_key=True, index=True)
    title             = Column(String(200), nullable=False)
    slug              = Column(String(220), unique=True,      nullable=False)
    description       = Column(Text,        nullable=False)
    short_description = Column(String(500), nullable=True)
    icon              = Column(String(20),  nullable=True)
    photo_url         = Column(String(500), nullable=True)
    features          = Column(Text,        nullable=True)   # stored as JSON string
    price_range       = Column(String(50),  nullable=True)
    color_theme       = Column(String(30),  nullable=True,   default="gold")
    order_index       = Column(Integer,     default=0)
    is_active         = Column(Boolean,     default=True)
    is_featured       = Column(Boolean,     default=False)
    created_at        = Column(DateTime,    default=datetime.utcnow)
    updated_at        = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)


# ─── FastAPI app ──────────────────────────────────────────────────────────────

app = FastAPI(
    title       = "Axon Forge  API",
    version     = "2.0.0",
    description = "Services CRUD + image upload + contact form",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://localhost:3000",
        "http://127.0.0.1:5173", "http://127.0.0.1:3000",
    ],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)

# Serve uploaded images at /media/...
app.mount("/media", StaticFiles(directory="media"), name="media")


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    print("✅  Database tables ready.")


# ─── Helpers ──────────────────────────────────────────────────────────────────

def unique_slug(db: Session, title: str, exclude_id: int = None) -> str:
    base = slugify(title)
    slug, n = base, 1
    while True:
        q = db.query(ServiceModel).filter(ServiceModel.slug == slug)
        if exclude_id:
            q = q.filter(ServiceModel.id != exclude_id)
        if not q.first():
            return slug
        slug = f"{base}-{n}"; n += 1


def save_image(file: UploadFile) -> str:
    if file.content_type not in ALLOWED_IMG:
        raise HTTPException(400, f"File type '{file.content_type}' not allowed. Use JPEG, PNG or WebP.")
    data = file.file.read()
    if len(data) > MAX_MB * 1024 * 1024:
        raise HTTPException(400, f"File exceeds {MAX_MB} MB limit.")
    ext      = (file.filename or "img.jpg").rsplit(".", 1)[-1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    dest     = UPLOAD_DIR / filename
    img      = PILImage.open(BytesIO(data))
    if img.width > 1200:
        img = img.resize((1200, int(img.height * 1200 / img.width)), PILImage.LANCZOS)
    img.save(str(dest), quality=85)
    return f"/media/uploads/services/{filename}"


def remove_image(url: Optional[str]):
    if url and url.startswith("/media/"):
        p = Path(url.lstrip("/"))
        if p.exists():
            p.unlink()


def parse_features(raw: Optional[str]) -> Optional[str]:
    if not raw:
        return None
    raw = raw.strip()
    if raw.startswith("["):
        try:
            return json.dumps(json.loads(raw))
        except Exception:
            pass
    items = [x.strip() for x in raw.split(",") if x.strip()]
    return json.dumps(items) if items else None


def to_dict(s: ServiceModel) -> dict:
    feats = []
    if s.features:
        try:
            feats = json.loads(s.features)
        except Exception:
            pass
    return {
        "id":                s.id,
        "title":             s.title,
        "slug":              s.slug,
        "description":       s.description,
        "short_description": s.short_description,
        "icon":              s.icon,
        "photo_url":         s.photo_url,
        "features":          feats,
        "price_range":       s.price_range,
        "color_theme":       s.color_theme,
        "order_index":       s.order_index,
        "is_active":         s.is_active,
        "is_featured":       s.is_featured,
        "created_at":        s.created_at.isoformat() if s.created_at else None,
        "updated_at":        s.updated_at.isoformat() if s.updated_at else None,
    }


# ═══════════════════════════════════════════════════════════════════════════════
# SERVICES  CRUD
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/services", tags=["Services"])
def list_services(active_only: bool = True, db: Session = Depends(get_db)):
    """List services from database. ?active_only=false returns all."""
    q = db.query(ServiceModel)
    if active_only:
        q = q.filter(ServiceModel.is_active == True)
    rows = q.order_by(ServiceModel.order_index, ServiceModel.id).all()
    return {"services": [to_dict(r) for r in rows]}


@app.get("/api/services/{service_id}", tags=["Services"])
def get_service(service_id: int, db: Session = Depends(get_db)):
    s = db.query(ServiceModel).filter(ServiceModel.id == service_id).first()
    if not s:
        raise HTTPException(404, "Service not found")
    return to_dict(s)


@app.post("/api/services", status_code=201, tags=["Services"])
async def create_service(
    title:             str           = Form(...),
    description:       str           = Form(...),
    short_description: Optional[str] = Form(None),
    icon:              Optional[str] = Form(None),
    features:          Optional[str] = Form(None),
    price_range:       Optional[str] = Form(None),
    color_theme:       Optional[str] = Form("gold"),
    order_index:       int           = Form(0),
    is_active:         bool          = Form(True),
    is_featured:       bool          = Form(False),
    image: Optional[UploadFile]      = File(None),
    db:   Session = Depends(get_db),
):
    """
    Create a service. Send as **multipart/form-data**.
    `features` = comma-separated string  e.g.  `React, FastAPI, PostgreSQL`
    """
    photo_url = save_image(image) if (image and image.filename) else None
    s = ServiceModel(
        title             = title.strip(),
        slug              = unique_slug(db, title),
        description       = description.strip(),
        short_description = short_description,
        icon              = icon,
        photo_url         = photo_url,
        features          = parse_features(features),
        price_range       = price_range,
        color_theme       = color_theme or "gold",
        order_index       = order_index,
        is_active         = is_active,
        is_featured       = is_featured,
    )
    db.add(s); db.commit(); db.refresh(s)
    print(f"✅  Service created: {s.title} (id={s.id})")
    return {"message": "Service created successfully", "service": to_dict(s)}


@app.put("/api/services/{service_id}", tags=["Services"])
async def update_service(
    service_id:        int,
    title:             Optional[str]  = Form(None),
    description:       Optional[str]  = Form(None),
    short_description: Optional[str]  = Form(None),
    icon:              Optional[str]  = Form(None),
    features:          Optional[str]  = Form(None),
    price_range:       Optional[str]  = Form(None),
    color_theme:       Optional[str]  = Form(None),
    order_index:       Optional[int]  = Form(None),
    is_active:         Optional[bool] = Form(None),
    is_featured:       Optional[bool] = Form(None),
    image: Optional[UploadFile]       = File(None),
    db:   Session = Depends(get_db),
):
    """Update a service. Only send fields you want to change."""
    s = db.query(ServiceModel).filter(ServiceModel.id == service_id).first()
    if not s:
        raise HTTPException(404, "Service not found")

    if title             is not None: s.title             = title.strip(); s.slug = unique_slug(db, title, service_id)
    if description       is not None: s.description       = description.strip()
    if short_description is not None: s.short_description = short_description
    if icon              is not None: s.icon              = icon
    if features          is not None: s.features          = parse_features(features)
    if price_range       is not None: s.price_range       = price_range
    if color_theme       is not None: s.color_theme       = color_theme
    if order_index       is not None: s.order_index       = order_index
    if is_active         is not None: s.is_active         = is_active
    if is_featured       is not None: s.is_featured       = is_featured

    if image and image.filename:
        remove_image(s.photo_url)
        s.photo_url = save_image(image)

    s.updated_at = datetime.utcnow()
    db.commit(); db.refresh(s)
    return {"message": "Service updated successfully", "service": to_dict(s)}


@app.delete("/api/services/{service_id}", tags=["Services"])
def delete_service(service_id: int, db: Session = Depends(get_db)):
    """Delete a service and its image file."""
    s = db.query(ServiceModel).filter(ServiceModel.id == service_id).first()
    if not s:
        raise HTTPException(404, "Service not found")
    remove_image(s.photo_url)
    db.delete(s); db.commit()
    return {"message": f"Service '{s.title}' deleted"}


# ═══════════════════════════════════════════════════════════════════════════════
# STATIC DATA  (Team / Testimonials / Stats)
# ═══════════════════════════════════════════════════════════════════════════════

TEAM = [
    {"id":1,"avatar":"MA","name":"Mumtaz Ali","role":"Founder & Full-Stack Engineer",
     "bio":"Django & FastAPI expert with 5+ years building scalable SaaS platforms.",
     "skills":["Python","FastAPI","Django","React","AWS","PostgreSQL","LangChain"],
     "linkedin":"https://linkedin.com/in/nexttech-sol","github":"https://github.com/engrmumtazali0112"},
    {"id":2,"avatar":"AI","name":"AI Engineer","role":"Machine Learning Engineer",
     "bio":"Specialized in LLM fine-tuning, RAG pipelines, and computer vision.",
     "skills":["OpenAI","LangChain","TensorFlow","HuggingFace","Pinecone","Python"],
     "linkedin":"https://linkedin.com/in/nexttech-sol","github":"https://github.com/engrmumtazali0112"},
    {"id":3,"avatar":"FE","name":"Frontend Lead","role":"React & UI/UX Engineer",
     "bio":"Crafting pixel-perfect interfaces with React and Next.js.",
     "skills":["React","Next.js","TypeScript","Tailwind","Framer Motion"],
     "linkedin":"https://linkedin.com/in/nexttech-sol","github":"https://github.com/engrmumtazali0112"},
    {"id":4,"avatar":"DO","name":"DevOps Engineer","role":"Cloud & Infrastructure Lead",
     "bio":"AWS-certified, focused on Docker, Kubernetes, and zero-downtime deploys.",
     "skills":["AWS","GCP","Docker","Kubernetes","Terraform","GitHub Actions"],
     "linkedin":"https://linkedin.com/in/nexttech-sol","github":"https://github.com/engrmumtazali0112"},
]

TESTIMONIALS = [
    {"id":1,"avatar":"JD","name":"James Davis","role":"CTO","company":"TechFlow Inc.","rating":5,
     "text":"Next Tech automated our data pipeline. ROI was visible in week one."},
    {"id":2,"avatar":"SK","name":"Sarah Kim","role":"Founder","company":"LaunchPad SaaS","rating":5,
     "text":"Built our SaaS MVP in 6 weeks — clean code, great architecture. We raised our seed round after."},
    {"id":3,"avatar":"RM","name":"Raza Malik","role":"Product Manager","company":"FinEdge Solutions","rating":5,
     "text":"The AI chatbot handles 80% of our queries. Incredible quality and on-time delivery."},
    {"id":4,"avatar":"AL","name":"Amanda Lee","role":"CEO","company":"EduTech Global","rating":5,
     "text":"Scaled from 100 to 10,000 users without a single outage. Truly 10/10."},
    {"id":5,"avatar":"TH","name":"Thomas Hughes","role":"Eng. Lead","company":"ShipFast Logistics","rating":5,
     "text":"React Native app has a 4.9★ App Store rating. We keep working with them."},
    {"id":6,"avatar":"FO","name":"Fatima Omar","role":"Co-Founder","company":"MedAI Labs","rating":5,
     "text":"World-class LLM fine-tuning. They understood our compliance requirements perfectly."},
]

STATS = {"projects_completed":85,"happy_clients":60,"years_experience":5,"technologies":30}


@app.get("/api/team",         tags=["Static Data"]) 
def get_team():         return {"team": TEAM}

@app.get("/api/testimonials", tags=["Static Data"]) 
def get_testimonials(): return {"testimonials": TESTIMONIALS}

@app.get("/api/stats",        tags=["Static Data"]) 
def get_stats():        return STATS

@app.get("/",  tags=["Health"]) 
def root():    return {"message": "Next Tech Solutions API v2", "status": "running", "docs": "/docs"}

@app.get("/health", tags=["Health"]) 
def health():  return {"status": "healthy"}


# ═══════════════════════════════════════════════════════════════════════════════
# CONTACT FORM
# ═══════════════════════════════════════════════════════════════════════════════

class ContactForm(BaseModel):
    name:    str
    email:   str
    phone:   Optional[str] = ""
    company: Optional[str] = ""
    service: Optional[str] = ""
    subject: Optional[str] = ""
    message: str


def send_email(subject: str, html: str, plain: str) -> bool:
    if not SMTP_PASSWORD or "PASTE" in SMTP_PASSWORD:
        print("⚠️  SMTP_PASSWORD not set — email skipped.")
        return False
    try:
        from email.mime.multipart import MIMEMultipart
        from email.mime.text      import MIMEText
        msg             = MIMEMultipart("alternative")
        msg["Subject"]  = subject
        msg["From"]     = f"Next Tech Solutions <{EMAIL_FROM}>"
        msg["To"]       = EMAIL_TO
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(html,  "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as srv:
            srv.ehlo(); srv.starttls()
            srv.login(SMTP_USERNAME, SMTP_PASSWORD)
            srv.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())
        print(f"✅  Email sent to {EMAIL_TO}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("❌  SMTP auth failed — check Gmail App Password in .env")
        return False
    except Exception as e:
        print(f"❌  Email error: {e}")
        return False


@app.post("/api/contact", tags=["Contact"])
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
    send_email(f"[Next Tech] New message from {form.name} — {form.subject or 'Contact Form'}", html, plain)
    return {"success": True, "message": f"Thanks {form.name}! We'll get back to you within 24 hours."}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)