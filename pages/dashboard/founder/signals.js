import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import ChartCard from '@/components/founder/ChartCard'

export default function SignalsTrends() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('signals')
  const [signals, setSignals] = useState([])
  const [trendingKeywords, setTrendingKeywords] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock signals data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setSignals([
        {
          id: 1,
          title: 'AI-Powered Code Review Tool',
          industry: 'Developer Tools',
          traction: 94,
          timestamp: '2 hours ago',
          source: 'Hacker News',
          description: 'Automated code review using machine learning'
        },
        {
          id: 2,
          title: 'Climate Data Analytics Platform',
          industry: 'Climate Tech',
          traction: 89,
          timestamp: '4 hours ago',
          source: 'Reddit',
          description: 'Real-time climate monitoring and analysis'
        },
        {
          id: 3,
          title: 'Mental Health Chatbot',
          industry: 'Health Tech',
          traction: 87,
          timestamp: '6 hours ago',
          source: 'Google News',
          description: 'AI-powered mental health support system'
        },
        {
          id: 4,
          title: 'Decentralized Identity Management',
          industry: 'Web3',
          traction: 85,
          timestamp: '8 hours ago',
          source: 'Hacker News',
          description: 'Self-sovereign identity solutions'
        },
        {
          id: 5,
          title: 'Remote Team Analytics',
          industry: 'SaaS',
          traction: 82,
          timestamp: '12 hours ago',
          source: 'Reddit',
          description: 'Productivity tracking for distributed teams'
        }
      ])

      setTrendingKeywords([
        { keyword: 'AI', count: 156, trend: 'up' },
        { keyword: 'Climate', count: 89, trend: 'up' },
        { keyword: 'Web3', count: 78, trend: 'down' },
        { keyword: 'HealthTech', count: 67, trend: 'up' },
        { keyword: 'SaaS', count: 54, trend: 'stable' },
        { keyword: 'Fintech', count: 43, trend: 'up' },
        { keyword: 'EdTech', count: 38, trend: 'down' },
        { keyword: 'DevTools', count: 32, trend: 'up' }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const industryData = [
    { industry: 'AI Tools', count: 45, percentage: 25 },
    { industry: 'Climate Tech', count: 32, percentage: 18 },
    { industry: 'Health Tech', count: 28, percentage: 16 },
    { industry: 'Web3', count: 24, percentage: 13 },
    { industry: 'SaaS', count: 22, percentage: 12 },
    { industry: 'Fintech', count: 18, percentage: 10 },
    { industry: 'EdTech', count: 11, percentage: 6 }
  ]

  const getIndustryColor = (industry) => {
    const colors = {
      'Developer Tools': 'bg-blue-100 text-blue-800',
      'Climate Tech': 'bg-green-100 text-green-800',
      'Health Tech': 'bg-red-100 text-red-800',
      'Web3': 'bg-purple-100 text-purple-800',
      'SaaS': 'bg-gray-100 text-gray-800',
      'AI': 'bg-orange-100 text-orange-800',
      'Fintech': 'bg-yellow-100 text-yellow-800'
    }
    return colors[industry] || 'bg-gray-100 text-gray-800'
  }

  const getTractionColor = (traction) => {
    if (traction >= 90) return 'text-green-600'
    if (traction >= 80) return 'text-blue-600'
    if (traction >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <>
      <Head>
        <title>Signals & Trends - Founder Dashboard</title>
        <meta name="description" content="Monitor trending startup ideas and market signals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-gray-50">
        {/* Founder Sidebar */}
        <FounderSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Founder Navbar */}
          <FounderNavbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Signals & Trends</h1>
                <p className="text-gray-600 mt-2">
                  Monitor trending startup ideas and market signals across platforms
                </p>
              </div>

              {/* Live Signals Feed */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Live Signals Feed</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>

                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading signals...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {signals.map((signal) => (
                      <div key={signal.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">
                            {signal.traction}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{signal.title}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getIndustryColor(signal.industry)}`}>
                              {signal.industry}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{signal.source}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{signal.timestamp}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs font-medium ${getTractionColor(signal.traction)}`}>
                                Traction: {signal.traction}
                              </span>
                              <button className="text-xs text-blue-600 hover:text-blue-800">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Industry Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Industries by Traction</h3>
                  <div className="space-y-4">
                    {industryData.map((industry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-red-500' :
                            index === 3 ? 'bg-purple-500' :
                            index === 4 ? 'bg-gray-500' :
                            index === 5 ? 'bg-yellow-500' :
                            'bg-orange-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{industry.industry}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                index === 2 ? 'bg-red-500' :
                                index === 3 ? 'bg-purple-500' :
                                index === 4 ? 'bg-gray-500' :
                                index === 5 ? 'bg-yellow-500' :
                                'bg-orange-500'
                              }`}
                              style={{ width: `${industry.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12 text-right">
                            {industry.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Keywords */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Keywords</h3>
                  <div className="space-y-3">
                    {trendingKeywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">#{keyword.keyword}</span>
                          <span className={`text-xs font-medium ${getTrendColor(keyword.trend)}`}>
                            {getTrendIcon(keyword.trend)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{keyword.count} mentions</span>
                          <div className={`w-2 h-2 rounded-full ${
                            keyword.trend === 'up' ? 'bg-green-500' :
                            keyword.trend === 'down' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📰</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Hacker News</h4>
                    <p className="text-sm text-gray-600">Tech startup discussions and launches</p>
                    <div className="mt-2">
                      <span className="text-xs text-green-600">● Active</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💬</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Reddit</h4>
                    <p className="text-sm text-gray-600">Community discussions and trends</p>
                    <div className="mt-2">
                      <span className="text-xs text-green-600">● Active</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Google News</h4>
                    <p className="text-sm text-gray-600">News articles and press coverage</p>
                    <div className="mt-2">
                      <span className="text-xs text-green-600">● Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
