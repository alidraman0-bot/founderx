import React from 'react'

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:scale-105 hover:shadow-lg focus:ring-purple-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
