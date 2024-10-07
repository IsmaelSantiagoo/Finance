import React, { ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onConfirm, onCancel, isOpen, content}) => {
  
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-2xl">
      {React.cloneElement(content as React.ReactElement, { onCancel, onConfirm })}
    </div>
  );
};

export default Popup;
