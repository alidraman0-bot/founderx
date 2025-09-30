import React from 'react'

export default function StatsCard({ icon, label, value, change, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">{icon}</span>
            <p className="text-sm font-medium text-gray-600">{label}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 font-medium">{change}</p>
          )}
        </div>
      </div>
    </div>
  )
}
