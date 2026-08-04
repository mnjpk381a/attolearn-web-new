import React from 'react';
import { FaTrash, FaExclamationTriangle, FaCheck } from 'react-icons/fa';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'delete' | 'warning' | 'success';
  itemName?: string;
  itemType?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = 'delete',
  itemName,
  itemType
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <FaTrash className="text-red-600" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-600 text-2xl" />;
      case 'success':
        return <FaCheck className="text-teal-600 text-2xl" />;
      default:
        return <FaTrash className="text-red-600" />;
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'success':
        return 'bg-teal-100';
      default:
        return 'bg-red-100';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-600 hover:bg-yellow-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'success':
        return 'bg-teal-600 hover:bg-yellow-500';
      default:
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 ${getIconBgColor()} rounded-full flex items-center justify-center mr-3`}>
            {getIcon()}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          {message}
          {itemName && itemType && (
            <>
              <br />
              <strong>{itemName}</strong> ({itemType})
            </>
          )}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded transition-colors duration-200 cursor-pointer ${getButtonColor()}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}