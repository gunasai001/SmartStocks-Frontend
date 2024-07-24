import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  useEffect(() => {
    if (!context.user && !context.loading) {
      context.refreshUser();
    }
  }, [context.user, context.loading]);

  return context;
};

export default useAuth;