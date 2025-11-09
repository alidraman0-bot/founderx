import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import BrandingForm from '@/components/BrandingForm'
import LandingBuilder from '@/components/LandingBuilder'
import DashboardCard from '@/components/DashboardCard'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Launch() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentMVP, setCurrentMVP] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load current MVP from localStorage
  useEffect(() => {
    const mvpData = localStorage.getItem('currentMVP')
    if (mvpData) {
      setCurrentMVP(JSON.parse(mvpData))
    } else {
      // Redirect back to MVP builder if no MVP data
      router.push('/mvp-builder')
    }
    setIsLoading(false)
  }, [router])

  const [launchedStartups, setLaunchedStartups] = useState([
    {
      id: 'startup-1',
      name: 'CodeReview AI',
      tagline: 'AI-powered code review tool',
      domain: 'codereview-ai.com',
      status: 'live',
      signups: 234,
      revenue: 1250,
      traffic: 1200,
      launchDate: '2024-01-15',
      logo: '🤖',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'startup-2',
      name: 'ClimateTracker',
      tagline: 'Real-time climate data analytics',
      domain: 'climatetracker.io',
      status: 'live',
      signups: 156,
      revenue: 890,
      traffic: 800,
      launchDate: '2024-02-20',
      logo: '🌱',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'startup-3',
      name: 'HealthBot Pro',
      tagline: 'AI chatbot for mental health',
      domain: 'healthbot-pro.com',
      status: 'building',
      signups: 45,
      revenue: 0,
      traffic: 120,
      launchDate: '2024-03-01',
      logo: '🏥',
      color: 'from-red-500 to-red-600'
    }
  ])

  const growthActions = [
    {
      id: 'producthunt',
      title: 'Post to ProductHunt',
      description: 'Submit your startup to ProductHunt for maximum visibility',
      icon: '🚀',
      completed: false,
      action: () => console.log('Posting to ProductHunt...')
    },
    {
      id: 'reddit',
      title: 'Announce on Reddit',
      description: 'Share your launch in relevant subreddits',
      icon: '💬',
      completed: false,
      action: () => console.log('Posting to Reddit...')
    },
    {
      id: 'twitter',
      title: 'Tweet Launch Thread',
      description: 'Create a viral Twitter thread about your startup',
      icon: '🐦',
      completed: true,
      action: () => console.log('Tweeting launch thread...')
    }
  ]

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Your MVP...</h2>
            <p className="text-gray-600">Preparing your launch dashboard</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!currentMVP) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No MVP Found</h2>
            <p className="text-gray-600 mb-4">Please build an MVP first before launching</p>
            <Button onClick={() => router.push('/mvp-builder')}>
              Build Your MVP
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Launch {currentMVP.name} | FounderX</title>
        <meta name="description" content={`Launch and grow ${currentMVP.name} with FounderX`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Launch & Track Your Startup in Real-Time
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                From branding → landing page → waitlist → analytics dashboard, all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('branding')}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Generate Branding Kit
                </button>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="bg-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Create Landing Page
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === 'branding'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Branding Generator
                </button>
                <button
                  onClick={() => setActiveTab('landing')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === 'landing'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Landing Builder
                </button>
                <button
                  onClick={() => setActiveTab('dashboards')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === 'dashboards'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Your Dashboards
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {activeTab === 'branding' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <BrandingForm />
            </div>
          )}

          {activeTab === 'landing' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <LandingBuilder />
            </div>
          )}

          {activeTab === 'dashboards' && (
            <div className="space-y-8">
              {/* Startup Dashboards Grid */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Startup Dashboards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {launchedStartups.map((startup) => (
                    <DashboardCard key={startup.id} startup={startup} />
                  ))}
                </div>
              </div>

              {/* Growth Toolkit */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Growth Toolkit</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {growthActions.map((action) => (
                    <div
                      key={action.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                        action.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                          {action.icon}
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                      <p className="text-gray-600 mb-4">{action.description}</p>
                      <button
                        onClick={action.action}
                        disabled={action.completed}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                          action.completed
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {action.completed ? 'Completed' : 'Launch Action'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
