import Container from "@/components/Container"
import DataTable from "@/components/DataTable"
import { DataTableColumnType } from "@/components/DataTable/DataTableBody/types"
import Layout from "@/components/Layout"
import { getCategorias } from "@/services/categorias"
import { DataTableItemConverter } from "@/utils/DataTableItemConverter"
import { useEffect, useState } from "react"

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
	const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});
	const completeDate = `${dataInicio} 00:00:00`

	const fetchCategories = async () => await getCategorias().then( data => data)

  useEffect( () => {

    fetchCategories().then( (data) => setCategorias(data))
  }, [dataInicio])

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
	
	const handleAdd = () => {

		console.log('adicionando linha...')
	}
	
	const handleEdit = () => {

		console.log('editando linha...')
	}

	const handleDelete = () => {

		console.log('deletando linha...')
	}

	return (
		<Layout className="flex flex-col justify-between gap-6 pr-5 overflow-auto" defaultActiveMenuIndex={3}>
			<Container className="h-full mb-6 overflow-hidden">
				<DataTable title="Categorias" items={items} onAddAction={handleAdd} onEditAction={handleEdit} onDeleteAction={handleDelete} onDataChange={(e) => setDataInicio(e)} dataInicio={dataInicio}/>
			</Container>
		</Layout>
	)
}

export default categorias