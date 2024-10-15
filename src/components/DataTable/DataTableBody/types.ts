export interface DataTableBodyTypes {
	columns: DataTableColumnType[];
	rows: (string | number | string[])[][];
	onSelectRow?: (array: (string | number | string[])[][]) => void;
}

export interface DataTableColumnType {
	name: string;
	type: 'string' | 'money' | 'date' | 'number' | 'float';
	key?:boolean;
	format?: (value: string | number) => string;
	brand?: boolean;
	hidden?: boolean;
}