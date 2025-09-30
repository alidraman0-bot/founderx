import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ValidationForm from '@/components/ValidationForm';
import ValidationCard from '@/components/ValidationCard';

export default function ValidateIdea() {
  const router = useRouter();
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidation = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      setValidation(result);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Idea Validation</h1>
          <p className="text-gray-600">Get comprehensive analysis and validation for your business idea</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {validation ? (
              <ValidationCard validation={validation} />
            ) : (
              <ValidationForm onSubmit={handleValidation} />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Validate Ideas?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  Reduce risk of failure
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  Save time and resources
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  Identify market opportunities
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  Understand competition
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  Refine business model
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Process</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    1
                  </div>
                  <span className="text-sm text-gray-700">Market Demand Analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    2
                  </div>
                  <span className="text-sm text-gray-700">Competition Assessment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    3
                  </div>
                  <span className="text-sm text-gray-700">Technical Feasibility</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    4
                  </div>
                  <span className="text-sm text-gray-700">Business Model Review</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    5
                  </div>
                  <span className="text-sm text-gray-700">Risk Analysis</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our validation process uses AI-powered analysis to provide comprehensive insights about your business idea.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
