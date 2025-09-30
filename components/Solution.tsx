export default function Solution() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">
            Meet Your AI Cofounder
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Always available, 24/7 guidance and support</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">YC-style knowledge and proven methodologies</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Validate ideas faster with AI-powered market research</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Clear MVP roadmap and development guidance</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Professional investor decks and pitch preparation</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-indigo-600 font-semibold text-lg">AI Cofounder</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="btn-primary">
              Start Building with FounderX
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
