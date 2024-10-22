import Container from "@/components/Container"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import Layout from "@/components/Layout"
import PopupContainer from "@/components/react-popup/PopupContainer"
import { PopupData } from "@/components/react-popup/types"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import { useEffect, useRef, useState } from "react"
import { notify } from "@/utils/notify"
import { getEstablishments } from "@/services/estabelecimentos"
import { AddEstablishmentForm } from "./forms/establishments/create"
import { UpdateEstablishmentForm } from "./forms/establishments/update"
import { deleteEstablishment } from "../services"

const estabelecimentos = () => {

	const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true, brandType: 'image'},
		{ name: 'Link', type: 'string'},
  ]

  const [estabelecimentos, setEstabelecimentos] = useState<EstablishmentTypes[]>([])
  const [rows, setRows] = useState<(string | number | string[])[][]>([])
	const [items, setItems] = useState({ columns: columns, rows: rows})
	const popup = useRef<{ showPopup: ({content, hideOnConfirm}: PopupData) => void}>(null)
	const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])

	const fetchCategories = async () => await getEstablishments().then( data => data)

  useEffect( () => {

    fetchCategories().then( (data) => setEstabelecimentos(data))
  }, [])

  useEffect(() => {

    if (estabelecimentos) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(estabelecimentos)
      setRows(convertedTransactions)
    }
  }, [estabelecimentos])

	useEffect(() => {

		setItems( (prev) => {

			const currentItems = {...prev}
			currentItems.rows = rows
			return currentItems
		})
	}, [rows])

	useEffect(() => {

    if (estabelecimentos) {
      const convertedEstablishments: (string | number | string[])[][] = DataTableItemConverter(estabelecimentos)

			//adicionando um ícone nas categorias
			const establishmentsWithImage = convertedEstablishments.map( (establishment) => {

				const updatedEstablishment = [...establishment]

				const name = establishment[1]
				const link = establishment[2]

				updatedEstablishment[1] = [
					typeof link === 'string' && link ? `https://cdn.brandfetch.io/${link}/w/400/h/400` : 'https://www.advocacianunes.com.br/wp-content/uploads/2022/04/logo-pix-icone-1024.png',
          typeof name === 'string' ? name : '', 
				]

				return updatedEstablishment
			})

			setRows(establishmentsWithImage)
    }
  }, [estabelecimentos])

	const handleReload = () => {

    fetchCategories().then( (data) => setEstabelecimentos(data))
  }

	const getRowsCodes = () => {

    const codes = selectedRows.map( selected => typeof selected[0] === 'string' && parseInt(selected[0]))
    return codes.map( code => typeof code === 'number' ? code : 0)[0]
  }

	const handleForm = (type: 'create' | 'update') => {
    switch (type) {

      case 'create':
        popup.current?.showPopup({
          content: <AddEstablishmentForm/>,
          onConfirm: handleReload,
          hideOnConfirm: false
        })
      break

      case 'update':
        popup.current?.showPopup({
          content: <UpdateEstablishmentForm id={getRowsCodes()}/>,
          onConfirm: handleReload,
          hideOnConfirm: true
        })
      break
    }
  }

	const handleDeleteSelectedEstablishments = () => {

		const removeAll = selectedRows.map( (selected) => Array.isArray(selected) && typeof selected[0] === 'string' && deleteEstablishment(parseInt(selected[0])))
		
    if (removeAll) {
      Promise.all(removeAll).then((data) => {

        setSelectedRows([])
        notify('Estabelecimentos removidos com sucesso!', 'success')
        setRows( prev => ({ ...prev }))
				handleReload()
      }).catch(() => {
  
        notify('Erro ao deletar os estabelecimentos', 'error')
      })
    }
	}

	return (
		<Layout className="flex flex-col justify-between gap-6 pr-5 overflow-auto" defaultActiveMenuIndex={3}>
			<Container className="h-full mb-6 overflow-hidden">
				<DataTable title="Estabelecimentos" items={items} getSelectedRows={(e) => setSelectedRows(e)} onAddAction={() => handleForm('create')} onEditAction={() => handleForm('update')} onDeleteAction={() => handleDeleteSelectedEstablishments()}/>
			</Container>
			<PopupContainer ref={popup}/>
		</Layout>
	)
}

export default estabelecimentos