import { IdeaResult } from '@/lib/openai'
import { formatDate } from '@/lib/utils'

interface IdeaCardProps {
  idea: IdeaResult
  onSelect?: (idea: IdeaResult) => void
  showSelectButton?: boolean
}

export default function IdeaCard({ idea, onSelect, showSelectButton = false }: IdeaCardProps) {
  const getMarketPotentialColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100'
    if (score >= 6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getMarketPotentialLabel = (score: number) => {
    if (score >= 8) return 'High Potential'
    if (score >= 6) return 'Medium Potential'
    return 'Low Potential'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{idea.title}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMarketPotentialColor(idea.market_potential)}`}>
          {idea.market_potential}/10 - {getMarketPotentialLabel(idea.market_potential)}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Problem Statement</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{idea.problem}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Target Customer</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{idea.target_customer}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#6C63FF] rounded-full"></div>
            <span className="text-xs text-gray-500">Market Score: {idea.market_potential}/10</span>
          </div>
          
          {showSelectButton && onSelect && (
            <button
              onClick={() => onSelect(idea)}
              className="px-4 py-2 bg-[#6C63FF] text-white text-sm font-medium rounded-md hover:bg-[#5A52E5] transition-colors"
            >
              Select Idea
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
