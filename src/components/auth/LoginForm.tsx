import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const result = await login(email, password);
      if (result === 1) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full  max-w-sm">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-900 bg-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border bg-gray-900 border-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;