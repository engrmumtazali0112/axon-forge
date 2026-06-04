export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !subject || !message) {
    return res.status(422).json({ error: 'Missing required fields' })
  }

  // In production, connect this to your FastAPI backend or send email via SMTP
  return res.status(201).json({
    id: Date.now(),
    status: 'received',
    message: `Thanks ${name}! We'll reply to ${email} within 24 hours.`,
  })
}
