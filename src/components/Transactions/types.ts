import { CompactTransactionResponse } from "@/pages/dashboard/types"

export interface TransactionsContainerTypes {
  title: string,
	transactions: CompactTransactionResponse[] | void,
	searchTerm?: string,
	dataInicio?: string,
	onDataChange?: (data: string) => void,
	onSearch?: (term: any) => void
}