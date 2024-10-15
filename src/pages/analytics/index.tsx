import Layout from "@/components/Layout"
import React, { useEffect, useState } from "react"
import DataTable from "@/components/DataTable"
import { DataTableBodyTypes, DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import { getTransactions } from "../dashboard/services"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"

const Analytics = () => {

  const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true},
    { name: 'Descrição', type: 'string', hidden: true},
    { name: 'Data', type: 'string', format: (value: string | number) => typeof value === 'string' ?
       new Date(value).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'}) : 
       value.toString()},
    { name: 'Valor', type: 'float', format: (value: string | number) => typeof value === 'string' ? 
      parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) :
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    },
    { name: 'Status', type: 'string'},
    { name: 'Estabelecimento', type: 'number', hidden: true},
    { name: 'Categoria', type: 'number', hidden: true}
  ]

  const [transactions, setTransactions] = useState<TransactionTypes[]>([])
  const [rows, setRows] = useState<(string | number | string[])[][]>([])
  const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});
  const items = {
    columns: columns,
    rows: rows
  }

  const fetchTransactions = async () => await getTransactions('2024-08-01').then( data => data)

  useEffect( () => {

    fetchTransactions().then( ({ data }) => setTransactions(data))
  }, [])

  useEffect(() => {

    if (transactions) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(transactions)
      setRows(convertedTransactions)
    }
  }, [transactions])

  return (
    <Layout className="flex justify-between gap-6 pr-5 overflow-hidden" defaultActiveMenuIndex={1}>
      <div className="flex w-full flex-col overflow-y-auto">
        <div className="flex flex-col gap-6 pb-6">  
          <DataTable items={items} onAddAction={() => {}} onEditAction={() => {}} onDeleteAction={() => {}}/>
        </div>
      </div>
    </Layout>
  )
}

export default Analytics