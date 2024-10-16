import Layout from "@/components/Layout"
import React, { useEffect, useState } from "react"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import { getTransactions } from "../dashboard/services"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import { getEstabelecimentos } from "@/services/estabelecimentos"

const Analytics = () => {

  const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true, brandType: 'image'},
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
	const [items, setItems] = useState({ columns: columns, rows: rows})
	const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});
	const completeDate = `${dataInicio} 00:00:00`

	const fetchTransactions = async () => await getTransactions(completeDate).then( data => data)

  useEffect( () => {

    fetchTransactions().then( ({ data }) => setTransactions(data))
  }, [dataInicio])

  useEffect(() => {

    if (transactions) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(transactions)
      setRows(convertedTransactions)
    }
  }, [transactions])

	useEffect(() => {

		setItems( (prev) => {

			const currentItems = {...prev}
			currentItems.rows = rows
			return currentItems
		})
	}, [rows])

  useEffect(() => {

    if (transactions) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(transactions)

			// buscando links
			getEstabelecimentos().then( (estabelecimentos) => {

				//adicionando uma brand nas transações
				const transactionsWithBrand = convertedTransactions.map( (transaction) => {

					const updatedTransaction = [...transaction]
					const link = estabelecimentos.map( estabelecimento => estabelecimento.estabelecimentoId === transaction[6] && estabelecimento.estabelecimentoLink).filter(Boolean)[0]

					updatedTransaction[1] = [
						link ? `https://cdn.brandfetch.io/${link}/w/400/h/400` : 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png',
						typeof transaction[1] === 'string' ? transaction[1] : '', 
					]
					return updatedTransaction
				})

				setRows(transactionsWithBrand)
			})
    }
  }, [transactions])

  return (
    <Layout className="flex justify-between gap-6 pr-5 overflow-hidden" defaultActiveMenuIndex={1}>
      <div className="flex w-full flex-col overflow-y-auto">
        <div className="flex flex-col gap-6 pb-6">  
          <DataTable title="Transações" items={items} onAddAction={() => {}} onEditAction={() => {}} onDeleteAction={() => {}} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)}/>
        </div>
      </div>
    </Layout>
  )
}

export default Analytics