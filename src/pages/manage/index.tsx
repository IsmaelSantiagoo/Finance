import Layout from "@/components/Layout"
import TransactionsContainer from "@/components/Transactions"
import React, { useEffect, useState } from "react"
import { getCompactTransactions } from "@/utils/getCompactTransactions"
import Container from "@/components/Container"

const Manage = () => {

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

    handleReloadTransactions()
  }, [dataInicio])

  const handleReloadTransactions = () => {

    const completeDate = `${dataInicio} 00:00:00`
    getCompactTransactions(completeDate).then( (data) => setTransactions(data))
  }

  return (
    <Layout className="flex justify-between gap-6 pr-5 overflow-hidden" defaultActiveMenuIndex={3}>
      <div className="flex w-full flex-col overflow-y-auto">
        <Container className="p-5">

				</Container>
      </div>
    </Layout>
  )
}

export default Manage