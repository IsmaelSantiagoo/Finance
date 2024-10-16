import { ChangeEvent } from "react";
import { DataTableBodyTypes } from "./DataTableBody/types";

export interface DataTableProps {
	title: string;
	items: DataTableBodyTypes;
	onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
	controls?: 'hidden' | 'visible'
	onDataChange: (e:string) => void;
	dataInicio: string;
}