import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Settings" 
              description="Manage your account and application preferences"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Account Settings">
                <p className="text-gray-600 mb-4">Update your profile and account information.</p>
                <Button variant="outline">Edit Profile</Button>
              </Card>
              
              <Card title="Preferences">
                <p className="text-gray-600 mb-4">Customize your dashboard and notifications.</p>
                <Button>Update Preferences</Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
