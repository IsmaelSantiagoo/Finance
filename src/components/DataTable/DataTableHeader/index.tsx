import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"

const DataTableHeader = ({ title, selectedRows, showActions, onAddAction, onEditAction, onDeleteAction }: DataTableHeaderProps) => {

  return (
    <div className="p-3 bg-projectPallet-quaternary flex items-center">
      <div className="w-full">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
      {
        !showActions && <Button className="text-white bg-projectPallet-secondary px-5 font-bold min-w-32 max-w-32 h-10 rounded-lg" onClick={() => onAddAction()}>ADICIONAR</Button>
      }
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