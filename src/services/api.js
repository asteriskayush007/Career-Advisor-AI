import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const BACKEND_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const backendClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const careerService = {
  getCareerRecommendations: async (profile) => {
    const response = await apiClient.post('/career-recommendations', profile);
    return response.data;
  },

  analyzeSkillGaps: async (profile) => {
    const response = await apiClient.post('/skill-gap-analysis', profile);
    return response.data;
  },

  chatWithAdvisor: async (message, context = null) => {
    const response = await apiClient.post('/chat', { message, user_context: context });
    return response.data;
  },

  getJobForecasting: async (category = 'all') => {
    const response = await apiClient.get(`/job-forecasting?category=${category}`);
    return response.data;
  },
};

export const userService = {
  saveUserProfile: async (profile) => {
    const response = await backendClient.post('/users/profile', profile);
    return response.data;
  },

  getUserProfile: async (userId) => {
    const response = await backendClient.get(`/users/profile/${userId}`);
    return response.data;
  },
};

export default { careerService, userService };