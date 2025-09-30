import Head from 'next/head'
import Link from 'next/link'

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password - FounderX</title>
        <meta name="description" content="Reset your password to regain access to your FounderX account." />
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
                      Reset your password
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                      Enter your new password below to regain access.
                    </p>
                  </div>

                  <form className="space-y-6">
                    {/* New Password */}
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                        placeholder="Enter your new password"
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
                        placeholder="Confirm your new password"
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#6C63FF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5A52E5] hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      🔒 Reset Password
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
                        {/* Futuristic Lock */}
                        <div className="w-20 h-20 bg-gradient-to-br from-[#6C63FF] to-[#38E4AE] rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white font-bold text-2xl">🔒</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold mb-2">AI-Secured Password</div>
                      <div className="text-sm opacity-80">Futuristic lock with AI circuits</div>
                      <div className="mt-4 w-32 h-20 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#38E4AE] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          <div className="w-2 h-2 bg-[#38E4AE] rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                          <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                          <div className="w-2 h-2 bg-[#38E4AE] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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
              <Link href="/login" className="text-white hover:text-[#38E4AE] transition-colors">
                Back to Login
              </Link>
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
