import { getEstablishmentById, getTransactions } from "@/pages/dashboard/services";
import { CompactTransactionResponse, EstablishmentTypes, TransactionTypes } from "@/pages/dashboard/types";

export const getCompactTransactions = (completeDate: string) => getTransactions(completeDate).then(async ({ data }) => {
			
	const compactTransaction = Promise.all(
		data.map(async (transacao: TransactionTypes): Promise<CompactTransactionResponse> => {

			const establishmentLink = await getEstablishmentById(transacao.estabelecimentoID)
				.then(({ data }: EstablishmentTypes) => data[0].estabelecimentoLink)
				.catch(() => 'erro');
			
			return {
				transacao: transacao,
				estabelecimentoLink: establishmentLink
			};
		})
	)

	return compactTransaction
}).catch(() => {
	
	return []
})