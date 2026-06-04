export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const testimonials = [
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

  return res.status(200).json({ testimonials })
}
