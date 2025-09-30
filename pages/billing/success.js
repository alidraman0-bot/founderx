import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function CheckoutSuccess() {
  const router = useRouter()
  const { session_id } = router.query
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session_id) {
      // Fetch session details
      fetch(`/api/get-checkout-session?sessionId=${session_id}`)
        .then(res => res.json())
        .then(data => {
          setSession(data.session)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching session:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [session_id])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your payment...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Payment Successful - FounderX</title>
        <meta name="description" content="Your payment has been processed successfully" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for upgrading to {session?.metadata?.planName || 'Pro'}. Your subscription is now active.
            </p>

            {/* Order Details */}
            {session && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium text-gray-900">{session.metadata?.planName || 'Pro'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-900">
                      ${(session.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-medium text-green-600 capitalize">
                      {session.payment_status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium text-gray-900 font-mono text-sm">
                      {session.id}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Access Premium Features</p>
                    <p className="text-gray-600">Your account has been upgraded with all premium features</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Check Your Email</p>
                    <p className="text-gray-600">We've sent you a confirmation email with your receipt</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Start Building</p>
                    <p className="text-gray-600">Begin using your new premium features right away</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/subscription" 
                className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Manage Subscription
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600">💬</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-800 mb-4">
                  If you have any questions about your new subscription or need assistance getting started, our support team is here to help.
                </p>
                <div className="flex space-x-4">
                  <Link 
                    href="/contact" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link 
                    href="/help" 
                    className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
