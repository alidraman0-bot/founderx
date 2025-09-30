export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Startup Journey?
            </h2>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Experience the future of startup building with our all-in-one AI cofounder solution.
            </p>
            
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Get Free Trial
            </button>
          </div>

          {/* Right side - Dashboard mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">FounderX Analytics</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Success metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">$5M</div>
                    <div className="text-sm opacity-90">Avg Funding</div>
                  </div>
                </div>

                {/* Growth chart */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Growth</h4>
                  <div className="h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-white font-bold text-lg">📈 Exponential Growth</div>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Market Validation</span>
                    <span className="text-green-600 font-bold text-sm">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">MVP Development</span>
                    <span className="text-blue-600 font-bold text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Fundraising</span>
                    <span className="text-purple-600 font-bold text-sm">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
