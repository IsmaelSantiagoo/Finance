import Container from "@/components/Container"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import Layout from "@/components/Layout"
import PopupContainer from "@/components/react-popup/PopupContainer"
import { PopupData } from "@/components/react-popup/types"
import { getCategorias } from "@/services/categorias"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import { useEffect, useRef, useState } from "react"
import { AddCategoryForm } from "./forms/categories/create"
import { UpdateCategoryForm } from "./forms/categories/update"
import { deleteCategory } from "./services"
import { notify } from "@/utils/notify"
import { AlertContainer } from "@/components/AlertContainer"

const categorias = () => {

	const columns: DataTableColumnType[] = [
    { name: 'Código', type: 'number', key: true},
    { name: 'Nome', type: 'string', brand: true, brandType: 'icon'},
		{ name: 'Cor', type: 'string', hidden: true},
		{ name: 'Ícone', type: 'string', hidden: true}
  ]

  const [categorias, setCategorias] = useState<CategoryTypes[]>([])
  const [rows, setRows] = useState<(string | number | string[])[][]>([])
	const [items, setItems] = useState({ columns: columns, rows: rows})
	const popup = useRef<{ showPopup: ({content, hideOnConfirm}: PopupData) => void}>(null)
	const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])

	const fetchCategories = async () => await getCategorias().then( data => data)

  useEffect( () => {

    fetchCategories().then( (data) => setCategorias(data))
  }, [])

  useEffect(() => {

    if (categorias) {
      const convertedTransactions: (string | number | string[])[][] = DataTableItemConverter(categorias)
      setRows(convertedTransactions)
    }
  }, [categorias])

	useEffect(() => {

		setItems( (prev) => {

			const currentItems = {...prev}
			currentItems.rows = rows
			return currentItems
		})
	}, [rows])

	useEffect(() => {

    if (categorias) {
      const convertedCategories: (string | number | string[])[][] = DataTableItemConverter(categorias)

			//adicionando um ícone nas categorias
			const categoriesWithIcon = convertedCategories.map( (categorie) => {

				const updatedCategory = [...categorie]

				const name = categorie[1]
				const color = categorie[2]
				const icon = categorie[3]

				updatedCategory[1] = [
					typeof name === 'string' ? name : '', 
					typeof color === 'string' ? color : '#000',
					typeof icon === 'string' ? icon : '',
				]

				return updatedCategory
			})

			setRows(categoriesWithIcon)
    }
  }, [categorias])

	const handleReload = () => {

    fetchCategories().then( (data) => setCategorias(data))
  }

	const getRowsCodes = () => {

    const codes = selectedRows.map( selected => typeof selected[0] === 'string' && parseInt(selected[0]))
    return codes.map( code => typeof code === 'number' ? code : 0)[0]
  }

	const handleForm = (type: 'create' | 'update' | 'delete') => {
    switch (type) {

      case 'create':
        popup.current?.showPopup({
          content: <AddCategoryForm/>,
          onConfirm: handleReload,
          hideOnConfirm: false,
          blurEffect: 5
        })
      break

      case 'update':
        popup.current?.showPopup({
          content: <UpdateCategoryForm id={getRowsCodes()}/>,
          onConfirm: handleReload,
          hideOnConfirm: true,
          blurEffect: 5
        })
      break

      case 'delete':
        popup.current?.showPopup({
          content: <AlertContainer
            title="Deletar categoria?"
          />,
          onConfirm: handleDeleteSelectedCategories,
          hideOnConfirm: true,
          blurEffect: 5
        })
      break
    }
  }

	const handleDeleteSelectedCategories = () => {

		const removeAll = selectedRows.map( (selected) => Array.isArray(selected) && typeof selected[0] === 'string' && deleteCategory(parseInt(selected[0])))
		
    if (removeAll) {
      Promise.all(removeAll).then((data) => {

        setSelectedRows([])
        notify('Categorias removidas com sucesso!', 'success')
        setRows( prev => ({ ...prev }))
				handleReload()
      }).catch(() => {
  
        notify('Erro ao deletar as categorias', 'error')
      })
    }
	}

	return (
		<Layout className="flex flex-col justify-between gap-6 pr-5 overflow-auto" defaultActiveMenuIndex={3}>
			<Container className="h-full mb-6 overflow-hidden">
				<DataTable title="Categorias" items={items} getSelectedRows={(e) => setSelectedRows(e)} onAddAction={() => handleForm('create')} onEditAction={() => handleForm('update')} onDeleteAction={() => handleForm('delete')}/>
			</Container>
			<PopupContainer ref={popup}/>
		</Layout>
	)
}

export default categorias