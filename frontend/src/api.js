/**
 * src/api.js
 *
 * Centralised data layer for Next Tech Solutions.
 *
 * In development / production these functions try to fetch from the
 * Vite-proxied backend (/api/*).  If the backend is unavailable they
 * fall back to the inline data below so the UI always renders.
 *
 * To switch to live API calls only, remove the catch-fallbacks.
 */

import axios from 'axios'

const api = axios.create({ baseURL: '/' })

/* ─── Inline fallback data ──────────────────────────────────────── */

const SERVICES_DATA = [
  {
    id: 1,
    icon: '🤖',
    title: 'AI & ML Solutions',
    description:
      'Custom LLM integrations, RAG systems, computer vision, and intelligent automation pipelines that transform your business workflows.',
    features: ['LLM Fine-tuning', 'RAG Systems', 'Computer Vision', 'AI Chatbots', 'ML Pipelines'],
  },
  {
    id: 2,
    icon: '⚡',
    title: 'SaaS Development',
    description:
      'Full-cycle SaaS platforms with multi-tenant architecture, subscription billing, analytics dashboards, and scalable cloud infrastructure.',
    features: ['Multi-tenant Architecture', 'Stripe Integration', 'Admin Dashboards', 'User Auth', 'Analytics'],
  },
  {
    id: 3,
    icon: '🌐',
    title: 'Web Development',
    description:
      'Pixel-perfect, high-performance web applications using React, Next.js, and modern frontend tooling with exceptional UX.',
    features: ['React / Next.js', 'TypeScript', 'Responsive Design', 'SEO Optimized', 'Performance First'],
  },
  {
    id: 4,
    icon: '📱',
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps with React Native & Expo — one codebase for iOS and Android with native performance.',
    features: ['React Native', 'Expo', 'Push Notifications', 'Offline Support', 'App Store Deploy'],
  },
  {
    id: 5,
    icon: '☁️',
    title: 'Cloud & DevOps',
    description:
      'AWS & GCP infrastructure setup, Docker containerization, Kubernetes orchestration, and fully automated CI/CD pipelines.',
    features: ['AWS / GCP', 'Docker & K8s', 'CI/CD Pipelines', 'Auto Scaling', 'Cost Optimization'],
  },
  {
    id: 6,
    icon: '🗄️',
    title: 'Database Design',
    description:
      'Scalable database architecture, query optimization, migrations, and real-time data solutions for high-traffic applications.',
    features: ['PostgreSQL / MySQL', 'Redis Caching', 'Schema Design', 'Query Optimization', 'Migrations'],
  },
]

const STATS_DATA = {
  projects_completed: 85,
  happy_clients: 60,
  years_experience: 5,
  technologies: 30,
}

const TESTIMONIALS_DATA = [
  {
    id: 1,
    avatar: 'JD',
    name: 'James Davis',
    role: 'CTO',
    company: 'TechFlow Inc.',
    rating: 5,
    text: 'Next Tech automated our entire data pipeline. What used to take 3 days now runs in minutes. The ROI was visible in week one — we renewed immediately.',
  },
  {
    id: 2,
    avatar: 'SK',
    name: 'Sarah Kim',
    role: 'Founder',
    company: 'LaunchPad SaaS',
    rating: 5,
    text: 'They built our entire SaaS MVP in 6 weeks — clean code, great architecture, and they genuinely cared about our product. We raised our seed round shortly after.',
  },
  {
    id: 3,
    avatar: 'RM',
    name: 'Raza Malik',
    role: 'Product Manager',
    company: 'FinEdge Solutions',
    rating: 5,
    text: 'The AI chatbot they built handles 80% of our customer queries automatically. Incredible quality, on-time delivery, and the documentation was outstanding.',
  },
  {
    id: 4,
    avatar: 'AL',
    name: 'Amanda Lee',
    role: 'CEO',
    company: 'EduTech Global',
    rating: 5,
    text: 'Professional, communicative, and technically excellent. Our platform scaled from 100 to 10,000 users without a single outage. Truly a 10/10 experience.',
  },
  {
    id: 5,
    avatar: 'TH',
    name: 'Thomas Hughes',
    role: 'Engineering Lead',
    company: 'ShipFast Logistics',
    rating: 5,
    text: 'The React Native app they delivered is beautiful and performant. Our driver app has a 4.9★ App Store rating. We continue to work with them for new features.',
  },
  {
    id: 6,
    avatar: 'FO',
    name: 'Fatima Omar',
    role: 'Co-Founder',
    company: 'MedAI Labs',
    rating: 5,
    text: 'The LLM fine-tuning work they did on our medical dataset was world-class. They understood our compliance requirements and delivered exactly what we needed.',
  },
]

