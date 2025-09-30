import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const founderNavigation = [
  { name: 'Global Overview', id: 'overview', icon: '📊', href: '/dashboard/founder' },
  { name: 'User Management', id: 'users', icon: '👥', href: '/dashboard/founder/users' },
  { name: 'Startup Portfolio', id: 'startups', icon: '🚀', href: '/dashboard/founder/startups' },
  { name: 'Financial Dashboard', id: 'financials', icon: '💰', href: '/dashboard/founder/financials' },
  { name: 'Signals & Trends', id: 'signals', icon: '📈', href: '/dashboard/founder/signals' },
  { name: 'Admin Controls', id: 'admin', icon: '⚙️', href: '/dashboard/founder/admin' }
]

export default function FounderSidebar({ isOpen, onClose, activeTab, onTabChange }) {
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
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">FounderX</h1>
                  <p className="text-xs text-gray-500">Founder Dashboard</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-gray-400 hover:text-gray-600"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {founderNavigation.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              )
            })}
          </nav>

          {/* Founder Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">CEO</span>
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Founder & CEO</p>
                  <p className="text-xs text-gray-500">founder@founderx.com</p>
                </div>
              )}
            </div>
          </div>

          {/* Back to Main App */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/dashboard"
              onClick={handleLinkClick}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              <span className="text-lg mr-3">🏠</span>
              {!collapsed && <span>Back to User Dashboard</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
