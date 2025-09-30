import { createCheckoutSession, getCheckoutSession } from '../../lib/stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, userId, planName } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' })
    }

    const successUrl = `${req.headers.origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${req.headers.origin}/pricing`

    const session = await createCheckoutSession(
      priceId,
      successUrl,
      cancelUrl,
      {
        userId: userId || 'anonymous',
        planName: planName || 'unknown'
      }
    )

    res.status(200).json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
