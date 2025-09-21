import { useState, useEffect } from 'react';
import { careerService } from '../../services/api';

const JobForecasting = () => {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchJobForecasts();
  }, [selectedCategory]);

  const fetchJobForecasts = async () => {
    setLoading(true);
    try {
      console.log('Fetching forecasts for category:', selectedCategory);
      const data = await careerService.getJobForecasting(selectedCategory);
      console.log('Received data:', data.length, 'jobs');
      setForecasts(data);
    } catch (error) {
      console.error('Error fetching job forecasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Finance' },
    { id: 'education', name: 'Education' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend.toLowerCase()) {
      case 'rapidly growing':
        return '📈';
      case 'consistently growing':
        return '📊';
      case 'steady growth':
        return '➡️';
      default:
        return '📋';
    }
  };

  const getDemandColor = (demand) => {
    switch (demand.toLowerCase()) {
      case 'very high':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job forecasts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Future Job Market Trends
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover emerging career opportunities and understand which roles will be in high demand. 
            Stay ahead of the curve with AI-powered job market analysis.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Job Roles Analyzed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
            <div className="text-gray-600">Avg Growth Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <div className="text-gray-600">Industries Covered</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">2030</div>
            <div className="text-gray-600">Forecast Horizon</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  console.log('Filtering by category:', category.id);
                  setSelectedCategory(category.id);
                }}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-indigo-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Job Forecasts Grid */}
        <div className="grid gap-8">
          {forecasts.map((forecast, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="text-4xl">{getTrendIcon(forecast.trend)}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{forecast.job_title}</h3>
                      <p className="text-gray-600">{forecast.trend}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDemandColor(forecast.demand_level)}`}>
                      {forecast.demand_level} Demand
                    </span>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      +{forecast.growth_rate}% Growth
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Average Salary</h4>
                    <p className="text-2xl font-bold text-indigo-600">{forecast.avg_salary}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Growth Rate</h4>
                    <p className="text-2xl font-bold text-green-600">+{forecast.growth_rate}%</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Demand Level</h4>
                    <p className="text-lg font-semibold text-gray-800">{forecast.demand_level}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Trend Status</h4>
                    <p className="text-lg font-semibold text-gray-800">{forecast.trend}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {forecast.key_skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Insights */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Market Insights & Predictions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emerging Technologies</h3>
              <p className="text-gray-600">
                AI, Machine Learning, and Blockchain technologies are creating new job categories 
                with unprecedented growth rates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Remote Work Revolution</h3>
              <p className="text-gray-600">
                Remote and hybrid work models are reshaping job requirements and opening 
                global opportunities for professionals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill-Based Hiring</h3>
              <p className="text-gray-600">
                Companies are increasingly focusing on skills over degrees, creating opportunities 
                for continuous learners and career changers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Future-Proof Your Career?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Take our career assessment to discover which future opportunities align with your skills and interests.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Career Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForecasting;