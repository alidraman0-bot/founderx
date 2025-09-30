import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';

export default function SavedIdeasCard({ ideas = [], onRemoveIdea }) {
  console.log('SavedIdeasCard rendered with ideas:', ideas);
  
  const [expandedIdeas, setExpandedIdeas] = useState(new Set());

  const toggleExpanded = (ideaId) => {
    const newExpanded = new Set(expandedIdeas);
    if (newExpanded.has(ideaId)) {
      newExpanded.delete(ideaId);
    } else {
      newExpanded.add(ideaId);
    }
    setExpandedIdeas(newExpanded);
  };

  const getMarketPotentialColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getMarketPotentialLabel = (score) => {
    if (score >= 8) return 'High';
    if (score >= 6) return 'Medium';
    return 'Low';
  };

  if (ideas.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Saved Ideas</h3>
        <div className="text-center py-8 bg-yellow-50 rounded-lg">
          <div className="text-4xl mb-4">💡</div>
          <p className="text-gray-600 mb-4">No saved ideas yet</p>
          <Link href="/idea-discovery">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
              Generate Ideas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">💡 Saved Ideas</h3>
        <span className="text-sm text-gray-500">{ideas.length} saved</span>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {ideas.map((idea) => (
          <div key={idea.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{idea.title}</h4>
              <button
                onClick={() => onRemoveIdea(idea.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{idea.tagline}</p>
            
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarketPotentialColor(idea.marketPotential)}`}>
                {getMarketPotentialLabel(idea.marketPotential)} Potential
              </span>
              <button
                onClick={() => toggleExpanded(idea.id)}
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                {expandedIdeas.has(idea.id) ? 'Show Less' : 'Show More'}
              </button>
            </div>

            {expandedIdeas.has(idea.id) && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">{idea.problem}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Target Customer:</span>
                    <p className="text-gray-600">{idea.customer}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Link href="/plan-generator" className="flex-1">
                    <Button variant="outline" className="w-full text-xs py-1">
                      Create Plan
                    </Button>
                  </Link>
                  <Link href="/mvp-builder" className="flex-1">
                    <Button variant="outline" className="w-full text-xs py-1">
                      Build MVP
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {ideas.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link href="/idea-discovery">
            <Button variant="outline" className="w-full">
              View All Ideas
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
