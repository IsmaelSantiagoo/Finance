export interface TransactionPayload {
	dataInicio?: string,
	categoriaID?: number
}

export interface TransactionResponse {
	status: string,
	data: TransactionTypes[]
}

export interface TransactionTypes {
	transacaoId: number,
	transacaoNome: string,
	transacaoDesc: string,
	dataLancamento: string,
	transacaoValor: string,
	transacaoStatus: string,
	estabelecimentoID: number,
	categoriaID: number
}

export interface EstablishmentTypes {
	data: Array<{
		estabelecimentoLink: string
	}>
}

export interface CompactTransactionResponse {
	transacao: TransactionTypes,
	estabelecimentoLink: string
}

export interface CategoryResponse {
	data: CategoryTypes[]
}

export interface CategoryTypes {
	categoriaId: number,
	categoriaNome: string,
	categoriaCor: string
}

export interface CardResponse {
	data: CardTypes[]
}

export interface CardTypes {
	cartaoId: number,
	cartaoUsuario: string,
	cartaoAgencia: string,
	cartaoNome: string,
	cartaoValor: string
}