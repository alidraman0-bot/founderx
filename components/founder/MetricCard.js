import React from 'react'

export default function MetricCard({ title, value, change, changeType, icon, color }) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600'
  const changeIcon = changeType === 'positive' ? '↗' : '↘'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${changeColor}`}>
              {changeIcon} {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}
