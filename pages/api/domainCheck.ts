import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { domain } = req.body

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' })
    }

    // Simulate domain check API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response
    const isAvailable = Math.random() > 0.5
    const suggestions = [
      `${domain}.com`,
      `${domain}.io`,
      `get${domain}.com`,
      `${domain}app.com`,
      `${domain}-app.com`
    ]

    res.status(200).json({
      domain,
      available: isAvailable,
      suggestions: suggestions.slice(0, 3),
      price: isAvailable ? 12.99 : null,
      registrar: isAvailable ? 'Namecheap' : null
    })
  } catch (error) {
    console.error('Error checking domain:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
