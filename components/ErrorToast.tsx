import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ErrorToast() {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const { canceled, error } = router.query
    
    if (canceled === 'true') {
      setErrorMessage('Payment was canceled. No charges were made.')
      setShowToast(true)
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)

      // Clean up URL parameters
      router.replace('/pricing', undefined, { shallow: true })

      return () => clearTimeout(timer)
    }

    if (error) {
      setErrorMessage(error as string)
      setShowToast(true)
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)

      // Clean up URL parameters
      router.replace('/pricing', undefined, { shallow: true })

      return () => clearTimeout(timer)
    }
  }, [router])

  if (!showToast || !errorMessage) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Payment Error</h3>
            <p className="text-sm opacity-90">
              {errorMessage}
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
