interface TransactionsContainerTypes {
  title: string,
	transactions: CompactTransactionResponse[] | void,
	searchTerm?: string,
	dataInicio?: string,
	showOptions?: boolean,
	onDataChange?: (data: string) => void,
	onSearch?: (term: any) => void;
	reloadData?: () => void
}

interface RowTypes {
	id: number,
	rowId: number,
	nome: string,
	data: string,
	valor: string,
	status: string
}

interface TransactionsFormTypes {
id?: number;
  reloadData: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}
