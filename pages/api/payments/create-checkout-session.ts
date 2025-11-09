import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { plan, priceId, userId, userEmail } = req.body

    if (!plan || !priceId || !userId || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate plan
    const validPlans = ['pro', 'premium']
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan. Must be pro or premium' })
    }

    // Check if user already has an active subscription
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('subscription_id, plan')
      .eq('id', userId)
      .single()

    if (userError) {
      console.error('Error fetching user:', userError)
      return res.status(500).json({ error: 'User not found' })
    }

    // If user already has this plan, return error
    if (existingUser?.plan === plan) {
      return res.status(400).json({ error: `You already have the ${plan} plan` })
    }

    // Create or get Stripe customer
    let customerId = (existingUser as any)?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId,
          plan: plan
        }
      })
      customerId = customer.id

      // Update user with Stripe customer ID
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true&plan=${plan}`
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
        plan: plan,
        userEmail: userEmail
      },
      subscription_data: {
        metadata: {
          userId: userId,
          plan: plan,
          userEmail: userEmail
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        name: 'auto'
      }
    })

    res.status(200).json({ 
      sessionId: session.id, 
      url: session.url 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
