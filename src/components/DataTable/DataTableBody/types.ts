export interface DataTableBodyTypes {
	columns: DataTableColumnType[];
	rows: (string | number)[][];
	onSelectRow: (array: (string | number)[][]) => void;
}

export interface DataTableColumnType {
	name: string;
	type: 'string' | 'money' | 'date' | 'number'
}