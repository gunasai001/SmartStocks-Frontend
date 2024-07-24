import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto text-center text-white">
        &copy; {new Date().getFullYear()} Smart Stocks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
