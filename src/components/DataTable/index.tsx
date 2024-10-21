import { useEffect, useState } from "react"
import DataTableBody from "./DataTableBody"
import DataTableHeader from "./DataTableHeader"
import { DataTableProps } from "./types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { DataTableColumnType } from "./DataTableBody/types"

const DataTable = ({ title, items, getSelectedRows, onAddAction, onEditAction, onDeleteAction, controls = 'visible', onDateChange, dataInicio }: DataTableProps) => {

	const [columns, setColumns] = useState<DataTableColumnType[]>(items.columns)
	const [rows, setRows] = useState<(string | number| string[])[][]>([])

	useEffect(() => {
		setColumns(items.columns)
		setRows(items.rows)
	}, [items])

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

		// exportando linhas selecionadas
		getSelectedRows && getSelectedRows(selectedRows)
	}

	const handleDeleteAction = () => {

		onDeleteAction()
		setSelectedRows([])
	}

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<DataTableHeader title={title} selectedRows={selectedRows} showActions={isActions} onAddAction={onAddAction} onEditAction={onEditAction} onDeleteAction={() => handleDeleteAction()} controls={controls} onDateChange={onDateChange} dataInicio={dataInicio}/>
			{
				rows.length > 0 ? <DataTableBody columns={columns} rows={rows} onSelectRow={(selectedRows) => handleSelectRow(selectedRows)} controls={controls}/> :
				<div className="flex justify-center items-center p-5 gap-2">
					<FontAwesomeIcon icon={faTriangleExclamation} className="text-orange-500 text-3xl"/>
					<p className="text-xl">Nenhuma transação encontrada!</p>
				</div>
			}
		</div>
	)
}

export default DataTable