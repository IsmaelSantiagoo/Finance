import { ChangeEvent } from "react";
import { DataTableBodyTypes } from "./DataTableBody/types";

export interface DataTableProps {
	title: string;
	items: DataTableBodyTypes;
	onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
	controls?: 'hidden' | 'visible'
	onDateChange?: (e:string) => void;
	dataInicio?: string;
	getSelectedRows?: (e: (string | number | string[])[][]) => void;
	emptyMessage?: string;
}