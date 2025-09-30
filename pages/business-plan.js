import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'

export default function BusinessPlan() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Business Plan Generator" 
              description="Create comprehensive business plans with AI assistance"
              action={<Button>Create New Plan</Button>}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Plan Templates">
                <p className="text-gray-600 mb-4">Choose from various business plan templates.</p>
                <Button variant="outline">Browse Templates</Button>
              </Card>
              
              <Card title="AI Assistant">
                <p className="text-gray-600 mb-4">Get AI help with your business plan structure.</p>
                <Button>Start Planning</Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}