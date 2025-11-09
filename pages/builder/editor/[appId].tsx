import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AppEditor() {
  const router = useRouter()
  const { appId } = router.query

  // State
  const [appName, setAppName] = useState('untitled')
  const [appPrompt, setAppPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [appBuilt, setAppBuilt] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'preview'>('preview')

  // Load app data from localStorage
  useEffect(() => {
    if (appId && typeof window !== 'undefined') {
      try {
      const appData = localStorage.getItem(`builder_app_${appId}`)
        if (appData && appData.trim().length > 0) {
        try {
          const app = JSON.parse(appData)
          setAppName(app.name || 'untitled')
          setAppPrompt(app.prompt || app.description || '')

          // Add initial assistant message if there's a prompt
          if (app.prompt) {
            setChatMessages([{
              id: '1',
              role: 'assistant',
              content: 'I\'m ready to help you build this app! What would you like to start with?',
              timestamp: new Date(),
            }])
          }
          } catch (parseError) {
            console.error('Failed to parse app data from localStorage:', parseError)
            console.error('Raw data:', appData.substring(0, 100))
            // Set defaults if parsing fails
            setAppName('untitled')
            setAppPrompt('')
          }
        } else {
          // No app data found, set defaults
          setAppName('untitled')
          setAppPrompt('')
        }
      } catch (e) {
        console.error('Failed to load app data:', e)
        // Set defaults on any error
        setAppName('untitled')
        setAppPrompt('')
      }
    }
  }, [appId])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }
    setChatMessages([...chatMessages, userMessage])
    setInputMessage('')
    setIsProcessing(true)

    try {
      // Call AI API
      const response = await fetch('/api/builder/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          prompt: inputMessage,
          schema: {},
        }),
      })

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text()
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText || `HTTP ${response.status}` }
        }
        throw new Error(errorData.message || errorData.error || 'Failed to process command')
      }

      // Parse JSON response
      let data
      const responseText = await response.text()
      if (!responseText || responseText.trim().length === 0) {
        throw new Error('Empty response from server')
      }

      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        console.error('Response text:', responseText.substring(0, 200))
        throw new Error('Invalid response from server')
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'I\'ve updated your app!',
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, assistantMessage])

      // Mark app as built after first successful response
      setAppBuilt(true)
    } catch (error) {
      console.error('AI command error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Editor - Base Builder</title>
      </Head>

      <div className="h-screen flex bg-gray-50">
        {/* Left Sidebar - Chat */}
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Link href="/mvp-builder" className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <span className="text-white font-bold text-xl">B</span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('App menu - coming soon!')}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="App menu"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-700">{appName}</span>
                <button
                  onClick={() => alert('Switch app - coming soon!')}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Switch app"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => alert('Help & Documentation - coming soon!')}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Help"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Original Prompt - Only show if exists */}
          {appPrompt && (
            <div className="p-4 border-b border-gray-200">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {appPrompt}
                </p>
                <p className="text-xs text-gray-500 mt-3">a few seconds ago</p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {chatMessages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  {message.role === 'assistant' ? (
                    <>
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">B</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Base44</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">U</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">You</span>
                    </>
                  )}
                </div>
                <div className="ml-8">
                  <p className="text-sm text-gray-800">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-2">a few seconds ago</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Base44</span>
                </div>
                <div className="ml-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600">thinking</span>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="What would you like to change?"
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                disabled={isProcessing}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => alert('Settings panel - coming soon!')}
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                title="Settings"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={() => alert('Add attachment - coming soon!')}
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                title="Add attachment"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={() => alert('Discuss mode - coming soon!')}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-sm text-white font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Discuss</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content - Preview */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {/* App Builder Navbar - Only show when app is built */}
          {appBuilt && (
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {/* App Icon & Name */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{appName.charAt(0).toUpperCase()}</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:bg-gray-100 px-2 py-1 rounded">
                    {appName}
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                  <button className="p-2 hover:bg-gray-100 rounded" title="Undo">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Redo">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Responsive view">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                {/* View Tabs */}
                <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                      activeView === 'dashboard'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveView('preview')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                      activeView === 'preview'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Preview
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Refresh preview">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded" title="Code">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded" title="Settings">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Share
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                  Publish
                </button>
              </div>
            </div>
          )}

          {/* Empty/Ready State or App Preview */}
          <div className="flex-1 flex items-center justify-center">
            {!appBuilt ? (
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Build</h2>
                <p className="text-gray-500 mb-6">Start by describing your app in the chat</p>
                {/* Temporary Test Button - Remove after API setup */}
                <button
                  onClick={() => setAppBuilt(true)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-lg font-medium transition-colors mb-4"
                >
                  Test Build View (Demo)
                </button>
                {isProcessing && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-blue-600 font-medium">thinking</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-white m-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">{appName.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{appName}</h3>
                  <p className="text-gray-500 mb-6">Your app preview will appear here</p>
                  {activeView === 'dashboard' && (
                    <div className="text-sm text-gray-600">Dashboard view - Coming soon</div>
                  )}
                  {activeView === 'preview' && (
                    <div className="text-sm text-gray-600">Live preview - Coming soon</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
