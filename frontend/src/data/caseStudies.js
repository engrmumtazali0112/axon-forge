/**
 * Detailed case-study content — keyed by slug.
 * Matches PROJECTS in projects.js. Add more as you write them.
 */
import tbbHome from '../assets/projects/tbb-home.webp'
import tbbProduct from '../assets/projects/tbb-product.webp'
import tbbAdmin from '../assets/projects/tbb-admin.webp'
import axonHero from '../assets/projects/axon-forge-1-hero.png'
import axonLaptop from '../assets/projects/axon-forge-2-laptop.png'
import axonTablet from '../assets/projects/axon-forge-3-tablet.png'
import axonMobile from '../assets/projects/axon-forge-4-mobile.png'
import sufrahHero from '../assets/projects/sufrah-1-hero.png'
import sufrahLaptop from '../assets/projects/sufrah-2-laptop.png'
import sufrahTablet from '../assets/projects/sufrah-3-ipad.png'
import sufrahMobile from '../assets/projects/sufrah-4-iphone.png'
import financeHero from '../assets/projects/financeai-1-hero.png'
import financeLaptop from '../assets/projects/financeai-2-laptop.png'
import financeTablet from '../assets/projects/financeai-3-ipad.png'
import financeMobile from '../assets/projects/financeai-4-iphone.png'
import aiVisHero from '../assets/projects/ai-visibility-1-hero.png'
import aiVisLaptop from '../assets/projects/ai-visibility-2-laptop.png'
import aiVisTablet from '../assets/projects/ai-visibility-3-ipad.png'
import aiVisMobile from '../assets/projects/ai-visibility-4-iphone.png'
import fingerprintHero from '../assets/projects/fingerprint-attendance-1-hero.png'
import fingerprintLaptop from '../assets/projects/fingerprint-attendance-2-laptop.png'
import fingerprintTablet from '../assets/projects/fingerprint-attendance-3-ipad.png'
import fingerprintMobile from '../assets/projects/fingerprint-attendance-4-iphone.png'
import complaintHero from '../assets/projects/student-complaint-1-hero.png'
import complaintLaptop from '../assets/projects/student-complaint-2-laptop.png'
import complaintTablet from '../assets/projects/student-complaint-3-tablet.png'
import complaintMobile from '../assets/projects/student-complaint-4-mobile.png'
import hostelHero from '../assets/projects/hostel-hero.webp'
import hostelDashboard from '../assets/projects/hostel-dashboard.webp'
import hostelPayment from '../assets/projects/hostel-payment.webp'
import hostelAttendance from '../assets/projects/hostel-attendance.webp'
import luxeHero from '../assets/projects/luxe-hero.webp'
import luxeProduct from '../assets/projects/luxe-product.webp'
import luxeAdmin from '../assets/projects/luxe-admin.webp'

