import { useState } from 'react';

export default function ValidationCard({ validation }) {
  const [activeTab, setActiveTab] = useState('overview');

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return 'ℹ️';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!validation) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Validate Your Idea</h3>
          <p className="text-gray-600 mb-6">Enter your business idea details to get a comprehensive validation report.</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Validation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{validation.idea}</h3>
            <p className="text-gray-600 mt-1">{validation.description}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(validation.overallScore)}`}>
              Score: {validation.overallScore}/100
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'checks', name: 'Validation Checks', icon: '✅' },
            { id: 'risks', name: 'Risk Analysis', icon: '⚠️' },
            { id: 'next', name: 'Next Steps', icon: '🚀' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{validation.estimatedTimeline.mvp}</div>
                <div className="text-sm text-gray-600">Time to MVP</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{validation.estimatedTimeline.launch}</div>
                <div className="text-sm text-gray-600">Time to Launch</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">{validation.estimatedTimeline.profitability}</div>
                <div className="text-sm text-gray-600">Time to Profitability</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Funding Recommendation</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-900">Amount Needed:</span>
                  <span className="font-bold text-blue-900">{validation.fundingRecommendation.needed}</span>
                </div>
                <div className="text-sm text-blue-700 mb-2">{validation.fundingRecommendation.use}</div>
                <div className="text-sm text-blue-600">
                  <strong>Sources:</strong> {validation.fundingRecommendation.sources.join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checks' && (
          <div className="space-y-4">
            {validation.validationChecks.map((check, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="mr-2">{getStatusIcon(check.status)}</span>
                    <h4 className="font-semibold text-gray-900">{check.category}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm font-semibold ${getScoreColor(check.score)}`}>
                    {check.score}/100
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{check.details}</p>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {check.recommendations.map((rec, recIndex) => (
                      <li key={recIndex} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {validation.riskFactors.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{risk.factor}</h4>
                  <div className={`px-2 py-1 rounded-full text-sm font-semibold ${getRiskColor(risk.level)}`}>
                    {risk.level.toUpperCase()} RISK
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{risk.description}</p>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Mitigation Strategy:</h5>
                  <p className="text-sm text-gray-600">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'next' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Recommended Next Steps</h4>
              <div className="space-y-3">
                {validation.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">🚀 Ready to Start?</h4>
              <p className="text-green-700 text-sm mb-3">Your idea shows strong potential! Here's what you can do right now:</p>
              <div className="flex space-x-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                  Create Landing Page
                </button>
                <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md text-sm hover:bg-green-50 transition-colors">
                  Start MVP Development
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
