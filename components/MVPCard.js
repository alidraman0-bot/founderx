export default function MVPCard({ mvp }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">MVP Options</h3>
      
      <div className="space-y-4">
        {mvp.options.map((option, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{option.type}</h4>
                <p className="text-gray-600 text-sm mt-1">{option.description}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  ${option.price}
                </div>
                <div className="text-xs text-gray-500">
                  {option.timeframe}
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Features:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-900">Recommended MVP</h4>
            <p className="text-gray-600 text-sm">{mvp.recommendation}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Build MVP
          </button>
        </div>
      </div>
    </div>
  );
}
