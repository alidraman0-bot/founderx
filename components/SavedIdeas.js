import React, { useState } from 'react'
import Link from 'next/link'

export default function SavedIdeas({ savedIdeas, onRemove }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar/Drawer */}
      <div className={`
        fixed lg:static lg:translate-x-0 lg:inset-0
        bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:right-auto
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
        bg-white lg:bg-transparent
      `}>
        <div className="bg-white rounded-t-2xl lg:rounded-none shadow-lg lg:shadow-none border-t lg:border-t-0 border-gray-200 h-96 lg:h-auto lg:max-h-screen overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 lg:border-b-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Saved Ideas</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ideas List */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-80 lg:max-h-96">
            {savedIdeas.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-400">💡</span>
                </div>
                <p className="text-gray-500 text-sm">No saved ideas yet</p>
                <p className="text-gray-400 text-xs mt-1">Generate and save ideas to see them here</p>
              </div>
            ) : (
              savedIdeas.map((idea, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{idea.title}</h4>
                    <button
                      onClick={() => onRemove(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{idea.tagline}</p>
                  <div className="flex gap-2">
                    <Link href="/plan-generator" className="flex-1">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-200">
                        Plan
                      </button>
                    </Link>
                    <Link href="/mvp-builder" className="flex-1">
                      <button className="w-full border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-50 transition-colors duration-200">
                        MVP
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
