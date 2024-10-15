export interface DataTableBodyTypes {
	columns: DataTableColumnType[];
	rows: (string | number | string[])[][];
	onSelectRow?: (array: (string | number | string[])[][]) => void;
}

export interface DataTableColumnType {
	name: string;
	type: 'string' | 'money' | 'date' | 'number';
	key?:boolean;
	format?: (value: any) => string;
	brand?: boolean;
}