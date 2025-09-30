import Head from 'next/head'
import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <>
      <Head>
        <title>Verify Email - FounderX</title>
        <meta name="description" content="Verify your email address to activate your FounderX account and start building with AI." />
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
                      Verify Your Email
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                      We've sent a confirmation link to your email. Please check your inbox and click the link to activate your account.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* CTA Button */}
                    <button
                      type="button"
                      className="w-full bg-[#6C63FF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5A52E5] hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      📨 Resend Email
                    </button>

                    {/* Secondary Link */}
                    <div className="text-center">
                      <Link href="/update-email" className="text-sm text-[#6C63FF] hover:text-[#5A52E5] transition-colors">
                        Wrong email? Update it.
                      </Link>
                    </div>

                    {/* Continue to Dashboard */}
                    <Link href="/dashboard" className="block w-full bg-[#38E4AE] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#32D1A0] hover:shadow-lg hover:shadow-[#38E4AE]/25 transition-all duration-300 transform hover:scale-[1.02] text-center">
                      ✅ Continue to Dashboard
                    </Link>

                    {/* Additional Info */}
                    <div className="bg-[#F8F9FC] rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600">
                        <strong>Didn't receive the email?</strong><br />
                        Check your spam folder or try resending.
                      </p>
                    </div>
                  </div>
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
                        {/* Delivering gesture */}
                        <div className="text-2xl">📧</div>
                        {/* Futuristic Mailbox */}
                        <div className="w-16 h-16 bg-[#38E4AE] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">📮</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold mb-2">Verification Email</div>
                      <div className="text-sm opacity-80">AI delivering confirmation</div>
                      <div className="mt-4 w-32 h-20 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                        <div className="flex space-x-2">
                          {/* Startup Icons Floating */}
                          <div className="w-4 h-4 bg-[#6C63FF] rounded-full animate-bounce"></div>
                          <div className="w-4 h-4 bg-[#38E4AE] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-4 h-4 bg-[#6C63FF] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs opacity-60">Startup icons floating around</div>
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
