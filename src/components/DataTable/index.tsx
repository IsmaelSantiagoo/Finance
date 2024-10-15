import { useState } from "react"
import DataTableBody from "./DataTableBody"
import DataTableHeader from "./DataTableHeader"
import { DataTableProps } from "./types"

const DataTable = ({ items, onDeleteAction }: DataTableProps) => {

	const columns = items.columns
	const rows = items.rows

	const [isActions, setIsActions] = useState<boolean>(false)

	// função para ativar as actions após uma linha ser selecionada
	const handleSelectRow = (selectedRows: (string | number)[][]) => {

		if (selectedRows.length !== 0) {

			setIsActions(true)
		} else {

			setIsActions(false)
		}
	}

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<DataTableHeader title='Categorias' showActions={isActions} onDeleteAction={onDeleteAction}/>
			<DataTableBody columns={columns} rows={rows} onSelectRow={(selectedRows) => handleSelectRow(selectedRows)}/>
		</div>
	)
}

export default DataTable