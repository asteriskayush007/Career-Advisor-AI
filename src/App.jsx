import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import CareerAssessment from './components/pages/CareerAssessment';
import PersonalityAssessment from './components/pages/PersonalityAssessment';
import Chatbot from './components/pages/Chatbot';
import JobForecasting from './components/pages/JobForecasting';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<CareerAssessment />} />
          <Route path="/personality" element={<PersonalityAssessment />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/forecasting" element={<JobForecasting />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App