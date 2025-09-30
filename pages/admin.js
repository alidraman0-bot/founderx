import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const { user, logout } = useAuth()

  // Sample data for admin dashboard
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12.5%', 
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Active Subscriptions', 
      value: '1,234', 
      change: '+8.2%', 
      icon: '💳',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Revenue (MTD)', 
      value: '$45,678', 
      change: '+23.1%', 
      icon: '💰',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Ideas Generated', 
      value: '12,456', 
      change: '+15.7%', 
      icon: '💡',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Pro', joined: '2 hours ago', status: 'active' },
    { id: 2, name: 'Mike Chen', email: 'mike@example.com', plan: 'Free', joined: '4 hours ago', status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', plan: 'Pro', joined: '6 hours ago', status: 'active' },
    { id: 4, name: 'Alex Rodriguez', email: 'alex@example.com', plan: 'Free', joined: '8 hours ago', status: 'pending' },
    { id: 5, name: 'Lisa Wang', email: 'lisa@example.com', plan: 'Pro', joined: '12 hours ago', status: 'active' }
  ]

  const systemHealth = [
    { service: 'API Server', status: 'healthy', uptime: '99.9%', response: '120ms' },
    { service: 'Database', status: 'healthy', uptime: '99.8%', response: '45ms' },
    { service: 'AI Services', status: 'healthy', uptime: '99.7%', response: '890ms' },
    { service: 'Payment Gateway', status: 'healthy', uptime: '99.9%', response: '200ms' }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💹</span>
              </div>
              <p className="text-gray-600">Revenue chart would go here</p>
              <p className="text-sm text-gray-500">Monthly recurring revenue tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'Sarah Johnson', time: '2 minutes ago', type: 'user' },
              { action: 'Pro subscription activated', user: 'Mike Chen', time: '15 minutes ago', type: 'subscription' },
              { action: 'AI idea generated', user: 'Emily Davis', time: '1 hour ago', type: 'ai' },
              { action: 'Payment processed', user: 'Alex Rodriguez', time: '2 hours ago', type: 'payment' },
              { action: 'Support ticket created', user: 'Lisa Wang', time: '3 hours ago', type: 'support' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'subscription' ? 'bg-green-100' :
                  activity.type === 'ai' ? 'bg-purple-100' :
                  activity.type === 'payment' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <span className="text-sm">
                    {activity.type === 'user' ? '👤' :
                     activity.type === 'subscription' ? '💳' :
                     activity.type === 'ai' ? '🤖' :
                     activity.type === 'payment' ? '💰' : '🎫'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage users, subscriptions, and permissions</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Users
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add User
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.plan === 'Pro' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-gray-600">Detailed analytics and performance metrics</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Engagement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Daily Active Users</span>
              <span className="text-sm font-medium">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weekly Active Users</span>
              <span className="text-sm font-medium">8,567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Active Users</span>
              <span className="text-sm font-medium">12,456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Session Duration</span>
              <span className="text-sm font-medium">24m 32s</span>
            </div>
          </div>
        </div>

        {/* Feature Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Usage</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Idea Generation</span>
              <span className="text-sm font-medium">8,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Business Plans</span>
              <span className="text-sm font-medium">3,456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">MVP Builder</span>
              <span className="text-sm font-medium">1,789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Branding Tools</span>
              <span className="text-sm font-medium">2,345</span>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{service.service}</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="FounderX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Plan</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Free</option>
                <option>Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Enable maintenance mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens per Request</label>
              <input
                type="number"
                defaultValue="4000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Model</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>gpt-4</option>
                <option>gpt-3.5-turbo</option>
                <option>claude-3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Admin Dashboard - FounderX</title>
        <meta name="description" content="FounderX Admin Dashboard - Manage users, analytics, and system settings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-gray-50">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Admin Topbar */}
          <AdminTopbar onMenuClick={() => setSidebarOpen(true)} user={user} />

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {activeTab === 'overview' && 'Admin Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'analytics' && 'Analytics & Insights'}
                  {activeTab === 'settings' && 'System Settings'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'overview' && 'Monitor system performance and key metrics'}
                  {activeTab === 'users' && 'Manage user accounts and subscriptions'}
                  {activeTab === 'analytics' && 'View detailed analytics and insights'}
                  {activeTab === 'settings' && 'Configure system settings and preferences'}
                </p>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
