import { ReactNode } from "react";

export interface PopupData {
  content: ReactNode;
  hideOnConfirm?: boolean;
  blurEffect?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}