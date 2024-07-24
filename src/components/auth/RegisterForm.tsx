import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const result = await registerUser({ username, email, password, fullname, mobileno });
      if (result?.success) {
        navigate('/login');
      } else {
        setError(result?.error || 'Failed to register user');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-900 bg-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-900 bg-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-lg font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border border-gray-900 bg-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="mobileno" className="block text-lg font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileno"
              value={mobileno}
              onChange={(e) => setMobileno(e.target.value)}
              className="w-full border border-gray-900 bg-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;