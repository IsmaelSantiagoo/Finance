import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const InputSearch = ({placeholder, className, inputClassName, value, onChange = () => {}}: InputSearchProps) => {
  return (
    <div className={`flex justify-between w-full h-14 py-3 px-5 rounded-xl items-center ${className}`}>
      <input className={`w-full outline-none ${inputClassName}`} type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e)}/>
      <FontAwesomeIcon icon={faSearch} className='w-6'/>
    </div>
  )
}

export default InputSearch