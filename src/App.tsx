import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { AuthProvider } from '../src/contexts/AuthContext';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import { StockProvider } from './contexts/StockContext';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const Home = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const StockDetailsPage = lazy(() => import('./pages/StockDetailsPage'));
const StockListPage = lazy(() => import('./pages/StockListPage'));
const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = lazy(() => import('./components/auth/RegisterForm'));

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    

    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
        />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/stocks" element={<StockListPage />} />
        <Route path="/stocks/:stockId" element={<StockDetailsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return ( 
    <BrowserRouter>
      <AuthProvider>
        <StockProvider>
          
        <Header />
        <div className='bg-gray-900'>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
          <Footer />
        </div>
        </StockProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;