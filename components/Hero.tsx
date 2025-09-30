export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 transform rotate-12">
        <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          AI-Powered
        </div>
      </div>
      
      <div className="absolute top-40 right-20 transform -rotate-6">
        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          Startup Builder
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-max section-padding flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          Build Your Startup Faster with AI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl">
          All-in-one AI Cofounder platform to enhance idea validation, optimize workflows, and accelerate your path to success.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Start Your Free Trial
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors">
            View Pricing
          </button>
        </div>

        {/* Dashboard mockup */}
        <div className="relative w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
                <div className="space-y-3">
                  {['Dashboard', 'Ideas', 'Validation', 'MVP', 'Funding', 'Analytics'].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 cursor-pointer">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Metrics cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">159</div>
                    <div className="text-sm opacity-90">Ideas Validated</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm opacity-90">MVPs Built</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm opacity-90">Fundraising</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl">
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm opacity-90">Launches</div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4">Startup Success Rate</h4>
                    <div className="h-32 bg-gradient-to-r from-pink-400 to-blue-500 rounded-lg flex items-end justify-center">
                      <div className="text-white font-bold text-lg">85%</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4">Top Industries</h4>
                    <div className="space-y-2">
                      {['SaaS', 'E-commerce', 'Fintech', 'HealthTech', 'EdTech'].map((industry, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-600">{industry}</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-blue-500 rounded-full" style={{width: `${80 - index * 10}%`}}></div>
                          </div>
                        </div>
                      ))}
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