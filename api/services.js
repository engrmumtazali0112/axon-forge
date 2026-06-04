export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const services = [
    {
      id: 1,
      icon: '🤖',
      title: 'AI & ML Solutions',
      description: 'Custom LLM integrations, RAG systems, computer vision, and intelligent automation pipelines that transform your business workflows.',
      features: ['LLM Fine-tuning', 'RAG Systems', 'Computer Vision', 'AI Chatbots', 'ML Pipelines'],
    },
    {
      id: 2,
      icon: '⚡',
      title: 'SaaS Development',
      description: 'Full-cycle SaaS platforms with multi-tenant architecture, subscription billing, analytics dashboards, and scalable cloud infrastructure.',
      features: ['Multi-tenant Architecture', 'Stripe Integration', 'Admin Dashboards', 'User Auth', 'Analytics'],
    },
    {
      id: 3,
      icon: '🌐',
      title: 'Web Development',
      description: 'Pixel-perfect, high-performance web applications using React, Next.js, and modern frontend tooling with exceptional UX.',
      features: ['React / Next.js', 'TypeScript', 'Responsive Design', 'SEO Optimized', 'Performance First'],
    },
    {
      id: 4,
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps with React Native & Expo — one codebase for iOS and Android with native performance.',
      features: ['React Native', 'Expo', 'Push Notifications', 'Offline Support', 'App Store Deploy'],
    },
    {
      id: 5,
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'AWS & GCP infrastructure setup, Docker containerization, Kubernetes orchestration, and fully automated CI/CD pipelines.',
      features: ['AWS / GCP', 'Docker & K8s', 'CI/CD Pipelines', 'Auto Scaling', 'Cost Optimization'],
    },
    {
      id: 6,
      icon: '🗄️',
      title: 'Database Design',
      description: 'Scalable database architecture, query optimization, migrations, and real-time data solutions for high-traffic applications.',
      features: ['PostgreSQL / MySQL', 'Redis Caching', 'Schema Design', 'Query Optimization', 'Migrations'],
    },
  ]

  return res.status(200).json({ services })
}
