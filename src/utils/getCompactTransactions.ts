import { getEstablishmentById, getTransactions } from "@/pages/dashboard/services";

export const getCompactTransactions = (completeDate: string) => getTransactions(completeDate).then(async ({ data }) => {
			
	const compactTransaction = Promise.all(
		data.map(async (transacao: TransactionTypes): Promise<CompactTransactionResponse> => {

			const establishmentLink = await getEstablishmentById(parseInt(transacao.estabelecimentoID))
				.then(({ data }) => data[0].estabelecimentoLink)
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