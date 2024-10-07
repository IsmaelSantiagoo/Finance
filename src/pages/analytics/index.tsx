import Layout from "@/components/Layout"
import TransactionsContainer from "@/components/Transactions"
import React, { useEffect, useState } from "react"
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

    handleReloadTransactions()
  }, [dataInicio])

  const handleReloadTransactions = () => {

    const completeDate = `${dataInicio} 00:00:00`
    getCompactTransactions(completeDate).then( (data) => setTransactions(data))
  }

  return (
    <Layout className="flex justify-between gap-6 pr-5 overflow-hidden" defaultActiveMenuIndex={1}>
      <div className="flex w-full flex-col overflow-y-auto">
        <div className="flex flex-col gap-6 pb-6">  
          <TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)} showOptions={true} reloadData={handleReloadTransactions}/>
        </div>
      </div>
    </Layout>
  )
}

export default Analytics