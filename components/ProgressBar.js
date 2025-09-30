import React from 'react'

export default function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  className = '' 
}) {
  const percentage = Math.min((value / max) * 100, 100)
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
