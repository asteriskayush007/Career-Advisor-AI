import React, { useState } from 'react';

const PersonalityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      text: "In a group project, you usually:",
      options: [
        { value: "a", text: "Take charge and decide what needs to be done" },
        { value: "b", text: "Motivate others and make the atmosphere fun" },
        { value: "c", text: "Make sure everyone feels included and heard" },
        { value: "d", text: "Focus on the details and ensure accuracy" }
      ]
    },
    {
      text: "When faced with a problem, you:",
      options: [
        { value: "a", text: "Act fast and look for quick results" },
        { value: "b", text: "Brainstorm creatively and talk it out" },
        { value: "c", text: "Stay calm and look for compromise" },
        { value: "d", text: "Analyze the situation carefully before acting" }
      ]
    },
    {
      text: "Others would describe you as:",
      options: [
        { value: "a", text: "Confident and determined" },
        { value: "b", text: "Energetic and optimistic" },
        { value: "c", text: "Patient and dependable" },
        { value: "d", text: "Logical and precise" }
      ]
    },
    {
      text: "What stresses you the most?",
      options: [
        { value: "a", text: "Wasting time / slow people" },
        { value: "b", text: "Strict rules and routines" },
        { value: "c", text: "Conflict or hurting others" },
        { value: "d", text: "Mistakes or lack of structure" }
      ]
    },
    {
      text: "At a party, you're the one who:",
      options: [
        { value: "a", text: "Talks business or achievements" },
        { value: "b", text: "Chats with everyone and tells stories" },
        { value: "c", text: "Sticks with close friends, avoids drama" },
        { value: "d", text: "Observes and joins deep conversations" }
      ]
    },
    {
      text: "What motivates you the most?",
      options: [
        { value: "a", text: "Winning, success, results" },
        { value: "b", text: "Recognition, fun, new ideas" },
        { value: "c", text: "Security, harmony, stability" },
        { value: "d", text: "Knowledge, order, understanding" }
      ]
    },
    {
      text: "How do you handle decisions?",
      options: [
        { value: "a", text: "Quick, firm, and decisive" },
        { value: "b", text: "Spontaneous, based on excitement" },
        { value: "c", text: "Slowly, considering everyone's feelings" },
        { value: "d", text: "Carefully, based on facts and data" }
      ]
    },
    {
      text: "When working with others, you prefer:",
      options: [
        { value: "a", text: "Fast results and efficiency" },
        { value: "b", text: "Creativity and inspiration" },
        { value: "c", text: "Support and cooperation" },
        { value: "d", text: "Accuracy and rules" }
      ]
    },
    {
      text: "Your biggest strength is:",
      options: [
        { value: "a", text: "Leadership and drive" },
        { value: "b", text: "Charisma and optimism" },
        { value: "c", text: "Loyalty and empathy" },
        { value: "d", text: "Logic and structure" }
      ]
    },
    {
      text: "Your biggest weakness could be:",
      options: [
        { value: "a", text: "Being too bossy or impatient" },
        { value: "b", text: "Being too scattered or unrealistic" },
        { value: "c", text: "Avoiding change or confrontation" },
        { value: "d", text: "Overthinking and being critical" }
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newResponses = { ...responses, [currentQuestion]: answer };
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newResponses);
    }
  };

  const submitAssessment = async (finalResponses) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/personality/assess?userId=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalResponses)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to local calculation
      const scores = { RED: 0, YELLOW: 0, GREEN: 0, BLUE: 0 };
      Object.values(finalResponses).forEach(answer => {
        if (answer === 'a') scores.RED++;
        else if (answer === 'b') scores.YELLOW++;
        else if (answer === 'c') scores.GREEN++;
        else if (answer === 'd') scores.BLUE++;
      });
      
      const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      
      setResult({
        dominantColor: dominant,
        redScore: scores.RED,
        yellowScore: scores.YELLOW,
        greenScore: scores.GREEN,
        blueScore: scores.BLUE
      });
    }
    setLoading(false);
  };

  const getColorStyle = (color) => {
    const colors = {
      RED: 'bg-red-100 text-red-800 border-red-300',
      YELLOW: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      GREEN: 'bg-green-100 text-green-800 border-green-300',
      BLUE: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getCareerSuggestions = (color) => {
    const suggestions = {
      RED: {
        description: "The Determined Leader - You thrive in leadership roles and results-driven environments.",
        careers: ["Management", "Entrepreneurship", "Sales Leadership", "Project Management", "Business Development"],
        strengths: ["Leadership", "Decision-making", "Results-oriented", "Confident", "Ambitious"],
        tips: "Focus on roles where you can lead teams and drive results. Consider starting your own business or moving into executive positions."
      },
      YELLOW: {
        description: "The Social Optimist - You excel in people-focused, creative, and communication-heavy roles.",
        careers: ["Marketing", "Public Relations", "Training & Development", "Sales", "HR", "Event Management", "Media"],
        strengths: ["Communication", "Creativity", "Optimism", "Persuasion", "Team motivation"],
        tips: "Leverage your social skills and creativity. Consider roles in marketing, training, or any field requiring strong interpersonal skills."
      },
      GREEN: {
        description: "The Supportive Team Player - You thrive in collaborative, stable, and service-oriented environments.",
        careers: ["Customer Service", "Healthcare", "Social Work", "Teaching", "Counseling", "Non-profit"],
        strengths: ["Teamwork", "Patience", "Reliability", "Empathy", "Stability"],
        tips: "Focus on helping professions and team-oriented roles. Your patience and reliability make you valuable in service industries."
      },
      BLUE: {
        description: "The Analytical Thinker - You excel in detail-oriented, systematic, and knowledge-based roles.",
        careers: ["Data Analysis", "Engineering", "Research", "Quality Assurance", "IT", "Finance", "Science"],
        strengths: ["Analysis", "Precision", "Planning", "Logic", "Attention to detail"],
        tips: "Pursue technical and analytical roles. Your systematic approach and attention to detail are perfect for data-driven careers."
      }
    };
    return suggestions[color] || suggestions.BLUE;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Analyzing your personality...</div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Personality Results</h1>
            
            <div className={`text-center p-6 rounded-lg border-2 mb-8 ${getColorStyle(result.dominantColor)}`}>
              <h2 className="text-2xl font-bold mb-2">You are primarily {result.dominantColor}</h2>
              <p className="text-lg mb-4">{getCareerSuggestions(result.dominantColor).description}</p>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.redScore}</div>
                  <div className="text-sm">RED</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{result.yellowScore}</div>
                  <div className="text-sm">YELLOW</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.greenScore}</div>
                  <div className="text-sm">GREEN</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.blueScore}</div>
                  <div className="text-sm">BLUE</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">🎯 Recommended Careers</h3>
                <div className="space-y-2">
                  {getCareerSuggestions(result.dominantColor).careers.map((career, index) => (
                    <div key={index} className="bg-white p-3 rounded border">{career}</div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-green-800">💪 Your Strengths</h3>
                <div className="space-y-2">
                  {getCareerSuggestions(result.dominantColor).strengths.map((strength, index) => (
                    <div key={index} className="bg-white p-3 rounded border">{strength}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-3 text-yellow-800">💡 Career Tips</h3>
              <p className="text-gray-700">{getCareerSuggestions(result.dominantColor).tips}</p>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Personality Assessment</h1>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <span classNamee="font-medium mr-3">{option.value.toUpperCase()})</span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityAssessment;