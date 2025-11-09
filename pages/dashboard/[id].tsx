import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function StartupDashboard() {
  const router = useRouter()
  const { id } = router.query
  const [startup, setStartup] = useState<any>(null)
  const [signups, setSignups] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      // Simulate API call to fetch startup data
      setTimeout(() => {
        const mockStartup = {
          id: id,
          name: 'CodeReview AI',
          tagline: 'AI-powered code review tool for developers',
          domain: 'codereview-ai.com',
          status: 'live',
          signups: 234,
          revenue: 1250,
          traffic: 1200,
          launchDate: '2024-01-15',
          logo: '🤖',
          color: 'from-blue-500 to-blue-600'
        }

        const mockSignups = [
          { id: '1', email: 'john@example.com', name: 'John Doe', timestamp: '2024-03-15T10:30:00Z', source: 'Direct' },
          { id: '2', email: 'sarah@example.com', name: 'Sarah Smith', timestamp: '2024-03-15T09:15:00Z', source: 'Twitter' },
          { id: '3', email: 'mike@example.com', name: 'Mike Johnson', timestamp: '2024-03-15T08:45:00Z', source: 'Reddit' },
          { id: '4', email: 'lisa@example.com', name: 'Lisa Wang', timestamp: '2024-03-14T16:20:00Z', source: 'ProductHunt' },
          { id: '5', email: 'alex@example.com', name: 'Alex Chen', timestamp: '2024-03-14T14:10:00Z', source: 'Direct' }
        ]

        const mockFeedback = [
          { id: '1', message: 'Love the AI suggestions! This will save me hours.', rating: 5, timestamp: '2024-03-15T11:00:00Z', source: 'Email' },
          { id: '2', message: 'Great tool, but could use better GitHub integration.', rating: 4, timestamp: '2024-03-15T10:30:00Z', source: 'Website' },
          { id: '3', message: 'Amazing! When will you add support for Python?', rating: 5, timestamp: '2024-03-14T15:45:00Z', source: 'Twitter' }
        ]

        setStartup(mockStartup)
        setSignups(mockSignups)
        setFeedback(mockFeedback)
        setLoading(false)
      }, 1000)
    }
  }, [id])

  const growthActions = [
    {
      id: 'reddit',
      title: 'Post to Reddit',
      description: 'Share in r/startups and r/webdev',
      icon: '💬',
      completed: false
    },
    {
      id: 'producthunt',
      title: 'Try PH Launch',
      description: 'Submit to ProductHunt for visibility',
      icon: '🚀',
      completed: true
    },
    {
      id: 'twitter',
      title: 'Tweet Launch Thread',
      description: 'Create a viral Twitter thread',
      icon: '🐦',
      completed: false
    }
  ]

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!startup) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Startup Not Found</h1>
            <Link href="/launch" className="text-indigo-600 hover:text-indigo-800">
              Back to Launch Page
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{startup.name} Dashboard - FounderX</title>
        <meta name="description" content={`Analytics dashboard for ${startup.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/launch" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <div className={`w-16 h-16 bg-gradient-to-r ${startup.color} rounded-xl flex items-center justify-center text-3xl`}>
                  {startup.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                  <p className="text-gray-600">{startup.tagline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://${startup.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  View Live Site
                </a>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Signups</p>
                  <p className="text-3xl font-bold text-gray-900">{startup.signups}</p>
                  <p className="text-sm text-green-600">+12.5% from last week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${startup.revenue}</p>
                  <p className="text-sm text-green-600">+8.2% from last week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Traffic</p>
                  <p className="text-3xl font-bold text-gray-900">{startup.traffic}</p>
                  <p className="text-sm text-green-600">+15.7% from last week</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round((startup.signups / startup.traffic) * 100)}%</p>
                  <p className="text-sm text-green-600">+2.1% from last week</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Signups */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Latest Signups</h3>
                <div className="space-y-4">
                  {signups.map((signup) => (
                    <div key={signup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {signup.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{signup.name}</p>
                          <p className="text-sm text-gray-600">{signup.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{signup.source}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(signup.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Actions</h3>
                <div className="space-y-4">
                  {growthActions.map((action) => (
                    <div
                      key={action.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        action.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          action.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {action.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Feedback</h3>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.033a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.033a1 1 0 00-1.175 0l-2.8 2.033c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{item.source}</span>
                      </div>
                      <p className="text-sm text-gray-700">{item.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
