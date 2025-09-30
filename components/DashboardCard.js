import React from 'react'
import Link from 'next/link'

export default function DashboardCard({ startup }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800'
      case 'building': return 'bg-yellow-100 text-yellow-800'
      case 'paused': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live': return '🟢'
      case 'building': return '🟡'
      case 'paused': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <Link href={`/dashboard/${startup.id}`}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${startup.color} rounded-xl flex items-center justify-center text-2xl`}>
              {startup.logo}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
              <p className="text-sm text-gray-600">{startup.domain}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(startup.status)}`}>
            {getStatusIcon(startup.status)} {startup.status}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-gray-600 mb-4">{startup.tagline}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{startup.signups}</div>
            <div className="text-xs text-gray-500">Signups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">${startup.revenue}</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{startup.traffic}</div>
            <div className="text-xs text-gray-500">Traffic</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Growth</span>
            <span>+{Math.round((startup.signups / startup.traffic) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${startup.color}`}
              style={{ width: `${Math.min((startup.signups / startup.traffic) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('View analytics')
            }}
            className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Analytics
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Edit settings')
            }}
            className="flex-1 py-2 px-3 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
          >
            Settings
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Launched {new Date(startup.launchDate).toLocaleDateString()}</span>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
