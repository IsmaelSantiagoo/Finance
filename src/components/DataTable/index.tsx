import { useState } from "react"
import DataTableBody from "./DataTableBody"
import DataTableHeader from "./DataTableHeader"
import { DataTableProps } from "./types"

const DataTable = ({ items, onAddAction, onEditAction, onDeleteAction }: DataTableProps) => {

	const columns = items.columns
	const rows = items.rows

	const [isActions, setIsActions] = useState<boolean>(false)
	const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])

	// função para ativar as actions após uma linha ser selecionada
	const handleSelectRow = (selectedRows: (string | number | string[])[][]) => {

		if (selectedRows.length !== 0) {

			setIsActions(true)
		} else {

			setIsActions(false)
		}

		setSelectedRows(selectedRows)
	}

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<DataTableHeader title='Categorias' selectedRows={selectedRows} showActions={isActions} onAddAction={onAddAction} onEditAction={onEditAction} onDeleteAction={onDeleteAction}/>
			<DataTableBody columns={columns} rows={rows} onSelectRow={(selectedRows) => handleSelectRow(selectedRows)}/>
		</div>
	)
}

export default DataTable