import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;