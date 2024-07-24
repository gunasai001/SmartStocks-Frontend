import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginUser, registerUser } from '../services/authService';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<number>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  login: async () => 0,
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error fetching current user:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<number> => {
    try {
      const result = await loginUser({ email, password });
      if (typeof result === 'object' && 'token' in result && 'user' in result) {
        localStorage.setItem('authToken', result.token);
        setUser(result.user);
        return 1;
      } else {
        console.error('Login failed: Unexpected result', result);
        return 0;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return 0;
    }
  };

  const register = async (userData: User): Promise<void> => {
    try {
      await registerUser(userData);
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };
    
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };


  const authContextData: AuthContextData = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};