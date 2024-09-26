import { CompactTransactionResponse } from "@/pages/dashboard/types"

export interface TransactionsContainerTypes {
  title: string,
	transactions: CompactTransactionResponse[],
	searchTerm?: string,
	dataInicio?: string,
	onDataChange?: (data: string) => void,
	onSearch?: (term: string) => void
}