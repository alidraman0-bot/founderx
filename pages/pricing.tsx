import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import PricingCard from '@/components/PricingCard'
import ComparisonTable from '@/components/ComparisonTable'
import FAQSection from '@/components/FAQSection'
import { plans, faqs } from '../data/plans'
import { useAuth } from '../lib/auth'

export default function Pricing() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const handleUpgrade = async (plan: Plan) => {
    if (plan.price === 0) {
      // Free plan - redirect to signup
      window.location.href = plan.ctaLink
      return
    }

    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login?redirect=/pricing'
      return
    }

    setIsLoading(true)
    setLoadingPlan(plan.id)
    
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.id,
          priceId: plan.priceId,
          userId: user.id,
          userEmail: user.email
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setIsLoading(false)
      setLoadingPlan(null)
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
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Choose the Right Plan for Your Startup
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Start free. Upgrade when you're ready to accelerate.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onUpgrade={handleUpgrade}
                isLoading={isLoading && loadingPlan === plan.id}
              />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ComparisonTable />
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800">
          <div className="max-w-4xl mx-auto text-center px-6 py-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Build Your Startup?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are already building with FounderX.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/signup" 
                className="bg-white text-indigo-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Free Today
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-6">Trusted by founders at</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                <div className="text-white font-semibold">YC</div>
                <div className="text-white font-semibold">Techstars</div>
                <div className="text-white font-semibold">500 Startups</div>
                <div className="text-white font-semibold">Sequoia</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
