import { useEffect, useState } from "react"
import DataTableBody from "./DataTableBody"
import DataTableHeader from "./DataTableHeader"
import { DataTableProps } from "./types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const DataTable = ({ title, items, onAddAction, onEditAction, onDeleteAction, controls = 'visible', onDataChange, dataInicio }: DataTableProps) => {

	const columns = items.columns
	const rows = items.rows

	if (rows.length > 0) {

		const [isActions, setIsActions] = useState<boolean>(false)
		const [selectedRows, setSelectedRows] = useState<(string | number | string[])[][]>([])

		// função para ativar as actions após uma linha ser selecionada
		const handleSelectRow = (selectedRows: (string | number | string[])[][]) => {

			if (selectedRows.length !== 0 && controls === 'visible') {

				setIsActions(true)
			} else {

				setIsActions(false)
			}

			setSelectedRows(selectedRows)
		}

		return (
			<div className="flex flex-col h-full overflow-hidden">
				<DataTableHeader title={title} selectedRows={selectedRows} showActions={isActions} onAddAction={onAddAction} onEditAction={onEditAction} onDeleteAction={onDeleteAction} controls={controls} onDataChange={onDataChange} dataInicio={dataInicio}/>
				<DataTableBody columns={columns} rows={rows} onSelectRow={(selectedRows) => handleSelectRow(selectedRows)} controls={controls}/>
			</div>
		)
	} else {

		return (
			<div className="flex h-full overflow-hidden w-full justify-center items-center gap-2">
				<FontAwesomeIcon icon={faCircleExclamation} className="text-orange-500 text-2xl"/>
				<p>Nenhum item encontrado!</p>
			</div>
		)
	}
}

export default DataTable