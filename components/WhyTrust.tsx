export default function WhyTrust() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                Why Entrepreneurs Trust Our System
              </h2>
              <div className="ml-6 transform rotate-12">
                <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Why Choose Us?
                </div>
              </div>
            </div>

            {/* Visual - Professional founders */}
            <div className="mb-8">
              <div className="w-80 h-60 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">👨‍💼</span>
                    </div>
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">👩‍💼</span>
                    </div>
                  </div>
                  <p className="text-gray-600 font-semibold">Successful Entrepreneurs</p>
                </div>
              </div>
            </div>

            {/* Key metrics */}
            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">260+</div>
              <div className="text-xl text-gray-700 mb-8">Trusted & Successful Founders</div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900 text-white p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">User-Friendly Interface</h3>
                <p className="text-white/80 text-sm">Intuitive design that makes startup building simple</p>
              </div>
              
              <div className="bg-purple-600 text-white p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">24/7 AI Support</h3>
                <p className="text-white/80 text-sm">Round-the-clock assistance from your AI cofounder</p>
              </div>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="text-center lg:text-left">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Startup?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join thousands of entrepreneurs who have successfully launched their startups with FounderX AI.
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
