import { Button } from "@mui/material"
import { DataTableHeaderProps } from "./types"
import DatePicker from "@/components/DatePicker"

const DataTableHeader = ({ title, selectedRows, showActions, onAddAction, onEditAction, onDeleteAction, controls, onDataChange, dataInicio }: DataTableHeaderProps) => {

  return (
    <div className="p-3 bg-projectPallet-quaternary flex items-center rounded-t-xl gap-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-xl">
          {
            selectedRows.length !== 0 && controls === 'visible' ? `${selectedRows.length} selecionado(s)` : title
          }
        </h1>
      </div>
      <div className="flex gap-2">
        <DatePicker dataInicio={dataInicio} onChange={onDataChange}/>
        {
          !showActions && controls === 'visible' &&
            <Button className="text-white bg-projectPallet-secondary px-5 font-bold min-w-32 max-w-32 h-10 rounded-lg" onClick={() => onAddAction()}>ADICIONAR</Button>
        }
      </div>
      <div className="w-full flex items-center gap-2 justify-end" style={{ display: showActions ? 'flex' : 'none'}}>
        {
          selectedRows.length === 1 && <Button className="text-white px-5 font-bold min-w-32 max-w-32 border-2 border-projectPallet-secondary h-10 rounded-lg" variant="outlined" onClick={() => onEditAction()}>EDITAR</Button>
        }
        <Button className="text-white px-5 font-bold min-w-32 max-w-32 border-2 border-projectPallet-secondary h-10 rounded-lg" variant="outlined" onClick={() => onDeleteAction()}>REMOVER</Button>
      </div>
    </div>
  )
}

export default DataTableHeader