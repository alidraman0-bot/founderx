import React from 'react'

export default function SectionHeader({ 
  title, 
  description, 
  action,
  className = '' 
}) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}
