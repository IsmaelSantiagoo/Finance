export interface DataTableBodyTypes {
	columns: DataTableColumnType[];
	rows: (string | number | string[])[][];
	onSelectRow?: (array: (string | number | string[])[][]) => void;
	controls?: 'hidden' | 'visible';
}

export interface DataTableColumnType {
	name: string;
	type: 'string' | 'money' | 'date' | 'number' | 'float';
	key?:boolean;
	format?: (value: string | number) => string;
	brand?: boolean;
	hidden?: boolean;
	brandType?: 'icon' | 'image';
	categorized?: boolean;
	categoryCondition?: (e:string) => string | undefined;
	align?: 'center' | 'left' | 'right'
}