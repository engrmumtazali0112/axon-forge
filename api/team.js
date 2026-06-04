export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const team = [
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

  return res.status(200).json({ team })
}
