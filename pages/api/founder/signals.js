export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Mock data for signals and trends
  const signalsData = {
    signals: [
      {
        id: 1,
        title: 'AI-Powered Code Review Tool',
        industry: 'Developer Tools',
        traction: 94,
        timestamp: '2 hours ago',
        source: 'Hacker News',
        description: 'Automated code review using machine learning'
      },
      {
        id: 2,
        title: 'Climate Data Analytics Platform',
        industry: 'Climate Tech',
        traction: 89,
        timestamp: '4 hours ago',
        source: 'Reddit',
        description: 'Real-time climate monitoring and analysis'
      },
      {
        id: 3,
        title: 'Mental Health Chatbot',
        industry: 'Health Tech',
        traction: 87,
        timestamp: '6 hours ago',
        source: 'Google News',
        description: 'AI-powered mental health support system'
      },
      {
        id: 4,
        title: 'Decentralized Identity Management',
        industry: 'Web3',
        traction: 85,
        timestamp: '8 hours ago',
        source: 'Hacker News',
        description: 'Self-sovereign identity solutions'
      },
      {
        id: 5,
        title: 'Remote Team Analytics',
        industry: 'SaaS',
        traction: 82,
        timestamp: '12 hours ago',
        source: 'Reddit',
        description: 'Productivity tracking for distributed teams'
      }
    ],
    trendingKeywords: [
      { keyword: 'AI', count: 156, trend: 'up' },
      { keyword: 'Climate', count: 89, trend: 'up' },
      { keyword: 'Web3', count: 78, trend: 'down' },
      { keyword: 'HealthTech', count: 67, trend: 'up' },
      { keyword: 'SaaS', count: 54, trend: 'stable' },
      { keyword: 'Fintech', count: 43, trend: 'up' },
      { keyword: 'EdTech', count: 38, trend: 'down' },
      { keyword: 'DevTools', count: 32, trend: 'up' }
    ],
    industryData: [
      { industry: 'AI Tools', count: 45, percentage: 25 },
      { industry: 'Climate Tech', count: 32, percentage: 18 },
      { industry: 'Health Tech', count: 28, percentage: 16 },
      { industry: 'Web3', count: 24, percentage: 13 },
      { industry: 'SaaS', count: 22, percentage: 12 },
      { industry: 'Fintech', count: 18, percentage: 10 },
      { industry: 'EdTech', count: 11, percentage: 6 }
    ]
  }

  res.status(200).json(signalsData)
}
