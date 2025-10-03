import axios from 'axios';

// Create an Axios instance.
// The baseURL will be read from an environment variable.
// This allows you to use http://localhost:5000 for local development
// and https://citypulse-backend.vercel.app for production.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the token in every request.
// This is a great way to handle authentication automatically.
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If the token exists, add the 'Authorization' header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle any errors during the request setup
    return Promise.reject(error);
  }
);

export default api;
