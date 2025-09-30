import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const adminNavigation = [
  { name: 'Overview', id: 'overview', icon: '📊' },
  { name: 'User Management', id: 'users', icon: '👥' },
  { name: 'Analytics', id: 'analytics', icon: '📈' },
  { name: 'System Settings', id: 'settings', icon: '⚙️' },
  { name: 'Content Management', id: 'content', icon: '📝' },
  { name: 'Billing & Payments', id: 'billing', icon: '💳' },
  { name: 'Support Tickets', id: 'support', icon: '🎫' },
  { name: 'API Management', id: 'api', icon: '🔌' },
  { name: 'Security', id: 'security', icon: '🔒' },
  { name: 'Logs & Monitoring', id: 'logs', icon: '📋' }
]

export default function AdminSidebar({ isOpen, onClose, activeTab, onTabChange }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const handleTabClick = (tabId) => {
    onTabChange(tabId)
    handleLinkClick()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {!collapsed && <h1 className="text-xl font-bold text-white">Admin</h1>}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-gray-400 hover:text-white"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {adminNavigation.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              )
            })}
          </nav>

          {/* Admin Info */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">admin@founderx.com</p>
                </div>
              )}
            </div>
          </div>

          {/* Back to Main App */}
          <div className="p-4 border-t border-gray-800">
            <Link
              href="/dashboard"
              onClick={handleLinkClick}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
            >
              <span className="text-lg mr-3">🏠</span>
              {!collapsed && <span>Back to App</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
