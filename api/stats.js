export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()

  return res.status(200).json({
    projects_completed: 85,
    happy_clients: 60,
    years_experience: 5,
    technologies: 30,
  })
}
