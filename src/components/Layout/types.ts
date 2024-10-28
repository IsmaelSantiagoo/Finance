import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  defaultActiveMenuIndex?: number | undefined;
}