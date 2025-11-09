import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Button from '../components/Button'

export default function IdeaDiscovery() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('google')
  const [signals, setSignals] = useState({})
  const [opportunities, setOpportunities] = useState([])
  const [savedIdeas, setSavedIdeas] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [userIdea, setUserIdea] = useState('')
  const [ideaDescription, setIdeaDescription] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState(null)
  const router = useRouter()

  const signalSources = [
    { id: 'google', name: 'Google', icon: '🔍', color: 'blue' },
    { id: 'hackernews', name: 'Hacker News', icon: '📰', color: 'orange' },
    { id: 'reddit', name: 'Reddit', icon: '🤖', color: 'red' },
    { id: 'twitter', name: 'X', icon: '🐦', color: 'gray' },
    { id: 'github', name: 'GitHub', icon: '💻', color: 'gray' },
    { id: 'crunchbase', name: 'Crunchbase', icon: '💰', color: 'green' }
  ]

  // Fetch signals from different sources
  const fetchSignals = async (source) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/signals/${source}`)
      const data = await response.json()
      setSignals(prev => ({ ...prev, [source]: data }))
    } catch (error) {
      console.error(`Error fetching ${source} signals:`, error)
      // Fallback to mock data
      setSignals(prev => ({ ...prev, [source]: getMockSignals(source) }))
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for demonstration
  const getMockSignals = (source) => {
    const mockData = {
      google: [
        { title: "AI-powered customer service sees 300% growth", url: "#", source: "TechCrunch", timestamp: "2h ago" },
        { title: "Remote work tools market hits $50B valuation", url: "#", source: "Forbes", timestamp: "4h ago" },
        { title: "Sustainable packaging startups raise $2B", url: "#", source: "Bloomberg", timestamp: "6h ago" },
        { title: "Mental health apps see surge in enterprise adoption", url: "#", source: "WSJ", timestamp: "8h ago" }
      ],
      hackernews: [
        { title: "Show HN: AI that writes better code than humans", url: "#", score: 1247, timestamp: "3h ago" },
        { title: "Ask HN: What's the next big thing in fintech?", url: "#", score: 892, timestamp: "5h ago" },
        { title: "YC startup using quantum computing for drug discovery", url: "#", score: 756, timestamp: "7h ago" },
        { title: "Open source alternative to Slack hits 100K users", url: "#", score: 634, timestamp: "9h ago" }
      ],
      reddit: [
        { title: "r/startups: Just launched my SaaS, AMA", subreddit: "r/startups", upvotes: 234, timestamp: "1h ago" },
        { title: "r/SaaS: Pricing strategies that actually work", subreddit: "r/SaaS", upvotes: 189, timestamp: "3h ago" },
        { title: "r/Entrepreneur: Bootstrapped to $10K MRR in 6 months", subreddit: "r/Entrepreneur", upvotes: 156, timestamp: "5h ago" },
        { title: "r/technology: AI breakthrough in medical diagnosis", subreddit: "r/technology", upvotes: 445, timestamp: "7h ago" }
      ],
      twitter: [
        { title: "Just raised $5M for my climate tech startup! 🌱", url: "#", retweets: 234, timestamp: "2h ago" },
        { title: "The future of work is remote-first companies", url: "#", retweets: 189, timestamp: "4h ago" },
        { title: "AI is revolutionizing healthcare delivery", url: "#", retweets: 156, timestamp: "6h ago" },
        { title: "Sustainable energy startups are the next unicorns", url: "#", retweets: 445, timestamp: "8h ago" }
      ],
      github: [
        { title: "awesome-ai-tools: Curated list of AI tools", url: "#", language: "JavaScript", stars: 1234, timestamp: "1h ago" },
        { title: "climate-data-api: Real-time climate data", url: "#", language: "Python", stars: 567, timestamp: "3h ago" },
        { title: "mental-health-tracker: Open source wellness app", url: "#", language: "React", stars: 890, timestamp: "5h ago" },
        { title: "remote-work-tools: Productivity suite for distributed teams", url: "#", language: "TypeScript", stars: 234, timestamp: "7h ago" }
      ],
      crunchbase: [
        { title: "ClimateTech Inc raises $50M Series B", url: "#", stage: "Series B", amount: "$50M", timestamp: "2h ago" },
        { title: "AI startup exits to Microsoft for $2B", url: "#", stage: "Acquisition", amount: "$2B", timestamp: "4h ago" },
        { title: "Fintech unicorn expands to Europe", url: "#", stage: "Expansion", amount: "N/A", timestamp: "6h ago" },
        { title: "HealthTech startup secures $25M funding", url: "#", stage: "Series A", amount: "$25M", timestamp: "8h ago" }
      ]
    }
    return mockData[source] || []
  }

  // Validate user's own idea
  const validateUserIdea = async () => {
    if (!userIdea.trim()) {
      alert('Please enter your idea')
      return
    }

    setIsValidating(true)
    setValidationResult(null)

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: userIdea,
          description: ideaDescription,
          targetMarket: '',
          businessModel: ''
        }),
      })

      const data = await response.json()
      setValidationResult(data)
      
      // Convert validation result to opportunity format for consistency
      const opportunity = {
        id: data.ideaId || Date.now().toString(),
        title: data.idea,
        tagline: data.description,
        problem: data.description,
        solution: data.description,
        targetCustomer: '',
        marketSize: '',
        competitors: [],
        revenueModel: '',
        marketPotential: data.overallScore >= 70 ? 'High' : data.overallScore >= 60 ? 'Medium' : 'Low',
        sources: ['User Input'],
        tags: [],
        confidence: data.overallScore,
        detailedAnalysis: {
          marketTrends: data.validationChecks[0]?.details || '',
          keyInsights: data.validationChecks[1]?.details || '',
          opportunities: data.validationChecks[3]?.details || '',
          risks: data.riskFactors?.map(r => r.description).join(', ') || ''
        },
        nextSteps: data.nextSteps || [],
        validationData: data
      }

      // Add to opportunities list
      setOpportunities(prev => [opportunity, ...prev])
    } catch (error) {
      console.error('Validation error:', error)
      alert('Failed to validate idea. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  // Generate AI opportunities from signals
  const generateOpportunities = async () => {
    setIsScanning(true)
    
    // Simulate AI processing time
    setTimeout(() => {
      const generatedOpportunities = [
        {
          id: '1',
          title: 'AI-Powered Customer Service Platform',
          tagline: 'Revolutionary AI that handles customer inquiries with human-like understanding',
          problem: 'Businesses struggle with high customer service costs and inconsistent response quality. Current solutions are either too expensive or lack the intelligence to handle complex queries.',
          solution: 'An AI-powered platform that understands context, emotions, and intent to provide personalized customer service at scale.',
          targetCustomer: 'E-commerce businesses, SaaS companies, customer service agencies, enterprise corporations',
          marketSize: '$8.2B TAM, $1.2B SAM, $120M SOM',
          competitors: ['Zendesk', 'Intercom', 'Freshworks', 'Drift'],
          revenueModel: 'SaaS subscription with usage-based pricing',
          marketPotential: 'High',
          sources: ['Google', 'Hacker News', 'Twitter'],
          tags: ['AI', 'Customer Service', 'SaaS', 'B2B'],
          confidence: 87,
          detailedAnalysis: {
            marketTrends: 'Customer service automation market growing 15% YoY',
            keyInsights: 'AI customer service reduces costs by 60% while improving satisfaction',
            opportunities: 'Enterprise adoption accelerating, API integrations in demand',
            risks: 'Competition from established players, AI accuracy concerns'
          },
          nextSteps: [
            'Validate problem with 20+ potential customers',
            'Build MVP with core AI capabilities',
            'Test pricing model with early adopters',
            'Develop enterprise features and integrations'
          ]
        },
        {
          id: '2',
          title: 'Climate Tech Investment Platform',
          tagline: 'Connecting climate-focused startups with impact investors',
          problem: 'Climate tech startups struggle to find aligned investors and vice versa. Current platforms lack specialized focus on environmental impact.',
          solution: 'A specialized platform that matches climate tech startups with impact investors based on environmental goals and financial returns.',
          targetCustomer: 'Climate tech startups, impact investors, accelerators, sustainability consultants',
          marketSize: '$2.1B TAM, $420M SAM, $42M SOM',
          competitors: ['AngelList', 'Crunchbase', 'Climate Capital'],
          revenueModel: 'Transaction fees + premium subscriptions',
          marketPotential: 'Medium',
          sources: ['Crunchbase', 'Reddit', 'Twitter'],
          tags: ['Climate', 'Fintech', 'B2B'],
          confidence: 82,
          detailedAnalysis: {
            marketTrends: 'Climate tech funding increased 300% in 2023',
            keyInsights: 'Impact investors prioritize both returns and environmental impact',
            opportunities: 'ESG regulations driving demand, carbon credit integration',
            risks: 'Market volatility, regulatory changes, competition from general platforms'
          },
          nextSteps: [
            'Research investor preferences and startup needs',
            'Build MVP with matching algorithm',
            'Partner with climate accelerators',
            'Develop carbon impact measurement tools'
          ]
        },
        {
          id: '3',
          title: 'Mental Health Analytics Platform',
          tagline: 'AI-powered insights for workplace mental health and wellness',
          problem: 'Companies lack visibility into employee mental health trends and struggle to implement effective wellness programs.',
          solution: 'An analytics platform that provides insights into workplace mental health patterns and recommends personalized wellness interventions.',
          targetCustomer: 'HR departments, wellness companies, mental health professionals, enterprise employers',
          marketSize: '$4.8B TAM, $720M SAM, $72M SOM',
          competitors: ['Lyra Health', 'Ginger', 'Headspace for Work'],
          revenueModel: 'Per-employee subscription + analytics add-ons',
          marketPotential: 'High',
          sources: ['Google', 'Reddit', 'GitHub'],
          tags: ['Mental Health', 'Analytics', 'B2B'],
          confidence: 79,
          detailedAnalysis: {
            marketTrends: 'Workplace mental health market growing 25% annually',
            keyInsights: 'Remote work increased mental health awareness and demand',
            opportunities: 'AI-powered insights, integration with HR systems',
            risks: 'Privacy concerns, regulatory compliance, stigma around mental health'
          },
          nextSteps: [
            'Conduct privacy-compliant pilot with enterprise clients',
            'Develop AI models for mental health pattern recognition',
            'Build integrations with popular HR platforms',
            'Create anonymized benchmarking reports'
          ]
        }
      ]
      
      setOpportunities(generatedOpportunities)
      setIsScanning(false)
    }, 3000)
  }

  // Save idea to localStorage
  const saveIdea = (idea) => {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    const newIdea = {
      id: Date.now().toString(),
      ...idea,
      savedAt: new Date().toISOString()
    }
    savedIdeas.push(newIdea)
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas))
    setSavedIdeas(savedIdeas)
    alert('Idea saved successfully!')
  }

  // Navigate to MVP Builder with auto-filled data
  const navigateToMVPBuilder = (idea) => {
    // Store idea data for auto-filling
    localStorage.setItem('selectedIdea', JSON.stringify({
      title: idea.title,
      description: idea.solution,
      problem: idea.problem,
      targetCustomer: idea.targetCustomer,
      industry: idea.tags[0] || 'Tech',
      features: getSuggestedFeatures(idea.tags),
      businessModel: idea.revenueModel,
      tagline: idea.tagline,
      marketSize: idea.marketSize,
      competitors: idea.competitors,
      revenueModel: idea.revenueModel
    }))
    router.push('/mvp-builder')
  }

  // Navigate to Branding with auto-filled data
  const navigateToBranding = (idea) => {
    // Store idea data for auto-filling
    localStorage.setItem('selectedIdea', JSON.stringify({
      title: idea.title,
      tagline: idea.tagline,
      industry: idea.tags[0] || 'Tech',
      personality: getSuggestedPersonality(idea.tags),
      problem: idea.problem,
      targetCustomer: idea.targetCustomer,
      description: idea.solution,
      marketSize: idea.marketSize,
      competitors: idea.competitors,
      revenueModel: idea.revenueModel
    }))
    router.push('/branding')
  }

  // Navigate to Business Plan with auto-filled data
  const navigateToBusinessPlan = (idea) => {
    // Store idea data for auto-filling
    localStorage.setItem('selectedIdea', JSON.stringify({
      title: idea.title,
      tagline: idea.tagline,
      problem: idea.problem,
      solution: idea.solution,
      targetCustomer: idea.targetCustomer,
      marketSize: idea.marketSize,
      competitors: idea.competitors,
      revenueModel: idea.revenueModel,
      industry: idea.tags[0] || 'Tech',
      detailedAnalysis: idea.detailedAnalysis,
      nextSteps: idea.nextSteps
    }))
    router.push('/plan-generator')
  }

  // Get suggested features based on tags
  const getSuggestedFeatures = (tags) => {
    const featureMap = {
      'AI': ['User Authentication', 'Dashboard', 'Analytics'],
      'SaaS': ['User Authentication', 'Dashboard', 'Payment Integration', 'Analytics'],
      'B2B': ['User Authentication', 'Dashboard', 'Data Management', 'Analytics'],
      'Fintech': ['User Authentication', 'Dashboard', 'Payment Integration', 'Data Management'],
      'Climate': ['User Authentication', 'Dashboard', 'Analytics'],
      'Mental Health': ['User Authentication', 'Dashboard', 'Analytics']
    }
    
    const features = new Set()
    tags.forEach(tag => {
      if (featureMap[tag]) {
        featureMap[tag].forEach(feature => features.add(feature))
      }
    })
    
    return Array.from(features)
  }

  // Get suggested personality based on tags
  const getSuggestedPersonality = (tags) => {
    const personalityMap = {
      'AI': 'Modern, Professional, Innovative',
      'SaaS': 'Professional, Trustworthy, Efficient',
      'B2B': 'Professional, Reliable, Authoritative',
      'Fintech': 'Professional, Secure, Trustworthy',
      'Climate': 'Friendly, Sustainable, Optimistic',
      'Mental Health': 'Friendly, Supportive, Caring'
    }
    
    return personalityMap[tags[0]] || 'Professional, Modern, Trustworthy'
  }

  // Get market potential color
  const getMarketPotentialColor = (potential) => {
    switch (potential) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Get source icon
  const getSourceIcon = (source) => {
    const icons = {
      'Google': '🔍',
      'Hacker News': '📰',
      'Reddit': '🤖',
      'X': '🐦',
      'GitHub': '💻',
      'Crunchbase': '💰'
    }
    return icons[source] || '📄'
  }

  // Load saved ideas on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    setSavedIdeas(saved)
  }, [])

  // Fetch signals when tab changes
  useEffect(() => {
    if (!signals[activeTab]) {
      fetchSignals(activeTab)
    }
  }, [activeTab])

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
                Discover Startup Opportunities from Real Signals
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                FounderX scans the web for the next billion-dollar ideas. We analyze Google, Hacker News, Reddit, X, GitHub, and Crunchbase to find emerging trends and opportunities.
              </p>
            </div>

            {/* User Idea Input Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Validate Your Own Idea</h2>
              <p className="text-gray-600 mb-6">
                Enter your startup idea below and get instant validation with market analysis, competition insights, and feasibility scores.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Idea *
                  </label>
                  <input
                    id="idea"
                    type="text"
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    placeholder="e.g., AI-powered personal finance assistant"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    placeholder="Describe your idea in more detail..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 resize-none"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={validateUserIdea}
                    disabled={!userIdea.trim() || isValidating}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isValidating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Validating...
                      </>
                    ) : (
                      <>
                        ✓ Validate Idea
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={generateOpportunities}
                    disabled={isScanning}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Scanning Internet...
                      </>
                    ) : (
                      <>
                        🌐 Scan Internet for Multi-Billion Ideas
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Signal Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {signalSources.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setActiveTab(source.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === source.id
                          ? `border-${source.color}-500 text-${source.color}-600`
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{source.icon}</span>
                      {source.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Signal Feed */}
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Raw Signals from {signalSources.find(s => s.id === activeTab)?.name}
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    (signals[activeTab] || []).map((signal, index) => (
                      <div key={index} className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <h4 className="font-medium text-gray-900 mb-1">{signal.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{signal.source || signal.subreddit || signal.language || signal.stage}</span>
                          <span className="mx-2">•</span>
                          <span>{signal.timestamp || signal.score || signal.upvotes || signal.retweets || signal.stars}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Opportunities Section */}
            {opportunities.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Opportunities</h2>
                  <span className="text-sm text-gray-500">{opportunities.length} {opportunities.length === 1 ? 'opportunity' : 'opportunities'} found</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {opportunities.map((opportunity, index) => (
                    <div 
                      key={opportunity.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                          <p className="text-gray-600 mb-3">{opportunity.tagline}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getMarketPotentialColor(opportunity.marketPotential)}`}>
                          {opportunity.marketPotential} Potential
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Problem:</h4>
                        <p className="text-gray-600 text-sm">{opportunity.problem}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Target Customer:</h4>
                        <p className="text-gray-600 text-sm">{opportunity.targetCustomer}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.sources.map((source, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                              <span className="mr-1">{getSourceIcon(source)}</span>
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">Confidence:</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${opportunity.confidence}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{opportunity.confidence}%</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setExpandedCard(expandedCard === opportunity.id ? null : opportunity.id)}
                        >
                          {expandedCard === opportunity.id ? '📖 Less' : '📖 More'}
                        </Button>
                      </div>

                      {/* Expanded Content */}
                      {expandedCard === opportunity.id && (
                        <div className="border-t border-gray-200 pt-4 space-y-4">
                          {opportunity.validationData && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                              <h4 className="font-semibold text-green-900 mb-3">Validation Results</h4>
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">Overall Score:</span>
                                  <span className="text-2xl font-bold text-green-600">{opportunity.validationData.overallScore}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className={`h-3 rounded-full ${
                                      opportunity.validationData.overallScore >= 70 ? 'bg-green-500' :
                                      opportunity.validationData.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${opportunity.validationData.overallScore}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {opportunity.validationData.validationChecks?.slice(0, 4).map((check, idx) => (
                                  <div key={idx} className="bg-white rounded p-2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-medium text-gray-700">{check.category}:</span>
                                      <span className={`text-xs font-bold ${
                                        check.status === 'pass' ? 'text-green-600' :
                                        check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                      }`}>
                                        {check.score}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                      <div 
                                        className={`h-1.5 rounded-full ${
                                          check.status === 'pass' ? 'bg-green-500' :
                                          check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${check.score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                            <p className="text-gray-600 text-sm">{opportunity.solution}</p>
                          </div>

                          {opportunity.marketSize && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Market Size:</h4>
                              <p className="text-gray-600 text-sm">{opportunity.marketSize}</p>
                            </div>
                          )}

                          {opportunity.competitors && opportunity.competitors.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Key Competitors:</h4>
                              <div className="flex flex-wrap gap-2">
                                {opportunity.competitors.map((competitor, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    {competitor}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {opportunity.revenueModel && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Revenue Model:</h4>
                              <p className="text-gray-600 text-sm">{opportunity.revenueModel}</p>
                            </div>
                          )}

                          {opportunity.validationData?.fundingRecommendation && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Funding Recommendation:</h4>
                              <p className="text-gray-600 text-sm">
                                <strong>Amount:</strong> {opportunity.validationData.fundingRecommendation.needed}
                              </p>
                              <p className="text-gray-600 text-sm">
                                <strong>Use:</strong> {opportunity.validationData.fundingRecommendation.use}
                              </p>
                              <p className="text-gray-600 text-sm">
                                <strong>Sources:</strong> {opportunity.validationData.fundingRecommendation.sources.join(', ')}
                              </p>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Market Analysis:</h4>
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-gray-700">Trends:</span>
                                <span className="text-gray-600 text-sm ml-2">{opportunity.detailedAnalysis.marketTrends}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Key Insights:</span>
                                <span className="text-gray-600 text-sm ml-2">{opportunity.detailedAnalysis.keyInsights}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Opportunities:</span>
                                <span className="text-gray-600 text-sm ml-2">{opportunity.detailedAnalysis.opportunities}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Risks:</span>
                                <span className="text-gray-600 text-sm ml-2">{opportunity.detailedAnalysis.risks}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                            <ul className="space-y-1">
                              {opportunity.nextSteps.map((step, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                  <span className="text-blue-500 mr-2">•</span>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => saveIdea(opportunity)}
                          className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 focus:ring-green-500"
                        >
                          💾 Save
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigateToBusinessPlan(opportunity)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:ring-blue-500"
                        >
                          📋 Plan
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigateToMVPBuilder(opportunity)}
                          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white focus:ring-green-500"
                        >
                          🚀 MVP
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigateToBranding(opportunity)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white focus:ring-purple-500"
                        >
                          🎨 Brand
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Ideas Sidebar */}
            {savedIdeas.length > 0 && (
              <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                <h3 className="font-semibold text-gray-900 mb-3">💾 Saved Ideas ({savedIdeas.length})</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedIdeas.slice(-5).map((idea) => (
                    <div key={idea.id} className="p-2 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{idea.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{idea.tagline}</p>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigateToMVPBuilder(idea)}
                          className="text-xs px-2 py-1"
                        >
                          MVP
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigateToBranding(idea)}
                          className="text-xs px-2 py-1"
                        >
                          Brand
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}