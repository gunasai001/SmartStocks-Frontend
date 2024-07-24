import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between px-6 md:px-20 items-center">
        <div className="text-white text-3xl font-bold">Smart Stocks</div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
