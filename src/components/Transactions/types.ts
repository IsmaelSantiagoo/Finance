interface TransactionsContainerTypes {
  title: string,
	transactions: TransactionTypes[] | void,
	establishments: EstablishmentTypes[];
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
  onCancel?: () => void;
  onConfirm?: () => void;
}
