import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Button from '../components/Button'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'

export default function MVPBuilder() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [businessPlan, setBusinessPlan] = useState(null)
  const [mvpConfig, setMvpConfig] = useState({
    idea: '',
    techStack: '',
    features: [],
    targetUsers: '',
    budget: ''
  })
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [buildSteps, setBuildSteps] = useState([])
  const [generatedMVP, setGeneratedMVP] = useState(null)
  const router = useRouter()

  const techStacks = [
    { name: 'Next.js + React', description: 'Modern web app with SSR', complexity: 'Medium', time: '2-3 days' },
    { name: 'React + Node.js', description: 'Full-stack JavaScript', complexity: 'Medium', time: '3-4 days' },
    { name: 'Vue.js + Express', description: 'Lightweight and fast', complexity: 'Low', time: '2-3 days' },
    { name: 'Flask + Python', description: 'Simple backend API', complexity: 'Low', time: '1-2 days' },
    { name: 'Django + Python', description: 'Full-featured framework', complexity: 'High', time: '4-5 days' },
    { name: 'Laravel + PHP', description: 'Rapid development', complexity: 'Medium', time: '3-4 days' }
  ]

  const featureTemplates = {
    'SaaS': ['User Authentication', 'Dashboard', 'Data Management', 'Payment Integration', 'Analytics'],
    'E-commerce': ['Product Catalog', 'Shopping Cart', 'Payment Processing', 'Order Management', 'User Accounts'],
    'Social': ['User Profiles', 'Content Feed', 'Messaging', 'Notifications', 'Media Upload'],
    'Marketplace': ['User Registration', 'Listing Management', 'Search & Filter', 'Messaging', 'Payment Escrow'],
    'Content': ['CMS', 'User Management', 'Content Publishing', 'SEO Tools', 'Analytics'],
    'Tool': ['Core Functionality', 'User Interface', 'Data Export', 'API Access', 'Documentation']
  }

  const budgetRanges = [
    { range: '$0-500', description: 'Basic MVP with essential features' },
    { range: '$500-2000', description: 'Enhanced MVP with integrations' },
    { range: '$2000-5000', description: 'Full-featured MVP with custom design' },
    { range: '$5000+', description: 'Enterprise-grade MVP with advanced features' }
  ]

  // Load business plan data if coming from plan generator
  useEffect(() => {
    const planData = localStorage.getItem('businessPlan')
    if (planData) {
      setBusinessPlan(JSON.parse(planData))
      const plan = JSON.parse(planData)
      setMvpConfig(prev => ({
        ...prev,
        idea: plan.title || '',
        targetUsers: plan.targetCustomer || ''
      }))
    }
  }, [])

  // Load selected idea data for auto-filling
  useEffect(() => {
    const selectedIdea = localStorage.getItem('selectedIdea')
    if (selectedIdea) {
      const idea = JSON.parse(selectedIdea)
      setMvpConfig(prev => ({
        ...prev,
        idea: idea.description || idea.title || '',
        targetUsers: idea.targetCustomer || '',
        features: idea.features || []
      }))
      
      // Auto-select appropriate tech stack based on industry
      if (idea.industry) {
        const industryStackMap = {
          'AI': 'Next.js + React',
          'SaaS': 'Next.js + React', 
          'B2B': 'Next.js + React',
          'Fintech': 'React + Node.js',
          'Climate': 'Vue.js + Express',
          'Mental Health': 'Next.js + React'
        }
        
        const suggestedStack = industryStackMap[idea.industry] || 'Next.js + React'
        const stack = techStacks.find(s => s.name === suggestedStack)
        if (stack) {
          handleTechStackSelect(stack)
        }
      }
      
      // Clear the selected idea after auto-filling
      localStorage.removeItem('selectedIdea')
    }
  }, [])

  const handleTechStackSelect = (stack) => {
    setMvpConfig(prev => ({
      ...prev,
      techStack: stack.name,
      complexity: stack.complexity,
      estimatedTime: stack.time
    }))
  }

  const handleFeatureToggle = (feature) => {
    setMvpConfig(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleBudgetSelect = (budget) => {
    setMvpConfig(prev => ({
      ...prev,
      budget: budget.range
    }))
  }

  const buildMVP = async () => {
    if (!mvpConfig.idea || !mvpConfig.techStack) {
      alert('Please provide your idea and select a tech stack')
      return
    }

    setIsBuilding(true)
    setBuildProgress(0)
    setBuildSteps([])

    try {
      // Step 1: Generate Code
      setBuildProgress(20)
      setBuildSteps(prev => [...prev, { step: 'Generating code with AI', status: 'in_progress', icon: '🤖' }])
      
      const codeGeneration = await fetch('/api/mvp-builder/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: mvpConfig.idea,
          techStack: mvpConfig.techStack,
          features: mvpConfig.features,
          targetUsers: mvpConfig.targetUsers
        })
      }).then(res => res.json())

      setBuildSteps(prev => prev.map(step => 
        step.step === 'Generating code with AI' 
          ? { ...step, status: 'completed' }
          : step
      ))

      // Step 2: Generate Branding
      setBuildProgress(40)
      setBuildSteps(prev => [...prev, { step: 'Creating branding assets', status: 'in_progress', icon: '🎨' }])
      
      const branding = await fetch('/api/mvp-builder/generate-branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: mvpConfig.idea,
          industry: businessPlan?.industry || 'Tech',
          personality: 'Modern, Professional, Trustworthy'
        })
      }).then(res => res.json())

      setBuildSteps(prev => prev.map(step => 
        step.step === 'Creating branding assets' 
          ? { ...step, status: 'completed' }
          : step
      ))

      // Step 3: Deploy Application
      setBuildProgress(60)
      setBuildSteps(prev => [...prev, { step: 'Deploying to cloud', status: 'in_progress', icon: '🚀' }])
      
      const deployment = await fetch('/api/mvp-builder/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeGeneration.code,
          techStack: mvpConfig.techStack,
          features: mvpConfig.features
        })
      }).then(res => res.json())

      setBuildSteps(prev => prev.map(step => 
        step.step === 'Deploying to cloud' 
          ? { ...step, status: 'completed' }
          : step
      ))

      // Step 4: Setup Payments
      setBuildProgress(80)
      setBuildSteps(prev => [...prev, { step: 'Configuring payments', status: 'in_progress', icon: '💳' }])
      
      const payments = await fetch('/api/mvp-builder/setup-payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessModel: businessPlan?.revenueModel || 'Subscription',
          pricing: businessPlan?.pricingStrategy || 'Freemium'
        })
      }).then(res => res.json())

      setBuildSteps(prev => prev.map(step => 
        step.step === 'Configuring payments' 
          ? { ...step, status: 'completed' }
          : step
      ))

      // Step 5: Setup Analytics
      setBuildProgress(90)
      setBuildSteps(prev => [...prev, { step: 'Installing analytics', status: 'in_progress', icon: '📊' }])
      
      const analytics = await fetch('/api/mvp-builder/setup-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          features: mvpConfig.features,
          targetUsers: mvpConfig.targetUsers
        })
      }).then(res => res.json())

      setBuildSteps(prev => prev.map(step => 
        step.step === 'Installing analytics' 
          ? { ...step, status: 'completed' }
          : step
      ))

      // Step 6: Finalize MVP
      setBuildProgress(100)
      setBuildSteps(prev => [...prev, { step: 'Finalizing MVP', status: 'completed', icon: '✅' }])

      // Combine all results
      const mvpResult = {
        id: Date.now().toString(),
        name: branding.name,
        url: deployment.url,
        code: codeGeneration,
        branding,
        deployment,
        payments,
        analytics,
        config: mvpConfig,
        createdAt: new Date().toISOString(),
        status: 'Live'
      }

      setGeneratedMVP(mvpResult)
      
      // Save to localStorage
      const existingMVPs = JSON.parse(localStorage.getItem('mvps') || '[]')
      localStorage.setItem('mvps', JSON.stringify([...existingMVPs, mvpResult]))

    } catch (error) {
      console.error('Error building MVP:', error)
      alert('Error building MVP. Please try again.')
    } finally {
      setIsBuilding(false)
    }
  }

  const openMVP = () => {
    if (generatedMVP?.url) {
      window.open(generatedMVP.url, '_blank')
    }
  }

  const downloadCode = () => {
    if (generatedMVP?.code) {
      const blob = new Blob([generatedMVP.code.sourceCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${generatedMVP.name}-source-code.zip`
      a.click()
      URL.revokeObjectURL(url)
    }
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
                MVP Auto-Builder (Lite)
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your business plan into a working MVP in minutes. AI generates code, deploys to cloud, and sets up payments automatically.
              </p>
            </div>

            {/* Business Plan Integration */}
            {businessPlan && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Business Plan Detected</h3>
                <p className="text-blue-800 mb-2"><strong>{businessPlan.title}</strong></p>
                <p className="text-blue-700 text-sm">{businessPlan.tagline}</p>
              </div>
            )}

            {/* MVP Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* Left Column - Configuration */}
              <div className="space-y-6">
                
                {/* Idea Input */}
                <Card title="Your Business Idea">
                  <textarea
                    value={mvpConfig.idea}
                    onChange={(e) => setMvpConfig(prev => ({ ...prev, idea: e.target.value }))}
                    placeholder="Describe your business idea and what you want to build..."
                    className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </Card>

                {/* Tech Stack Selection */}
                <Card title="Choose Tech Stack">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {techStacks.map((stack, index) => (
                      <div
                        key={index}
                        onClick={() => handleTechStackSelect(stack)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          mvpConfig.techStack === stack.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900">{stack.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{stack.description}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Complexity: {stack.complexity}</span>
                          <span>Time: {stack.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Features Selection */}
                <Card title="Select Features">
                  <div className="space-y-3">
                    {Object.entries(featureTemplates).map(([category, features]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {features.map((feature, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={mvpConfig.features.includes(feature)}
                                onChange={() => handleFeatureToggle(feature)}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Budget Selection */}
                <Card title="Budget Range">
                  <div className="space-y-3">
                    {budgetRanges.map((budget, index) => (
                      <div
                        key={index}
                        onClick={() => handleBudgetSelect(budget)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          mvpConfig.budget === budget.range
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{budget.range}</div>
                        <div className="text-sm text-gray-600">{budget.description}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column - Preview & Actions */}
              <div className="space-y-6">
                
                {/* Configuration Summary */}
                <Card title="Configuration Summary">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tech Stack:</h4>
                      <p className="text-gray-600">{mvpConfig.techStack || 'Not selected'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Features ({mvpConfig.features.length}):</h4>
                      <div className="flex flex-wrap gap-2">
                        {mvpConfig.features.map((feature, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Budget:</h4>
                      <p className="text-gray-600">{mvpConfig.budget || 'Not selected'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Estimated Time:</h4>
                      <p className="text-gray-600">{mvpConfig.estimatedTime || 'TBD'}</p>
                    </div>
                  </div>
                </Card>

                {/* Build Button */}
                <div className="text-center">
                  <Button
                    onClick={buildMVP}
                    disabled={isBuilding || !mvpConfig.idea || !mvpConfig.techStack}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBuilding ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Building MVP...
                      </>
                    ) : (
                      '🚀 Build My MVP'
                    )}
                  </Button>
                </div>

                {/* Build Progress */}
                {isBuilding && (
                  <Card title="Build Progress">
                    <div className="space-y-4">
                      {buildSteps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-2xl mr-4">{step.icon}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-900 font-medium">{step.step}</span>
                              <span className={`text-sm ${
                                step.status === 'completed' ? 'text-green-600' : 
                                step.status === 'in_progress' ? 'text-blue-600' : 'text-gray-500'
                              }`}>
                                {step.status === 'completed' ? '✅' : 
                                 step.status === 'in_progress' ? '⏳' : '⏸️'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  step.status === 'completed' ? 'bg-green-500' : 
                                  step.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                                style={{ width: step.status === 'completed' ? '100%' : 
                                        step.status === 'in_progress' ? '50%' : '0%' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Generated MVP Results */}
            {generatedMVP && (
              <div className="space-y-8">
                <Card title="🎉 Your MVP is Ready!">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* MVP Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{generatedMVP.name}</h3>
                        <p className="text-gray-600 mb-4">Your MVP is live and ready to use!</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-green-600 font-semibold mr-2">🌐 Live URL:</span>
                          <a href={generatedMVP.url} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline">
                            {generatedMVP.url}
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-blue-600 font-semibold mr-2">🎨 Brand:</span>
                          <span className="text-gray-600">{generatedMVP.branding.name}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-purple-600 font-semibold mr-2">💳 Payments:</span>
                          <span className="text-gray-600">{generatedMVP.payments.status}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-orange-600 font-semibold mr-2">📊 Analytics:</span>
                          <span className="text-gray-600">{generatedMVP.analytics.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      <Button onClick={openMVP} className="w-full bg-green-600 hover:bg-green-700">
                        🌐 Open Live MVP
                      </Button>
                      
                      <Button onClick={downloadCode} variant="outline" className="w-full">
                        📥 Download Source Code
                      </Button>
                      
                      <Button onClick={() => router.push('/dashboard')} variant="outline" className="w-full">
                        📊 View Analytics
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Technical Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Code Generation */}
                  <Card title="Code Generation">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lines of Code:</span>
                        <span className="font-semibold">{generatedMVP.code.linesOfCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Files Created:</span>
                        <span className="font-semibold">{generatedMVP.code.filesCreated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tech Stack:</span>
                        <span className="font-semibold">{generatedMVP.config.techStack}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Deployment */}
                  <Card title="Deployment">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform:</span>
                        <span className="font-semibold">{generatedMVP.deployment.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-semibold text-green-600">{generatedMVP.deployment.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deploy Time:</span>
                        <span className="font-semibold">{generatedMVP.deployment.deployTime}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Payments */}
                  <Card title="Payments">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provider:</span>
                        <span className="font-semibold">{generatedMVP.payments.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-semibold">{generatedMVP.payments.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Setup:</span>
                        <span className="font-semibold text-green-600">{generatedMVP.payments.setup}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}