import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();


  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        {(  user !== null) && (
          <>
            <li>
              <Link to="/stocks" className="hover:text-gray-400">
                Stocks
              </Link>
            </li>
            <li>
              <Link to="/comparison" className="hover:text-gray-400">
                Comparison
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
          </>
        )}
        {( user !== null) ? (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-gray-400"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
