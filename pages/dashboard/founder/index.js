import React, { useState } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import MetricCard from '@/components/founder/MetricCard'
import ChartCard from '@/components/founder/ChartCard'
import TrendingIdeas from '@/components/founder/TrendingIdeas'

export default function FounderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with actual API calls
  const metrics = [
    {
      title: 'Total Startups Launched',
      value: '247',
      change: '+12.5%',
      changeType: 'positive',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Founders',
      value: '1,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: '👥',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Signups',
      value: '12,456',
      change: '+23.1%',
      changeType: 'positive',
      icon: '📈',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Platform Revenue',
      value: '$45,678',
      change: '+15.7%',
      changeType: 'positive',
      icon: '💰',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const trendingIdeas = [
    { title: 'AI-Powered Code Review', industry: 'Developer Tools', score: 94, trend: 'up' },
    { title: 'Climate Data Analytics', industry: 'Climate Tech', score: 89, trend: 'up' },
    { title: 'Mental Health Chatbot', industry: 'Health Tech', score: 87, trend: 'up' },
    { title: 'Decentralized Identity', industry: 'Web3', score: 85, trend: 'up' },
    { title: 'Remote Team Analytics', industry: 'SaaS', score: 82, trend: 'up' }
  ]

  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1350 },
    { month: 'Mar', users: 1480 },
    { month: 'Apr', users: 1620 },
    { month: 'May', users: 1750 },
    { month: 'Jun', users: 1847 }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 35000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 41000 },
    { month: 'May', revenue: 43000 },
    { month: 'Jun', revenue: 45678 }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="User Growth"
          data={userGrowthData}
          type="line"
          color="blue"
        />
        <ChartCard
          title="Revenue Growth"
          data={revenueData}
          type="bar"
          color="green"
        />
      </div>

      {/* Trending Ideas */}
      <TrendingIdeas ideas={trendingIdeas} />
    </div>
  )

  return (
    <>
      <Head>
        <title>Founder Dashboard - FounderX</title>
        <meta name="description" content="FounderX Founder & CEO Dashboard - Mission Control Center" />
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
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Founder Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Mission control center for FounderX platform
                </p>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'users' && <div>User Management - Coming Soon</div>}
              {activeTab === 'startups' && <div>Startup Portfolio - Coming Soon</div>}
              {activeTab === 'financials' && <div>Financial Dashboard - Coming Soon</div>}
              {activeTab === 'signals' && <div>Signals & Trends - Coming Soon</div>}
              {activeTab === 'admin' && <div>Admin Controls - Coming Soon</div>}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
