import axios from 'axios';

// API Base URL for Core PHP backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/cvforge-ai/backend/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send PHP session cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Helper wrapper for robust error handling
export const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || 'An error occurred while communicating with the server.';
  }
  return error.message || 'Network connection issue. Please make sure the PHP backend is running.';
};

export default api;
