import { DataTableBodyTypes } from "./DataTableBody/types";

export interface DataTableProps {
	items: DataTableBodyTypes;
	onDeleteAction: () => void;
}