import React from 'react'
import Link from 'next/link'

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. You now have access to all premium features.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/dashboard"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/account/billing"
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors block"
          >
            Manage Subscription
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your subscription details.
          </p>
        </div>
      </div>
    </div>
  )
}
