import React from 'react';

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  transactionId?: string;
  type?: 'success' | 'error' | 'info';
}

const iconColors = {
  success: 'bg-green-100 text-green-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  title,
  message,
  transactionId,
  type = 'info',
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
        {/* Icon */}
        <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full ${iconColors[type]}`}>
          {type === 'success' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {/* Tambahkan ikon lain sesuai tipe jika diperlukan */}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mt-4">{title}</h2>

        {/* Message */}
        <p className="text-gray-700 mt-1">{message}</p>

        {/* Optional Transaction ID */}
        {transactionId && (
          <p className="text-gray-400 text-sm mt-1">Transaction ID: {transactionId}</p>
        )}

        {/* OK Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalDialog;
