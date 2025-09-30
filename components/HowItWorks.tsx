export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Idea",
      description: "Tell us about your startup idea, target market, and goals. Our AI analyzes your concept and provides initial feedback."
    },
    {
      number: "02", 
      title: "AI Generates",
      description: "Get a comprehensive roadmap, market analysis, MVP plan, and investor pitch deck tailored to your specific startup."
    },
    {
      number: "03",
      title: "Execute & Raise",
      description: "Follow the AI-guided plan to build your MVP, validate with customers, and prepare for fundraising with confidence."
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            How FounderX Works
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
