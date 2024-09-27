import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

const MenuProfileItem = ({img, username, ocupation}: MenuProfileItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-14 flex gap-2 items-center">
        <Image src={img} alt="foto de perfil" width={60}/>
        <div className="font-bold text-lg md:max-w-[150px] max-w-[200px]">
          <h2 className='text-lg truncate'>{username}</h2>
          <p className="text-sm font-light text-zinc-400 truncate">{ocupation}</p>
        </div>
      </div>
      <div className="text-md text-zinc-300 h-full flex items-center">
        <FontAwesomeIcon icon={faChevronDown}/>
      </div>
    </div>
  )
}

export default MenuProfileItem