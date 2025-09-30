export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Mock data for financial dashboard
  const financialData = {
    metrics: [
      {
        title: 'Monthly Recurring Revenue',
        value: '$45,678',
        change: '+12.5%',
        changeType: 'positive',
        icon: '💰',
        color: 'from-green-500 to-green-600'
      },
      {
        title: 'Active Subscriptions',
        value: '647',
        change: '+8.2%',
        changeType: 'positive',
        icon: '💳',
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'Churn Rate',
        value: '2.1%',
        change: '-0.3%',
        changeType: 'positive',
        icon: '📉',
        color: 'from-red-500 to-red-600'
      },
      {
        title: 'Average Revenue Per User',
        value: '$70.6',
        change: '+5.7%',
        changeType: 'positive',
        icon: '📊',
        color: 'from-purple-500 to-purple-600'
      }
    ],
    mrrData: [
      { month: 'Jan', mrr: 32000 },
      { month: 'Feb', mrr: 35000 },
      { month: 'Mar', mrr: 38000 },
      { month: 'Apr', mrr: 41000 },
      { month: 'May', mrr: 43000 },
      { month: 'Jun', mrr: 45678 }
    ],
    planDistribution: [
      { plan: 'Free', count: 1200, percentage: 65 },
      { plan: 'Pro', count: 500, percentage: 27 },
      { plan: 'Premium', count: 147, percentage: 8 }
    ],
    transactions: [
      {
        id: 'txn_001',
        date: '2024-03-15',
        amount: 1500.00,
        type: 'subscription',
        status: 'completed',
        customer: 'Sarah Johnson',
        plan: 'Pro',
        description: 'Pro Plan - Monthly Subscription'
      },
      {
        id: 'txn_002',
        date: '2024-03-14',
        amount: 2500.00,
        type: 'subscription',
        status: 'completed',
        customer: 'Emily Davis',
        plan: 'Premium',
        description: 'Premium Plan - Monthly Subscription'
      },
      {
        id: 'txn_003',
        date: '2024-03-13',
        amount: 1500.00,
        type: 'subscription',
        status: 'completed',
        customer: 'Mike Chen',
        plan: 'Pro',
        description: 'Pro Plan - Monthly Subscription'
      },
      {
        id: 'txn_004',
        date: '2024-03-12',
        amount: 500.00,
        type: 'refund',
        status: 'completed',
        customer: 'Alex Rodriguez',
        plan: 'Pro',
        description: 'Pro Plan - Refund'
      },
      {
        id: 'txn_005',
        date: '2024-03-11',
        amount: 1500.00,
        type: 'subscription',
        status: 'completed',
        customer: 'Lisa Wang',
        plan: 'Pro',
        description: 'Pro Plan - Monthly Subscription'
      }
    ]
  }

  res.status(200).json(financialData)
}
