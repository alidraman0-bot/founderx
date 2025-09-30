export default function Empowering() {
  return (
    <section className="section-padding bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex items-center mb-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Empowering Entrepreneurs with Smart AI
              </h2>
              <div className="ml-6 transform rotate-12">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Revolutionary System
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 leading-relaxed text-lg">
                    Our AI Cofounder System is designed to handle every aspect of startup building. From idea validation to investor pitch, we provide an intuitive platform that reduces guesswork, optimizes resource allocation, and boosts overall success rates.
                  </p>
                </div>
              </div>
            </div>
            
            <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
              Request a Demo
            </button>
          </div>

          {/* Right side - Dashboard mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">FounderX Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                    <div className="text-lg font-bold">85%</div>
                    <div className="text-xs opacity-90">Success Rate</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                    <div className="text-lg font-bold">$2.5M</div>
                    <div className="text-xs opacity-90">Avg Funding</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Startup Growth Trajectory</h4>
                  <div className="h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-white font-bold text-lg">📈 Exponential Growth</div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Idea Validation</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>MVP Development</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Fundraising</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
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
