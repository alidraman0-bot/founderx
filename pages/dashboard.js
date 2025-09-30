import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Button from '../components/Button'
import ProgressTracker from '../components/ProgressTracker'
import StatsCard from '../components/StatsCard'
import ActivityItem from '../components/ActivityItem'
import SavedIdeasCard from '../components/SavedIdeasCard'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const userName = user?.name || "Guest User"

  // Sample saved ideas data
  const [savedIdeas, setSavedIdeas] = useState([
    {
      id: '1',
      title: 'AI-Powered Marketing Assistant',
      tagline: 'Automate your marketing campaigns with intelligent AI.',
      problem: 'Small businesses struggle with complex and time-consuming marketing tasks.',
      customer: 'Small business owners, marketing agencies.',
      marketPotential: 9,
    },
    {
      id: '2',
      title: 'Eco-Friendly Delivery Network',
      tagline: 'Sustainable last-mile delivery for urban areas.',
      problem: 'High carbon footprint and inefficiency in urban logistics.',
      customer: 'Eco-conscious consumers, local businesses.',
      marketPotential: 7,
    },
    {
      id: '3',
      title: 'Personalized Learning Platform',
      tagline: 'Adaptive education tailored to individual student needs.',
      problem: 'One-size-fits-all education fails to engage diverse learners.',
      customer: 'K-12 students, lifelong learners, educational institutions.',
      marketPotential: 8,
    }
  ])

  const handleRemoveIdea = (ideaId) => {
    setSavedIdeas(prev => prev.filter(idea => idea.id !== ideaId))
  }

  const stats = [
    { icon: '💡', label: 'Ideas Generated', value: '47', change: '+12%' },
    { icon: '📋', label: 'Plans Created', value: '23', change: '+8%' },
    { icon: '🚀', label: 'MVPs Built', value: '12', change: '+15%' },
    { icon: '💰', label: 'Revenue', value: '$0', change: 'Start earning' }
  ]

  const recentActivities = [
    { icon: '💡', description: 'Generated new SaaS idea for fitness tracking', timestamp: '2h ago' },
    { icon: '📋', description: 'Created business plan for "TaskMaster Pro"', timestamp: '4h ago' },
    { icon: '🚀', description: 'Built MVP for email automation tool', timestamp: '1d ago' },
    { icon: '🎨', description: 'Generated branding assets for "DataViz"', timestamp: '2d ago' },
    { icon: '🌍', description: 'Launched "CodeHelper" to production', timestamp: '3d ago' }
  ]

  const quickActions = [
    { title: 'Generate New Idea', href: '/idea-discovery', icon: '💡' },
    { title: 'Create Plan', href: '/business-plan', icon: '📋' },
    { title: 'Build MVP', href: '/mvp-builder', icon: '🚀' }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                <p className="text-gray-600 mt-1">Your startup journey at a glance.</p>
                <p className="text-lg text-gray-700 mt-2">👋 Welcome back, {userName}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Upgrade to Pro
                </Button>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="mb-8">
              <ProgressTracker currentStage="idea" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  change={stat.change}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Activity Feed */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {recentActivities.map((activity, index) => (
                      <ActivityItem
                        key={index}
                        icon={activity.icon}
                        description={activity.description}
                        timestamp={activity.timestamp}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.href}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 hover:scale-105 transition-all duration-200">
                          <span className="mr-2">{action.icon}</span>
                          {action.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Saved Ideas */}
                <SavedIdeasCard ideas={savedIdeas} onRemoveIdea={handleRemoveIdea} />

                {/* AI Cofounder Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Cofounder</h3>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Your AI cofounder is analyzing market trends and generating new opportunities.
                    </p>
                    <Button variant="outline" className="w-full">
                      Chat with AI
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}