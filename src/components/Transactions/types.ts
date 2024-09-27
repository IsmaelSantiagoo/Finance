interface TransactionsContainerTypes {
  title: string,
	transactions: CompactTransactionResponse[] | void,
	searchTerm?: string,
	dataInicio?: string,
	showOptions?: boolean,
	onDataChange?: (data: string) => void,
	onSearch?: (term: any) => void;
	handleAddClick?: () => void;
}

interface RowTypes {
	id: number,
	nome: string,
	data: string,
	valor: string,
	status: string
}