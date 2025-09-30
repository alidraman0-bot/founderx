import React from 'react'

export default function ActivityItem({ icon, description, timestamp, className = '' }) {
  return (
    <div className={`flex items-start space-x-3 p-4 border-l-4 border-gray-200 hover:bg-gray-50 transition-colors duration-200 ${className}`}>
      <div className="flex-shrink-0">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  )
}
