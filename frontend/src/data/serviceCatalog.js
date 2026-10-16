// src/data/serviceCatalog.js
// Single source of truth for the Services mega menu AND the Services page.
// Each item `id` is used as the page anchor:  /services#web-development

export const CATEGORIES = [
  {
    key: 'design',
    menuTitle: 'Design',
    pageTitle: 'Design',
    blurb: 'Create experiences that feel intuitive and convert users into customers.',
    color: '#7C5CD6',
    items: [
      { id: 'ads-design',              title: 'Ads Design',                 desc: 'High-impact ad creatives built to convert across digital platforms.' },
      { id: 'graphic-design',          title: 'Graphic Design',             desc: 'Visuals that communicate your brand story and leave a lasting impression.' },
      { id: 'ui-ux-design',            title: 'UI/UX Design',               desc: 'Seamless, user-friendly interfaces that improve satisfaction and retention.' },
      { id: 'social-media-design',     title: 'Social Media Design',        desc: 'Scroll-stopping visuals that boost engagement and brand visibility.' },
      { id: 'web-design',              title: 'Web Design',                 desc: 'Responsive, modern websites that look sharp on every screen.' },
      { id: 'wireframing-prototyping', title: 'Wireframing & Prototyping',  desc: 'Clickable prototypes that validate ideas before development starts.' },
    ],
  },
  {
    key: 'development',
    menuTitle: 'Development',
    pageTitle: 'Development',
    blurb: 'Build reliable, scalable digital products using modern technologies.',
    color: '#2E9BD6',
    items: [
      { id: 'web-development',           title: 'Web Development',              desc: 'Responsive, high-performing websites tailored to your business needs.' },
      { id: 'mobile-app-development',    title: 'Mobile App Development',       desc: 'Intuitive apps for iOS and Android that engage and retain users.' },
      { id: 'saas-development',          title: 'SaaS Development',             desc: 'Scalable, cloud-ready software products from idea to launch.' },
      { id: 'cms-crm-erp',               title: 'CMS, CRM & ERP Solutions',     desc: 'Custom systems that run your content, customers and operations in one place.' },
      { id: 'ecommerce-solutions',       title: 'E-Commerce Solutions',         desc: 'Online stores with secure payments, inventory and order management.' },
      { id: 'maintenance-services',      title: 'Maintenance Services',         desc: 'Updates, monitoring and fixes so your software stays fast and secure.' },
      { id: 'ai-data-science',           title: 'AI & Data Science',            desc: 'Leverage AI/ML to automate processes, predict trends and improve decisions.' },
      { id: 'domain-registration',       title: 'Domain Registration',          desc: 'Find, register and manage the right domain for your brand.' },
      { id: 'hosting-server-management', title: 'Hosting / Server Management',  desc: 'Reliable hosting, deployment and server care with proactive monitoring.' },
    ],
  },
  {
    key: 'marketing',
    menuTitle: 'Marketing',
    pageTitle: 'Marketing & Growth',
    blurb: 'Drive visibility, adoption, and measurable results.',
    color: '#F5A623',
    items: [
      { id: 'seo-aso',                 title: 'SEO & ASO',               desc: 'Improve search and app-store rankings to attract targeted traffic.' },
      { id: 'paid-advertisement',      title: 'Paid Advertisement',      desc: 'Targeted campaigns on Google, Meta and other platforms for fast results.' },
      { id: 'smm',                     title: 'SMM',                     desc: 'Plan, schedule and manage posts to keep a consistent brand presence.' },
      { id: 'content-marketing',       title: 'Content Marketing',       desc: 'Valuable content that educates, engages and converts your audience.' },
      { id: 'social-media-marketing',  title: 'Social Media Marketing',  desc: 'Campaigns that grow your audience and turn followers into customers.' },
      { id: 'lead-generation',         title: 'Leads Generation',        desc: 'Systems that bring qualified prospects straight to your sales team.' },
    ],
  },
]

// Order used on the Services page (menu uses CATEGORIES order)
export const PAGE_ORDER = ['development', 'marketing', 'design']
export const PAGE_CATEGORIES = PAGE_ORDER.map((k) => CATEGORIES.find((c) => c.key === k))

export const STATS = [
  { value: '100+', label: 'Projects completed' },
  { value: '40+',  label: 'Happy clients' },
  { value: '5+',   label: 'Years experience' },
  { value: '20+',  label: 'Team members' },
]

const ALL_FOUR = ['Mobile App Development', 'SaaS Development', 'Web Development', 'AI & Data Science']
export const MARKETS = [
  { country: 'United Arab Emirates', region: 'Middle East',   city: 'Dubai',     text: "Only one hour apart from Pakistan, with strong demand for digital transformation across industries.", services: ALL_FOUR },
  { country: 'United Kingdom',       region: 'Europe',        city: 'London',    text: "Europe's biggest fintech and SaaS market, with a workable daily timezone overlap.", services: ALL_FOUR },
  { country: 'United States',        region: 'North America', city: 'New York',  text: "A deep pool of funded startups and enterprise software buyers, served with early-morning overlap.", services: ALL_FOUR },
  { country: 'Singapore',            region: 'APAC',          city: 'Singapore', text: "A regulation-friendly hub where fintech and product teams move fast.", services: ALL_FOUR },
  { country: 'Australia',            region: 'Oceania',       city: 'Sydney',    text: "A strong tech market where remote engineering partners help close local developer gaps.", services: ALL_FOUR },
  { country: 'Saudi Arabia',         region: 'Middle East',   city: 'Riyadh',    text: "Vision 2030 is driving large-scale modernization and demand for digital products.", services: ALL_FOUR },
]
