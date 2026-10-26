/**
 * src/data/blogPosts.js
 * Blog content. Add a post by adding an object here (newest first).
 * `body` is an array of blocks: { h: 'heading' } | { p: 'paragraph' } | { ul: ['a','b'] }
 */
/* Cover photos: Unsplash. Swap any id below (the part after "photo-") or paste a full URL / local import into `image`. */
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

export const CATEGORIES = ['All', 'AI & Machine Learning', 'Mobile Development', 'Fintech', 'Cloud & DevOps', 'SaaS']

export const POSTS = [
  {
    slug: 'ai-readiness-assessment-25-point-checklist',
    image: unsplash('1551288049-bebda4e38f71'),
    title: 'AI Readiness Assessment: The 25-Point Checklist We Run Before Any AI Build',
    excerpt: 'A practical checklist covering data, infrastructure, security, team skills and business fit, so you know whether an AI project will pay off before you spend on it.',
    category: 'AI & Machine Learning',
    date: '2026-09-23',
    readTime: 8,
    featured: true,
    body: [
      { p: 'Most AI projects that stall do so for ordinary reasons: the data is scattered, nobody owns the outcome, or the use case never had a measurable goal. A readiness assessment finds those problems in days instead of months.' },
      { h: 'Data' },
      { ul: ['Is the data you need collected today, and where does it live?', 'Is it clean enough to use, and who maintains it?', 'Do you have permission to use it for model training or retrieval?'] },
      { h: 'Infrastructure and security' },
      { ul: ['Can your systems expose clean APIs for a model to call?', 'Where will sensitive data be processed, and who can see prompts and outputs?', 'Do you have logging so you can audit what the model did?'] },
      { h: 'People and process' },
      { ul: ['Who owns the project on the business side?', 'What does success look like in numbers, and by when?', 'What is the fallback when the model is wrong?'] },
      { p: 'If you can answer most of these confidently, you are ready to scope a pilot. If not, the gaps tell you what to fix first.' },
    ],
  },
  {
    slug: 'ai-voice-agents-for-business-2026',
    image: unsplash('1478737270239-2f02b77fc618'),
    title: 'AI Voice Agents for Business in 2026: What They Cost, Where They Work, and Where They Fail',
    excerpt: 'What an AI receptionist costs to run, the use cases that pay back quickly, and the situations where a human should still pick up the phone.',
    category: 'AI & Machine Learning',
    date: '2026-09-21',
    readTime: 7,
    body: [
      { p: 'Voice agents are good at predictable, high-volume calls: booking, status checks, FAQs and call routing. They struggle with emotionally charged calls, complex negotiations and noisy lines.' },
      { h: 'Where they pay back' },
      { ul: ['Appointment booking and rescheduling', 'After-hours call handling', 'Order and delivery status', 'Lead qualification before a human follow-up'] },
      { h: 'What drives cost' },
      { ul: ['Call minutes and speech-to-text / text-to-speech usage', 'The language model behind the conversation', 'Integration work with your calendar, CRM or ticketing system', 'Monitoring and prompt tuning after launch'] },
      { p: 'Start with one call type, measure resolution rate and hand-off quality, then expand.' },
    ],
  },
  {
    slug: 'fintech-app-development-2026-cost-pci-dss-kyc',
    image: unsplash('1563013544-824ae1b704d3'),
    title: 'Fintech App Development in 2026: Cost, PCI DSS, KYC, and What Regulators Expect',
    excerpt: 'Why fintech costs more than a comparable app, which features pull in which compliance obligations, and the build order that keeps you out of heavy regulation until you need it.',
    category: 'Fintech',
    date: '2026-09-18',
    readTime: 10,
    body: [
      { p: 'Fintech typically costs noticeably more than a comparable app because money has to balance to the cent, regulators can stop you, and fraud shows up at launch. A cheap quote usually leaves those three out.' },
      { h: 'Indicative cost tiers' },
      { ul: ['Payment MVP: roughly $40k to $90k', 'Wallets and escrow: roughly $90k to $200k', 'Lending and investing: $200k and up', 'Running costs: plan on at least a quarter of the build cost per year'] },
      { h: 'Build sequence that holds up in review' },
      { ul: ['Choose a partner bank or processor first', 'Build the ledger with integer money values', 'Add identity verification (KYC) with ongoing re-screening', 'Use tokenised card data to keep PCI scope small', 'Add transaction monitoring and reconciliation', 'Finish with authentication, audit trails and a penetration test'] },
      { p: 'Ranges above are indicative and vary by market, licence model and scope. Send us your feature list and target markets and we will map each feature to the obligations it triggers.' },
    ],
  },
  {
    slug: 'openai-vs-anthropic-vs-google-which-llm',
    image: unsplash('1677442136019-21780ecad995'),
    title: 'OpenAI vs Anthropic vs Google: Which LLM Should Your Business Build On in 2026?',
    excerpt: 'How we choose an LLM provider for client builds: quality on your task, latency, cost, data handling and the cost of switching later.',
    category: 'AI & Machine Learning',
    date: '2026-09-16',
    readTime: 9,
    body: [
      { p: 'There is no single best provider. The right choice depends on your task, your data rules and your budget, and it can change. Build so you can switch.' },
      { h: 'How we compare' },
      { ul: ['Quality on a test set built from your real tasks', 'Latency and throughput at your expected volume', 'Price per successful task, not price per token', 'Data retention, regions and compliance options', 'Tooling: function calling, structured output, long context'] },
      { h: 'Our default advice' },
      { p: 'Put a thin abstraction layer between your product and the model, keep an evaluation set, and re-run it whenever a provider releases a new model.' },
    ],
  },
  {
    slug: 'building-saas-mvp-in-90-days',
    image: unsplash('1460925895917-afdab827c52f'),
    title: 'Building a SaaS MVP in 90 Days: A Realistic Plan',
    excerpt: 'What to build, what to skip, and how to organise sprints so you launch with auth, billing and a dashboard people actually use.',
    category: 'SaaS',
    date: '2026-09-10',
    readTime: 6,
    body: [
      { p: 'A 90-day MVP works when scope is ruthless. Auth, one core workflow, billing and basic analytics are enough to learn from real users.' },
      { h: 'Suggested rhythm' },
      { ul: ['Weeks 1-2: discovery, scope, design system', 'Weeks 3-8: core workflow, auth, billing in weekly demos', 'Weeks 9-10: hardening, testing, deployment pipeline', 'Weeks 11-12: private beta and fixes'] },
    ],
  },
  {
    slug: 'docker-kubernetes-deployment-for-small-teams',
    image: unsplash('1558494949-ef010cbdcc31'),
    title: 'Docker and Kubernetes for Small Teams: When You Need It and When You Don\'t',
    excerpt: 'A simple decision guide for containers, orchestration and managed platforms, so a small team does not take on operational work it cannot afford.',
    category: 'Cloud & DevOps',
    date: '2026-09-04',
    readTime: 6,
    body: [
      { p: 'Containers are almost always worth it. Kubernetes is only worth it when you have enough services, traffic or team size to benefit from orchestration.' },
      { ul: ['One or two services: use a managed container platform', 'Several services with uneven load: consider managed Kubernetes', 'Always: CI/CD, health checks, backups and alerts'] },
    ],
  },
  {
    slug: 'react-native-vs-flutter-2026',
    image: unsplash('1512941937669-90a1b58e7e9c'),
    title: 'React Native vs Flutter in 2026: Which One for Your Mobile App?',
    excerpt: 'Team skills, performance needs, native features and hiring: the questions that actually decide between the two.',
    category: 'Mobile Development',
    date: '2026-08-28',
    readTime: 7,
    body: [
      { p: 'Both are production-ready. If your team already writes React, React Native is the shorter path. If you want pixel-identical UI across platforms and heavy custom animation, Flutter is a strong fit.' },
      { ul: ['Existing web team in React: React Native', 'Custom, animation-heavy UI: Flutter', 'Deep native hardware features: check plugin support for both first'] },
    ],
  },
]

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
