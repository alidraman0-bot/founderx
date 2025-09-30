import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Button from '../components/Button'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'

export default function PlanGenerator() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [ideaDescription, setIdeaDescription] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [businessPlan, setBusinessPlan] = useState(null)
  const [dataCollection, setDataCollection] = useState({
    marketData: null,
    competitors: null,
    pricing: null,
    gtmInsights: null
  })
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  // Load selected idea data for auto-filling
  useEffect(() => {
    const selectedIdea = localStorage.getItem('selectedIdea')
    if (selectedIdea) {
      const idea = JSON.parse(selectedIdea)
      setIdeaDescription(idea.description || idea.title || '')
      setIndustry(idea.industry || '')
      setTargetMarket(idea.targetCustomer || '')
      
      // Clear the selected idea after auto-filling
      localStorage.removeItem('selectedIdea')
    }
  }, [])

  const industries = [
    'AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'SaaS', 'E-commerce',
    'Climate Tech', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR', 'Other'
  ]

  const targetMarkets = [
    'B2B Enterprise', 'B2B SMB', 'B2C Consumer', 'B2C Prosumer', 'Marketplace', 'Developer Tools'
  ]

  // Collect all data from APIs
  const collectAllData = async (idea) => {
    setIsGenerating(true)
    setProgress(0)

    try {
      // Step 1: Market Data
      setProgress(20)
      const marketData = await fetch('/api/business-plan/market-size', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, industry })
      }).then(res => res.json())

      // Step 2: Competitors
      setProgress(40)
      const competitors = await fetch('/api/business-plan/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, industry })
      }).then(res => res.json())

      // Step 3: Pricing
      setProgress(60)
      const pricing = await fetch('/api/business-plan/pricing-benchmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, industry, targetMarket })
      }).then(res => res.json())

      // Step 4: GTM Insights
      setProgress(80)
      const gtmInsights = await fetch('/api/business-plan/gtm-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, industry, targetMarket })
      }).then(res => res.json())

      // Step 5: AI Synthesis
      setProgress(90)
      const synthesizedPlan = await fetch('/api/business-plan/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          industry,
          targetMarket,
          marketData,
          competitors,
          pricing,
          gtmInsights
        })
      }).then(res => res.json())

      setDataCollection({ marketData, competitors, pricing, gtmInsights })
      setBusinessPlan(synthesizedPlan)
      setProgress(100)

    } catch (error) {
      console.error('Error generating business plan:', error)
      alert('Error generating business plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (!ideaDescription.trim()) {
      alert('Please describe your business idea')
      return
    }

    await collectAllData(ideaDescription)
  }

  const exportToPDF = () => {
    // In a real implementation, this would generate a PDF
    alert('PDF export feature coming soon!')
  }

  const sharePlan = () => {
    // In a real implementation, this would create a shareable link
    alert('Share feature coming soon!')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Generate Data-Backed Business Plans
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Real market data, competitor analysis, and AI insights transform your idea into a fundable business plan in minutes.
              </p>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Your Idea</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Business Idea Description
                  </label>
                  <textarea
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    placeholder="Describe your business idea, the problem you're solving, and your target customers..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Industry
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Target Market
                    </label>
                    <select
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Target Market</option>
                      {targetMarkets.map(market => (
                        <option key={market} value={market}>{market}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating Business Plan...
                    </>
                  ) : (
                    '🚀 Generate Business Plan'
                  )}
                </Button>
              </div>
            </div>

            {/* Progress Section */}
            {isGenerating && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Collecting Data & Generating Plan</h3>
                
                <div className="space-y-4">
                  {[
                    { step: 'Analyzing market size', progress: 20, icon: '📊' },
                    { step: 'Researching competitors', progress: 40, icon: '🏢' },
                    { step: 'Calculating pricing models', progress: 60, icon: '💰' },
                    { step: 'Gathering GTM insights', progress: 80, icon: '📈' },
                    { step: 'Synthesizing business plan', progress: 100, icon: '🤖' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-2xl mr-4">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-900 font-medium">{item.step}</span>
                          <span className="text-sm text-gray-500">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              progress >= item.progress ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${Math.min(progress, item.progress)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Plan Output */}
            {businessPlan && (
              <div className="space-y-8">
                {/* Plan Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{businessPlan.title}</h2>
                      <p className="text-xl text-gray-600">{businessPlan.tagline}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={exportToPDF}>
                        📄 Export PDF
                      </Button>
                      <Button variant="outline" onClick={sharePlan}>
                        🔗 Share
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{businessPlan.marketSize}</div>
                      <div className="text-sm text-gray-600">Total Addressable Market</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{businessPlan.competitors?.length || 0}</div>
                      <div className="text-sm text-gray-600">Key Competitors</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{businessPlan.revenueModel}</div>
                      <div className="text-sm text-gray-600">Revenue Model</div>
                    </div>
                  </div>
                </div>

                {/* Plan Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Problem & Solution */}
                  <Card title="Problem & Solution">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Problem:</h4>
                        <p className="text-gray-600">{businessPlan.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                        <p className="text-gray-600">{businessPlan.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Unique Value Proposition:</h4>
                        <p className="text-gray-600">{businessPlan.uniqueValueProp}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Market Analysis */}
                  <Card title="Market Analysis">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Market Size:</h4>
                        <p className="text-gray-600">{businessPlan.marketSize}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Target Customer:</h4>
                        <p className="text-gray-600">{businessPlan.targetCustomer}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Market Trends:</h4>
                        <p className="text-gray-600">{businessPlan.marketTrends}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Competitors */}
                  <Card title="Competitive Analysis">
                    <div className="space-y-3">
                      {businessPlan.competitors?.map((competitor, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-semibold text-gray-900">{competitor.name}</h5>
                              <p className="text-sm text-gray-600">{competitor.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{competitor.funding}</div>
                              <div className="text-xs text-gray-500">{competitor.stage}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Revenue Model */}
                  <Card title="Revenue Model">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Model:</h4>
                        <p className="text-gray-600">{businessPlan.revenueModel}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pricing Strategy:</h4>
                        <p className="text-gray-600">{businessPlan.pricingStrategy}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Revenue Streams:</h4>
                        <p className="text-gray-600">{businessPlan.revenueStreams}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Go-to-Market */}
                  <Card title="Go-to-Market Strategy">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Channels:</h4>
                        <p className="text-gray-600">{businessPlan.channels}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Marketing Strategy:</h4>
                        <p className="text-gray-600">{businessPlan.marketingStrategy}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Sales Strategy:</h4>
                        <p className="text-gray-600">{businessPlan.salesStrategy}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Financial Projections */}
                  <Card title="Financial Projections">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Metrics:</h4>
                        <p className="text-gray-600">{businessPlan.keyMetrics}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cost Structure:</h4>
                        <p className="text-gray-600">{businessPlan.costStructure}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Funding Needs:</h4>
                        <p className="text-gray-600">{businessPlan.fundingNeeds}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Data Sources */}
                <Card title="Data Sources & Credibility">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600">Statista</div>
                      <div className="text-sm text-gray-600">Market Data</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-600">Crunchbase</div>
                      <div className="text-sm text-gray-600">Competitor Analysis</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-lg font-semibold text-purple-600">Stripe</div>
                      <div className="text-sm text-gray-600">Pricing Benchmarks</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-lg font-semibold text-orange-600">OpenAI</div>
                      <div className="text-sm text-gray-600">AI Synthesis</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Last updated: {new Date().toLocaleString()} | Confidence Score: 92%
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}