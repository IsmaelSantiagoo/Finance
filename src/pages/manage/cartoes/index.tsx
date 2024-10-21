import Container from "@/components/Container"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import Layout from "@/components/Layout"
import PopupContainer from "@/components/react-popup/PopupContainer"
import { PopupData } from "@/components/react-popup/types"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import { useEffect, useRef, useState } from "react"
import { notify } from "@/utils/notify"
import { AddCardForm } from "./forms/cards/create"
import { UpdateCardForm } from "./forms/cards/update"
import { getCards } from "@/pages/dashboard/services"
import { deleteCard } from "./services"
import { DeleteCardAlert } from "./Alerts/Delete"

const cartoes = () => {

	const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Apelido', type: 'string'},
		{ name: 'Agência', type: 'string'},
    { name: 'Cartão', type: 'string'},
    { name: 'Valor (R$)', type: 'float', format: (value: string | number) => typeof value === 'string' ? 
      parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) :
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    },
  ]

  const [cartoes, setCartoes] = useState<CardTypes[]>([])
  const [rows, setRows] = useState<(string | number | string[])[][]>([])
	const [items, setItems] = useState({ columns: columns, rows: rows})
	const popup = useRef<{ showPopup: ({content, hideOnConfirm}: PopupData) => void}>(null)
	const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])

	const fetchCartoes = async () => await getCards().then( data => data)

  useEffect( () => {

    fetchCartoes().then( (data) => setCartoes(data.data))
  }, [])

  useEffect(() => {

    if (cartoes) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(cartoes)
      setRows(convertedTransactions)
    }
  }, [cartoes])

	useEffect(() => {

		setItems( (prev) => {

			const currentItems = {...prev}
			currentItems.rows = rows
			return currentItems
		})
	}, [rows])

	useEffect(() => {

    if (cartoes) {
      const convertedCards: (string | number | string[])[][] = DataTableItemConverter(cartoes)

			//adicionando um ícone nas categorias
			const cardsWithImage = convertedCards.map( (card) => {

				const updatedCard = [...card]

				const name = card[1]

				updatedCard[1] = [
					typeof name === 'string' ? name : '',
				]

				return updatedCard
			})

			setRows(cardsWithImage)
    }
  }, [cartoes])

	const handleReload = () => {

    fetchCartoes().then( (data) => setCartoes(data.data))
  }

	const getRowsCodes = () => {

    const codes = selectedRows.map( selected => typeof selected[0] === 'string' && parseInt(selected[0]))
    return codes.map( code => typeof code === 'number' ? code : 0)[0]
  }

	const handleForm = (type: 'create' | 'update') => {
    switch (type) {

      case 'create':
        popup.current?.showPopup({
          content: <AddCardForm/>,
          onConfirm: handleReload,
          hideOnConfirm: false
        })
      break

      case 'update':
        popup.current?.showPopup({
          content: <UpdateCardForm id={getRowsCodes()}/>,
          onConfirm: handleReload,
          hideOnConfirm: true
        })
      break
    }
  }

  const deleteCards = () => {

    const removeAll = selectedRows.map( (selected) => Array.isArray(selected) && typeof selected[0] === 'string' && deleteCard(parseInt(selected[0])))
    
    if (removeAll) {
      Promise.all(removeAll).then((data) => {
  
        setSelectedRows([])
        notify('Cartões removidos com sucesso!', 'success')
        setRows( prev => ({ ...prev }))
        handleReload()
      }).catch(() => {
  
        notify('Erro ao deletar os cartões', 'error')
      })
    }
  }

	const handleDeleteSelectedCards = () => {
    popup.current?.showPopup({
      content: <DeleteCardAlert/>,
      onConfirm: deleteCards,
      hideOnConfirm: true,
      blurEffect: 2
    })
	}

	return (
		<Layout className="flex flex-col justify-between gap-6 pr-5 overflow-auto" defaultActiveMenuIndex={3}>
			<Container className="h-full mb-6 overflow-hidden">
				<DataTable title="Cartões" items={items} getSelectedRows={(e) => setSelectedRows(e)} onAddAction={() => handleForm('create')} onEditAction={() => handleForm('update')} onDeleteAction={() => handleDeleteSelectedCards()}/>
			</Container>
			<PopupContainer ref={popup}/>
		</Layout>
	)
}

export default cartoes