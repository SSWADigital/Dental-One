// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found.
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard" // Redirect to your clinic dashboard or a more appropriate home for clinic users
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Go to Dashboard
        </Link>
        {/* You might want a separate link for supplier home if applicable to current user role */}
        <p className="mt-4 text-sm text-gray-500">
          Are you a supplier? <Link to="/supplier/overview" className="text-blue-600 hover:underline">Go to Supplier Overview</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;