import Container from "@/components/Container"
import Layout from "@/components/Layout"
import TransactionsContainer from "@/components/Transactions"
import { useEffect, useState } from "react"
import { CompactTransactionResponse, EstablishmentTypes, TransactionTypes } from "../dashboard/types"
import { getEstablishmentById, getTransactions } from "../dashboard/services"

const Analytics = () => {

  const [transactions, setTransactions] = useState<CompactTransactionResponse[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});

  useEffect(() => {

    const completeDate = `${dataInicio} 00:00:00`

    getTransactions(completeDate).then(async ({ data }) => {
			
			const compactTransaction = await Promise.all(

				data.map(async (transacao: TransactionTypes): Promise<CompactTransactionResponse> => {

					const establishmentLink = await getEstablishmentById(transacao.estabelecimentoID)
						.then(({ data }: EstablishmentTypes) => data[0].estabelecimentoLink)
						.catch(() => 'erro');
					
					return {
						transacao: transacao,
						estabelecimentoLink: establishmentLink
					};
				})
			);

      setTransactions(compactTransaction)
    })
  }, [dataInicio])

  return (
    <Layout defaultActiveMenuIndex={1} className="flex justify-between gap-6 pr-5 overflow-hidden">
      <TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e)}/>
    </Layout>
  )
}

export default Analytics