import React from 'react'
import Link from 'next/link'

const stages = [
  { id: 'idea', name: 'Idea', href: '/idea-discovery', icon: '💡', description: 'Generate startup ideas' },
  { id: 'plan', name: 'Plan', href: '/business-plan', icon: '📋', description: 'Create business plan' },
  { id: 'mvp', name: 'MVP', href: '/mvp-builder', icon: '🚀', description: 'Build minimum viable product' },
  { id: 'launch', name: 'Launch', href: '/launch', icon: '🌍', description: 'Deploy to market' }
]

export default function ProgressTracker({ currentStage = 'idea' }) {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Startup Journey Progress</h3>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500"
            style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stages */}
        <div className="flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index <= currentIndex
            const isCurrent = index === currentIndex
            
            return (
              <Link key={stage.id} href={stage.href}>
                <div className="flex flex-col items-center cursor-pointer group">
                  {/* Stage circle */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                    }
                    ${isCurrent ? 'ring-4 ring-purple-200 scale-110' : ''}
                  `}>
                    {stage.icon}
                  </div>
                  
                  {/* Stage info */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {stage.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-20">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
