import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
// @ts-ignore - TypeScript resolves to .tsx file, but we need the .js file
import Sidebar from '../components/Sidebar.js'
import Topbar from '../components/Topbar'

// Mock data - empty by default
const MOCK_APPS: any[] = []

const TEMPLATES = [
  'Africa Remittance Tracker',
  'Small Business Invoice',
  'Startup Launchpad',
  'Personal Finance Manager',
  'Cross-Border Payments Hub',
  'Project Management Tool',
]

export default function MVPBuilder() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [apps, setApps] = useState(MOCK_APPS)
  const [appPrompt, setAppPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showStylingInstructions, setShowStylingInstructions] = useState(false)

  // Load apps from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedApps = localStorage.getItem('builder_apps')
      if (savedApps) {
        try {
          setApps(JSON.parse(savedApps))
        } catch (e) {
          console.error('Failed to load apps:', e)
        }
      }
    }
  }, [])

  const handleCreateApp = async () => {
    if (!appPrompt.trim()) return

    setIsGenerating(true)

    try {
      // Create a new app
      const newApp = {
        id: String(Date.now()),
        name: appPrompt.substring(0, 60) || 'Untitled App',
        description: appPrompt,
        icon: appPrompt.charAt(0).toUpperCase() || 'A',
        color: 'from-green-500 to-blue-600',
        updatedAt: 'Just now',
        prompt: appPrompt,
        createdAt: new Date().toISOString(),
      }

      // Save to state
      const updatedApps = [newApp, ...apps]
      setApps(updatedApps)

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('builder_apps', JSON.stringify(updatedApps))
        // Also save the current app being created
        localStorage.setItem(`builder_app_${newApp.id}`, JSON.stringify(newApp))
      }

      // Clear prompt
      setAppPrompt('')

      // Navigate to editor
      router.push(`/builder/editor/${newApp.id}`)
    } catch (error) {
      console.error('Failed to create app:', error)
      alert('Failed to create app. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateClick = (template: string) => {
    setAppPrompt(`Create a ${template}`)
  }

  return (
    <>
      <Head>
        <title>MVP Builder - FounderX</title>
        <meta name="description" content="Build full-stack web apps with AI" />
      </Head>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Topbar */}
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="max-w-5xl mx-auto px-6 py-12">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  What would you build today?
                </h1>
                <p className="text-lg text-gray-600">
                  Describe your app idea below or get inspired by our{' '}
                  <button className="text-green-600 hover:text-blue-600 font-medium underline">
                    templates
                  </button>
                </p>
              </div>

              {/* Main Input Area */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                <div className="relative">
                  <textarea
                    value={appPrompt}
                    onChange={(e) => setAppPrompt(e.target.value)}
                    placeholder="Describe the app you want to create..."
                    className="w-full h-48 px-6 py-4 text-lg text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                  />

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setShowStylingInstructions(!showStylingInstructions)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <span className="font-medium">Styling Instructions</span>
                    </button>

                    <button
                      onClick={handleCreateApp}
                      disabled={!appPrompt.trim() || isGenerating}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Styling Instructions Panel */}
                {showStylingInstructions && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-gray-700">
                      Add styling instructions like "modern", "minimal", "glassmorphism", or "claymorphism" to customize your app's design.
                    </p>
                  </div>
                )}
              </div>

              {/* Template Suggestions */}
              <div className="flex flex-wrap gap-3 justify-center mb-16">
                {TEMPLATES.map((template) => (
                  <button
                    key={template}
                    onClick={() => handleTemplateClick(template)}
                    className="px-5 py-2.5 bg-white hover:bg-green-50 border border-green-200 rounded-full text-sm font-medium text-gray-700 hover:text-green-700 transition-colors shadow-sm hover:shadow"
                  >
                    {template}
                  </button>
                ))}
              </div>

              {/* Recent Apps Section */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Apps</h2>
                  <Link href="#" className="text-green-600 hover:text-blue-600 font-semibold">
                    View all
                  </Link>
                </div>

                {apps.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No apps yet. Create your first app above!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map((app) => (
                      <Link
                        key={app.id}
                        href={`/builder/editor/${app.id}`}
                        className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-green-300 transition-all"
                      >
                        {/* App Icon */}
                        <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <span className="text-white font-bold text-2xl">{app.icon}</span>
                        </div>

                        {/* App Info */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {app.description}
                        </p>

                        {/* Metadata */}
                        <div className="text-xs text-gray-500">
                          Updated {app.updatedAt}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
