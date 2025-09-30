export default function SocialProof() {
  const logos = [
    { name: "Y Combinator", placeholder: "YC" },
    { name: "Techstars", placeholder: "TS" },
    { name: "Seedcamp", placeholder: "SC" },
    { name: "500 Startups", placeholder: "500" },
    { name: "Andreessen Horowitz", placeholder: "a16z" }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-16">
            Inspired by the Best in Startup Building
          </h2>
          
          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            {logos.map((logo, index) => (
              <div key={index} className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold">{logo.placeholder}</span>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="bg-white p-8 rounded-2xl shadow-sm max-w-3xl mx-auto">
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "FounderX feels like having a YC partner in your pocket. It helped me validate my SaaS idea in a week instead of wasting 6 months."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold">SL</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Sarah L.</p>
                <p className="text-gray-600">Founder, TechStartup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
