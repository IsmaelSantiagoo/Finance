import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { InputSearchProps } from './types'

const InputSearch = ({placeholder}: InputSearchProps) => {
  return (
    <div className='flex justify-between bg-projectPallet-quaternary py-3 px-5 rounded-xl items-center'>
      <input className='bg-transparent placeholder-projectPallet-tertiary w-full outline-none text-zinc-200' type="text" placeholder={placeholder}/>
      <FontAwesomeIcon icon={faSearch}/>
    </div>
  )
}

export default InputSearch