const TEAM_DATA = [
  {
    id: 1,
    avatar: 'MA',
    name: 'Mumtaz Ali',
    role: 'Founder & Full-Stack Engineer',
    bio: 'Django & FastAPI expert with 5+ years building scalable SaaS platforms. Passionate about AI integration and clean architecture that stands the test of time.',
    skills: ['Python', 'FastAPI', 'Django', 'React', 'AWS', 'PostgreSQL', 'LangChain'],
    linkedin: 'https://linkedin.com/in/nexttech-sol',
    github: 'https://github.com/engrmumtazali0112',
  },
  {
    id: 2,
    avatar: 'AI',
    name: 'AI Engineer',
    role: 'Machine Learning Engineer',
    bio: 'Specialized in LLM fine-tuning, RAG pipelines, and computer vision systems. Turning state-of-the-art research into production-ready AI products.',
    skills: ['OpenAI', 'LangChain', 'TensorFlow', 'HuggingFace', 'Pinecone', 'Python', 'FastAPI'],
    linkedin: 'https://linkedin.com/in/nexttech-sol',
    github: 'https://github.com/engrmumtazali0112',
  },
  {
    id: 3,
    avatar: 'FE',
    name: 'Frontend Lead',
    role: 'React & UI/UX Engineer',
    bio: 'Crafting pixel-perfect, blazing-fast interfaces with React and Next.js. Obsessed with micro-animations, accessibility, and developer experience.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite', 'CSS'],
    linkedin: 'https://linkedin.com/in/nexttech-sol',
    github: 'https://github.com/engrmumtazali0112',
  },
  {
    id: 4,
    avatar: 'DO',
    name: 'DevOps Engineer',
    role: 'Cloud & Infrastructure Lead',
    bio: 'AWS-certified engineer who lives and breathes Docker, Kubernetes, and zero-downtime deployments. Keeping production stable at any scale.',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
    linkedin: 'https://linkedin.com/in/nexttech-sol',
    github: 'https://github.com/engrmumtazali0112',
  },
]

/* ─── Exported API functions ─────────────────────────────────────── */

/** Fetch all services — falls back to inline data if backend is down */
export async function getServices() {
  try {
    const res = await api.get('/api/services')
    return res
  } catch {
    return { data: { services: SERVICES_DATA } }
  }
}

/** Fetch site-wide stats — falls back to inline data if backend is down */
export async function getStats() {
  try {
    const res = await api.get('/api/stats')
    return res
  } catch {
    return { data: STATS_DATA }
  }
}

/** Fetch testimonials — falls back to inline data if backend is down */
export async function getTestimonials() {
  try {
    const res = await api.get('/api/testimonials')
    return res
  } catch {
    return { data: { testimonials: TESTIMONIALS_DATA } }
  }
}

/** Fetch team members — falls back to inline data if backend is down */
export async function getTeam() {
  try {
    const res = await api.get('/api/team')
    return res
  } catch {
    return { data: { team: TEAM_DATA } }
  }
}

/** Submit contact form */
export async function submitContact(formData) {
  return api.post('/api/contact', formData)
}

export default api