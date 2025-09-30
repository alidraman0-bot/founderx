import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '1 idea validation per month',
      '1 MVP roadmap',
      'Basic business plan template',
      'Community access',
      'Email support'
    ],
    limitations: [
      'Limited AI generations',
      'No priority support',
      'Basic templates only'
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    popular: false,
    priceId: null
  },
  {
    name: 'Pro',
    price: 15,
    period: 'month',
    description: 'For serious entrepreneurs',
    features: [
      'Unlimited idea validations',
      'Unlimited MVP roadmaps',
      'Advanced business plans',
      'AI-powered market research',
      'Priority support',
      'Export to PDF/Word',
      'Custom branding tools',
      'Analytics dashboard'
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    ctaLink: '/checkout/pro',
    popular: true,
    priceId: 'price_pro_monthly' // Replace with actual Stripe price ID
  },
  {
    name: 'Premium',
    price: 25,
    period: 'month',
    description: 'For scaling startups',
    features: [
      'Everything in Pro',
      'White-label solutions',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      'Team collaboration tools',
      'Priority feature requests',
      'Custom AI training'
    ],
    limitations: [],
    cta: 'Go Premium',
    ctaLink: '/checkout/premium',
    popular: false,
    priceId: 'price_premium_monthly' // Replace with actual Stripe price ID
  }
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async (plan) => {
    if (plan.price === 0) {
      // Free plan - redirect to signup
      window.location.href = plan.ctaLink
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          planName: plan.name
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Pricing - FounderX</title>
        <meta name="description" content="Choose the perfect plan for your startup journey. Free, Pro, and Premium plans available." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple Pricing for Every Founder
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Start free and upgrade as you grow. No hidden fees, no long-term contracts.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Yearly
                  <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Save 20%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-blue-500 transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900">
                        ${billingPeriod === 'yearly' && plan.price > 0 ? Math.round(plan.price * 12 * 0.8) : plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-lg text-gray-600">
                          /{billingPeriod === 'yearly' ? 'year' : plan.period}
                        </span>
                      )}
                      {plan.price === 0 && (
                        <span className="text-lg text-gray-600">/{plan.period}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleUpgrade(plan)}
                      disabled={isLoading}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          : plan.price === 0
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isLoading ? 'Processing...' : plan.cta}
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations for Free plan */}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change plans anytime?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Is there a free trial?</h3>
                <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="max-w-4xl mx-auto text-center px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Startup?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are already building with FounderX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-white text-indigo-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
