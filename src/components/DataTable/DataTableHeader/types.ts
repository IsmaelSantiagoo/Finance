import { ChangeEvent } from "react";

export interface DataTableHeaderProps {
  title: string;
  selectedRows: (string | number | string[])[][];
  showActions: boolean;
  onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
  controls?: 'hidden' | 'visible';
  onDataChange: (e: string) => void;
  dataInicio: string;
}