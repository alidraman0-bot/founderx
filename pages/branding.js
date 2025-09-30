import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'

export default function Branding() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [brandingData, setBrandingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState(null)
  const router = useRouter()

  // Load selected idea data for auto-filling
  useEffect(() => {
    const ideaData = localStorage.getItem('selectedIdea')
    if (ideaData) {
      const idea = JSON.parse(ideaData)
      setSelectedIdea(idea)
      
      // Auto-generate branding based on the idea
      generateBranding(idea)
      
      // Clear the selected idea after auto-filling
      localStorage.removeItem('selectedIdea')
    } else {
      fetchBrandingData()
    }
  }, [])

  const fetchBrandingData = async () => {
    try {
      const response = await fetch('/api/branding')
      const data = await response.json()
      setBrandingData(data)
    } catch (error) {
      console.error('Error fetching branding data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateBranding = async (idea) => {
    setIsGenerating(true)
    setLoading(true)
    
    try {
      const response = await fetch('/api/mvp-builder/generate-branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: idea.title || idea.description || '',
          industry: idea.industry || 'Tech',
          personality: idea.personality || 'Professional, Modern, Trustworthy'
        })
      })
      
      const data = await response.json()
      setBrandingData(data)
    } catch (error) {
      console.error('Error generating branding:', error)
      // Fallback to default branding
      fetchBrandingData()
    } finally {
      setIsGenerating(false)
      setLoading(false)
    }
  }

  const handleRegenerateBranding = () => {
    if (selectedIdea) {
      generateBranding(selectedIdea)
    } else {
      fetchBrandingData()
    }
  }

  const handleSaveBranding = () => {
    if (brandingData) {
      const savedBrands = JSON.parse(localStorage.getItem('savedBrands') || '[]')
      const newBrand = {
        id: Date.now().toString(),
        ...brandingData,
        createdAt: new Date().toISOString(),
        idea: selectedIdea?.title || 'Custom Brand'
      }
      savedBrands.push(newBrand)
      localStorage.setItem('savedBrands', JSON.stringify(savedBrands))
      alert('Branding saved successfully!')
    }
  }

  const handleCreateMVP = () => {
    if (selectedIdea && brandingData) {
      // Store both idea and branding data for MVP creation
      localStorage.setItem('selectedIdea', JSON.stringify({
        ...selectedIdea,
        branding: brandingData
      }))
      router.push('/mvp-builder')
    } else {
      router.push('/mvp-builder')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Branding Studio
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Create your startup's visual identity and brand assets with AI-powered design
              </p>
              
              {selectedIdea && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Auto-filled from Idea:</h3>
                  <p className="text-blue-800">{selectedIdea.title}</p>
                  <p className="text-blue-700 text-sm">{selectedIdea.tagline}</p>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={handleRegenerateBranding}
                  disabled={isGenerating}
                  variant="outline"
                >
                  {isGenerating ? '🎨 Generating...' : '🎨 Regenerate Brand'}
                </Button>
                <Button onClick={handleSaveBranding}>
                  💾 Save Brand
                </Button>
                <Button onClick={handleCreateMVP}>
                  🚀 Create MVP
                </Button>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  {isGenerating ? 'Generating your brand identity...' : 'Loading branding options...'}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Brand Identity */}
                <Card title="Brand Identity" className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{brandingData?.name}</h3>
                      <p className="text-gray-600 mb-4 text-lg">{brandingData?.tagline}</p>
                      <p className="text-gray-700 mb-4">{brandingData?.description}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl text-white text-4xl font-bold flex items-center justify-center shadow-lg">
                        {brandingData?.logo}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Color Palette */}
                <Card title="Color Palette" className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {brandingData?.colors?.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-xl mx-auto mb-2 border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <p className="text-sm font-medium text-gray-900">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.hex}</p>
                        <p className="text-xs text-gray-400">{color.usage}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline">🎨 Customize Colors</Button>
                    <Button>📋 Export Palette</Button>
                  </div>
                </Card>

                {/* Typography */}
                <Card title="Typography" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Primary Font</h4>
                      <div className="text-2xl font-bold mb-2" style={{ fontFamily: brandingData?.typography?.primary }}>
                        {brandingData?.name}
                      </div>
                      <p className="text-sm text-gray-600">{brandingData?.typography?.primary}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Secondary Font</h4>
                      <div className="text-lg mb-2" style={{ fontFamily: brandingData?.typography?.secondary }}>
                        {brandingData?.tagline}
                      </div>
                      <p className="text-sm text-gray-600">{brandingData?.typography?.secondary}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline">🔤 Choose Fonts</Button>
                  </div>
                </Card>

                {/* Brand Voice & Personality */}
                <Card title="Brand Voice & Personality" className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Brand Voice</h4>
                      <p className="text-gray-700 mb-4">{brandingData?.brandVoice}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Tone:</span>
                          <span className="text-gray-600 ml-2">{brandingData?.tone}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Style:</span>
                          <span className="text-gray-600 ml-2">{brandingData?.style}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personality Traits</h4>
                      <div className="flex flex-wrap gap-2">
                        {brandingData?.personality?.map((trait, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline">✍️ Refine Voice</Button>
                  </div>
                </Card>

                {/* Brand Guidelines */}
                <Card title="Brand Guidelines" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Logo Usage</h4>
                      <p className="text-gray-600 text-sm">{brandingData?.logoGuidelines}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Color Usage</h4>
                      <p className="text-gray-600 text-sm">{brandingData?.colorGuidelines}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Typography Guidelines</h4>
                      <p className="text-gray-600 text-sm">{brandingData?.typographyGuidelines}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>📖 Download Guidelines</Button>
                  </div>
                </Card>

                {/* Brand Assets */}
                <Card title="Brand Assets" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">🖼️</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Logo Files</h4>
                      <p className="text-sm text-gray-600 mb-3">PNG, SVG, AI formats</p>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">🎨</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Color Palette</h4>
                      <p className="text-sm text-gray-600 mb-3">Adobe, Figma, CSS formats</p>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">📝</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Brand Guidelines</h4>
                      <p className="text-sm text-gray-600 mb-3">PDF documentation</p>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 pt-6">
                  <Button 
                    onClick={handleRegenerateBranding}
                    variant="outline"
                    size="lg"
                  >
                    🔄 Regenerate All
                  </Button>
                  <Button 
                    onClick={handleSaveBranding}
                    size="lg"
                  >
                    💾 Save Brand Package
                  </Button>
                  <Button 
                    onClick={handleCreateMVP}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  >
                    🚀 Build MVP with Brand
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}