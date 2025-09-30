export default function Features() {
  const features = [
    {
      icon: "💡",
      title: "Idea Validation",
      description: "Track startup ideas, market analysis, and validation metrics with AI-powered insights.",
      gradient: "from-blue-400 to-blue-600",
      chart: "line"
    },
    {
      icon: "👥",
      title: "Team & Resource Management",
      description: "Schedule cofounders, track progress, and manage startup resources efficiently.",
      gradient: "from-pink-400 to-pink-600",
      chart: "calendar"
    },
    {
      icon: "💰",
      title: "Revenue Optimization",
      description: "Maximize earnings with accurate financial modeling and seamless fundraising strategies.",
      gradient: "from-purple-400 to-purple-600",
      chart: "line"
    },
    {
      icon: "🔒",
      title: "Data Security & Compliance",
      description: "Enterprise-grade security and compliance for your startup's sensitive data.",
      gradient: "from-green-400 to-green-600",
      chart: "donut"
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description: "Manage metrics, track KPIs, and generate comprehensive startup reports.",
      gradient: "from-orange-400 to-orange-600",
      chart: "bar"
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Built for Efficiency, Designed for Success
            </h2>
            <div className="ml-6 transform rotate-12">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Key Features & Benefits
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.gradient} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">{feature.description}</p>
                
                {/* Mini chart visualization */}
                <div className="bg-white/20 rounded-lg p-4">
                  {feature.chart === 'line' && (
                    <div className="h-16 bg-gradient-to-r from-white/30 to-white/10 rounded flex items-end justify-center">
                      <div className="text-white font-bold text-sm">📈 Growth</div>
                    </div>
                  )}
                  {feature.chart === 'calendar' && (
                    <div className="h-16 bg-gradient-to-r from-white/30 to-white/10 rounded flex items-center justify-center">
                      <div className="text-white font-bold text-sm">📅 Schedule</div>
                    </div>
                  )}
                  {feature.chart === 'donut' && (
                    <div className="h-16 bg-gradient-to-r from-white/30 to-white/10 rounded-full flex items-center justify-center">
                      <div className="text-white font-bold text-sm">🔒 Secure</div>
                    </div>
                  )}
                  {feature.chart === 'bar' && (
                    <div className="h-16 bg-gradient-to-r from-white/30 to-white/10 rounded flex items-end justify-center">
                      <div className="text-white font-bold text-sm">📊 Analytics</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
