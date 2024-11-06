import React, { ReactNode } from 'react';

type DialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const Dialog = ({ children, open, onClose }: DialogProps) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        open ? 'visible' : 'invisible'
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

type DialogHeaderProps = {
  children: ReactNode;
};

export const DialogHeader = ({ children }: DialogHeaderProps) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      {children}
    </div>
  );
};

export const DialogBody = ({ children }: DialogHeaderProps) => {
  return (
    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      {children}
    </div>
  );
};

export const DialogFooter = ({ children }: DialogHeaderProps) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      {children}
    </div>
  );
};