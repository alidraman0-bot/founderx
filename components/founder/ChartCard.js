import React from 'react'

export default function ChartCard({ title, data, type, color }) {
  // Simple chart implementation - replace with actual chart library
  const maxValue = Math.max(...data.map(d => d.users || d.revenue))
  const chartColor = color === 'blue' ? 'bg-blue-500' : 'bg-green-500'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${chartColor}`}></div>
          <span className="text-sm text-gray-600">Last 6 months</span>
        </div>
      </div>

      {/* Simple bar chart visualization */}
      <div className="h-48 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const height = ((item.users || item.revenue) / maxValue) * 100
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full ${chartColor} rounded-t-lg transition-all duration-300 hover:opacity-80`}
                style={{ height: `${height}%` }}
                title={`${item.month}: ${item.users || item.revenue}`}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{item.month}</span>
            </div>
          )
        })}
      </div>

      {/* Chart stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Average Growth</span>
          <span className="font-medium text-gray-900">
            {color === 'blue' ? '+12.5%' : '+18.3%'}
          </span>
        </div>
      </div>
    </div>
  )
}
