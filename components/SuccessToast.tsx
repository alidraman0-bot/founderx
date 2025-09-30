import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SuccessToast() {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    const { upgraded, plan: planParam } = router.query
    
    if (upgraded === 'true' && planParam) {
      setPlan(planParam as string)
      setShowToast(true)
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)

      // Clean up URL parameters
      router.replace('/dashboard', undefined, { shallow: true })

      return () => clearTimeout(timer)
    }
  }, [router])

  if (!showToast || !plan) return null

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'pro': return 'Pro'
      case 'premium': return 'Premium'
      default: return plan
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return 'from-blue-500 to-blue-600'
      case 'premium': return 'from-purple-500 to-purple-600'
      default: return 'from-green-500 to-green-600'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`bg-gradient-to-r ${getPlanColor(plan)} text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Upgrade Successful!</h3>
            <p className="text-sm opacity-90">
              You now have access to {getPlanDisplayName(plan)} features
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
