import React from 'react'
import Link from 'next/link'

export default function IdeaCard({ idea, onSave, onGenerateBranding }) {
  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800'
    if (score >= 6) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getScoreLabel = (score) => {
    if (score >= 8) return 'High'
    if (score >= 6) return 'Medium'
    return 'Low'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {idea.title}
          </h3>
          <p className="text-gray-600 text-sm">{idea.tagline}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(idea.marketScore)}`}>
          {getScoreLabel(idea.marketScore)} Potential
        </span>
      </div>

      {/* Problem Statement */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Problem</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{idea.problem}</p>
      </div>

      {/* Target Customer */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Customer</h4>
        <p className="text-gray-600 text-sm">{idea.targetCustomer}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/plan-generator" className="flex-1">
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-200 hover:scale-105">
            View Business Plan
          </button>
        </Link>
        <button 
          onClick={() => onSave(idea)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Save Idea
        </button>
        <button 
          onClick={() => onGenerateBranding(idea)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Branding
        </button>
      </div>
    </div>
  )
}