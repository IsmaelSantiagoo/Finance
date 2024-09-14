import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { InputSearchProps } from './types'

const InputSearch = ({placeholder, className, inputClassName}: InputSearchProps) => {
  return (
    <div className={`flex justify-between py-3 px-5 rounded-xl items-center ${className}`}>
      <input className={`w-full outline-none ${inputClassName}`} type="text" placeholder={placeholder}/>
      <FontAwesomeIcon icon={faSearch}/>
    </div>
  )
}

export default InputSearch