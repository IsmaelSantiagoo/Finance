import { ReactNode } from "react";

export interface PopupData {
  content: ReactNode;
  hideOnConfirm?: boolean;
}