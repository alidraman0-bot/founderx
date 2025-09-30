import React from 'react'

export default function PricingCard({ plan, onUpgrade, isLoading = false }) {
  const handleUpgrade = () => {
    if (plan.price === 0) {
      // Free plan - redirect to signup
      window.location.href = plan.ctaLink
      return
    }
    onUpgrade(plan)
  }

  return (
    <div className={`relative bg-white rounded-xl shadow-md border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      plan.popular 
        ? 'border-indigo-500 transform scale-105' 
        : 'border-gray-200 hover:border-gray-300'
    }`}>
      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{plan.icon}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          
          <div className="mb-6">
            <span className="text-5xl font-bold text-gray-900">
              ${plan.price}
            </span>
            {plan.price > 0 && (
              <span className="text-lg text-gray-600">
                /{plan.period}
              </span>
            )}
            {plan.price === 0 && (
              <span className="text-lg text-gray-600">/{plan.period}</span>
            )}
          </div>

          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : plan.price === 0
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
            } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
          >
            {isLoading ? 'Processing...' : plan.cta}
          </button>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Limitations for Free plan */}
        {plan.limitations && plan.limitations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
            {plan.limitations.map((limitation, index) => (
              <div key={index} className="flex items-start">
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
  )
}
