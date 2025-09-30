export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Mock data for startup portfolio
  const startupsData = {
    startups: [
      {
        id: 1,
        name: 'CodeReview AI',
        logo: '🤖',
        industry: 'Developer Tools',
        status: 'launched',
        description: 'AI-powered code review tool for developers',
        founder: 'Sarah Johnson',
        revenue: 12500,
        users: 2340,
        traction: 94,
        launchDate: '2024-01-15',
        website: 'https://codereview-ai.com',
        statusColor: 'bg-green-100 text-green-800'
      },
      {
        id: 2,
        name: 'ClimateTracker',
        logo: '🌱',
        industry: 'Climate Tech',
        status: 'growing',
        description: 'Real-time climate data analytics platform',
        founder: 'Mike Chen',
        revenue: 8900,
        users: 1560,
        traction: 87,
        launchDate: '2024-02-20',
        website: 'https://climatetracker.io',
        statusColor: 'bg-blue-100 text-blue-800'
      },
      {
        id: 3,
        name: 'HealthBot Pro',
        logo: '🏥',
        industry: 'Health Tech',
        status: 'mvp',
        description: 'AI chatbot for mental health support',
        founder: 'Emily Davis',
        revenue: 0,
        users: 120,
        traction: 76,
        launchDate: '2024-03-01',
        website: 'https://healthbot-pro.com',
        statusColor: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 4,
        name: 'DeFi Identity',
        logo: '🔐',
        industry: 'Web3',
        status: 'idea',
        description: 'Decentralized identity management system',
        founder: 'Alex Rodriguez',
        revenue: 0,
        users: 0,
        traction: 82,
        launchDate: '2024-03-15',
        website: null,
        statusColor: 'bg-gray-100 text-gray-800'
      },
      {
        id: 5,
        name: 'TeamAnalytics',
        logo: '📊',
        industry: 'SaaS',
        status: 'launched',
        description: 'Remote team performance analytics',
        founder: 'Lisa Wang',
        revenue: 5600,
        users: 890,
        traction: 79,
        launchDate: '2024-01-28',
        website: 'https://teamanalytics.co',
        statusColor: 'bg-green-100 text-green-800'
      }
    ],
    stats: {
      totalStartups: 5,
      launched: 2,
      totalRevenue: 27000,
      totalUsers: 4910
    }
  }

  res.status(200).json(startupsData)
}
