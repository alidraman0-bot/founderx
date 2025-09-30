import React from 'react'

export default function TrendingIdeas({ ideas }) {
  const getIndustryColor = (industry) => {
    const colors = {
      'Developer Tools': 'bg-blue-100 text-blue-800',
      'Climate Tech': 'bg-green-100 text-green-800',
      'Health Tech': 'bg-red-100 text-red-800',
      'Web3': 'bg-purple-100 text-purple-800',
      'SaaS': 'bg-gray-100 text-gray-800',
      'AI': 'bg-orange-100 text-orange-800',
      'Fintech': 'bg-yellow-100 text-yellow-800'
    }
    return colors[industry] || 'bg-gray-100 text-gray-800'
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top 5 Trending Startup Ideas</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {ideas.map((idea, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{idea.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getIndustryColor(idea.industry)}`}>
                    {idea.industry}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className={`text-xs font-medium ${getScoreColor(idea.score)}`}>
                    Score: {idea.score}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span className="text-sm font-medium">Trending</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Ranked by traction score and user engagement</span>
          <span>Updated 2 hours ago</span>
        </div>
      </div>
    </div>
  )
}
