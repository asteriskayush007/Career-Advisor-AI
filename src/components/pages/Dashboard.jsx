import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    assessmentsTaken: 0,
    skillsAnalyzed: 0,
    careerMatches: 0,
    chatSessions: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [skillProgress, setSkillProgress] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [careerScore, setCareerScore] = useState(0);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load user stats
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setUserStats(stats);
      setHasData(stats.assessmentsTaken > 0);
    }

    // Load latest assessment data
    const latestAssessment = localStorage.getItem('latestAssessment');
    if (latestAssessment) {
      const assessment = JSON.parse(latestAssessment);
      
      // Create skill progress from assessment
      const skillProgressData = assessment.skillGaps?.map(gap => ({
        skill: gap.skill,
        current: gap.current_level,
        target: gap.required_level,
        progress: Math.round((gap.current_level / gap.required_level) * 100)
      })) || [];
      setSkillProgress(skillProgressData);

      // Create recommendations from skill gaps
      const recommendationsData = assessment.skillGaps?.slice(0, 3).map(gap => ({
        title: `Improve ${gap.skill}`,
        description: `Focus on developing ${gap.skill} skills to reach target level`,
        priority: gap.importance,
        estimatedTime: `${gap.estimated_learning_time || 8} weeks`
      })) || [];
      setRecommendations(recommendationsData);

      // Add recent activity
      const activity = {
        id: Date.now(),
        action: 'Completed Career Assessment',
        date: new Date(assessment.completedAt).toLocaleDateString(),
        type: 'assessment'
      };
      setRecentActivity([activity]);

      // Calculate career score
      const avgProgress = skillProgressData.length > 0 
        ? skillProgressData.reduce((sum, skill) => sum + skill.progress, 0) / skillProgressData.length
        : 0;
      setCareerScore(Math.round(avgProgress));
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assessment': return '📋';
      case 'chat': return '💬';
      case 'forecast': return '📈';
      case 'profile': return '👤';
      default: return '📌';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Career Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your career development progress and get personalized insights</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.assessmentsTaken}</p>
                <p className="text-gray-600">Assessments Taken</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🎯</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.skillsAnalyzed}</p>
                <p className="text-gray-600">Skills Analyzed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">💼</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.careerMatches}</p>
                <p className="text-gray-600">Career Matches</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🤖</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userStats.chatSessions}</p>
                <p className="text-gray-600">AI Chat Sessions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skill Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Skill Development Progress</h2>
              {skillProgress.length > 0 ? (
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.skill}</span>
                        <span className="text-sm text-gray-600">
                          {skill.current}/{skill.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{skill.progress}% complete</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-gray-500">No skills tracked yet</p>
                  <p className="text-sm text-gray-400 mt-2">Complete an assessment to start tracking your progress</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-500">No recent activity yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start by taking a career assessment</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link 
                  to="/assessment"
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Take New Assessment
                </Link>
                <Link 
                  to="/chatbot"
                  className="block w-full bg-white border-2 border-indigo-600 text-indigo-600 text-center py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Chat with AI Advisor
                </Link>
                <Link 
                  to="/forecasting"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Job Trends
                </Link>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personalized Recommendations</h2>
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <p className="text-xs text-gray-500">Est. time: {rec.estimatedTime}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💡</div>
                  <p className="text-gray-500">No recommendations yet</p>
                  <p className="text-sm text-gray-400 mt-2">Take assessments to get personalized advice</p>
                </div>
              )}
            </div>

            {/* Career Score */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Career Readiness Score</h2>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{careerScore || '--'}</div>
                <div className="text-indigo-100 mb-4">Out of 100</div>
                <div className="w-full bg-indigo-400 rounded-full h-2 mb-4">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${careerScore}%` }}></div>
                </div>
                <p className="text-sm text-indigo-100">
                  {careerScore > 0 
                    ? `Great progress! Keep developing your skills to reach 85+`
                    : 'Complete your first assessment to get your career readiness score'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-gray-500">No achievements yet</p>
            <p className="text-sm text-gray-400 mt-2">Start using the platform to unlock achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;