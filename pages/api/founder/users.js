export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Mock data for user management
  const usersData = {
    users: [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        plan: 'Pro',
        status: 'active',
        startupsLaunched: 3,
        ideasGenerated: 47,
        mvpsBuilt: 2,
        joinedDate: '2024-01-15',
        lastActive: '2 hours ago',
        avatar: 'SJ'
      },
      {
        id: 2,
        name: 'Mike Chen',
        email: 'mike@example.com',
        plan: 'Free',
        status: 'active',
        startupsLaunched: 1,
        ideasGenerated: 12,
        mvpsBuilt: 1,
        joinedDate: '2024-02-20',
        lastActive: '1 day ago',
        avatar: 'MC'
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily@example.com',
        plan: 'Premium',
        status: 'active',
        startupsLaunched: 5,
        ideasGenerated: 89,
        mvpsBuilt: 4,
        joinedDate: '2023-12-10',
        lastActive: '30 minutes ago',
        avatar: 'ED'
      },
      {
        id: 4,
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        plan: 'Pro',
        status: 'suspended',
        startupsLaunched: 2,
        ideasGenerated: 23,
        mvpsBuilt: 1,
        joinedDate: '2024-01-05',
        lastActive: '1 week ago',
        avatar: 'AR'
      },
      {
        id: 5,
        name: 'Lisa Wang',
        email: 'lisa@example.com',
        plan: 'Free',
        status: 'active',
        startupsLaunched: 0,
        ideasGenerated: 8,
        mvpsBuilt: 0,
        joinedDate: '2024-03-01',
        lastActive: '3 days ago',
        avatar: 'LW'
      }
    ],
    stats: {
      totalUsers: 5,
      activeUsers: 4,
      proSubscribers: 2,
      totalStartups: 11
    }
  }

  res.status(200).json(usersData)
}
