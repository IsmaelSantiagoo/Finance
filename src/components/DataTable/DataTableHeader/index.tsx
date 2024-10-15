import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DataTableHeader = ({ title, showActions, onDeleteAction }: DataTableHeaderProps) => {

  return (
    <div className="p-3 bg-projectPallet-quaternary flex items-center">
      <div className="w-full">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
      <div className="w-full flex items-center justify-end" style={{ display: showActions ? 'flex' : 'none'}}>
        <FontAwesomeIcon icon={faTrash} className="text-red-500 text-xl cursor-pointer" onClick={() => onDeleteAction()}/>
      </div>
    </div>
  )
}

export default DataTableHeader