import { getCheckoutSession } from '../../lib/stripe'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { sessionId } = req.query

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' })
    }

    const session = await getCheckoutSession(sessionId)
    res.status(200).json({ session })
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
