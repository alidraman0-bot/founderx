import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useAuth } from '../lib/auth'

export default function Subscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)

  // Mock subscription data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubscription({
        plan: 'Free',
        status: 'active',
        nextBillingDate: null,
        amount: 0,
        features: [
          '1 idea validation per month',
          '1 MVP roadmap',
          'Basic business plan template',
          'Community access',
          'Email support'
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleUpgrade = async (planName) => {
    setIsUpgrading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planName === 'pro' ? 'price_pro_monthly' : 'price_premium_monthly',
          planName: planName === 'pro' ? 'Pro' : 'Premium'
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

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      // Implement cancellation logic
      console.log('Cancelling subscription...')
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading subscription details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Subscription - FounderX</title>
        <meta name="description" content="Manage your FounderX subscription and billing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
            <p className="text-gray-600">Manage your plan and billing preferences</p>
          </div>

          {/* Current Plan Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Plan</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subscription.plan === 'Free' 
                      ? 'bg-gray-100 text-gray-800' 
                      : subscription.plan === 'Pro'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {subscription.plan}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ${subscription.amount}
                  {subscription.amount > 0 && <span className="text-lg text-gray-600">/month</span>}
                </div>
                {subscription.nextBillingDate && (
                  <p className="text-sm text-gray-600">Next billing: {subscription.nextBillingDate}</p>
                )}
              </div>
            </div>

            {/* Plan Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subscription.features.map((feature, index) => (
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
              {subscription.plan === 'Free' && (
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
                    {isUpgrading ? 'Processing...' : 'Upgrade to Premium ($25/month)'}
                  </button>
                </>
              )}
              {subscription.plan === 'Pro' && (
                <>
                  <button
                    onClick={() => handleUpgrade('premium')}
                    disabled={isUpgrading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpgrading ? 'Processing...' : 'Upgrade to Premium ($25/month)'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </>
              )}
              {subscription.plan === 'Premium' && (
                <button
                  onClick={handleCancel}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>

          {/* Plan Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className={`p-6 rounded-lg border-2 ${
                subscription.plan === 'Free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
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
                {subscription.plan !== 'Free' && (
                  <button className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-semibold">
                    Downgrade
                  </button>
                )}
              </div>

              {/* Pro Plan */}
              <div className={`p-6 rounded-lg border-2 ${
                subscription.plan === 'Pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
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
                {subscription.plan !== 'Pro' && (
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
                subscription.plan === 'Premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$25<span className="text-lg text-gray-600">/month</span></div>
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
                {subscription.plan !== 'Premium' && (
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
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
