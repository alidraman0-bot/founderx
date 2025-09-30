export default function Problem() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">
            Why Do 90% of Startups Fail?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Founders waste months building the wrong product without proper validation</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">No access to world-class mentorship and accelerator knowledge</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Can't raise money because they don't know how to pitch investors effectively</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-gray-700">Top accelerators are too selective and expensive for most entrepreneurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
