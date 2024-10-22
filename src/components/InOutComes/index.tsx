import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons"
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons"
import CountUp from "react-countup"

const InOutComes = ({type, value, porcentage, severity}: InOutComesProps) => {
  return (
    <div className="w-full flex gap-5 items-center">
      <div className={`${severity === 'success'?'bg-sky-400':'bg-projectPallet-secondary'} w-14 h-12 p-2 rounded-xl flex items-center justify-center`}>
        <FontAwesomeIcon icon={type === 'in'?faArrowDownLong:faArrowUpLong} className="w-full h-full rotate-45"/>
      </div>
      <div className="w-full">
        <p className="text-projectPallet-tertiary">Total {type === 'in'?'Receipts':'Transfers'}</p>
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">
            <CountUp
              className="account-balance"
              start={0}
              end={value}
              duration={1}
              useEasing={true}
              separator=","
              formattingFn={(e) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
            />
          </h2>
          <div className={`${severity === 'success'?'bg-green-700':'bg-red-700'} py-1 px-4 flex items-center text-sm rounded-2xl bg-opacity-20 ${severity === 'success'?'text-green-700':'text-red-700'}`}>
            <p>
              <CountUp
                className="account-balance"
                start={0}
                end={porcentage}
                duration={1}
                useEasing={true}
                separator=","
              />
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InOutComes