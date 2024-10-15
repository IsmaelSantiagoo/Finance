import { DataTableBodyTypes } from "./DataTableBody/types";

export interface DataTableProps {
	items: DataTableBodyTypes;
	onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
}