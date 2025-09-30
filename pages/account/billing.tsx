import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useAuth } from '../../lib/auth'

interface Subscription {
  id: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  current_period_end: number
  plan: {
    amount: number
    interval: string
  }
  cancel_at_period_end: boolean
}

export default function Billing() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [isManaging, setIsManaging] = useState(false)

  // Mock subscription data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setSubscription({
        id: 'sub_1234567890',
        status: 'active',
        current_period_end: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
        plan: {
          amount: 1500, // $15.00 in cents
          interval: 'month'
        },
        cancel_at_period_end: false
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleUpgrade = async (planName: string) => {
    setIsUpgrading(true)
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
          priceId: planName === 'pro' ? 'price_pro_monthly' : 'price_premium_monthly'
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleManageSubscription = async () => {
    setIsManaging(true)
    try {
      const response = await fetch('/api/payments/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating portal session:', error)
    } finally {
      setIsManaging(false)
    }
  }

  const getPlanName = (amount: number) => {
    if (amount === 0) return 'Free'
    if (amount === 1500) return 'Pro'
    if (amount === 3500) return 'Premium'
    return 'Unknown'
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Free': return 'bg-gray-100 text-gray-800'
      case 'Pro': return 'bg-blue-100 text-blue-800'
      case 'Premium': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading billing information...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const currentPlan = subscription ? getPlanName(subscription.plan.amount) : 'Free'
  const renewalDate = subscription ? new Date(subscription.current_period_end).toLocaleDateString() : null

  return (
    <Layout>
      <Head>
        <title>Billing - FounderX</title>
        <meta name="description" content="Manage your FounderX subscription and billing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
            <p className="text-gray-600">Manage your plan and billing preferences</p>
          </div>

          {/* Current Plan Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Plan</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanColor(currentPlan)}`}>
                    {currentPlan}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subscription?.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription?.status || 'active'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ${subscription ? (subscription.plan.amount / 100).toFixed(2) : '0'}
                  {subscription && <span className="text-lg text-gray-600">/{subscription.plan.interval}</span>}
                </div>
                {renewalDate && (
                  <p className="text-sm text-gray-600">Renews on {renewalDate}</p>
                )}
              </div>
            </div>

            {/* Plan Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPlan === 'Free' && [
                  '1 idea validation per month',
                  '1 MVP roadmap',
                  'Basic business plan template',
                  'Community access',
                  'Email support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {currentPlan === 'Pro' && [
                  'Unlimited idea validations',
                  'Unlimited MVP roadmaps',
                  'Advanced business plans',
                  'AI-powered market research',
                  'Priority support',
                  'Export to PDF/Word',
                  'Custom branding tools',
                  'Analytics dashboard'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {currentPlan === 'Premium' && [
                  'Everything in Pro',
                  'White-label solutions',
                  'API access',
                  'Custom integrations',
                  'Dedicated account manager',
                  'Advanced analytics',
                  'Team collaboration tools',
                  'Priority feature requests',
                  'Custom AI training'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {currentPlan === 'Free' && (
                <>
                  <button
                    onClick={() => handleUpgrade('pro')}
                    disabled={isUpgrading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpgrading ? 'Processing...' : 'Upgrade to Pro ($15/month)'}
                  </button>
                  <button
                    onClick={() => handleUpgrade('premium')}
                    disabled={isUpgrading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpgrading ? 'Processing...' : 'Upgrade to Premium ($35/month)'}
                  </button>
                </>
              )}
              {currentPlan === 'Pro' && (
                <>
                  <button
                    onClick={() => handleUpgrade('premium')}
                    disabled={isUpgrading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpgrading ? 'Processing...' : 'Upgrade to Premium ($35/month)'}
                  </button>
                  <button
                    onClick={handleManageSubscription}
                    disabled={isManaging}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isManaging ? 'Loading...' : 'Manage Subscription'}
                  </button>
                </>
              )}
              {currentPlan === 'Premium' && (
                <button
                  onClick={handleManageSubscription}
                  disabled={isManaging}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isManaging ? 'Loading...' : 'Manage Subscription'}
                </button>
              )}
            </div>
          </div>

          {/* Plan Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className={`p-6 rounded-lg border-2 ${
                currentPlan === 'Free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 idea validation
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 MVP roadmap
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Community access
                  </li>
                </ul>
                {currentPlan !== 'Free' && (
                  <button className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-semibold">
                    Downgrade
                  </button>
                )}
              </div>

              {/* Pro Plan */}
              <div className={`p-6 rounded-lg border-2 ${
                currentPlan === 'Pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$15<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited validations
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                {currentPlan !== 'Pro' && (
                  <button 
                    onClick={() => handleUpgrade('pro')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Upgrade
                  </button>
                )}
              </div>

              {/* Premium Plan */}
              <div className={`p-6 rounded-lg border-2 ${
                currentPlan === 'Premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$35<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated manager
                  </li>
                </ul>
                {currentPlan !== 'Premium' && (
                  <button 
                    onClick={() => handleUpgrade('premium')}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">💳</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">**** **** **** 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                  <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Update
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">John Doe</p>
                  <p className="text-gray-600">123 Main Street</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Update Address
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link href="/billing" className="text-blue-600 hover:text-blue-800 font-medium">
                View Billing History →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
