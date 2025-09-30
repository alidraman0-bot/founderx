export default function LaunchCard({ launch }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Launch Setup</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Hosting & Infrastructure</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {launch.hosting.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{option.provider}</h5>
                  <span className="text-sm text-gray-500">{option.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">
                    ${option.price}/month
                  </span>
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Payment Processing</h4>
          <div className="space-y-3">
            {launch.payments.map((option, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-bold">{option.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{option.name}</h5>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Fee: {option.fee}</div>
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Setup
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Monetization Strategy</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {launch.monetization.map((strategy, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{strategy.type}</h5>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      ${strategy.revenue}/month
                    </div>
                    <div className="text-xs text-gray-500">
                      {strategy.timeline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-900">Launch Checklist</h4>
            <p className="text-sm text-gray-600">Complete these steps to launch your startup</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Launch Now
          </button>
        </div>
      </div>
    </div>
  );
}
