import React, { useState, useImperativeHandle, forwardRef, ReactNode } from 'react';
import Popup from './Popup';

interface PopupData {
  content: ReactNode;
}

const PopupContainer = forwardRef((_, ref) => {
  const [popup, setPopup] = useState<PopupData | null>(null);

  const showPopup = (content: ReactNode) => {

    setPopup({ content });
  };

  useImperativeHandle(ref, () => ({
    showPopup,
  }));

  return (
    <div>
      {
        popup && <Popup
        isOpen={true}
        content={popup.content}
        onConfirm={() => {}}
        onCancel={() => {
          setPopup(null);
        }}
      />
      }
    </div>
  );
});

export default PopupContainer;
