import React from 'react'

export default function StartupTile({ startup, viewMode }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'idea': return '💡'
      case 'mvp': return '🔨'
      case 'launched': return '🚀'
      case 'growing': return '📈'
      default: return '❓'
    }
  }

  const formatRevenue = (revenue) => {
    if (revenue === 0) return 'No revenue'
    if (revenue < 1000) return `$${revenue}`
    if (revenue < 1000000) return `$${(revenue / 1000).toFixed(1)}k`
    return `$${(revenue / 1000000).toFixed(1)}M`
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
              {startup.logo}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
              <p className="text-sm text-gray-600">{startup.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">by {startup.founder}</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${startup.statusColor}`}>
                  {getStatusIcon(startup.status)} {startup.status}
                </span>
                <span className="text-sm text-gray-500">{startup.industry}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{formatRevenue(startup.revenue)}</p>
              <p className="text-xs text-gray-500">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{startup.users.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Users</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{startup.traction}</p>
              <p className="text-xs text-gray-500">Traction</p>
            </div>
            <div className="flex space-x-2">
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
          {startup.logo}
        </div>
        <div className="flex items-center space-x-2">
          {startup.website && (
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{startup.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{startup.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${startup.statusColor}`}>
            {getStatusIcon(startup.status)} {startup.status}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
            {startup.industry}
          </span>
        </div>

        <p className="text-sm text-gray-500">by {startup.founder}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{formatRevenue(startup.revenue)}</p>
          <p className="text-xs text-gray-500">Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{startup.users.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Users</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{startup.traction}</p>
          <p className="text-xs text-gray-500">Traction</p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Launched {new Date(startup.launchDate).toLocaleDateString()}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
