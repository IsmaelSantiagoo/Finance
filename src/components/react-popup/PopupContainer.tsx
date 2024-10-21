import React, { useState, useImperativeHandle, forwardRef, ReactNode } from 'react';
import Popup from './Popup';
import { PopupData } from './types';

const PopupContainer = forwardRef((_, ref) => {
  const [popup, setPopup] = useState<PopupData | null>(null);

  const showPopup = ({content, hideOnConfirm = false}: PopupData) => {

    setPopup({ content, hideOnConfirm });
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
        onConfirm={() => {

          setPopup(null);
        }}
        onCancel={() => {
          setPopup(null);
        }}
      />
      }
    </div>
  );
});

export default PopupContainer;
