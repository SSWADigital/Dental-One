import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Define an interface for the Alert component's props
interface AlertProps {
  title: string;
  message: string | React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  type = 'info',
  duration = 0,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); // New state for fade-out animation
  const alertRef = useRef<HTMLDivElement>(null); // Ref to the alert div for animation timing

  // Automatically hide the alert after a duration if specified
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose(); // Trigger the close animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]); // Removed onClose from dependency array here, as handleClose will call it

  // Handle CSS transition end to truly remove the component from DOM
  useEffect(() => {
    const alertElement = alertRef.current;
    if (!alertElement) return;

    const handleTransitionEnd = () => {
      if (isAnimatingOut) {
        setIsVisible(false); // Fully hide component after fade-out
        if (onClose) {
          onClose(); // Call original onClose prop
        }
      }
    };

    alertElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      alertElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isAnimatingOut, onClose]); // Depend on isAnimatingOut and onClose

  const handleClose = () => {
    setIsAnimatingOut(true); // Start fade-out animation
    // The component will be fully removed in the `transitionend` effect
  };

  if (!isVisible) return null; // Don't render if not visible

  const typeStyles = {
    info: {
      bgColor: 'bg-blue-100',
      icon: <Info className="w-5 h-5 text-blue-600" />,
      textColor: 'text-blue-800',
    },
    success: {
      bgColor: 'bg-green-100',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      textColor: 'text-green-800',
    },
    warning: {
      bgColor: 'bg-yellow-100',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      textColor: 'text-yellow-800',
    },
    error: {
      bgColor: 'bg-red-100',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      textColor: 'text-red-800',
    },
  };

  const currentStyles = typeStyles[type];

  return (
    <div
      ref={alertRef} // Attach ref to the main div
      className={`fixed bottom-6 left-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50
                  transform transition-all ease-in-out duration-300
                  ${isAnimatingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 ${currentStyles.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          {currentStyles.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${currentStyles.textColor} mb-1`}>{title}</h4>
          <p className="text-sm text-gray-600 mb-1">
            {message}
          </p>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Alert;