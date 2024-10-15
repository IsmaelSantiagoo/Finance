import Container from "@/components/Container"
import DataTable from "@/components/DataTable"
import Layout from "@/components/Layout"
import { items } from "./items"

const categorias = () => {

	
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
				<DataTable items={items} onAddAction={handleAdd} onEditAction={handleEdit} onDeleteAction={handleDelete}/>
			</Container>
		</Layout>
	)
}

export default categorias