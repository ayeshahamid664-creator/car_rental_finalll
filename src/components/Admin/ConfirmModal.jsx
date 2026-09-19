import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      ></div>

      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl animate-scale-in ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{title || 'Are you sure?'}</h3>
            <p className="text-sm opacity-60 mt-1">{message || 'This action cannot be undone.'}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors active:scale-95"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;