import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: "Career Path Recommendation",
      description: "Get personalized career suggestions based on your interests, skills, and aptitude",
      icon: "🎯",
      link: "/assessment"
    },
    {
      title: "Skill Gap Analysis", 
      description: "Compare your current skills with job requirements and identify areas for improvement",
      icon: "📊",
      link: "/assessment"
    },
    {
      title: "AI Career Chatbot",
      description: "Ask career questions in natural language and get instant expert guidance",
      icon: "🤖",
      link: "/chatbot"
    },
    {
      title: "Job Role Forecasting",
      description: "Discover future career opportunities and trending job roles in the market",
      icon: "🔮",
      link: "/forecasting"
    },
    {
      title: "Multi-language Support",
      description: "Access career guidance in your preferred language for better understanding",
      icon: "🌍",
      link: "/dashboard"
    },
    {
      title: "Resume Analysis",
      description: "Get AI-powered feedback and suggestions to improve your resume",
      icon: "📄",
      link: "/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your AI-Powered Career Companion
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover your ideal career path, bridge skill gaps, and stay ahead of future job trends with our intelligent career guidance platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/assessment"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg"
            >
              Start Career Assessment
            </Link>
            <Link 
              to="/chatbot"
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition duration-200 shadow-lg"
            >
              Chat with AI Advisor
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Comprehensive Career Guidance Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 block"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-indigo-200">Career Assessments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Job Roles Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-indigo-200">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Take Assessment</h4>
            <p className="text-gray-600">
              Complete our comprehensive career assessment to understand your interests, skills, and preferences.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">2</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Get AI Analysis</h4>
            <p className="text-gray-600">
              Our AI analyzes your profile and matches you with suitable career paths and identifies skill gaps.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Follow Guidance</h4>
            <p className="text-gray-600">
              Receive personalized recommendations, learning paths, and ongoing support from our AI advisor.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Career?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have discovered their ideal career path with our AI-powered guidance.
        </p>
        <Link 
          to="/assessment"
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg"
        >
          Start Your Journey Today
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Career Advisor AI</h4>
              <p className="text-gray-400">Empowering careers through intelligent guidance and personalized recommendations.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/assessment" className="hover:text-white">Career Assessment</Link></li>
                <li><Link to="/chatbot" className="hover:text-white">AI Chatbot</Link></li>
                <li><Link to="/forecasting" className="hover:text-white">Job Forecasting</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Career Advisor AI. Built for GenAI Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;