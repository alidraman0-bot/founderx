import React from 'react'

export default function Card({ title, children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
