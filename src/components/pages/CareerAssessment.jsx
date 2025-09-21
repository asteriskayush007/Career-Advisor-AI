import { useState } from 'react';
import { careerService } from '../../services/api';

const CareerAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [],
    skills: [],
    experience_level: '',
    education: '',
    preferred_industries: []
  });
  const [recommendations, setRecommendations] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 
    'Design', 'Sales', 'Research', 'Management', 'Creative Arts'
  ];

  const skillOptions = [
    'Python', 'JavaScript', 'Java', 'SQL', 'Machine Learning', 
    'Project Management', 'Communication', 'Leadership', 'Analytics', 
    'Problem Solving', 'Teamwork', 'Critical Thinking'
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Media', 'Government', 'Non-profit'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleIndustryToggle = (industry) => {
    setFormData(prev => ({
      ...prev,
      preferred_industries: prev.preferred_industries.includes(industry)
        ? prev.preferred_industries.filter(i => i !== industry)
        : [...prev.preferred_industries, industry]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const [careerRecs, skillAnalysis] = await Promise.all([
        careerService.getCareerRecommendations(formData),
        careerService.analyzeSkillGaps(formData)
      ]);
      setRecommendations(careerRecs);
      setSkillGaps(skillAnalysis);
      
      // Save assessment data to localStorage for dashboard
      const assessmentData = {
        formData,
        recommendations: careerRecs,
        skillGaps: skillAnalysis,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('latestAssessment', JSON.stringify(assessmentData));
      
      // Update user stats
      const currentStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      const updatedStats = {
        assessmentsTaken: (currentStats.assessmentsTaken || 0) + 1,
        skillsAnalyzed: formData.skills.length,
        careerMatches: careerRecs.length,
        chatSessions: currentStats.chatSessions || 0
      };
      localStorage.setItem('userStats', JSON.stringify(updatedStats));
      
      setCurrentStep(5);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">What are your interests?</h2>
            <p className="text-gray-600">Select all areas that interest you</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">What are your current skills?</h2>
            <p className="text-gray-600">Select your existing skills and competencies</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.skills.includes(skill)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Experience & Education</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experience_level}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="executive">Executive Level (10+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Preferred Industries</h2>
            <p className="text-gray-600">Which industries would you like to work in?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {industryOptions.map(industry => (
                <button
                  key={industry}
                  onClick={() => handleIndustryToggle(industry)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.preferred_industries.includes(industry)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Career Recommendations</h2>
            
            {/* Career Recommendations */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Recommended Career Paths</h3>
              <div className="grid gap-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{rec.job_title}</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {rec.match_percentage}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Required Skills:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {rec.required_skills.map(skill => (
                            <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Salary Range:</span>
                        <p className="text-gray-600">{rec.salary_range}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Growth Prospects:</span>
                        <p className="text-gray-600">{rec.growth_prospects}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Skill Gap Analysis</h3>
              <div className="grid gap-4">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{gap.skill}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        gap.importance === 'High' ? 'bg-red-100 text-red-800' :
                        gap.importance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {gap.importance} Priority
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Current Level: {gap.current_level}/10</span>
                        <span>Required Level: {gap.required_level}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(gap.current_level / gap.required_level) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Learning Resources:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {gap.learning_resources.map(resource => (
                          <span key={resource} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        {currentStep < 5 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
              <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Get Recommendations'}
                </button>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setRecommendations([]);
                  setSkillGaps([]);
                  setFormData({
                    interests: [],
                    skills: [],
                    experience_level: '',
                    education: '',
                    preferred_industries: []
                  });
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Take Assessment Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;