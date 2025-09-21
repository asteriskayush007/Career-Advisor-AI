import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Career Advisor AI
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/assessment"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/assessment') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Assessment
            </Link>
            <Link 
              to="/personality"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/personality') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Path Finder
            </Link>
            <Link 
              to="/chatbot"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/chatbot') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              AI Advisor
            </Link>
            <Link 
              to="/forecasting"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/forecasting') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Job Trends
            </Link>
            <Link 
              to="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;