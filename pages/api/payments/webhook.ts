import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature'] as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id)
  
  const userId = session.metadata?.userId
  const plan = session.metadata?.plan

  if (!userId || !plan) {
    console.error('Missing userId or plan in session metadata')
    return
  }

  // Get the subscription from Stripe
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

  // Update user in Supabase
  const { error } = await supabase
    .from('users')
    .update({
      plan: plan,
      subscription_id: subscription.id,
      status: 'active',
      stripe_customer_id: session.customer as string,
      subscription_start_date: new Date().toISOString(),
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating user:', error)
    throw error
  }

  console.log(`User ${userId} upgraded to ${plan} plan`)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)
  
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Determine plan from subscription
  const plan = getPlanFromSubscription(subscription)

  // Update user subscription
  const { error: updateError } = await supabase
    .from('users')
    .update({
      plan: plan,
      subscription_id: subscription.id,
      status: 'active',
      subscription_start_date: new Date().toISOString(),
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating user subscription:', updateError)
    throw updateError
  }

  console.log(`User ${user.id} subscription created: ${plan}`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)
  
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Determine plan and status
  const plan = getPlanFromSubscription(subscription)
  const status = subscription.status === 'active' ? 'active' : 'canceled'

  // Update user subscription
  const { error: updateError } = await supabase
    .from('users')
    .update({
      plan: plan,
      subscription_id: subscription.id,
      status: status,
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating user subscription:', updateError)
    throw updateError
  }

  console.log(`User ${user.id} subscription updated: ${plan} (${status})`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)
  
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Downgrade user to free plan
  const { error: updateError } = await supabase
    .from('users')
    .update({
      plan: 'free',
      subscription_id: null,
      status: 'canceled',
      subscription_end_date: null
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error downgrading user:', updateError)
    throw updateError
  }

  console.log(`User ${user.id} downgraded to free plan`)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', invoice.id)
  
  const customerId = invoice.customer as string
  
  // Find user by Stripe customer ID
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Update user status to active
  const { error: updateError } = await supabase
    .from('users')
    .update({
      status: 'active'
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating user status:', updateError)
    throw updateError
  }

  console.log(`User ${user.id} payment succeeded`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice.id)
  
  const customerId = invoice.customer as string
  
  // Find user by Stripe customer ID
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Update user status to past_due
  const { error: updateError } = await supabase
    .from('users')
    .update({
      status: 'past_due'
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating user status:', updateError)
    throw updateError
  }

  console.log(`User ${user.id} payment failed`)
}

function getPlanFromSubscription(subscription: Stripe.Subscription): string {
  const priceId = subscription.items.data[0]?.price.id
  
  if (priceId === 'price_pro_monthly' || priceId === 'price_pro_yearly') {
    return 'pro'
  } else if (priceId === 'price_premium_monthly' || priceId === 'price_premium_yearly') {
    return 'premium'
  }
  
  return 'free'
}
