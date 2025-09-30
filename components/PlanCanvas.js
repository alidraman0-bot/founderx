export default function PlanCanvas({ plan }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Lean Canvas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Problem</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.problem}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.solution}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Key Metrics</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.keyMetrics}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Unique Value Proposition</h4>
          <p className="text-gray-600 text-sm">{plan.uniqueValueProp}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Unfair Advantage</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.unfairAdvantage}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Channels</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.channels}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Customer Segments</h4>
          <p className="text-gray-600 text-sm mb-4">{plan.customerSegments}</p>
          
          <h4 className="font-medium text-gray-900 mb-2">Cost Structure</h4>
          <p className="text-gray-600 text-sm">{plan.costStructure}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-medium text-gray-900 mb-2">Revenue Streams</h4>
        <p className="text-gray-600 text-sm">{plan.revenueStreams}</p>
      </div>
    </div>
  );
}
