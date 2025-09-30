export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Mock data for founder dashboard overview
  const overviewData = {
    metrics: [
      {
        title: 'Total Startups Launched',
        value: '247',
        change: '+12.5%',
        changeType: 'positive',
        icon: '🚀',
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'Active Founders',
        value: '1,847',
        change: '+8.2%',
        changeType: 'positive',
        icon: '👥',
        color: 'from-green-500 to-green-600'
      },
      {
        title: 'Total Signups',
        value: '12,456',
        change: '+23.1%',
        changeType: 'positive',
        icon: '📈',
        color: 'from-purple-500 to-purple-600'
      },
      {
        title: 'Platform Revenue',
        value: '$45,678',
        change: '+15.7%',
        changeType: 'positive',
        icon: '💰',
        color: 'from-orange-500 to-orange-600'
      }
    ],
    trendingIdeas: [
      { title: 'AI-Powered Code Review', industry: 'Developer Tools', score: 94, trend: 'up' },
      { title: 'Climate Data Analytics', industry: 'Climate Tech', score: 89, trend: 'up' },
      { title: 'Mental Health Chatbot', industry: 'Health Tech', score: 87, trend: 'up' },
      { title: 'Decentralized Identity', industry: 'Web3', score: 85, trend: 'up' },
      { title: 'Remote Team Analytics', industry: 'SaaS', score: 82, trend: 'up' }
    ],
    userGrowthData: [
      { month: 'Jan', users: 1200 },
      { month: 'Feb', users: 1350 },
      { month: 'Mar', users: 1480 },
      { month: 'Apr', users: 1620 },
      { month: 'May', users: 1750 },
      { month: 'Jun', users: 1847 }
    ],
    revenueData: [
      { month: 'Jan', revenue: 32000 },
      { month: 'Feb', revenue: 35000 },
      { month: 'Mar', revenue: 38000 },
      { month: 'Apr', revenue: 41000 },
      { month: 'May', revenue: 43000 },
      { month: 'Jun', revenue: 45678 }
    ]
  }

  res.status(200).json(overviewData)
}
