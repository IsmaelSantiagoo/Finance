import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons"
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons"

const InOutComes = ({type, value, porcentage, severity}: InOutComesProps) => {
  return (
    <div className="w-full flex gap-5 items-center">
      <div className={`${severity === 'success'?'bg-sky-400':'bg-projectPallet-secondary'} w-14 h-12 p-2 rounded-xl flex items-center justify-center`}>
        <FontAwesomeIcon icon={type === 'in'?faArrowDownLong:faArrowUpLong} className="w-full h-full rotate-45"/>
      </div>
      <div className="w-full">
        <p className="text-projectPallet-tertiary">Total {type === 'in'?'Income':'Outcome'}</p>
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">R$ {value}</h2>
          <div className={`${severity === 'success'?'bg-green-700':'bg-red-700'} py-1 px-4 flex items-center text-sm rounded-2xl bg-opacity-20 ${severity === 'success'?'text-green-700':'text-red-700'}`}>
            <p>{porcentage}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InOutComes