import Layout from "@/components/Layout"
import TransactionsContainer from "@/components/Transactions"
import { useEffect, useState } from "react"
import { CompactTransactionResponse, EstablishmentTypes, TransactionTypes } from "../dashboard/types"
import { getCompactTransactions } from "@/utils/getCompactTransactions"

const Analytics = () => {

  const [transactions, setTransactions] = useState<CompactTransactionResponse[] | void>([])
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
    getCompactTransactions(completeDate).then( (data) => setTransactions(data)).catch( data => data)

  }, [dataInicio])

  return (
    <Layout defaultActiveMenuIndex={1} className="flex justify-between gap-6 pr-5 overflow-hidden">
      <TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)}/>
    </Layout>
  )
}

export default Analytics