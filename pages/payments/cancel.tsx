import React from 'react'
import Link from 'next/link'

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was canceled. No charges have been made to your account.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/pricing"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block"
          >
            Try Again
          </Link>
          <Link 
            href="/dashboard"
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors block"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team for assistance.
          </p>
          <Link 
            href="/contact"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
