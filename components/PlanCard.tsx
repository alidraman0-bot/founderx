import { BusinessPlanResult } from '@/lib/openai'
import { formatDate } from '@/lib/utils'
import jsPDF from 'jspdf'

interface PlanCardProps {
  plan: BusinessPlanResult
  onExportPDF?: (plan: BusinessPlanResult) => void
}

export default function PlanCard({ plan, onExportPDF }: PlanCardProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.text('Business Plan', 20, 30)
    
    // Add content
    doc.setFontSize(12)
    let yPosition = 50
    
    const sections = [
      { title: 'Problem', content: plan.problem },
      { title: 'Solution', content: plan.solution },
      { title: 'Market Size', content: plan.market_size },
      { title: 'Revenue Model', content: plan.revenue_model },
      { title: 'Go-to-Market Strategy', content: plan.gtm_strategy },
    ]
    
    sections.forEach((section) => {
      doc.setFontSize(14)
      doc.text(section.title, 20, yPosition)
      yPosition += 10
      
      doc.setFontSize(10)
      const lines = doc.splitTextToSize(section.content, 170)
      doc.text(lines, 20, yPosition)
      yPosition += lines.length * 5 + 10
    })
    
    doc.save('business-plan.pdf')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Business Plan</h3>
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-[#6C63FF] text-white text-sm font-medium rounded-md hover:bg-[#5A52E5] transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export PDF</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Problem Statement</h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
            {plan.problem}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Solution</h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
            {plan.solution}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Market Size</h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
            {plan.market_size}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Revenue Model</h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
            {plan.revenue_model}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Go-to-Market Strategy</h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
            {plan.gtm_strategy}
          </p>
        </div>
      </div>
    </div>
  )
}
