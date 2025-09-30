import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface UserPlan {
  id: string
  email: string
  plan: 'free' | 'pro' | 'premium'
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  subscription_id: string | null
  stripe_customer_id: string | null
  subscription_start_date: string | null
  subscription_end_date: string | null
}

export async function updateUserPlan(
  userId: string,
  plan: 'free' | 'pro' | 'premium',
  subscriptionId?: string,
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' = 'active',
  stripeCustomerId?: string,
  subscriptionStartDate?: string,
  subscriptionEndDate?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        plan,
        subscription_id: subscriptionId || null,
        status,
        stripe_customer_id: stripeCustomerId || null,
        subscription_start_date: subscriptionStartDate || null,
        subscription_end_date: subscriptionEndDate || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user plan:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating user plan:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function getUserPlan(userId: string): Promise<{ user: UserPlan | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, plan, status, subscription_id, stripe_customer_id, subscription_start_date, subscription_end_date')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user plan:', error)
      return { user: null, error: error.message }
    }

    return { user: data as UserPlan }
  } catch (error) {
    console.error('Error fetching user plan:', error)
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function cancelUserSubscription(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        plan: 'free',
        subscription_id: null,
        status: 'canceled',
        subscription_end_date: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error canceling subscription:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function getUserByStripeCustomerId(stripeCustomerId: string): Promise<{ user: UserPlan | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, plan, status, subscription_id, stripe_customer_id, subscription_start_date, subscription_end_date')
      .eq('stripe_customer_id', stripeCustomerId)
      .single()

    if (error) {
      console.error('Error fetching user by Stripe customer ID:', error)
      return { user: null, error: error.message }
    }

    return { user: data as UserPlan }
  } catch (error) {
    console.error('Error fetching user by Stripe customer ID:', error)
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function getSubscriptionStats(): Promise<{
  totalUsers: number
  freeUsers: number
  proUsers: number
  premiumUsers: number
  activeSubscriptions: number
  canceledSubscriptions: number
  mrr: number
} | null> {
  try {
    const { data, error } = await supabase.rpc('get_subscription_stats')

    if (error) {
      console.error('Error fetching subscription stats:', error)
      return null
    }

    return {
      totalUsers: data[0]?.total_users || 0,
      freeUsers: data[0]?.free_users || 0,
      proUsers: data[0]?.pro_users || 0,
      premiumUsers: data[0]?.premium_users || 0,
      activeSubscriptions: data[0]?.active_subscriptions || 0,
      canceledSubscriptions: data[0]?.canceled_subscriptions || 0,
      mrr: data[0]?.mrr || 0
    }
  } catch (error) {
    console.error('Error fetching subscription stats:', error)
    return null
  }
}

export async function checkUserHasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('user_has_active_subscription', {
      user_id: userId
    })

    if (error) {
      console.error('Error checking subscription status:', error)
      return false
    }

    return data || false
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return false
  }
}
