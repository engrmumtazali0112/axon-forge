/**
 * src/data/projects.js
 * PLACEHOLDER PROJECTS: replace each entry with a real delivered project.
 *  - image: optional path in /public (e.g. '/portfolio/shop.jpg'); falls back to a coloured tile
 *  - url:   optional live link
 *  - results: honest, measurable outcomes only
 */
export const INDUSTRIES = ['All', 'SaaS', 'AI & ML', 'Mobile', 'Fintech', 'E-Commerce']

export const PROJECTS = [
  {
    title: 'Project name 1', industry: 'SaaS',
    description: 'Describe the client problem, what you built, and the result in two or three sentences.',
    results: [{ value: '00%', label: 'Metric one' }, { value: '0x', label: 'Metric two' }],
    tech: ['React', 'FastAPI', 'PostgreSQL', 'AWS'], image: null, url: null,
  },
  {
    title: 'Project name 2', industry: 'AI & ML',
    description: 'Describe the AI feature you delivered (chatbot, RAG search, vision model) and the outcome.',
    results: [{ value: '00h', label: 'Time saved / week' }],
    tech: ['Python', 'LangChain', 'OpenAI'], image: null, url: null,
  },
  {
    title: 'Project name 3', industry: 'Mobile',
    description: 'Describe the mobile app, platforms covered, and how users responded.',
    results: [{ value: '0k+', label: 'Downloads' }, { value: '0.0★', label: 'Store rating' }],
    tech: ['Flutter', 'Firebase'], image: null, url: null,
  },
  {
    title: 'Project name 4', industry: 'Fintech',
    description: 'Describe the payments or wallet product, the compliance work involved, and the launch result.',
    results: [{ value: '00 days', label: 'To launch' }],
    tech: ['Node.js', 'PostgreSQL', 'Docker'], image: null, url: null,
  },
]
