import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useAuth } from '../lib/auth'

export default function Billing() {
  const { user } = useAuth()
  const [billingHistory, setBillingHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock billing data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setBillingHistory([
        {
          id: 'inv_001',
          date: '2024-01-15',
          amount: 15.00,
          status: 'paid',
          plan: 'Pro',
          description: 'Pro Plan - Monthly Subscription',
          invoiceUrl: '#'
        },
        {
          id: 'inv_002',
          date: '2023-12-15',
          amount: 15.00,
          status: 'paid',
          plan: 'Pro',
          description: 'Pro Plan - Monthly Subscription',
          invoiceUrl: '#'
        },
        {
          id: 'inv_003',
          date: '2023-11-15',
          amount: 15.00,
          status: 'paid',
          plan: 'Pro',
          description: 'Pro Plan - Monthly Subscription',
          invoiceUrl: '#'
        },
        {
          id: 'inv_004',
          date: '2023-10-15',
          amount: 0.00,
          status: 'paid',
          plan: 'Free',
          description: 'Free Plan - No Charge',
          invoiceUrl: '#'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Free':
        return 'bg-gray-100 text-gray-800'
      case 'Pro':
        return 'bg-blue-100 text-blue-800'
      case 'Premium':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading billing history...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Billing History - FounderX</title>
        <meta name="description" content="View your billing history and invoices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing History</h1>
            <p className="text-gray-600">View and download your invoices and payment history</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$45.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">{billingHistory.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Next Billing</p>
                  <p className="text-2xl font-bold text-gray-900">Feb 15</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Payment Method</p>
                  <p className="text-lg font-bold text-gray-900">****4242</p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                          <div className="text-sm text-gray-500">{invoice.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(invoice.plan)}`}>
                          {invoice.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            Download
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">💳</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Update
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Billing Address Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Address</h2>
            
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-gray-600">123 Main Street</p>
                <p className="text-gray-600">San Francisco, CA 94105</p>
                <p className="text-gray-600">United States</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Update Address
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600">❓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help with Billing?</h3>
                <p className="text-blue-800 mb-4">
                  If you have questions about your billing or need to dispute a charge, our support team is here to help.
                </p>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    View FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
