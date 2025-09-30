import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import FounderSidebar from '@/components/founder/FounderSidebar'
import FounderNavbar from '@/components/founder/FounderNavbar'
import ChartCard from '@/components/founder/ChartCard'
import DataTable from '@/components/founder/DataTable'

export default function FinancialDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('financials')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch financial data from API
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch('/api/founder/financials')
        const data = await response.json()
        
        if (data.transactions) {
          setTransactions(data.transactions)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching financial data:', error)
        // Fallback to mock data
        setTransactions([
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
        ])
        setLoading(false)
      }
    }

    fetchFinancialData()
  }, [])

  const mrrData = [
    { month: 'Jan', mrr: 32000 },
    { month: 'Feb', mrr: 35000 },
    { month: 'Mar', mrr: 38000 },
    { month: 'Apr', mrr: 41000 },
    { month: 'May', mrr: 43000 },
    { month: 'Jun', mrr: 45678 }
  ]

  const planDistributionData = [
    { plan: 'Free', count: 1200, percentage: 65 },
    { plan: 'Pro', count: 500, percentage: 27 },
    { plan: 'Premium', count: 147, percentage: 8 }
  ]

  const transactionColumns = [
    {
      key: 'id',
      label: 'Transaction ID',
      render: (txn) => (
        <span className="font-mono text-sm text-gray-900">{txn.id}</span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (txn) => (
        <span className="text-sm text-gray-900">
          {new Date(txn.date).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (txn) => (
        <div>
          <p className="font-medium text-gray-900">{txn.customer}</p>
          <p className="text-sm text-gray-500">{txn.plan}</p>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (txn) => (
        <span className={`font-medium ${
          txn.type === 'refund' ? 'text-red-600' : 'text-green-600'
        }`}>
          {txn.type === 'refund' ? '-' : '+'}${txn.amount.toFixed(2)}
        </span>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (txn) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          txn.type === 'subscription' ? 'bg-blue-100 text-blue-800' :
          txn.type === 'refund' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {txn.type}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (txn) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          txn.status === 'completed' ? 'bg-green-100 text-green-800' :
          txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {txn.status}
        </span>
      )
    }
  ]

  const financialMetrics = [
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
  ]

  return (
    <>
      <Head>
        <title>Financial Dashboard - Founder Dashboard</title>
        <meta name="description" content="Monitor FounderX financial metrics and revenue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-gray-50">
        {/* Founder Sidebar */}
        <FounderSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Founder Navbar */}
          <FounderNavbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Monitor revenue, subscriptions, and financial health
                </p>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {financialMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.changeType === 'positive' ? '↗' : '↘'} {metric.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-2xl">{metric.icon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ChartCard
                  title="MRR Growth"
                  data={mrrData}
                  type="line"
                  color="green"
                />
                
                {/* Plan Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Plan Distribution</h3>
                  <div className="space-y-4">
                    {planDistributionData.map((plan, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            plan.plan === 'Free' ? 'bg-gray-400' :
                            plan.plan === 'Pro' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{plan.plan}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                plan.plan === 'Free' ? 'bg-gray-400' :
                                plan.plan === 'Pro' ? 'bg-blue-500' :
                                'bg-purple-500'
                              }`}
                              style={{ width: `${plan.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12 text-right">
                            {plan.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Export Transactions
                    </button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading transactions...</p>
                  </div>
                ) : (
                  <DataTable 
                    data={transactions} 
                    columns={transactionColumns}
                    emptyMessage="No transactions found"
                  />
                )}
              </div>

              {/* Financial Summary */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pro Subscriptions</span>
                      <span className="text-sm font-medium text-gray-900">$27,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Premium Subscriptions</span>
                      <span className="text-sm font-medium text-gray-900">$18,678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">One-time Payments</span>
                      <span className="text-sm font-medium text-gray-900">$0</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">Total Revenue</span>
                      <span className="text-sm font-semibold text-gray-900">$45,678</span>
                    </div>
                  </div>
                </div>

                {/* Stripe Payouts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stripe Payouts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Payout</span>
                      <span className="text-sm font-medium text-gray-900">$42,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Payout</span>
                      <span className="text-sm font-medium text-gray-900">$45,678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Payout Schedule</span>
                      <span className="text-sm font-medium text-gray-900">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Processing Fee</span>
                      <span className="text-sm font-medium text-gray-900">2.9%</span>
                    </div>
                  </div>
                </div>

                {/* Growth Metrics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">MRR Growth Rate</span>
                      <span className="text-sm font-medium text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customer Growth</span>
                      <span className="text-sm font-medium text-green-600">+8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ARPU Growth</span>
                      <span className="text-sm font-medium text-green-600">+5.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Churn Rate</span>
                      <span className="text-sm font-medium text-red-600">2.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
