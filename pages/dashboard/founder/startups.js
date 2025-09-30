import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import StartupTile from '@/components/founder/StartupTile'

export default function StartupPortfolio() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('startups')
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [sortBy, setSortBy] = useState('recent') // recent, revenue, traction
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock startups data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setStartups([
        {
          id: 1,
          name: 'CodeReview AI',
          logo: '🤖',
          industry: 'Developer Tools',
          status: 'launched',
          description: 'AI-powered code review tool for developers',
          founder: 'Sarah Johnson',
          revenue: 12500,
          users: 2340,
          traction: 94,
          launchDate: '2024-01-15',
          website: 'https://codereview-ai.com',
          statusColor: 'bg-green-100 text-green-800'
        },
        {
          id: 2,
          name: 'ClimateTracker',
          logo: '🌱',
          industry: 'Climate Tech',
          status: 'growing',
          description: 'Real-time climate data analytics platform',
          founder: 'Mike Chen',
          revenue: 8900,
          users: 1560,
          traction: 87,
          launchDate: '2024-02-20',
          website: 'https://climatetracker.io',
          statusColor: 'bg-blue-100 text-blue-800'
        },
        {
          id: 3,
          name: 'HealthBot Pro',
          logo: '🏥',
          industry: 'Health Tech',
          status: 'mvp',
          description: 'AI chatbot for mental health support',
          founder: 'Emily Davis',
          revenue: 0,
          users: 120,
          traction: 76,
          launchDate: '2024-03-01',
          website: 'https://healthbot-pro.com',
          statusColor: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: 4,
          name: 'DeFi Identity',
          logo: '🔐',
          industry: 'Web3',
          status: 'idea',
          description: 'Decentralized identity management system',
          founder: 'Alex Rodriguez',
          revenue: 0,
          users: 0,
          traction: 82,
          launchDate: '2024-03-15',
          website: null,
          statusColor: 'bg-gray-100 text-gray-800'
        },
        {
          id: 5,
          name: 'TeamAnalytics',
          logo: '📊',
          industry: 'SaaS',
          status: 'launched',
          description: 'Remote team performance analytics',
          founder: 'Lisa Wang',
          revenue: 5600,
          users: 890,
          traction: 79,
          launchDate: '2024-01-28',
          website: 'https://teamanalytics.co',
          statusColor: 'bg-green-100 text-green-800'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const sortedStartups = [...startups].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return b.revenue - a.revenue
      case 'traction':
        return b.traction - a.traction
      case 'recent':
      default:
        return new Date(b.launchDate) - new Date(a.launchDate)
    }
  })

  const filteredStartups = filterStatus === 'all' 
    ? sortedStartups 
    : sortedStartups.filter(startup => startup.status === filterStatus)

  const stats = [
    { title: 'Total Startups', value: startups.length, icon: '🚀', color: 'from-blue-500 to-blue-600' },
    { title: 'Launched', value: startups.filter(s => s.status === 'launched').length, icon: '✅', color: 'from-green-500 to-green-600' },
    { title: 'Total Revenue', value: `$${startups.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}`, icon: '💰', color: 'from-purple-500 to-purple-600' },
    { title: 'Total Users', value: startups.reduce((sum, s) => sum + s.users, 0).toLocaleString(), icon: '👥', color: 'from-orange-500 to-orange-600' }
  ]

  return (
    <>
      <Head>
        <title>Startup Portfolio - Founder Dashboard</title>
        <meta name="description" content="View and manage all startups launched on FounderX" />
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
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Startup Portfolio</h1>
                <p className="text-gray-600 mt-2">
                  Monitor all startups launched on FounderX platform
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="recent">Sort by Recent</option>
                      <option value="revenue">Sort by Revenue</option>
                      <option value="traction">Sort by Traction</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="idea">Idea</option>
                      <option value="mvp">MVP</option>
                      <option value="launched">Launched</option>
                      <option value="growing">Growing</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Startups Grid/List */}
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading startups...</p>
                </div>
              ) : (
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }`}>
                  {filteredStartups.map((startup) => (
                    <StartupTile 
                      key={startup.id} 
                      startup={startup} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}

              {filteredStartups.length === 0 && !loading && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No startups found matching your criteria</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
