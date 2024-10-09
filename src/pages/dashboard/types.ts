interface TransactionPayload {
	dataInicio?: string,
	categoriaID?: number
}

interface TransactionResponse {
	status: string,
	data: TransactionTypes[]
}

interface TransactionTypes {
	transacaoId: number,
	transacaoNome: string,
	transacaoDesc: string,
	dataLancamento: string,
	transacaoValor: string,
	transacaoStatus: string,
	estabelecimentoID: string,
	categoriaID: string
}

interface EstablishmentTypes {
	estabelecimentoId: string;
	estabelecimentoLink: string;
	estabelecimentoNome: string;
}

interface CompactTransactionResponse {
	transacao: TransactionTypes,
	estabelecimentoLink: string
}

interface CategoryResponse {
	data: CategoryTypes[]
}

interface CategoryTypes {
	categoriaId: number;
	categoriaNome: string;
	categoriaCor: string;
	categoriaIcone: string;
}

interface CardResponse {
	data: CardTypes[]
}

interface CardTypes {
	cartaoId: number,
	cartaoUsuario: string,
	cartaoAgencia: string,
	cartaoNome: string,
	cartaoValor: string
}