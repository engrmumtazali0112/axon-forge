/**
 * Project data — portfolio grid. Images imported at build time.
 */
import tbbHome   from '../assets/projects/tbb-home.webp'
import axonHero  from '../assets/projects/axon-forge-1-hero.png'
import sufrahHero from '../assets/projects/sufrah-1-hero.png'
import complaintHero from '../assets/projects/student-complaint-1-hero.png'
import luxeHero  from '../assets/projects/luxe-hero.webp'
import hostelHero from '../assets/projects/hostel-hero.webp'
import fingerprintHero from '../assets/projects/fingerprint-attendance-1-hero.png'
import financeHero from '../assets/projects/financeai-1-hero.png'
import aiVisHero from '../assets/projects/ai-visibility-1-hero.png'

export const PROJECTS = [
  {
    slug: 'true-blue-bio',
    title: 'True Blue Bio — Lab Supplies Store',
    excerpt: 'A B2B lab supplies store with account pricing, bulk quotes, Stripe + Net-30 checkout, and an operations admin.',
    cover: tbbHome,
    categories: ['web', 'saas'],
    industry: 'B2B SaaS',
    year: '2026',
    duration: '10 Months',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Microsoft Teams'],
    live: 'https://truebluebio.com',
    source: 'https://github.com/engrmumtazali0112/true-blue-bio',
    featured: true,
  },
  {
    slug: 'axon-forge',
    title: 'Axon Forge — Agency Platform',
    excerpt: 'A remote-first agency site with services, portfolio, blog and a quote workflow, on FastAPI + React.',
    cover: axonHero,
    categories: ['web'],
    industry: 'Agency',
    year: '2026',
    duration: '8 Months',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind', 'Vite', 'Docker'],
    live: 'https://axon-forge.vercel.app',
    source: 'https://github.com/engrmumtazali0112/next-tech-solutions',
  },
  {
    slug: 'sufrah',
    title: 'Sufrah — Subscription Manager Pro',
    excerpt: 'A 9-app restaurant and meal-subscription platform serving Islamabad & Rawalpindi — from kitchen to rider.',
    cover: sufrahHero,
    categories: ['web', 'mobile'],
    industry: 'Restaurant SaaS',
    year: '2026',
    duration: '7 Months',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Expo'],
    live: 'https://workspacesufras-production.up.railway.app',
    source: 'https://github.com/engrmumtazali0112/sufrah',
  },
  {
    slug: 'student-complaint-system',
    title: 'Student Complaint Management System',
    excerpt: 'Multi-portal university complaints with status tracking, escalation and 5-star admin ratings.',
    cover: complaintHero,
    categories: ['web', 'mobile'],
    industry: 'University',
    year: '2025',
    duration: '6 Months',
    stack: ['Flutter', 'Django', 'PostgreSQL', 'DRF'],
    source: 'https://github.com/engrmumtazali0112/Student-Complaint-Management-System',
  },
  {
    slug: 'luxe-jewelry-store',
    title: 'Luxe Jewelry — E-Commerce',
    excerpt: 'A full e-commerce flow for fine jewelry: collections, product gallery, cart, checkout and admin.',
    cover: luxeHero,
    categories: ['web'],
    industry: 'E-Commerce',
    year: '2024',
    duration: '6 Months',
    stack: ['Django', 'PostgreSQL', 'Bootstrap', 'Stripe'],
    live: 'https://luxejewelrydesign.store',
    source: 'https://github.com/engrmumtazali0112/Jewelry-Shop---Django-E-commerce',
  },
  {
    slug: 'university-administration-system',
    title: 'University Administration System',
    excerpt: 'Role-based hostel, fees, mess, visitors, complaints and biometric attendance in one system.',
    cover: hostelHero,
    categories: ['web', 'mobile'],
    industry: 'University',
    year: '2025',
    duration: '12 Months',
    stack: ['Django', 'Bootstrap', 'PostgreSQL', 'Stripe', 'Biometric API'],
    source: 'https://github.com/engrmumtazali0112/SmartHostelManagmentSystem_FYP',
  },
  {
    slug: 'fingerprint-attendance-system',
    title: 'Fingerprint Attendance System',
    excerpt: 'Biometric attendance with multi-finger enrollment, per-meal check-in and CSV reporting.',
    cover: fingerprintHero,
    categories: ['web', 'mobile'],
    industry: 'Biometric',
    year: '2025',
    duration: '2 Months',
    stack: ['Django', 'SQLite', 'Bootstrap 5', 'Digital Persona SDK'],
    source: 'https://github.com/engrmumtazali0112/fingerprint_attendance_system',
  },
  {
    slug: 'financeai',
    title: 'FinanceAI — Personal Finance Assistant',
    excerpt: 'AI-driven finance companion with natural-language Q&A, receipt OCR and cost-optimised model routing.',
    cover: financeHero,
    categories: ['web', 'ai-ml'],
    industry: 'AI · Fintech',
    year: '2025',
    duration: '3 Months',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Claude API', 'Recharts'],
    source: 'https://github.com/engrmumtazali0112/finance-assistant',
  },
  {
    slug: 'ai-visibility',
    title: 'AI Visibility & Search Intelligence',
    excerpt: 'Track whether your brand appears when buyers ask ChatGPT, Claude or Perplexity.',
    cover: aiVisHero,
    categories: ['web', 'ai-ml', 'data'],
    industry: 'AI SaaS',
    year: '2025',
    duration: '3 Months',
    stack: ['Flask', 'React', 'Claude API', 'PostgreSQL', 'Vite'],
    source: 'https://github.com/engrmumtazali0112/AI-Visibility-Search-Intelligence-Platform',
  },
]

export const INDUSTRIES = [
  { id: 'all',    label: 'All projects' },
  { id: 'web',    label: 'Web apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai-ml',  label: 'AI / ML' },
  { id: 'data',   label: 'Data' },
  { id: 'saas',   label: 'SaaS' },
]
