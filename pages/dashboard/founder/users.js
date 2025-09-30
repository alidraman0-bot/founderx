import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import DataTable from '@/components/founder/DataTable'

export default function UserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock users data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          plan: 'Pro',
          status: 'active',
          startupsLaunched: 3,
          ideasGenerated: 47,
          mvpsBuilt: 2,
          joinedDate: '2024-01-15',
          lastActive: '2 hours ago',
          avatar: 'SJ'
        },
        {
          id: 2,
          name: 'Mike Chen',
          email: 'mike@example.com',
          plan: 'Free',
          status: 'active',
          startupsLaunched: 1,
          ideasGenerated: 12,
          mvpsBuilt: 1,
          joinedDate: '2024-02-20',
          lastActive: '1 day ago',
          avatar: 'MC'
        },
        {
          id: 3,
          name: 'Emily Davis',
          email: 'emily@example.com',
          plan: 'Premium',
          status: 'active',
          startupsLaunched: 5,
          ideasGenerated: 89,
          mvpsBuilt: 4,
          joinedDate: '2023-12-10',
          lastActive: '30 minutes ago',
          avatar: 'ED'
        },
        {
          id: 4,
          name: 'Alex Rodriguez',
          email: 'alex@example.com',
          plan: 'Pro',
          status: 'suspended',
          startupsLaunched: 2,
          ideasGenerated: 23,
          mvpsBuilt: 1,
          joinedDate: '2024-01-05',
          lastActive: '1 week ago',
          avatar: 'AR'
        },
        {
          id: 5,
          name: 'Lisa Wang',
          email: 'lisa@example.com',
          plan: 'Free',
          status: 'active',
          startupsLaunched: 0,
          ideasGenerated: 8,
          mvpsBuilt: 0,
          joinedDate: '2024-03-01',
          lastActive: '3 days ago',
          avatar: 'LW'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = filterPlan === 'all' || user.plan.toLowerCase() === filterPlan.toLowerCase()
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesPlan && matchesStatus
  })

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user.avatar}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (user) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          user.plan === 'Free' ? 'bg-gray-100 text-gray-800' :
          user.plan === 'Pro' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {user.plan}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      )
    },
    {
      key: 'startupsLaunched',
      label: 'Startups',
      render: (user) => (
        <div className="text-center">
          <p className="font-medium text-gray-900">{user.startupsLaunched}</p>
          <p className="text-xs text-gray-500">launched</p>
        </div>
      )
    },
    {
      key: 'usage',
      label: 'Usage',
      render: (user) => (
        <div className="text-sm">
          <p className="text-gray-900">{user.ideasGenerated} ideas</p>
          <p className="text-gray-500">{user.mvpsBuilt} MVPs</p>
        </div>
      )
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      render: (user) => (
        <span className="text-sm text-gray-600">{user.lastActive}</span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Upgrade
          </button>
          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            Message
          </button>
          {user.status === 'active' ? (
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Suspend
            </button>
          ) : (
            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
              Activate
            </button>
          )}
        </div>
      )
    }
  ]

  const stats = [
    { title: 'Total Users', value: users.length, icon: '👥', color: 'from-blue-500 to-blue-600' },
    { title: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: '✅', color: 'from-green-500 to-green-600' },
    { title: 'Pro Subscribers', value: users.filter(u => u.plan === 'Pro' || u.plan === 'Premium').length, icon: '💎', color: 'from-purple-500 to-purple-600' },
    { title: 'Total Startups', value: users.reduce((sum, u) => sum + u.startupsLaunched, 0), icon: '🚀', color: 'from-orange-500 to-orange-600' }
  ]

  return (
    <>
      <Head>
        <title>User Management - Founder Dashboard</title>
        <meta name="description" content="Manage FounderX users and their subscriptions" />
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
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
                <p className="text-gray-600 mt-2">
                  Manage founders, subscriptions, and platform usage
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

              {/* Filters and Search */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Plans</option>
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="premium">Premium</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Users
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Founders ({filteredUsers.length})
                  </h2>
                </div>
                
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                  </div>
                ) : (
                  <DataTable 
                    data={filteredUsers} 
                    columns={columns}
                    emptyMessage="No users found matching your criteria"
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
