import Head from 'next/head'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password - FounderX</title>
        <meta name="description" content="Forgot your password? No worries — enter your email and we'll send you reset instructions." />
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
            <Link href="/login" className="text-white hover:text-[#38E4AE] transition-colors flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Form */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                      Forgot your password?
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                      No worries — enter your email and we'll send you reset instructions.
                    </p>
                  </div>

                  <form className="space-y-6">
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

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#6C63FF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5A52E5] hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      📩 Send Reset Link
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        {/* AI Assistant */}
                        <div className="w-16 h-16 bg-[#6C63FF] rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white font-bold text-lg">🤖</span>
                        </div>
                        {/* Sending gesture */}
                        <div className="text-2xl">📧</div>
                        {/* Cyberspace */}
                        <div className="w-16 h-16 bg-[#38E4AE] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">🌐</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold mb-2">Secure Reset Email</div>
                      <div className="text-sm opacity-80">AI sending reset instructions</div>
                      <div className="mt-4 w-24 h-16 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#38E4AE] rounded-full animate-ping"></div>
                          <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-[#38E4AE] rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                        </div>
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
            <div className="flex justify-center space-x-6">
              <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
