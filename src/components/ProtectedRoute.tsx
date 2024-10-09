import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './common/Loader';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if ( user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;