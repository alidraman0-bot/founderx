import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import ToggleSwitch from '@/components/founder/ToggleSwitch'

export default function AdminControls() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('admin')
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  // Mock settings data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setSettings({
        // Content Management
        landingPageTitle: 'FounderX - Build Your Startup Faster with AI',
        landingPageDescription: 'FounderX is your AI cofounder. From idea to MVP to investor pitch — guided like a world-class accelerator mentor.',
        maintenanceMode: false,
        
        // API Management
        googleApiEnabled: true,
        hackerNewsApiEnabled: true,
        redditApiEnabled: true,
        stripeApiEnabled: true,
        
        // Feature Flags
        aiIdeasEnabled: true,
        mvpBuilderEnabled: true,
        brandingToolsEnabled: true,
        analyticsEnabled: true,
        
        // Notifications
        lastNotification: {
          title: 'New MVP Builder Feature',
          body: 'We\'ve added advanced analytics to the MVP Builder!',
          audience: 'all',
          sentAt: '2024-03-15T10:30:00Z'
        }
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // Implement save logic
    console.log('Saving settings:', settings)
  }

  const sendNotification = () => {
    // Implement notification sending
    console.log('Sending notification')
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin controls...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Controls - Founder Dashboard</title>
        <meta name="description" content="Manage FounderX platform settings and features" />
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
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Controls</h1>
                <p className="text-gray-600 mt-2">
                  Manage platform settings, features, and content
                </p>
              </div>

              {/* Content Management */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landing Page Title
                    </label>
                    <input
                      type="text"
                      value={settings.landingPageTitle || ''}
                      onChange={(e) => handleSettingChange('landingPageTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance Mode
                    </label>
                    <div className="flex items-center">
                      <ToggleSwitch
                        enabled={settings.maintenanceMode || false}
                        onChange={(enabled) => handleSettingChange('maintenanceMode', enabled)}
                      />
                      <span className="ml-3 text-sm text-gray-600">
                        {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landing Page Description
                  </label>
                  <textarea
                    value={settings.landingPageDescription || ''}
                    onChange={(e) => handleSettingChange('landingPageDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* API Management */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">API Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">🔍</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Google API</p>
                        <p className="text-sm text-gray-600">Search and news data</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.googleApiEnabled || false}
                      onChange={(enabled) => handleSettingChange('googleApiEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600">📰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Hacker News API</p>
                        <p className="text-sm text-gray-600">Tech discussions</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.hackerNewsApiEnabled || false}
                      onChange={(enabled) => handleSettingChange('hackerNewsApiEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600">💬</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Reddit API</p>
                        <p className="text-sm text-gray-600">Community trends</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.redditApiEnabled || false}
                      onChange={(enabled) => handleSettingChange('redditApiEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">💳</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Stripe API</p>
                        <p className="text-sm text-gray-600">Payment processing</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.stripeApiEnabled || false}
                      onChange={(enabled) => handleSettingChange('stripeApiEnabled', enabled)}
                    />
                  </div>
                </div>
              </div>

              {/* Feature Flags */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Feature Flags</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600">💡</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">AI Ideas Generator</p>
                        <p className="text-sm text-gray-600">AI-powered idea generation</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.aiIdeasEnabled || false}
                      onChange={(enabled) => handleSettingChange('aiIdeasEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">🚀</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">MVP Builder</p>
                        <p className="text-sm text-gray-600">MVP development tools</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.mvpBuilderEnabled || false}
                      onChange={(enabled) => handleSettingChange('mvpBuilderEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600">🎨</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Branding Tools</p>
                        <p className="text-sm text-gray-600">Logo and brand generation</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.brandingToolsEnabled || false}
                      onChange={(enabled) => handleSettingChange('brandingToolsEnabled', enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600">📊</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Analytics Dashboard</p>
                        <p className="text-sm text-gray-600">User analytics and insights</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.analyticsEnabled || false}
                      onChange={(enabled) => handleSettingChange('analyticsEnabled', enabled)}
                    />
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Broadcast Notifications</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter notification title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter notification message..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Users</option>
                      <option value="pro">Pro Users Only</option>
                      <option value="premium">Premium Users Only</option>
                      <option value="free">Free Users Only</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={sendNotification}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Notification
                  </button>
                </div>

                {/* Last Notification */}
                {settings.lastNotification && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Last Notification Sent</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{settings.lastNotification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{settings.lastNotification.body}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          Audience: {settings.lastNotification.audience}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(settings.lastNotification.sentAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save All Settings
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
