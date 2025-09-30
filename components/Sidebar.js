import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: '📊' },
  { name: 'Idea Discovery', href: '/idea-discovery', icon: '💡' },
  { name: 'Business Plan', href: '/business-plan', icon: '📋' },
  { name: 'MVP Builder', href: '/mvp-builder', icon: '🚀' },
  { name: 'Branding', href: '/branding', icon: '🎨' },
  { name: 'Launch', href: '/launch', icon: '🌍' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
  { name: 'Admin Panel', href: '/admin', icon: '🔧' }
]

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      onClose()
    }
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
            <h1 className="text-xl font-bold text-white">FounderX</h1>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-gray-400 hover:text-white"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">J</span>
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
