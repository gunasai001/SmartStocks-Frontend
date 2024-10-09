import axios from 'axios';
import { User } from '../types';
import axiosInstance from './axiosInstance';

const API_BASE_URL = 'http://localhost:3000/api/auth'; // Replace with your API base URL

export interface AuthResponse {
  user: User;
  token: string;
}

interface RegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
}
interface RegisterProps{
  username: string;
  email: string;
  password: string;
  fullname: string;
  mobileno: string;
}


export const registerUser = async (userData: RegisterProps): Promise<RegistrationResponse> => {
  try {
    const response = await axios.post<RegistrationResponse>(`${API_BASE_URL}/register`, userData);
    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Registration failed' };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
// Function to login a user
// interface LoginError {
//   error: string;
// }

export const loginUser = async (credentials: { email: string; password: string }): Promise<number | AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, credentials);
    if (response.data && 'token' in response.data && 'user' in response.data) {
      return response.data;
    } else {
      console.error('Unexpected response format:', response.data);
      return 0;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error('Login error:', error.response.data);
    } else {
      console.error('Error logging in:', error);
    }
    return 0;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>('/portfolio/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Function to login a user
