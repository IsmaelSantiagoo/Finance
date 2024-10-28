import React, { useState, useImperativeHandle, forwardRef, ReactNode } from 'react';
import Popup from './Popup';
import { PopupData } from './types';

const PopupContainer = forwardRef((_, ref) => {
  const [popup, setPopup] = useState<PopupData | null>(null);

  const showPopup = ({content, hideOnConfirm = false, blurEffect, onConfirm, onCancel}: PopupData) => {

    setPopup({ content, hideOnConfirm, blurEffect, onConfirm, onCancel });
  };

  useImperativeHandle(ref, () => ({
    showPopup,
  }));

  console.log(popup?.blurEffect)

  return (
    <div>
      {
        popup && <Popup
        isOpen={true}
        content={popup.content}
        onConfirm={() => {
          // Executa a função onConfirm passada para o popup
          if (popup.onConfirm) {
            popup.onConfirm(); // Chama a função de confirmação

            if (popup.hideOnConfirm) {
              setPopup(null); // Fecha o popup se hideOnConfirm for true
            }
          }
        }}
        onCancel={() => {
          if (popup.onCancel) {
            popup.onCancel()
          }
          setPopup(null); // Fecha o popup no cancelamento
        }}
        blurEffectSize={popup.blurEffect ? popup.blurEffect : 50}
      />
      }
    </div>
  );
});

export default PopupContainer;
