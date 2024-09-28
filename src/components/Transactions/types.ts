interface TransactionsContainerTypes {
  title: string,
	transactions: CompactTransactionResponse[] | void,
	searchTerm?: string,
	dataInicio?: string,
	showOptions?: boolean,
	onDataChange?: (data: string) => void,
	onSearch?: (term: any) => void;
	handleAdd?: () => void;
	handleDelete?: () => void;
}

interface RowTypes {
	id: number,
	rowId: number,
	nome: string,
	data: string,
	valor: string,
	status: string
}