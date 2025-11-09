import React, { useState } from 'react'

export default function BrandingForm() {
  const [startupName, setStartupName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [brandingResult, setBrandingResult] = useState<any>(null)
  const [domainChecked, setDomainChecked] = useState(false)

  const handleGenerateBranding = async () => {
    if (!startupName.trim()) return

    setIsGenerating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        logo: '🚀',
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
        fonts: ['Inter', 'Poppins', 'Roboto', 'Open Sans'],
        domain: {
          available: Math.random() > 0.5,
          suggestions: [
            `${startupName.toLowerCase()}.com`,
            `${startupName.toLowerCase()}.io`,
            `get${startupName.toLowerCase()}.com`,
            `${startupName.toLowerCase()}app.com`
          ]
        }
      }
      
      setBrandingResult(mockResult)
    } catch (error) {
      console.error('Error generating branding:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCheckDomain = async () => {
    if (!startupName.trim()) return

    setDomainChecked(true)
    try {
      // Simulate domain check API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Domain check result is already included in branding result
    } catch (error) {
      console.error('Error checking domain:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Branding Generator</h2>
        <p className="text-gray-600">Generate a complete branding kit for your startup</p>
      </div>

      {/* Input Form */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Startup Name
            </label>
            <input
              type="text"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              placeholder="Enter your startup name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCheckDomain}
              disabled={!startupName.trim() || domainChecked}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {domainChecked ? 'Domain Checked' : 'Check Domain'}
            </button>
            <button
              onClick={handleGenerateBranding}
              disabled={!startupName.trim() || isGenerating}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Branding'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {brandingResult && (
        <div className="space-y-8">
          {/* Logo Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Logo Preview</h3>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-4xl">
                {brandingResult.logo}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{startupName}</h4>
                <p className="text-gray-600">AI-generated logo concept</p>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandingResult.colors.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="text-sm font-mono text-gray-600">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Font Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Fonts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brandingResult.fonts.map((font, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: font }}>
                    {font}
                  </h4>
                  <p className="text-gray-600" style={{ fontFamily: font }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Availability */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Domain Availability</h3>
            <div className="space-y-3">
              {brandingResult.domain.suggestions.map((domain, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono text-gray-900">{domain}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    brandingResult.domain.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {brandingResult.domain.available ? 'Available' : 'Taken'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Download Branding Kit
            </button>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Create Landing Page
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your branding kit...</p>
        </div>
      )}
    </div>
  )
}
