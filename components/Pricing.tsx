export default function Pricing() {
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "1 idea validation",
        "1 MVP roadmap",
        "Community access",
        "Basic AI guidance"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro Plan",
      price: "$15",
      period: "/month",
      description: "For serious entrepreneurs",
      features: [
        "Unlimited validations",
        "Unlimited roadmaps",
        "AI pitch decks",
        "Priority support",
        "Advanced analytics"
      ],
      cta: "Start Pro Trial",
      popular: true
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Simple Plans for Every Founder
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-2xl border-2 ${plan.popular ? 'border-indigo-600 relative' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-full font-semibold text-lg transition-colors duration-200 ${
                plan.popular 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
