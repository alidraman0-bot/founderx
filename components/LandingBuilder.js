import React, { useState } from 'react'

export default function LandingBuilder() {
  const [landingData, setLandingData] = useState({
    startupName: '',
    tagline: '',
    ctaText: 'Join Waitlist',
    template: '',
    waitlistEnabled: true,
    paymentsEnabled: false
  })
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState(null)

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design',
      preview: 'minimal-preview.jpg',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Modern gradient design',
      preview: 'gradient-preview.jpg',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Sleek dark theme',
      preview: 'dark-preview.jpg',
      color: 'from-gray-800 to-gray-900'
    },
    {
      id: 'colorful',
      name: 'Colorful',
      description: 'Vibrant and energetic',
      preview: 'colorful-preview.jpg',
      color: 'from-pink-500 to-orange-500'
    }
  ]

  const handlePublish = async () => {
    if (!landingData.startupName.trim() || !landingData.template) return

    setIsPublishing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockUrl = `https://${landingData.startupName.toLowerCase().replace(/\s+/g, '-')}.founderx.app`
      setPublishedUrl(mockUrl)
    } catch (error) {
      console.error('Error publishing landing page:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Landing Page Builder</h2>
        <p className="text-gray-600">Create a professional landing page for your startup</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Name
                </label>
                <input
                  type="text"
                  value={landingData.startupName}
                  onChange={(e) => setLandingData({ ...landingData, startupName: e.target.value })}
                  placeholder="Enter your startup name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={landingData.tagline}
                  onChange={(e) => setLandingData({ ...landingData, tagline: e.target.value })}
                  placeholder="Enter your tagline..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={landingData.ctaText}
                  onChange={(e) => setLandingData({ ...landingData, ctaText: e.target.value })}
                  placeholder="Join Waitlist"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setLandingData({ ...landingData, template: template.id })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    landingData.template === template.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-20 bg-gradient-to-r ${template.color} rounded-lg mb-3 flex items-center justify-center text-white text-lg font-bold`}>
                    {template.name}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Waitlist (Mailchimp/Resend)</h4>
                  <p className="text-sm text-gray-600">Collect email signups</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={landingData.waitlistEnabled}
                    onChange={(e) => setLandingData({ ...landingData, waitlistEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Payments (Stripe)</h4>
                  <p className="text-sm text-gray-600">Accept payments directly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={landingData.paymentsEnabled}
                    onChange={(e) => setLandingData({ ...landingData, paymentsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={!landingData.startupName.trim() || !landingData.template || isPublishing}
            className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish Landing Page'}
          </button>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 ml-4">
                {landingData.startupName || 'your-startup'}.founderx.app
              </span>
            </div>
            <div className="p-8 bg-white">
              {landingData.template ? (
                <div className={`min-h-96 bg-gradient-to-br ${templates.find(t => t.id === landingData.template)?.color} rounded-lg p-8 text-white`}>
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      {landingData.startupName || 'Your Startup'}
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                      {landingData.tagline || 'Your amazing tagline goes here'}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      {landingData.ctaText}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="min-h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Select a template to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success State */}
      {publishedUrl && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900">Landing Page Published!</h3>
          </div>
          <p className="text-green-700 mb-4">
            Your landing page is now live and ready to collect signups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Live Site
            </a>
            <button className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Share Link
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isPublishing && (
        <div className="mt-8 text-center py-12">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Publishing your landing page...</p>
        </div>
      )}
    </div>
  )
}
