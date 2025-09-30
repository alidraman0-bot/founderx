export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechStart",
      quote: "FounderX helped me validate my SaaS idea in just 2 weeks instead of months of trial and error.",
      color: "bg-blue-500",
      rotation: "rotate-3"
    },
    {
      name: "Marcus Johnson",
      role: "CEO, InnovateLab",
      quote: "The AI guidance was like having a YC partner available 24/7. Incredible value!",
      color: "bg-red-500",
      rotation: "-rotate-2"
    },
    {
      name: "Emily Rodriguez",
      role: "Co-founder, ScaleUp",
      quote: "From idea to $2M funding in 6 months. FounderX made it possible.",
      color: "bg-green-500",
      rotation: "rotate-1"
    },
    {
      name: "David Kim",
      role: "Founder, GrowthCo",
      quote: "The MVP roadmap saved us 3 months of development time. Game changer!",
      color: "bg-orange-500",
      rotation: "-rotate-1"
    }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400 rounded-full"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            What Entrepreneurs Are Saying
          </h2>
          <div className="transform rotate-12 inline-block">
            <div className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Testimonials & Reviews
            </div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${testimonial.color} text-white p-6 rounded-2xl shadow-lg transform ${testimonial.rotation} hover:rotate-0 transition-transform duration-300`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">{testimonial.name}</div>
                  <div className="text-white/80 text-xs">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Contact Us Now
          </button>
        </div>
      </div>
    </section>
  )
}
