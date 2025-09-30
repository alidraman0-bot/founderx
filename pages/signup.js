import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate signup process
    setTimeout(() => {
      login({ email: formData.email, name: formData.name })
      router.push('/dashboard')
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <Head>
        <title>Sign Up - FounderX</title>
        <meta name="description" content="Join FounderX today and build your startup faster with AI. Create your account in under 60 seconds." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-[#1B2B52] via-[#6C63FF] to-[#1B2B52]">
        {/* Header */}
        <header className="px-6 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#6C63FF] font-bold text-xl">F</span>
              </div>
              <span className="text-white text-2xl font-bold">FounderX</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-[#38E4AE] transition-colors">
                Login
              </Link>
              <Link href="/" className="text-white hover:text-[#38E4AE] transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Homepage
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Hero + Form */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Join FounderX Today —<br />
                  <span className="text-[#38E4AE]">Build Your Startup Faster with AI</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Your AI cofounder is waiting. Create your account in under 60 seconds and start building.
                </p>
              </div>

              {/* Sign Up Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <form className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>

                  {/* Primary CTA Button */}
                  <Link href="/verify-email" className="block w-full bg-[#6C63FF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5A52E5] hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-[1.02] text-center">
                    🚀 Get Started Free
                  </Link>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Sign Up */}
                  <button
                    type="button"
                    className="w-full bg-white border-2 border-gray-300 text-[#1A1A1A] px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  {/* Trust Signals */}
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">No credit card required.</p>
                    <p className="text-sm text-[#38E4AE] font-semibold">Free forever plan available.</p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Visual Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        {/* Founder */}
                        <div className="w-16 h-16 bg-[#38E4AE] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">👨‍💼</span>
                        </div>
                        {/* Handshake */}
                        <div className="text-2xl">🤝</div>
                        {/* AI Humanoid */}
                        <div className="w-16 h-16 bg-[#6C63FF] rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white font-bold text-lg">🤖</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold mb-2">Founder meets AI</div>
                      <div className="text-sm opacity-80">Building startups together</div>
                      <div className="mt-4 w-24 h-16 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-xs">📋</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-8 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                <Link href="/login" className="text-white hover:text-[#38E4AE] transition-colors">
                  Already have an account? Log in
                </Link>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
