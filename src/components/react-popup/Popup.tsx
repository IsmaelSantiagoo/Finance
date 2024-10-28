import React, { ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content: ReactNode;
  blurEffectSize?: number
}

const Popup: React.FC<PopupProps> = ({ onConfirm, onCancel, isOpen, content, blurEffectSize}) => {
  
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center z-50 bg-black bg-opacity-50" style={{ backdropFilter: `blur(${blurEffectSize}px)`}}>
      {React.cloneElement(content as React.ReactElement, { onCancel, onConfirm })}
    </div>
  );
};

export default Popup;
