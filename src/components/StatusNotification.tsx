import React, { useState } from 'react';
import { X } from 'lucide-react';

const StatusNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">PR Status Update</h4>
          <p className="text-sm text-gray-600 mb-1">
            PR-2022-0042 is now pending approval from Finance Department
          </p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StatusNotification;