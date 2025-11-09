import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get user ID from session/auth (you'll need to implement this)
    const userId = req.headers['user-id'] as string || 'anonymous'

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: 'cus_customer_id', // You'll need to get this from your database
      return_url: `${req.headers.origin}/account/billing`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