const caseStudies = {
  'true-blue-bio': {
    category: 'Full-Stack · B2B SaaS',
    year: '2026',
    duration: '10 Months',
    hero: tbbHome,
    overviewImg: tbbAdmin,
    overviewText:
      'True Blue Bio sells consumables, reagents and PPE to labs and clinics. Approved accounts see their own pricing and can pay by card or on Net-30 invoice, while large orders go through a bulk quote request instead of the cart.',
    flow: [
      'Browse the catalog or search by part number',
      'Add to cart, or request a bulk quote',
      'Check out with Stripe or Net-30 invoice',
      'Track orders and invoices in the account area',
      'Staff manage products, pricing, vendors and work orders in admin',
    ],
    modules: [
      { name: 'Homepage', text: 'Search-first hero, category shortcuts with item counts, featured products and a trust strip.', img: tbbHome },
      { name: 'Catalog and product page', text: 'Filterable catalog, SKU, stock level, size variants, account-specific price next to list price.', img: tbbProduct },
      { name: 'Cart, checkout and quote', text: 'Cart with quantity changes, checkout with card or invoice, and a quote form for bulk orders.' },
      { name: 'Customer account', text: 'Order history, invoices, saved addresses and quote status.' },
      { name: 'Admin dashboard', text: 'Revenue and orders trend, category mix, outstanding invoices, pending approvals.', img: tbbAdmin },
    ],
  },

  'axon-forge': {
    category: 'Agency Platform',
    year: '2026',
    duration: '8 Months',
    hero: axonHero,
    overviewImg: axonLaptop,
    overviewText:
      'Axon Forge presents a remote-first development agency: services, portfolio, expertise, team and a blog, with a clear Get a quote path. A FastAPI backend serves the content and handles quote and contact requests.',
    flow: [
      'Visitor lands on the homepage and sees live projects',
      'Browses services, expertise and the portfolio',
      'Reads blog articles filtered by category',
      'Checks the team and testimonials',
      'Sends a quote request or books a free consultation',
    ],
    modules: [
      { name: 'Homepage and portfolio', text: 'Product-first hero, featured case study cards with stack pills and full case studies.', img: axonLaptop },
      { name: 'Services', text: 'Six service cards covering web apps, AI/ML, mobile, cloud and DevOps.', img: axonTablet },
      { name: 'Blog', text: 'Category tabs, search, and article cards with date and read time.', img: axonMobile },
      { name: 'About and contact', text: 'Company story, stats, core values and a quote form.' },
    ],
  },

  'sufrah': {
    category: 'Restaurant SaaS',
    year: '2026',
    duration: '7 Months',
    hero: sufrahHero,
    overviewImg: sufrahLaptop,
    overviewText:
      'Sufrah runs a rooftop restaurant, café and meal-subscription business end-to-end. Nine integrated apps share one backend: public website, customer portal, admin workspace, floor app, cashier, kitchen display, rider app, sales portal and manager portal.',
    flow: [
      'Guest browses the public site, picks a meal plan or dish',
      'Order sent to the kitchen display — New → Cooking → Ready',
      'Rider app shows the box with a signed-off confirmation',
      'Rider sets an ETA and delivers with photo proof',
      'Customer rates the delivery; ratings feed Driver Performance',
      'Manager approves subscriptions and reviews the audit log',
    ],
    modules: [
      { name: 'Public website & menu', text: 'Restaurant, café, catering, meal plans, weekly menu, events and takeaway cart.', img: sufrahHero },
      { name: 'Kitchen display', text: 'Live Tickets kanban with New / Cooking / Ready / Late lanes.', img: sufrahLaptop },
      { name: 'Restaurant floor app', text: 'Table plan with statuses and dine-in / takeaway / delivery flows.', img: sufrahTablet },
      { name: 'Rider app', text: "Today's runs, live ETA, kitchen sign-off, photo-proof delivery.", img: sufrahMobile },
      { name: 'Customer portal', text: 'My Plan, Meal Schedule, Deliveries with live tracking, Payments and Profile.' },
      { name: 'Admin workspace', text: 'Dashboard, site content, restaurant orders, menu & stock, subscriptions, deliveries, payments, CRM leads, invoices, reports.' },
    ],
  },

  'financeai': {
    category: 'AI · Fintech',
    year: '2025',
    duration: '3 Months',
    hero: financeHero,
    overviewImg: financeLaptop,
    overviewText:
      'FinanceAI lets users talk to their money. Ask natural-language questions over your spending data, upload receipts for automatic OCR and categorisation, set budgets, detect anomalies and get cut-back suggestions — with strict per-user isolation via Supabase RLS.',
    flow: [
      'User signs in with Clerk and gets isolated DB access',
      'Imports transactions via CSV or uploads a receipt',
      'Asks questions in natural language or picks a suggested chip',
      'Intent router classifies: simple_query → Haiku, receipt/lookup → Sonnet',
      'Pre-computed monthly aggregates feed a compact LLM context (~1,500 tokens)',
      'Response renders with charts, alerts and inline action chips',
    ],
    modules: [
      { name: 'Overview dashboard', text: 'Balance card, spending donut, recent transactions, ask-assistant prompt.', img: financeHero },
      { name: 'AI assistant', text: 'Chat UI with suggested questions, receipt upload, streaming-ready answers.', img: financeLaptop },
      { name: 'Transaction list', text: 'Paginated, colour-coded by category, with CSV import and deduplication.', img: financeMobile },
      { name: 'Budgets', text: 'Set via chat or UI. Progress bars turn red when over budget.', img: financeTablet },
      { name: 'Trends', text: 'Stacked bar chart by category across 12 months.' },
      { name: 'Anomalies & subscriptions', text: 'Z-score anomaly detection vs 12-month history, plus recurring-payment matching.' },
    ],
  },

  'ai-visibility': {
    category: 'AI SaaS Platform',
    year: '2025',
    duration: '3 Months',
    hero: aiVisHero,
    overviewImg: aiVisLaptop,
    overviewText:
      'AI Visibility & Search Intelligence answers a modern marketing question: does your brand show up when buyers ask an AI search engine? Register a business profile, discover relevant queries, run a 3-agent Claude pipeline, and track AI mentions, search volume, impressions and share-of-voice over time.',
    flow: [
      'Register a business with domain, industry and competitors',
      'Pipeline discovers the queries buyers actually ask AI engines',
      '3-agent Claude pipeline scores visibility + opportunity per query',
      'Dashboard shows mentions, volume, impressions, SOV and top sources',
      'Content recommendations flag the biggest gaps to close next',
    ],
    modules: [
      { name: 'Dashboard', text: 'Cards for each business profile with query count and pipeline status.', img: aiVisHero },
      { name: 'Register profile', text: 'Form for business name, domain, industry, description, competitors.', img: aiVisTablet },
      { name: 'Profile detail', text: 'Metrics grid and AI Visibility Score with week-over-week delta.', img: aiVisMobile },
      { name: 'Recent mentions', text: 'Filterable table of every tracked query with platform and SOV.', img: aiVisLaptop },
      { name: 'Top opportunities', text: 'Horizontal bar chart ranking queries by opportunity score.' },
      { name: 'Volume vs difficulty', text: 'Scatter plot — top-left quadrant is the best targets.' },
    ],
  },

  'fingerprint-attendance-system': {
    category: 'Biometric · University',
    year: '2025',
    duration: '2 Months',
    hero: fingerprintHero,
    overviewImg: fingerprintLaptop,
    overviewText:
      'Fingerprint Attendance System replaces manual roll-calls with biometric identification. Students register up to 10 fingerprints; the system records attendance per meal, prevents duplicate entries, and exposes a full admin panel with CSV export and print-ready reports.',
    flow: [
      'Admin registers a new student with roll number and department',
      'Student places finger on the scanner to enroll up to 10 fingerprints',
      'System stores the encrypted template against the student record',
      'During meals, the student scans a finger to check in',
      'Attendance recorded with a live timestamp — duplicates auto-rejected',
      'Admin views the dashboard, filters by date/department/meal, exports CSV',
    ],
    modules: [
      { name: 'Student directory', text: 'Searchable list with roll number, department, year, fingerprint count.', img: fingerprintLaptop },
      { name: 'Fingerprint registration', text: 'Multi-finger enrollment flow with live scanning UI.', img: fingerprintTablet },
      { name: 'Live attendance scanning', text: 'Scanner-ready screen with real-time clock and meal selector.', img: fingerprintMobile },
      { name: 'Student profile', text: 'Complete student record: personal info, fingerprints, recent attendance.' },
      { name: 'Attendance reports', text: 'Date-range filters, department/meal filters, CSV export and print layouts.' },
      { name: 'Admin dashboard', text: 'Live statistics and quick actions.' },
    ],
  },

  'student-complaint-system': {
    category: 'University Platform',
    year: '2025',
    duration: '6 Months',
    hero: complaintHero,
    overviewImg: complaintLaptop,
    overviewText:
      'Students file complaints to the right department, admins resolve or reject them, and a super admin watches department stats, escalations and admin ratings. Students rate each resolution out of five stars.',
    flow: [
      'Student submits a complaint to a department',
      'Admin reviews it and resolves or rejects with a reason',
      'Student tracks status in real time',
      'Student rates the admin on a resolved complaint',
      'Super admin reviews escalations, departments and ratings',
    ],
    modules: [
      { name: 'Admin portal', text: 'Totals for pending, resolved and rejected with search and actions.', img: complaintLaptop },
      { name: 'Student portal', text: 'Profile with live stats and a submit form.', img: complaintTablet },
      { name: 'Resolved and rating', text: 'Resolved complaints with dates and 5-star rating flow.', img: complaintMobile },
      { name: 'Super admin dashboard', text: 'Department charts, escalated complaints and Admin Ratings.' },
    ],
  },

  'university-administration-system': {
    category: 'University Platform',
    year: '2025',
    duration: '12 Months',
    hero: hostelHero,
    overviewImg: hostelDashboard,
    overviewText:
      'SmartHostel replaces paper registers for hostel staff and students. Admins allocate rooms and track fees, while students pay on their phone, file complaints and check attendance.',
    flow: [
      'Admin registers a student and allocates a room',
      'Student sees the room, mess balance and pending fees',
      'Student pays the hostel fee by card, bank or cash',
      'Complaints are filed, prioritised and resolved',
      'Fingerprint scans feed the daily attendance grid',
    ],
    modules: [
      { name: 'Admin dashboard', text: 'Total students, rooms occupied, pending fees, open complaints.', img: hostelDashboard },
      { name: 'Hostels and rooms', text: 'Block-wise room grid with occupied, available and maintenance states.' },
      { name: 'Fee payment', text: 'Mobile payment screen with card, bank or cash options.', img: hostelPayment },
      { name: 'Mess and visitors', text: 'Weekly menu, mess balance and visitor booking.' },
      { name: 'Complaints', text: 'Category, priority and status tracking from open to resolved.' },
      { name: 'Biometric attendance', text: 'Per-student monthly grid fed by fingerprint devices.', img: hostelAttendance },
    ],
  },

  'luxe-jewelry-store': {
    category: 'E-Commerce',
    year: '2024',
    duration: '6 Months',
    hero: luxeHero,
    overviewImg: luxeProduct,
    overviewText:
      'Luxe Jewelry covers the whole buying journey: a branded homepage, filterable collections, a detailed product page, a cart, a three-step checkout and an order confirmation, with a separate admin for the shop owner.',
    flow: [
      'Land on the homepage and open a collection',
      'Filter by category, metal, price and size, then sort',
      'Pick a ring size and add to cart or wishlist',
      'Update the cart, then check out: shipping, delivery, payment',
      'Receive an order confirmation and track the order',
    ],
    modules: [
      { name: 'Homepage', text: 'Hero banner, best sellers and new arrivals, trust badges.' },
      { name: 'Collection page', text: 'Product grid with category, metal, price and size filters.' },
      { name: 'Product detail', text: 'Image gallery, ratings, size selector, stock status.', img: luxeProduct },
      { name: 'Cart and checkout', text: 'Cart drawer with promo code, then shipping, delivery and payment.' },
      { name: 'Admin panel', text: 'Sales, orders, stock and customer stats with low-stock alerts.', img: luxeAdmin },
    ],
  },
}

export default caseStudies
