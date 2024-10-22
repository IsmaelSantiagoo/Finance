import Layout from "@/components/Layout"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import { getCards, getTransactions } from "../dashboard/services"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import PopupContainer from "@/components/react-popup/PopupContainer"
import { AddTransactionForm } from "./Forms/Transactions/create"
import { UpdateTransactionsForm } from "./Forms/Transactions/update"
import { PopupData } from "@/components/react-popup/types"
import { deleteTransaction } from "./services"
import { notify } from "@/utils/notify"
import { getEstablishments } from "@/services/estabelecimentos"
import { DeleteTransactionAlert } from "./Alerts/Delete"
import { useRouter } from "next/router"

const Analytics = () => {

  const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true, brandType: 'image'},
    { name: 'Descrição', type: 'string'},
    { name: 'Data', type: 'string', format: (value: string | number) => typeof value === 'string' ?
       new Date(value).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'}) : 
       value.toString()},
    { name: 'Valor (R$)', type: 'float', format: (value: string | number) => typeof value === 'string' ? 
      parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) :
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    },
    { name: 'Status', type: 'string', categorized: true, categoryCondition: (e) => {

      if (e === 'Transferência') {
        return 'bg-red-500'
      } else if (e === 'Recebimento') {
        return 'bg-green-600'
      } else {
        return ''
      }
    }},
    { name: 'Estabelecimento', type: 'number', hidden: true},
    { name: 'Categoria', type: 'number', hidden: true},
    { name: 'Cartão', type: 'number', hidden: true}
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
  const popup = useRef<{ showPopup: ({content, hideOnConfirm, blurEffect, onConfirm, onCancel}: PopupData) => void}>(null)
  const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])
  const [availableRoute, setAvailableRoute] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  
  const fetchCards = () => getCards().then( data => data.data)

  useEffect(() => {
    fetchCards().then((data) => {
      if (data.length > 0) {
        setAvailableRoute(true);
      } else {
        setAvailableRoute(false);
      }
      setLoading(false);
    }).catch(() => {
      setAvailableRoute(false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && !availableRoute) {
      router.push('/manage/cartoes');
    }
  }, [loading, availableRoute]);

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
			getEstablishments().then( (establishments) => {

				//adicionando uma brand nas transações
				const transactionsWithBrand = convertedTransactions.map( (transaction) => {

					const updatedTransaction = [...transaction]
					const link = establishments.map( establishment => establishment.estabelecimentoId === transaction[6] && establishment.estabelecimentoLink).filter(Boolean)[0]

					updatedTransaction[1] = [
						link !== undefined ? `https://cdn.brandfetch.io/${link}/w/400/h/400` : 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png',
						typeof transaction[1] === 'string' ? transaction[1] : '', 
					]
					return updatedTransaction
				})

				setRows(transactionsWithBrand)
			})
    }
  }, [transactions])

  const handleReload = () => {

    fetchTransactions().then( ({ data }) => setTransactions(data))
    setRows(prev => ({ ...prev }))
  }

  const getRowsCodes = () => {

    const codes = selectedRows.map( selected => typeof selected[0] === 'string' && parseInt(selected[0]))
    return codes.map( code => typeof code === 'number' ? code : 0)[0]
  }

  const handleForm = (type: 'create' | 'update') => {
    switch (type) {

      case 'create':
        popup.current?.showPopup({
          content: <AddTransactionForm/>,
          onConfirm: handleReload,
        })
      break

      case 'update':
        popup.current?.showPopup({
          content: <UpdateTransactionsForm id={getRowsCodes()}/>,
          onConfirm: handleReload,
          hideOnConfirm:true
        })
      break
    }
  }

  const deleteTransactions = () => {
		
    const removeAll = selectedRows.map( (selected) => Array.isArray(selected) && typeof selected[0] === 'string' && deleteTransaction(parseInt(selected[0])))
    if (removeAll) {
      Promise.all(removeAll).then((data) => {

        setSelectedRows([])
        notify('Transações removidas com sucesso!', 'success')
        handleReload()
      }).catch(() => {
        
        notify('Erro ao deletar as transações', 'error')
      })
    }
  }

  const handleDeleteSelectedTransactions = () => {

    popup.current?.showPopup({
      content: <DeleteTransactionAlert/>,
      onConfirm: deleteTransactions,
      hideOnConfirm: true,
      blurEffect: 2
    })
	}

  if (!availableRoute) {
    return null;
  }

  return (
    <Layout className="flex justify-between gap-6 overflow-hidden" defaultActiveMenuIndex={1}>
      <div className="flex w-full flex-col overflow-y-auto">
        <div className="flex flex-col gap-6 pb-6">  
          <DataTable title="Transações" 
            getSelectedRows={(e) => setSelectedRows(e)}
            items={items} 
            onAddAction={() => handleForm('create')} 
            onEditAction={() => handleForm('update')} 
            onDeleteAction={() => handleDeleteSelectedTransactions()} 
            dataInicio={dataInicio} 
            onDateChange={(e) => setDataInicio(e)}
          />
        </div>
      </div>
      <PopupContainer ref={popup}/>
    </Layout>
  )
}

export default Analytics