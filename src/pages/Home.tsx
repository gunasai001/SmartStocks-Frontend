import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white">
      

      <div className="text-center my-auto">
        <h1 className="text-6xl font-bold mb-4">Welcome to Smart Stocks</h1>
        {user !== null ? (
          <p className="text-2xl mb-8">
            Hello, {user.username}! Start exploring our stock predictions.
          </p>
        ) : (
          <p className="text-xl mb-8">
            Please log in to access our stock prediction features.
          </p>
        )}
        <Link
          to="/stocks"
          className="bg-green-600 hover:bg-green-700 text-xl text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
        >
          View Stocks
        </Link>
      </div>

     
      
    </div>
  );
};

export default Home;
