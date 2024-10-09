import axios from 'axios';
import { getEnvVar } from '../config/env.config';

// const API_BASE_URL = "http://localhost:3000/api"; // Replace with your API base URL
const axiosInstance = axios.create({
  baseURL:  getEnvVar('API_BASE_URL') || 'http://localhost:3000/api',
});


console.log(getEnvVar('API_BASE_URL'));
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;