import { useState } from 'react';

export default function ValidationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    idea: '',
    description: '',
    targetMarket: '',
    businessModel: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onSubmit(result);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Validate Your Business Idea</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
            Business Idea Title *
          </label>
          <input
            type="text"
            id="idea"
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            placeholder="e.g., AI-Powered Personal Finance Assistant"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your business idea in detail. What problem does it solve? How does it work?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 mb-2">
            Target Market
          </label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            placeholder="e.g., Small business owners, Gen Z consumers, Healthcare professionals"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700 mb-2">
            Business Model
          </label>
          <select
            id="businessModel"
            name="businessModel"
            value={formData.businessModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a business model</option>
            <option value="subscription">Subscription (SaaS)</option>
            <option value="freemium">Freemium</option>
            <option value="marketplace">Marketplace</option>
            <option value="ecommerce">E-commerce</option>
            <option value="advertising">Advertising</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setFormData({ idea: '', description: '', targetMarket: '', businessModel: '' })}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Validating...
              </span>
            ) : (
              'Validate Idea'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
