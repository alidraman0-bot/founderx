import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'Startup ID is required' })
    }

    // Simulate analytics API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock analytics data
    const analytics = {
      startupId: id,
      period: '30d',
      metrics: {
        signups: {
          total: 234,
          growth: 12.5,
          trend: 'up'
        },
        revenue: {
          total: 1250,
          growth: 8.2,
          trend: 'up'
        },
        traffic: {
          total: 1200,
          growth: 15.7,
          trend: 'up'
        },
        conversion: {
          rate: 19.5,
          growth: 2.1,
          trend: 'up'
        }
      },
      sources: [
        { name: 'Direct', visitors: 450, signups: 89 },
        { name: 'Twitter', visitors: 320, signups: 64 },
        { name: 'Reddit', visitors: 280, signups: 56 },
        { name: 'ProductHunt', visitors: 150, signups: 25 }
      ],
      recentSignups: [
        { email: 'john@example.com', name: 'John Doe', timestamp: '2024-03-15T10:30:00Z', source: 'Direct' },
        { email: 'sarah@example.com', name: 'Sarah Smith', timestamp: '2024-03-15T09:15:00Z', source: 'Twitter' },
        { email: 'mike@example.com', name: 'Mike Johnson', timestamp: '2024-03-15T08:45:00Z', source: 'Reddit' }
      ],
      feedback: [
        { message: 'Love the AI suggestions!', rating: 5, timestamp: '2024-03-15T11:00:00Z', source: 'Email' },
        { message: 'Great tool, but could use better GitHub integration.', rating: 4, timestamp: '2024-03-15T10:30:00Z', source: 'Website' }
      ]
    }

    res.status(200).json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
