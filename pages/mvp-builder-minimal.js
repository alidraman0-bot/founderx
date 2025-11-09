import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MVPBuilderMinimal() {
  console.log('MVPBuilderMinimal component rendering')
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-12">
            
            {/* Simple Test Content */}
            <div className="bg-red-500 text-white p-8 text-center text-2xl font-bold mb-8">
              🚀 MVP Builder Minimal Test
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                MVP Builder Page
              </h1>
              <p className="text-gray-600 mb-6">
                This is a minimal version to test if the page loads correctly.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  Test Configuration
                </h2>
                <p className="text-blue-800">
                  If you can see this content, the MVP Builder page is working!
                </p>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}
