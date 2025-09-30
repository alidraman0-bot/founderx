export default function BrandingCard({ branding }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Brand Identity</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {branding.logo}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{branding.name}</h4>
            <p className="text-gray-600 mt-2">{branding.tagline}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Brand Colors</h5>
              <div className="flex space-x-2">
                {branding.colors.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-600">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Typography</h5>
              <p className="text-sm text-gray-600">{branding.typography}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Brand Personality</h5>
            <div className="flex flex-wrap gap-2 mb-4">
              {branding.personality.map((trait, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Target Audience</h5>
            <p className="text-sm text-gray-600 mb-4">{branding.targetAudience}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Brand Voice</h5>
            <p className="text-sm text-gray-600">{branding.brandVoice}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Generate New Brand
        </button>
      </div>
    </div>
  );
}
